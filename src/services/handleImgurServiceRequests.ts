import { Action, State } from "@/types";
import { extractImageResults } from "@/utils/dataUtils";
import { Dispatch } from "react";

import { ImgurAPI } from "./imgurAPI";

function _dispatchResponse(
  method: string,
  dispatchState: Dispatch<Action>,
  requestArgs: State["requestArgs"],
  response,
  items: State["items"]
): void {
  if (method === "test") {
    return;
  } else if (method === "comments") {
    dispatchState({
      requestError: false,
      selectedItemComments: response,
      type: "selectedItemComments",
    });
  } else if (method === "tags") {
    dispatchState({
      galleryTags: response,
      items: response.items,
      requestError: false,
      type: "setTags",
    });
  } else if (method === "tagName") {
    dispatchState({
      items: extractImageResults(response.items),
      requestError: false,
      type: "setItems",
    });
  } else {
    dispatchState({
      finishedLazyLoading: response?.length === 0 ? true : false,
      items: requestArgs.newSearch ? response : items.concat(response),
      requestError: false,
      type: "setItems",
    });
  }
}

/**
 * Helper function to handle service requests
 * and dispatch state updates
 *
 */
async function handleImgurServiceRequests(
  dispatchState: Dispatch<Action>,
  state: State,
  method = "search"
) {
  if (state.requestArgs.newSearch) {
    dispatchState({ loading: true, type: "setIsLoading" });
  }

  const { items, requestArgs } = state;
  const imgurClient = ImgurAPI.getInstance(requestArgs);

  const res = await imgurClient.methodDispatcher(method);
  _dispatchResponse(method, dispatchState, requestArgs, res, items);

  if (state.requestArgs.newSearch && res) {
    dispatchState({ loading: false, type: "setIsLoading" });
  }
}

export { handleImgurServiceRequests };
