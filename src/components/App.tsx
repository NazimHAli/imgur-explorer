import { lazy, Suspense, useEffect, useReducer } from "react";
import { initialState, stateReducer } from "../state";

const Gallery = lazy(() => import("@/components/Gallery"));
const Header = lazy(() => import("@/components/Header"));
const LoadingAnimation = lazy(() => import("@/components/LoadingAnimation"));
const NoResults = lazy(() => import("@/components/NoResults"));
const Footer = lazy(() => import("@/components/Footer"));

function App() {
  const [state, dispatchState] = useReducer(stateReducer, initialState);

  /**
   * Dynamically imports the the imgur API class
   * - Constructs search arguments
   * - Dispatches event to update state.items
   *
   * @param args
   */

  const getData = handleGetData(dispatchState, state);

  /**
   * On mounted get initial results
   */

  useEffect(() => {
    dispatchState({ type: "setIsLoading", loading: true });

    if (!state.items.length) {
      getData({ query: "hello" });
    }

    // Simulate slow load
    setTimeout(() => {
      dispatchState({ type: "setIsLoading", loading: false });
    }, 1000);
  }, []);

  /**
   * Submit search request for new queries
   */

  useEffect(() => {
    if (state.requestArgs.query.length) {
      getData();
    }
  }, [state.requestArgs.query]);

  return (
    <Suspense fallback={<span></span>}>
      <Header dispatchState={dispatchState} />
      {state.isLoading && <LoadingAnimation />}
      {!state.isLoading && state.items.length > 0 && (
        <Gallery images={state.items} />
      )}
      {!state.items.length && !state.isLoading && <NoResults />}
      <Footer />
    </Suspense>
  );
}

export default App;

function handleGetData(dispatchState, state) {
  return (args = {} as any) => {
    dispatchState({ type: "setIsLoading", loading: true });

    import("@/services/imgurAPI").then(async (mod) => {
      const imgurClient = mod.ImgurAPI.getInstance();
      const filter = args.filter || state.requestArgs.filter;
      const page = args.page || state.requestArgs.page;
      const query = args.query || state.requestArgs.query;
      const sort = args.sort || state.requestArgs.sort;
      const newSearch = args.newSearch || state.requestArgs.newSearch;

      await imgurClient
        .submitGallerySearch({
          searchQuery: query,
          pageNumber: page,
          filterImageResults: filter,
          sort: sort,
        })
        .then((response) => {
          dispatchState({
            type: "setItems",
            items: newSearch ? response : state.items.concat(response),
          });
        })
        .finally(() => {
          dispatchState({ type: "setIsLoading", loading: false });
        });
    });
  };
}
