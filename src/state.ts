export type Item = {
  id: string;
  account_url: string;
  images: Array<{ link: string; width: string; height: string }>;
  ups: number;
  downs: number;
  favorite_count: number;
  comment_count: number;
  title: string;
};

export type State = {
  isLoading: boolean;
  requestError: boolean;
  items: Array<Item>;
  tagObject: { galleries?: [] };
  requestArgs: {
    filter: boolean;
    newSearch?: boolean;
    page: number;
    query: string;
    sort: string;
    window: string;
  };
};

export type Action = {
  type: string | null;
  loading?: State["isLoading"];
  items?: State["items"];
  query?: State["requestArgs"]["query"];
  requestError?: boolean;
  sort?: State["requestArgs"]["sort"];
  tagObject?: State["tagObject"];
  window?: State["requestArgs"]["window"];
};

const initialState: State = {
  isLoading: true,
  requestError: false,
  items: [],
  requestArgs: {
    filter: true,
    newSearch: true,
    page: 1,
    query: "meow",
    sort: "viral",
    window: "all",
  },
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
