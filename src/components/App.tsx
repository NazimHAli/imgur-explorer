import { handleImgurServiceRequests } from "@/services/handleImgurServiceRequests";
import { initialState, stateReducer } from "@/utils/state";
import { lazy, Suspense, useEffect, useReducer } from "react";

const Explore = lazy(() => import("@/components/Explore"));
const Footer = lazy(() => import("@/components/Footer"));
const Header = lazy(() => import("@/components/Header"));
const ImageGrid = lazy(() => import("@/components/ImageGrid"));
const SearchToolBar = lazy(() => import("@/components/SearchToolBar"));

function App() {
  const [state, dispatchState] = useReducer(stateReducer, initialState);

  /**
   * Submit search request for new queries
   *
   * On mounted will get initial results
   */

  useEffect(() => {
    if (state.requestArgs.method.length > 0) {
      setTimeout(() => {
        handleImgurServiceRequests(dispatchState, state);
      }, 3000);
    }
  }, [state.requestArgs.method, state.requestArgs.page]);

  return (
    <Suspense fallback={<span></span>}>
      <Header
        dispatchState={dispatchState}
        defaultQuery={state.requestArgs.query || ""}
        state={state}
      />
      <Explore dispatchState={dispatchState} galleryTags={state.galleryTags} />

      {/* Display toolbar for searches with queries */}
      {state.requestArgs.query?.length > 0 && (
        <SearchToolBar dispatchState={dispatchState} state={state} />
      )}

      <ImageGrid dispatchState={dispatchState} state={state} />

      {/* TODO: Investigate why dynamically rendering footer causes full re-render */}
      <Footer />
    </Suspense>
  );
}

export default App;
