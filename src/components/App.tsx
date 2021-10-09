import { lazy, Suspense, useEffect, useReducer } from "react";
import { initialState, stateReducer } from "../state";
import { handleGetData } from "@/services/imgurAPI";

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
