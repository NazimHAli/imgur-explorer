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
    let method = "";
    if (state.requestArgs?.tagName && state.requestArgs.tagName.length) {
      method = "tagName";
    } else if (
      state.requestArgs.method === "comments" &&
      !state.selectedItemComments.length
    ) {
      method = "comments";
    } else if (
      state.requestArgs.query?.length &&
      state.requestArgs.method === "search"
    ) {
      method = "search";
    }

    if (method) {
      handleImgurServiceRequests(dispatchState, state, method);
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

      {/* Have results */}
      {state.items.length > 0 && (
        <ImageGrid dispatchState={dispatchState} state={state} />
      )}

      {/* No results */}
      {state.items.length === 0 && !state.isLoading && <ImageGridNoResults />}

      {/* Dynamically render footer */}
      <Footer finishedLazyLoading={state.finishedLazyLoading} />
    </Suspense>
  );
}

export default App;
