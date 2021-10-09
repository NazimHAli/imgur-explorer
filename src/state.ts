const initialState = {
  isLoading: true,
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
function stateReducer(
  state: typeof initialState,
  action: { type: any; loading: any; items: any; query: any }
) {
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
