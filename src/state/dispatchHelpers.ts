import { useStore } from "@/state/ZuState";
import {
  extractImageResults,
  filterTags,
  getSelectedItem,
} from "@/utils/dataUtils";

import { initialState } from "./initialState";

const dispatchIdxsToLoad = (newIdxsToLoad) =>
  useStore.setState(() => ({
    idxsToLoad: newIdxsToLoad,
  }));

const dispatchIsLoading = (isLoading) =>
  useStore.setState(() => ({
    isLoading: isLoading,
  }));

const dispatchFinishedLazyLoading = (isFinished) =>
  useStore.setState(() => ({
    finishedLazyLoading: isFinished,
  }));

const dispatchItems = (response) =>
  useStore.setState((state) => ({
    items: state.requestArgs.newSearch
      ? extractImageResults(response)
      : state.items.concat(extractImageResults(response)),
  }));

function updatedRequestState(currentState, newArgs) {
  let theState;
  const newSearch = newArgs?.newSearch;

  if (newSearch) {
    theState = {
      ...initialState,
      galleryTags: currentState.galleryTags,
      requestArgs: { ...currentState.requestArgs, ...newArgs },
    };
  } else {
    theState = {
      finishedLazyLoading: newSearch ? false : currentState.finishedLazyLoading,
      idxsToLoad: newSearch ? initialState.idxsToLoad : currentState.idxsToLoad,
      requestArgs: newSearch
        ? { ...initialState.requestArgs, ...newArgs }
        : { ...currentState.requestArgs, ...newArgs },
    };
  }

  return theState;
}

const dispatchRequestArgs = (newArgs) => {
  useStore.setState((currentState) =>
    updatedRequestState(currentState, newArgs)
  );
};

const dispatchTags = (response) =>
  useStore.setState((state) => ({
    galleryTags: {
      ...response,
      tags: state.requestArgs.newSearch
        ? filterTags(response?.tags)
        : state.galleryTags.tags.concat(filterTags(response?.tags)),
    },
  }));

const dispatchSelectedItem = (response) =>
  useStore.setState((state) => ({
    requestArgs: { ...state.requestArgs, method: "" },
    selectedItem: getSelectedItem(
      state.requestArgs.selectedItemID,
      state.items
    ),
    selectedItemComments: response,
  }));

const dispatchClearSelectedItem = () =>
  useStore.setState((state) => ({
    requestArgs: { ...state.requestArgs, method: "", selectedItemID: "" },
    selectedItem: {},
    selectedItemComments: [],
  }));

export {
  dispatchClearSelectedItem,
  dispatchFinishedLazyLoading,
  dispatchIdxsToLoad,
  dispatchIsLoading,
  dispatchItems,
  dispatchRequestArgs,
  dispatchSelectedItem,
  dispatchTags,
};
