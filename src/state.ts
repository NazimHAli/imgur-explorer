import { State, Action } from "./types";

const initialState: State = {
  isLoading: true,
  finishedLazyLoading: false,
  items: [],
  requestArgs: {
    filter: true,
    newSearch: true,
    page: 1,
    query: "meow",
    sort: "viral",
    tagName: "",
    window: "all",
  },
  requestError: false,
  galleryTags: {},
  selectedTag: {},
};

function setItems(state: State, action: Action): State {
  return {
    ...state,
    items: action?.items ? action.items : state.items,
    finishedLazyLoading: action?.finishedLazyLoading
      ? true
      : state.finishedLazyLoading,
  };
}

function setTagName(
  updatedArgs: State["requestArgs"],
  action: Action,
  state: State
) {
  updatedArgs = {
    ...updatedArgs,
    query: "",
    tagName: action?.tagName ? action.tagName : "",
    page: 1,
    newSearch: true,
  };
  return {
    ...state,
    requestArgs: updatedArgs,
    finishedLazyLoading: false,
  };
}

function setTags(state: State, action: Action): State {
  return {
    ...state,
    galleryTags: action?.galleryTags || {},
    items: action?.items?.length ? action.items : state.items,
  };
}

function setRequestError(state: State): State {
  return {
    ...state,
    requestError: true,
    items: [],
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
  const doneLoading = action?.newSearch ? false : state.finishedLazyLoading;

  updatedArgs = {
    ...updatedArgs,
    ...action,
    tagName: "",
  };

  return {
    ...state,
    requestArgs: updatedArgs,
    finishedLazyLoading: doneLoading,
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
