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
        items: action?.items?.length ? action.items : state.items,
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
      updatedArgs = {
        ...updatedArgs,
        tagName: "",
      };

      if (action?.page) {
        updatedArgs = { ...updatedArgs, page: action.page };
      }

      if (action?.query) {
        updatedArgs = { ...updatedArgs, query: action.query };
      }

      if (action?.sort) {
        updatedArgs = { ...updatedArgs, sort: action.sort };
      }

      if (action?.window) {
        updatedArgs = { ...updatedArgs, window: action.window };
      }

      if (action.newSearch !== undefined) {
        updatedArgs = { ...updatedArgs, newSearch: action.newSearch };
      }

      return {
        ...state,
        requestArgs: updatedArgs,
      };

    default:
      return state;
  }
}

export { initialState, stateReducer };
