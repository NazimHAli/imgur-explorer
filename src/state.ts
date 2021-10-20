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
  let updatedArgs = {
    ...state.requestArgs,
  };

  switch (action.type) {
    case "setIsLoading":
      return {
        ...state,
        isLoading:
          action?.loading !== undefined ? action.loading : state.isLoading,
      };

    case "setItems":
      return {
        ...state,
        items: action?.items ? action.items : state.items,
        finishedLazyLoading: action?.finishedLazyLoading
          ? true
          : state.finishedLazyLoading,
      };

    case "setTagName":
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

    case "setTags":
      return {
        ...state,
        galleryTags: action?.galleryTags || {},
        items: action?.items?.length ? action.items : state.items,
      };

    case "requestError":
      return {
        ...state,
        requestError: true,
        items: [],
      };

    case "submitSearchRequest":
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

    default:
      return state;
  }
}

export { initialState, stateReducer };
