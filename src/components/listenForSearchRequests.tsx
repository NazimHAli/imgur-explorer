import { ImgurAPI } from "@/services/imgurAPI";
import { handleRespose } from "@/state/ContextHelpers";
import {
  filterNewResults,
  filterTags,
  getSelectedItem,
} from "@/utils/dataUtils";
import { TypeGlobalContext, TypeState } from "@/utils/types";
import { useEffect } from "react";

function updateCommentState(
  setState: TypeGlobalContext["setState"],
  state: TypeState
) {
  setState({
    ...state,
    requestArgs: { ...state.requestArgs, method: "" },
    selectedItem: getSelectedItem(
      state.requestArgs.selectedItemID,
      state.items
    ),
  });
}

function listenForSearchRequests(
  state: TypeState,
  setIsLoading: TypeGlobalContext["setIsLoading"],
  setState: TypeGlobalContext["setState"]
) {
  useEffect(() => {
    const method = state.requestArgs.method;
    if (state.requestArgs.method === "search" && state.requestArgs.newSearch) {
      scrollTo({ behavior: "smooth", top: 0 });
      setIsLoading(true);
    }

    if (method.length > 0) {
      const imgurClient = ImgurAPI.getInstance(state.requestArgs);
      imgurClient
        .methodDispatcher(method)
        .then((response) => {
          if (method === "comments") {
            updateCommentState(setState, state);
          } else if (method === "search") {
            response = filterNewResults(response, state);
          } else if (method === "tags") {
            response = { ...response, tags: filterTags(response?.tags) };
          } else if (method === "tagName") {
            response = filterNewResults(response.items, state);
          }

          handleRespose(method, setState, response);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [
    state.requestArgs.method,
    state.requestArgs.query,
    state.requestArgs.page,
    state.requestArgs.sort,
    state.requestArgs.window,
    state.requestArgs.tagName,
  ]);
}

export { listenForSearchRequests };
