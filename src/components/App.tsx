import React from "react";

import { Alert } from "@mui/material";
import { intersectionObserverHook } from "../hooks/intersectionObserverHook";
import { LazyLoadImages } from "../utils/visibilityUtils";

const BaseContent = React.lazy(() => import("./BaseContent"));
const CardSkeleton = React.lazy(() => import("./CardSkeleton"));

let lazyLoadImg = new LazyLoadImages();

function App() {
  const [data, setData] = React.useState(null);
  const [showLoading, setShowLoading] = React.useState(true);
  const [state, setState] = React.useState({
    hasNextPage: false,
    isInterSecting: false,
    isNextPageLoading: false,
    nextIdx: 0,
    numItemsPerRequest: 12,
    stopLazyLoading: false,
    requestArgs: {
      filter: true,
      newSearch: true,
      page: 1,
      query: "meow",
      sort: "viral",
    },
  });

  const ioElementRef = React.useRef();

  const isIOelementVisible = intersectionObserverHook(
    ioElementRef,
    {
      threshold: 0,
    },
    false
  );

  React.useEffect(() => {
    const futureIdx = state.nextIdx + state.numItemsPerRequest;
    const loadMore =
      ((isIOelementVisible && data) || state.nextIdx === futureIdx) &&
      futureIdx < data?.length;

    if (loadMore) {
      setState(() => ({ ...state, nextIdx: futureIdx }));
    } else if (futureIdx >= data?.length) {
      setState(() => ({ ...state, stopLazyLoading: true }));
    }
  }, [isIOelementVisible]);

  const isItemLoaded = (index) => !state.hasNextPage || index < data.length;
  const submitSearchRequest = (args: typeof state["requestArgs"]) => {
    setShowLoading(true);
    import("../services/imgurAPI").then((mod) => {
      const imgurClient = mod.ImgurAPI.getInstance();

      const filter = args.filter || state.requestArgs.filter;
      const page = args.page || state.requestArgs.page;
      const query = args.query || state.requestArgs.query;
      const sort = args.sort || state.requestArgs.sort;

      imgurClient
        .submitGallerySearch({
          searchQuery: query,
          pageNumber: page,
          filterImageResults: filter,
          sort: sort,
        })
        .then((res) => {
          setData(state.requestArgs.newSearch ? res : data.concat(res));
          setState(() => ({
            ...state,
            requestArgs: {
              filter: filter,
              newSearch: true,
              page: page,
              query: query,
              sort: sort,
            },
            nextIdx: state.nextIdx + state.numItemsPerRequest,
          }));
          setShowLoading(false);
        });
    });
  };

  React.useEffect(() => {
    submitSearchRequest(state.requestArgs);
  }, []);

  const imageRef = React.useCallback((node) => {
    if (node !== null && !node.observed && !node.style.opacity) {
      lazyLoadImg.observeElements([node]);
    }
  }, []);

  const RenderCard = ({ item, index }) => {
    if (!isItemLoaded(index)) {
      return _handleNoResults();
    }

    return <CardSkeleton key={`${index}`} cRef={imageRef} item={item} />;
  };

  return (
    <>
      <BaseContent
        showLoading={showLoading}
        state={state}
        submitSearchRequest={submitSearchRequest}
        data={data}
        RenderCard={RenderCard}
        ioElementRef={ioElementRef}
      />
    </>
  );

  function _handleNoResults(): any {
    let content;

    if (state.isNextPageLoading) {
      content = <p></p>;
    } else {
      content = (
        <Alert
          variant="filled"
          severity="info"
          sx={{ mx: "auto", maxWidth: 500 }}
        >
          No search results found :(
        </Alert>
      );
    }

    return content;
  }
}

export default App;
