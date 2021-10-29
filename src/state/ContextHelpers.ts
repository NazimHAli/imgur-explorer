import { TypeGlobalContext, TypeItem, TypeState } from "@/utils/types";

function addItems(
  setState: TypeGlobalContext["setState"],
  items: TypeItem[]
): void {
  setState((currentState) => {
    return {
      ...currentState,
      items: items,
    };
  });
}

function addTags(
  setState: TypeGlobalContext["setState"],
  response: TypeState["galleryTags"]
): void {
  setState((currentState) => {
    return { ...currentState, galleryTags: response };
  });
}

function addComments(
  setState: TypeGlobalContext["setState"],
  response: TypeState["selectedItemComments"]
): void {
  setState((currentState) => {
    return { ...currentState, selectedItemComments: response };
  });
}

function handleRespose(
  method: string,
  setState: TypeGlobalContext["setState"],
  response: any
): void {
  if (method === "search" || method === "tagName") {
    addItems(setState, response);
  } else if (method === "tags") {
    addTags(setState, response);
  } else if (method === "comments") {
    addComments(setState, response);
  }
}

export { addItems, handleRespose };
