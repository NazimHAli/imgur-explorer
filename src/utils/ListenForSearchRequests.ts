import { ImgurAPI } from "@/services/imgurAPI";
import {
  dispatchIsLoading,
  dispatchItems,
  dispatchSelectedItemComments,
  dispatchTags,
  useStore,
} from "@/state/ZuState";
import { useEffect } from "react";
import shallow from "zustand/shallow";

function ListenForSearchRequests(): void {
  const { requestArgs } = useStore(
    (state) => ({ requestArgs: state.requestArgs }),
    shallow
  );

  useEffect(() => {
    const method = requestArgs.method;
    if (method.length === 0) {
      console.log("useEffect - API: empty method.");
      return;
    }

    if (method === "search" && requestArgs.newSearch) {
      scrollTo({ behavior: "smooth", top: 0 });
      dispatchIsLoading(true);
    }

    const imgurClient = ImgurAPI.getInstance(requestArgs);

    imgurClient
      .methodDispatcher(method)
      .then((response) => {
        if (method === "comments") {
          dispatchSelectedItemComments(response);
        } else if (method === "search") {
          dispatchItems(response);
        } else if (method === "tags") {
          dispatchTags(response);
        } else if (method === "tagName") {
          dispatchItems(response?.items);
        }
      })
      .finally(() => {
        dispatchIsLoading(false);
      });
  }, [
    requestArgs.method,
    requestArgs.query,
    requestArgs.page,
    requestArgs.sort,
    requestArgs.window,
    requestArgs.tagName,
  ]);
}

export { ListenForSearchRequests };
