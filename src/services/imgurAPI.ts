import { Action, State } from "@/types";
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
   * Get or create API instance
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
    // Query
    const searchString = requestArgs.query
      ? `?q=${requestArgs.query}&q_size_px=small&q_type=jpg`
      : "?q_size_px=small&q_type=jpg";

    // Parameters
    const sortParam = `${requestArgs.sort}/`;
    const windowParam = `${
      requestArgs.sort === "top" ? requestArgs.window : "all"
    }/`;
    const pageParam = `${requestArgs.page || 1}${searchString}`;

    return `${EP_GALLERY}/search/${sortParam}${windowParam}${pageParam}`;
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

  private getGalleryTagMetadata(requestArgs: State["requestArgs"]) {
    const endPoint = `${EP_GALLERY}/t/${requestArgs.tagName}/${requestArgs.sort}/${requestArgs.window}/${requestArgs.page}`;

    return this.imgurBaseApi({
      endPoint: endPoint,
    });
  }

  public methodDispatcher(method: string, requestArgs: State["requestArgs"]) {
    switch (method) {
      case "search":
        return this.getGallerySearchResults(requestArgs);
      case "tags":
        return this.getGalleryTags();
      case "tagName":
        return this.getGalleryTagMetadata(requestArgs);
      default:
        return this.getGallerySearchResults(requestArgs);
    }
  }
}

function _dispatchResponse(
  method: string,
  dispatchState: Dispatch<Action>,
  requestArgs: State["requestArgs"],
  response: any,
  items: State["items"]
): void {
  if (method === "tags") {
    dispatchState({
      type: "setTags",
      galleryTags: response,
      items: response.items,
      requestError: false,
    });
  } else if (method === "tagName") {
    dispatchState({
      type: "setItems",
      items: extractImageResults(response.items),
      requestError: false,
    });
  } else {
    dispatchState({
      type: "setItems",
      items: requestArgs.newSearch ? response : items.concat(response),
      requestError: false,
    });
  }
}

/**
 * Helper function to handle service requests
 * and dispatch state updates
 *
 * @param dispatchState
 * @param state
 * @param method
 */
function handleServiceRequests(
  dispatchState: Dispatch<Action>,
  state: State,
  method = "search"
): void {
  dispatchState({ type: "setIsLoading", loading: true });

  const { items, requestArgs } = state;
  const imgurClient = ImgurAPI.getInstance();

  imgurClient
    .methodDispatcher(method, requestArgs)
    .then((response) => {
      _dispatchResponse(method, dispatchState, requestArgs, response, items);

      dispatchState({ type: "setIsLoading", loading: false });
    })
    .catch((error) => {
      // TODO: Add logging
      error;
    });
}

export { handleServiceRequests };
