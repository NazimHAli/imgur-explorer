import { State } from "@/types";
import { extractImageResults } from "@/utils/dataUtils";

const imgurClientId: string | undefined | boolean = import.meta.env
  .PUBLIC_IMGUR_CLIENT_ID;
const BASE = "https://api.imgur.com/3";
const EP_GALLERY = `${BASE}/gallery`;
const EP_GALLERY_TAGS = `${BASE}/tags`;

interface Args {
  endPoint: RequestInfo;
  requestOptions?: RequestInit;
  filterImageResults?: boolean;
}

class ImgurAPI {
  private static instance: ImgurAPI;
  useFakeResponse: boolean;
  requestArgs!: State["requestArgs"];

  constructor() {
    this.useFakeResponse = imgurClientId === undefined;
  }

  /**
   * Get or create API instance
   */
  public static getInstance(requestArgs: State["requestArgs"]): ImgurAPI {
    if (ImgurAPI.instance === undefined) {
      ImgurAPI.instance = new ImgurAPI();
    }

    ImgurAPI.instance.requestArgs = requestArgs;

    return ImgurAPI.instance;
  }

  private async imgurBaseApi(args: Args) {
    const myHeaders = new Headers({
      Authorization: `Client-ID ${imgurClientId || "local"}`,
    });

    args.requestOptions = {
      ...args.requestOptions,
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(args.endPoint, args.requestOptions);
    const result = await response.json();

    if (this.requestArgs.filter && !result.data?.galleries) {
      return extractImageResults(result.data);
    }

    return result.data;
  }

  public getGallerySearchResults() {
    if (this.useFakeResponse) {
      return import("@/__tests__/fixtures/imgurResponse").then((mod: any) => {
        return extractImageResults(mod.fakeResponse.data);
      });
    } else {
      return this.getLiveResultsFromAPI();
    }
  }

  private getLiveResultsFromAPI() {
    const endPointURL = this.constructSearchEndPointURL();

    return this.imgurBaseApi({
      endPoint: endPointURL,
    });
  }

  /**
   * Get list of default gallery tags
   */
  private async getGalleryTags() {
    if (this.useFakeResponse) {
      return await import("@/__tests__/fixtures/galleryTags").then(
        (mod: any) => {
          return mod.fakeGalleryTags.data;
        }
      );
    } else {
      return await this.imgurBaseApi({ endPoint: EP_GALLERY_TAGS });
    }
  }

  private getGalleryTagMetadata() {
    const endPoint = `${EP_GALLERY}/t/${this.requestArgs.tagName}/${this.requestArgs.sort}/${this.requestArgs.window}/${this.requestArgs.page}`;

    return this.imgurBaseApi({
      endPoint: endPoint,
    });
  }

  public testEndPoint() {
    const endPoint = `${BASE}/hot/time/today/${this.requestArgs.page}`;

    return this.imgurBaseApi({
      endPoint: endPoint,
    });
  }

  public methodDispatcher(method: string) {
    switch (method) {
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

  private constructSearchEndPointURL() {
    // Query
    const searchString = this.getSearchString();

    // Parameters
    const sortParam = `${this.requestArgs.sort}/`;
    const windowParam = `${this.getWindow()}/`;
    const pageParam = `${this.requestArgs.page}${searchString}`;

    return `${EP_GALLERY}/search/${sortParam}${windowParam}${pageParam}`;
  }

  private getSearchString() {
    let searchString = "";
    const imgSize = "q_size_px=small&q_type=jpg";

    if (this.requestArgs.query) {
      searchString = `?q=${this.requestArgs.query}&${imgSize}`;
    } else {
      searchString = "?${imgSize}";
    }

    return searchString;
  }

  private getWindow(): string {
    return this.requestArgs.sort === "top" ? this.requestArgs.window : "all";
  }
}

export { ImgurAPI };
