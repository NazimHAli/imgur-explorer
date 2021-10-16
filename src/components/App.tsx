import { handleImgurServiceRequests } from "@/services/handleImgurServiceRequests";
import { initialState, stateReducer } from "@/state";
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
    if (state.requestArgs.tagName.length) {
      handleImgurServiceRequests(dispatchState, state, "tagName");
    } else if (state.requestArgs.query.length) {
      handleImgurServiceRequests(dispatchState, state);
    }
  }, [state.requestArgs]);

  useEffect(() => {
    if (Object.keys(state.galleryTags).length === 0) {
      handleImgurServiceRequests(dispatchState, state, "tags");
    }
  }, []);

  return (
    <Suspense fallback={<span></span>}>
      <Header
        dispatchState={dispatchState}
        defaultQuery={state.requestArgs.query}
      />
      <Explore dispatchState={dispatchState} galleryTags={state.galleryTags} />
      <SearchToolBar dispatchState={dispatchState} state={state} />

      {/* Loading */}
      {state.isLoading && (
        <>
          <LoadingAnimation />
          <div className="full-vh" />
        </>
      )}

      {/* Render results */}
      {state.items.length > 0 && <ImageGrid items={state.items} />}

      {/* No results */}
      {state.items.length === 0 && !state.isLoading && <ImageGridNoResults />}
      <Footer />
    </Suspense>
  );
}

export default App;
