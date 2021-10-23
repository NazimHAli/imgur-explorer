import { extractImageResults } from "@/utils/dataUtils";
import { State } from "@/utils/types";

const imgurClientId: string | undefined | boolean = import.meta.env
  .PUBLIC_IMGUR_CLIENT_ID;
const BASE = "https://api.imgur.com/3";
const EP_GALLERY = `${BASE}/gallery`;
const EP_GALLERY_TAGS = `${BASE}/tags`;

const EP_ACCOUNT = `${BASE}/account/?account_id=`;

interface Args {
  endPoint: RequestInfo;
  filterImageResults?: boolean;
  requestOptions?: RequestInit;
}

class ImgurAPI {
  private static instance: ImgurAPI;
  /**
   * Get or create API instance
   */
  public static getInstance(requestArgs: State["requestArgs"]): ImgurAPI {
    // Create instance once
    if (ImgurAPI.instance === undefined) {
      ImgurAPI.instance = new ImgurAPI();
    }

    ImgurAPI.instance.requestArgs = requestArgs;
    return ImgurAPI.instance;
  }
  constructor() {
    this.useFakeResponse = imgurClientId === undefined;
  }
  useFakeResponse: boolean;
  requestArgs!: State["requestArgs"];

  private async imgurBaseApi(args: Args) {
    const myHeaders = new Headers({
      Authorization: `Client-ID ${imgurClientId || "local"}`,
    });

    args.requestOptions = {
      ...args.requestOptions,
      headers: myHeaders,
      method: "GET",
    };

    const response = await fetch(args.endPoint, args.requestOptions);
    const responseJson = await response.json();

    const shouldFilter =
      this.requestArgs.filter &&
      !responseJson.data?.galleries &&
      !this.requestArgs.tagName.length;

    if (shouldFilter) {
      return extractImageResults(responseJson.data);
    }

    return responseJson.data;
  }

  public async getGallerySearchResults() {
    if (this.useFakeResponse) {
      const mod = await import("@/__tests__/fixtures/imgurResponse");
      return extractImageResults(mod.fakeResponse.data);
    }

    return this.getLiveResultsFromAPI();
  }

  private getLiveResultsFromAPI() {
    const endPoint = this.constructSearchEndPointURL();

    return this.imgurBaseApi({ endPoint: endPoint });
  }

  /**
   * Get list of default gallery tags
   */
  private async getGalleryTags() {
    if (this.useFakeResponse) {
      const mod = await import("@/__tests__/fixtures/galleryTags");
      return mod.fakeGalleryTags.data;
    }

    return this.imgurBaseApi({ endPoint: EP_GALLERY_TAGS });
  }

  private getGalleryTagMetadata() {
    const endPoint = `${EP_GALLERY}/t/${this.requestArgs.tagName}/${this.requestArgs.sort}/${this.requestArgs.window}/${this.requestArgs.page}`;

    return this.imgurBaseApi({ endPoint: endPoint });
  }

  private getComments() {
    const commentSort = "best"; // best, top, new
    const imageId = this.requestArgs.selectedItemID;
    const albumImageComments = `${EP_GALLERY}/${imageId}/comments/${commentSort}`;

    return this.imgurBaseApi({ endPoint: albumImageComments });
  }

  private getAccountInfo(account_id = 0) {
    return this.imgurBaseApi({ endPoint: `${EP_ACCOUNT}=${account_id}` });
  }

  public testEndPoint() {
    const hotItems = `${BASE}/hot/time/today/${this.requestArgs.page}`;

    return this.imgurBaseApi({ endPoint: hotItems });
  }

  public methodDispatcher(method: string) {
    switch (method) {
      case "account":
        return this.getAccountInfo();
      case "comments":
        return this.getComments();
      case "test":
        return this.testEndPoint();
      case "search":
        return this.getGallerySearchResults();
      case "tags":
        return this.getGalleryTags();
      case "tagName":
        return this.getGalleryTagMetadata();
      default:
        return this.getGallerySearchResults();
    }
  }

  private constructSearchEndPointURL(): string {
    // Query
    const searchString = this.getSearchString();

    // Parameters
    const sortParam = `${this.requestArgs.sort}/`;
    const windowParam = `${this.getWindow()}/`;
    const pageParam = `${this.requestArgs.page}${searchString}`;

    return `${EP_GALLERY}/search/${sortParam}${windowParam}${pageParam}`;
  }

  private getSearchString(): string {
    let searchString = "";
    const imgSize = "q_size_px=medium&q_type=jpg";

    if (this.requestArgs.query) {
      searchString = `?q=${this.requestArgs.query}&${imgSize}`;
    } else {
      searchString = `?${imgSize}`;
    }

    return searchString;
  }

  private getWindow(): string {
    return this.requestArgs.sort === "top" ? this.requestArgs.window : "all";
  }
}

export { ImgurAPI };
