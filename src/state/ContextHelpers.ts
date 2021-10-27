import { TypeItem } from "@/utils/types";

function addItems(setState, items: TypeItem[]): void {
  setState((currentState) => {
    return {
      ...currentState,
      items: items,
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
  if (method === "search" || method === "tagName") {
    addItems(setState, response);
  } else if (method === "tags") {
    addTags(setState, response);
  } else if (method === "comments") {
    addComments(setState, response);
  }
}

export { addItems, handleRespose };