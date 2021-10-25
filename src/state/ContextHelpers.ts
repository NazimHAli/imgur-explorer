import { extractImageResults } from "@/utils/dataUtils";
import { Item } from "@/utils/types";

function addItems(setState, items: Item[]): void {
  setState((currentState) => {
    items = currentState.requestArgs.filter
      ? extractImageResults(items)
      : items;

    return {
      ...currentState,
      items: currentState.requestArgs.newSearch
        ? items
        : currentState.items.concat(items),
    };
  });
}

function addTags(setState, response): void {
  setState((currentState) => {
    return { ...currentState, galleryTags: response };
  });
}

function addComments(setState, response): void {
  setState((currentState) => {
    return { ...currentState, selectedItemComments: response };
  });
}

function handleRespose(method, setState, response): void {
  if (method === "search") {
    addItems(setState, response);
  } else if (method === "tags") {
    addTags(setState, response);
  } else if (method === "comments") {
    addComments(setState, response);
  }
}

export { addItems, handleRespose };
