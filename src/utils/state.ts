import { getSelectedItem } from "@/utils/dataUtils";
import { State, Action } from "@/utils/types";

const initialState = {
  finishedLazyLoading: false,
  galleryTags: {},
  isLoading: false,
  items: [],
  requestArgs: {
    filter: true,
    method: "search",
    newSearch: true,
    page: 1,
    query: "meow",
    selectedItemID: "",
    sort: "viral",
    tagName: "",
    window: "all",
  },
  requestError: false,
  selectedItem: {},
  selectedItemComments: [],
  selectedTag: {},
};

function setItems(state: State, action: Action): State {
  return {
    ...state,
    finishedLazyLoading: action?.finishedLazyLoading
      ? true
      : state.finishedLazyLoading,
    items: action?.items ? action.items : state.items,
  };
}

function setTagName(
  updatedArgs: State["requestArgs"],
  action: Action,
  state: State
) {
  updatedArgs = {
    ...updatedArgs,
    newSearch: true,
    page: 1,
    query: "",
    tagName: action?.tagName ? action.tagName : "",
  };
  return {
    ...state,
    finishedLazyLoading: false,
    requestArgs: updatedArgs,
  };
}

function setTags(state: State, action: Action): State {
  return {
    ...state,
    galleryTags: action?.galleryTags || {},
    items: action?.items?.length ? action.items : state.items,
  };
}

function setSelectedItemComments(state: State, action: Action): State {
  return {
    ...state,
    requestArgs: {
      ...state["requestArgs"],
      filter: false,
      method: "",
      selectedItemID: "",
    },
    selectedItem: getSelectedItem(
      state.requestArgs.selectedItemID,
      state.items
    ),
    selectedItemComments: action.selectedItemComments || [],
  };
}

function setSearchRequestArgs(state: State, action: Action): State {
  return {
    ...state,
    requestArgs: {
      ...state["requestArgs"],
      ...action.requestArgs,
    },
  };
}

function setRequestError(state: State): State {
  return {
    ...state,
    items: [],
    requestError: true,
  };
}

function setIsLoading(state: State, action: Action): State {
  return {
    ...state,
    isLoading: action?.loading !== undefined ? action.loading : state.isLoading,
  };
}

function submitSearchRequest(
  updatedArgs: State["requestArgs"],
  action: Action,
  state: State
) {
  const doneLoading = action.newSearch ? false : state.finishedLazyLoading;

  updatedArgs = {
    ...updatedArgs,
    ...action,
    tagName: "",
  };

  return {
    ...state,
    finishedLazyLoading: doneLoading,
    requestArgs: updatedArgs,
  };
}

/**
 * The reducer function updates the state
 * based on dispatched events
 *
 * It's used by the shared state
 *
 * TODO: Replace/refactor with better state management
 *
 * @param state
 * @param action
 */
function stateReducer(state: State, action: Action): State {
  const updatedArgs = {
    ...state.requestArgs,
  };

  switch (action.type) {
    case "setIsLoading":
      return setIsLoading(state, action);

    case "setItems":
      return setItems(state, action);

    case "selectedItemComments":
      return setSelectedItemComments(state, action);

    case "setSearchRequestArgs":
      return setSearchRequestArgs(state, action);

    case "setTagName":
      return setTagName(updatedArgs, action, state);

    case "setTags":
      return setTags(state, action);

    case "requestError":
      return setRequestError(state);

    case "submitSearchRequest":
      return submitSearchRequest(updatedArgs, action, state);

    default:
      return state;
  }
}

export { initialState, stateReducer };
