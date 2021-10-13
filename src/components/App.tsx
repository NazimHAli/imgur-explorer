import { lazy, Suspense, useEffect, useReducer } from "react";
import { initialState, stateReducer } from "@/state";
import { handleServiceRequests } from "@/services/imgurAPI";

const Explore = lazy(() => import("@/components/Explore"));
const Footer = lazy(() => import("@/components/Footer"));
const Gallery = lazy(() => import("@/components/Gallery"));
const GalleryNoResults = lazy(() => import("@/components/GalleryNoResults"));
const Header = lazy(() => import("@/components/Header"));
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
      handleServiceRequests(dispatchState, state, "tagName");
    } else if (state.requestArgs.query.length) {
      handleServiceRequests(dispatchState, state);
    }
  }, [state.requestArgs]);

  useEffect(() => {
    if (Object.keys(state.galleryTags).length === 0) {
      handleServiceRequests(dispatchState, state, "tags");
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
      {!state.isLoading && state.items.length > 0 && (
        <Gallery items={state.items} />
      )}

      {/* No results */}
      {state.items.length === 0 && !state.isLoading && <GalleryNoResults />}
      <Footer />
    </Suspense>
  );
}

export default App;
