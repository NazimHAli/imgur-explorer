export type Item = {
  account_url: string;
  comment_count: number;
  downs: number;
  favorite_count: number;
  id: string;
  images: Array<{ link: string; width: string; height: string }>;
  title: string;
  ups: number;
  views: number;
};

export type State = {
  isLoading: boolean;
  items: Array<Item>;
  requestArgs: {
    filter: boolean;
    newSearch?: boolean;
    page: number;
    query: string;
    sort: string;
    window: string;
  };
  requestError: boolean;
  tagObject: { galleries?: []; tags?: [] };
};

export type Action = {
  items?: State["items"];
  loading?: State["isLoading"];
  query?: State["requestArgs"]["query"];
  requestError?: boolean;
  sort?: State["requestArgs"]["sort"];
  tagObject?: State["tagObject"];
  type: string | null;
  window?: State["requestArgs"]["window"];
};

const initialState: State = {
  isLoading: true,
  items: [],
  requestArgs: {
    filter: true,
    newSearch: true,
    page: 1,
    query: "meow",
    sort: "viral",
    window: "all",
  },
  requestError: false,
  tagObject: {},
};

/**
 * The reducer function updates the state
 * based on dispatched events
 *
 * It's used by the shared state
 *
 * @param state
 * @param action
 * @returns
 */
function stateReducer(state: State, action: Action): State {
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

    case "setTags":
      return {
        ...state,
        tagObject: action?.tagObject || {},
      };

    case "requestError":
      return {
        ...state,
        requestError: true,
        items: [],
      };

    case "submitSearchRequest":
      let updatedArgs = {
        ...state.requestArgs,
      };

      if (action?.query) {
        updatedArgs = { ...updatedArgs, query: action.query };
      }

      if (action?.sort) {
        updatedArgs = { ...updatedArgs, sort: action.sort };
      }

      if (action?.window) {
        updatedArgs = { ...updatedArgs, window: action.window };
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
