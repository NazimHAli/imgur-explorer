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
  requestArgs: {
    filter?: boolean;
    newSearch?: boolean;
    page?: number;
    query?: string;
    sort?: string;
  };
};

export type Action = {
  type: string | null;
  loading?: State["isLoading"];
  items?: State["items"];
  query?: State["requestArgs"]["query"];
};

const initialState: State = {
  isLoading: true,
  requestError: false,
  items: [],
  requestArgs: {
    filter: true,
    newSearch: true,
    page: 1,
    query: "",
    sort: "viral",
  },
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
function stateReducer(state: State, action: Action) {
  switch (action.type) {
    case "setIsLoading":
      return {
        ...state,
        isLoading: action.loading,
      };

    case "setItems":
      return {
        ...state,
        items: action.items,
      };

    case "submitSearchRequest":
      return {
        ...state,
        requestArgs: {
          ...state.requestArgs,
          query: action.query,
        },
      };

    default:
      return state;
  }
}

export { initialState, stateReducer };
