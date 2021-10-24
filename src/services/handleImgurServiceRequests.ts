import { ImgurAPI } from "@/services/imgurAPI";
import { extractImageResults, filterTags } from "@/utils/dataUtils";
import { Action, State } from "@/utils/types";
import { Dispatch } from "react";

function _dispatchResponse(
  dispatchState: Dispatch<Action>,
  requestArgs: State["requestArgs"],
  response,
  items: State["items"]
): void {
  const method = requestArgs.method;

  if (!method) {
    throw new Error("Method not provided");
  }

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
      galleryTags: {
        galleries: response.galleries,
        tags: filterTags(response.tags),
      },
      requestError: false,
      type: "setTags",
    });
  } else if (method === "tagName") {
    dispatchState({
      items: extractImageResults(response.items),
      requestError: false,
      type: "setItems",
    });
  } else if (method === "search") {
    response = requestArgs.filter ? extractImageResults(response) : response;

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
function handleImgurServiceRequests(
  dispatchState: Dispatch<Action>,
  state: State
): void {
  const { items, requestArgs } = state;

  if (requestArgs.method === "search" && requestArgs.newSearch) {
    scrollTo({ behavior: "smooth", top: 0 });
    dispatchState({ loading: true, type: "setIsLoading" });
  }

  const imgurClient = ImgurAPI.getInstance(requestArgs);

  imgurClient
    .methodDispatcher(state.requestArgs.method)
    .then((response) => {
      _dispatchResponse(dispatchState, requestArgs, response, items);
    })
    .catch(() => dispatchState({ type: "requestError" }))
    .finally(() => dispatchState({ loading: false, type: "setIsLoading" }));
}

export { handleImgurServiceRequests };
