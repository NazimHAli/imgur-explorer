import { handleImgurServiceRequests } from "@/services/handleImgurServiceRequests";
import { initialState, stateReducer } from "@/utils/state";
import { lazy, Suspense, useEffect, useReducer } from "react";

const Explore = lazy(() => import("@/components/Explore"));
const Footer = lazy(() => import("@/components/Footer"));
const Header = lazy(() => import("@/components/Header"));
const ImageGrid = lazy(() => import("@/components/ImageGrid"));
const ImageGridNoResults = lazy(
  () => import("@/components/ImageGridNoResults")
);
const LoadingAnimation = lazy(() => import("@/components/LoadingAnimation"));
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
      handleImgurServiceRequests(dispatchState, state);
    }
  }, [state.requestArgs.method]);

  return (
    <Suspense fallback={<span></span>}>
      <Header
        dispatchState={dispatchState}
        defaultQuery={state.requestArgs.query || ""}
        state={state}
      />
      <Explore galleryTags={state.galleryTags} />

      {/* Don't display toolbar for tagName searches */}
      {state.requestArgs.query?.length > 0 && (
        <SearchToolBar dispatchState={dispatchState} state={state} />
      )}

      {/* Loading */}
      {state.isLoading && (
        <>
          <LoadingAnimation />
          <div className="full-vh" />
        </>
      )}

      <ImageGrid dispatchState={dispatchState} state={state} />

      {/* Without results */}
      {state.items.length === 0 && !state.isLoading && <ImageGridNoResults />}

      {/* Dynamically render footer */}
      <Footer finishedLazyLoading={state.finishedLazyLoading} />
    </Suspense>
  );
}

export default App;
