import { Action, State } from "@/types";
import { extractImageResults } from "@/utils/dataUtils";
import { Dispatch } from "react";

import { ImgurAPI } from "./imgurAPI";

function _dispatchResponse(
  method: string,
  dispatchState: Dispatch<Action>,
  requestArgs: State["requestArgs"],
  response: any,
  items: State["items"]
): void {
  if (method === "test") {
    return;
  } else if (method === "tags") {
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
function handleImgurServiceRequests(
  dispatchState: Dispatch<Action>,
  state: State,
  method = "search"
): void {
  if (state.requestArgs.newSearch) {
    dispatchState({ type: "setIsLoading", loading: true });
  }

  const { items, requestArgs } = state;
  const imgurClient = ImgurAPI.getInstance(requestArgs);

  imgurClient
    .methodDispatcher(method)
    .then((response) => {
      _dispatchResponse(method, dispatchState, requestArgs, response, items);

      if (state.requestArgs.newSearch) {
        dispatchState({ type: "setIsLoading", loading: false });
      }
    })
    .catch((error) => {
      // TODO: Add logging
      error;
    });
}

export { handleImgurServiceRequests };
