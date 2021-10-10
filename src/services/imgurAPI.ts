import { Action, State } from "@/state";
import { extractImageResults } from "@/utils/dataUtils";

const imgurClientId = import.meta.env.PUBLIC_IMGUR_CLIENT_ID;
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
    this.useFakeResponse = imgurClientId === undefined;
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

  public async submitGallerySearch(requestArgs: State["requestArgs"]) {
    if (this.useFakeResponse) {
      return await import("@/__tests__/fixtures/imgurResponse").then(
        (mod: any) => {
          return extractImageResults(mod.fakeResponse.data);
        }
      );
    } else {
      const searchString = requestArgs.query
        ? `?q=${requestArgs.query}&q_size_px=small&q_type=jpg`
        : "?q_size_px=small&q_type=jpg";

      const epPrefix = `${EP_GALLERY}/search/`;
      const epSort = `${requestArgs.sort}/`;
      const epWindow = `${
        requestArgs.sort === "top" ? requestArgs.window : "all"
      }/`;
      const epPage = `${requestArgs.page || 1}${searchString}`;

      return await this.imgurBaseApi({
        endPoint: `${epPrefix}${epSort}${epWindow}${epPage}`,
        filterImageResults: requestArgs.filter || false,
      });
    }
  }

  /**
   * Get 'hot' results from gallery search example
   *
   * @returns
   */
  public async getGalleryImages() {
    return await this.imgurBaseApi({ endPoint: EP_GALLERY_HOT });
  }

  /**
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

/**
 * Helper function that dynamically imports the class if not available
 * Provides search argument construction logic so that it can be
 * imported into any file if needed
 *
 * @param dispatchState
 * @param state
 * @returns
 */
function handleGetData(
  dispatchState: {
    (value: Action): void;
    (arg0: {
      type?: string;
      loading?: boolean;
      items?: any;
      requestError?: boolean;
    }): void;
  },
  state: {
    isLoading?: boolean;
    items: State["items"];
    requestArgs: State["requestArgs"];
  }
): (args?: State["requestArgs"]) => void {
  return (args = {} as State["requestArgs"]) => {
    dispatchState({ type: "setIsLoading", loading: true });

    import("@/services/imgurAPI")
      .then((mod) => {
        const imgurClient = mod.ImgurAPI.getInstance();
        const newSearch = args.newSearch || state.requestArgs.newSearch;

        imgurClient
          .submitGallerySearch(state.requestArgs)
          .then((response) => {
            dispatchState({
              type: "setItems",
              items: newSearch ? response : state.items.concat(response),
              requestError: false,
            });
          })
          .catch(() => {
            dispatchState({ requestError: true });
          })
          .finally(() => {
            dispatchState({ type: "setIsLoading", loading: false });
          });
      })
      .catch(() => {
        dispatchState({ requestError: true });
      });
  };
}

export { handleGetData, ImgurAPI };
