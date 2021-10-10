import { lazy, Suspense, useEffect, useReducer } from "react";
import { initialState, stateReducer } from "@/state";
import { handleGetData } from "@/services/imgurAPI";

const Gallery = lazy(() => import("@/components/Gallery"));
const Header = lazy(() => import("@/components/Header"));
const LoadingAnimation = lazy(() => import("@/components/LoadingAnimation"));
const NoResults = lazy(() => import("@/components/NoResults"));
const Footer = lazy(() => import("@/components/Footer"));
const Dropdown = lazy(() => import("@/components/Dropdown"));

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
   * Submit search request for new queries
   * On mounted will get initial results
   */

  useEffect(() => {
    if (state.requestArgs.query.length) {
      getData();
    }
  }, [
    state.requestArgs.query,
    state.requestArgs.sort,
    state.requestArgs.window,
  ]);

  return (
    <Suspense fallback={<span></span>}>
      <Header dispatchState={dispatchState} />
      {state.isLoading && <LoadingAnimation />}
      <Dropdown
        actionArg="sort"
        options={["Top", "Viral", "Trending"]}
        dispatchState={dispatchState}
        requestArgs={state.requestArgs}
      />
      <Dropdown
        actionArg="window"
        options={["All", "Day", "Week", "Month", "Year"]}
        dispatchState={dispatchState}
        requestArgs={state.requestArgs}
      />
      {!state.isLoading && state.items.length > 0 && (
        <Gallery items={state.items} />
      )}
      {!state.items.length && !state.isLoading && <NoResults />}
      <Footer />
    </Suspense>
  );
}

export default App;
