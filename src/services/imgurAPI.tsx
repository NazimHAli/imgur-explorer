import { extractImageResults } from "../utils/dataUtils";

const imgurClientId = process.env.imgurClientId;
const BASE = "https://api.imgur.com/3";
const EP_GALLERY = `${BASE}/gallery`;
const EP_GALLERY_HOT = `${EP_GALLERY}/hot`;
const EP_GALLERY_TAGS = `${BASE}/tags`;

interface Args {
  endPoint: RequestInfo;
  requestOptions?: RequestInit;
  filterImageResults?: boolean;
}

class ImgurAPI {
  private static instance: ImgurAPI;
  useFakeResponse: boolean;

  constructor() {
    this.useFakeResponse = !imgurClientId?.length;
  }

  /**
   * getInstance
   *
   * @returns
   */
  public static getInstance(): ImgurAPI {
    if (!ImgurAPI.instance) {
      ImgurAPI.instance = new ImgurAPI();
    }

    return ImgurAPI.instance;
  }

  /**
   * imgurBaseApi
   *
   * @param endPoint
   * @param requestOptions
   * @returns
   */
  private async imgurBaseApi(args: Args) {
    const myHeaders = new Headers({
      Authorization: `Client-ID ${imgurClientId}`,
    });

    args.requestOptions = {
      ...args.requestOptions,
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(args.endPoint, args.requestOptions);
      const result = await response.json();

      if (args.filterImageResults) {
        return extractImageResults(result.data);
      }

      return result.data;
    } catch (error) {
      console.log("error", error);
      return [];
    }
  }

  /**
   * submitGallerySearch
   *
   * @param searchQuery
   * @param page
   * @param filterImageResults
   * @returns
   */
  public async submitGallerySearch(args) {
    if (this.useFakeResponse) {
      return await import("../__tests__/fixtures/imgurResponse").then(
        (mod: any) => {
          return extractImageResults(mod.fakeResponse.data);
        }
      );
    } else {
      return await this.imgurBaseApi({
        endPoint: `${EP_GALLERY}/search/${args.sort || "viral"}/all/${
          args.page || 1
        }?q=${args.searchQuery}&q_size_px=small&q_type=jpg`,
        filterImageResults: args.filterImageResults || false,
      });
    }
  }

  /**
   * getGalleryImages
   *
   * @returns
   */
  public async getGalleryImages() {
    return await this.imgurBaseApi({ endPoint: EP_GALLERY_HOT });
  }

  /**
   * getGalleryTags
   *
   * Gets a list of the default gallery tags
   *
   * @returns
   */
  public async getGalleryTags() {
    if (this.useFakeResponse) {
      return await import("../__tests__/fixtures/galleryTags").then(
        (mod: any) => {
          return mod.fakeGalleryTags.data;
        }
      );
    } else {
      return await this.imgurBaseApi({ endPoint: EP_GALLERY_TAGS });
    }
  }
}

export { ImgurAPI };
