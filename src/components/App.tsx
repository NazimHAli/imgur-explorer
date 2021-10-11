import { lazy, Suspense, useEffect, useReducer } from "react";
import { initialState, stateReducer } from "@/state";
import { handleServiceRequests } from "@/services/imgurAPI";

const Gallery = lazy(() => import("@/components/Gallery"));
const Header = lazy(() => import("@/components/Header"));
const LoadingAnimation = lazy(() => import("@/components/LoadingAnimation"));
const NoResults = lazy(() => import("@/components/NoResults"));
const Footer = lazy(() => import("@/components/Footer"));
const SearchToolBar = lazy(() => import("@/components/SearchToolBar"));
const ExploreGalleries = lazy(() => import("@/components/ExploreGalleries"));

function App() {
  const [state, dispatchState] = useReducer(stateReducer, initialState);

  /**
   * Submit search request for new queries
   *
   * On mounted will get initial results
   */

  useEffect(() => {
    if (state.requestArgs.query.length) {
      handleServiceRequests(dispatchState, state);
    }
  }, [
    state.requestArgs.query,
    state.requestArgs.sort,
    state.requestArgs.window,
  ]);

  useEffect(() => {
    if (Object.keys(state.tagObject).length === 0) {
      handleServiceRequests(dispatchState, state, "tags");
    }
  }, []);

  return (
    <Suspense fallback={<span></span>}>
      <Header
        dispatchState={dispatchState}
        defaultQuery={state.requestArgs.query}
      />
      <ExploreGalleries tagObject={state.tagObject} />
      <SearchToolBar dispatchState={dispatchState} state={state} />
      {state.isLoading && <LoadingAnimation />}
      {!state.isLoading && state.items.length > 0 && (
        <Gallery items={state.items} />
      )}
      {!state.items.length && !state.isLoading && <NoResults />}
      <Footer />
    </Suspense>
  );
}

export default App;
