import { Action, State } from "@/state";
import { extractImageResults } from "@/utils/dataUtils";
import { Dispatch } from "react";

const imgurClientId = import.meta.env.PUBLIC_IMGUR_CLIENT_ID;
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

  constructor() {
    this.useFakeResponse = imgurClientId === undefined;
  }

  /**
   * Get or create an instance
   *
   * @returns
   */
  public static getInstance(): ImgurAPI {
    if (ImgurAPI.instance === undefined) {
      ImgurAPI.instance = new ImgurAPI();
    }

    return ImgurAPI.instance;
  }

  private async imgurBaseApi(args: Args) {
    const myHeaders = new Headers({
      Authorization: `Client-ID ${imgurClientId}`,
    });

    args.requestOptions = {
      ...args.requestOptions,
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(args.endPoint, args.requestOptions);
    const result = await response.json();

    if (args.filterImageResults) {
      return extractImageResults(result.data);
    }

    return result.data;
  }

  public getGallerySearchResults(requestArgs: State["requestArgs"]) {
    if (this.useFakeResponse) {
      return import("@/__tests__/fixtures/imgurResponse").then((mod: any) => {
        return extractImageResults(mod.fakeResponse.data);
      });
    } else {
      return this.getLiveResultsFromAPI(requestArgs);
    }
  }

  private getLiveResultsFromAPI(requestArgs: State["requestArgs"]) {
    const endPointURL = this.constructEndpointURL(requestArgs);

    return this.imgurBaseApi({
      endPoint: endPointURL,
      filterImageResults: requestArgs.filter || false,
    });
  }

  private constructEndpointURL(requestArgs: State["requestArgs"]) {
    // Search query
    const searchString = requestArgs.query
      ? `?q=${requestArgs.query}&q_size_px=small&q_type=jpg`
      : "?q_size_px=small&q_type=jpg";

    // Filters
    const sortParam = `${requestArgs.sort}/`;
    const windowParam = `${
      requestArgs.sort === "top" ? requestArgs.window : "all"
    }/`;
    const pageParam = `${requestArgs.page || 1}${searchString}`;

    return `${EP_GALLERY}/search/${sortParam}${windowParam}${pageParam}`;
  }

  /**
   * Gets a list of the default gallery tags
   *
   * @returns
   */
  public async getGalleryTags() {
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

  public methodDispatcher(method: string, requestArgs: State["requestArgs"]) {
    if (method == "search") {
      return this.getGallerySearchResults(requestArgs);
    } else {
      return this.getGalleryTags();
    }
  }
}

/**
 * Helper function to handle service requests
 * and dispatch state updates
 *
 * @param dispatchState
 * @param state
 * @param method
 * @returns
 */
function handleServiceRequests(
  dispatchState: Dispatch<Action>,
  state: State,
  method = "search"
): void {
  dispatchState({ type: "setIsLoading", loading: true });

  const { requestArgs } = state;
  const imgurClient = ImgurAPI.getInstance();

  imgurClient
    .methodDispatcher(method, requestArgs)
    .then((response) => {
      if (method === "search") {
        dispatchState({
          type: "setItems",
          items: requestArgs.newSearch
            ? response
            : state.items.concat(response),
          requestError: false,
        });
      } else {
        dispatchState({
          type: "setTags",
          tagObject: response,
          requestError: false,
        });
      }

      dispatchState({ type: "setIsLoading", loading: false });
    })
    .catch((error) => {
      console.error(error);
    });
}

export { handleServiceRequests };
