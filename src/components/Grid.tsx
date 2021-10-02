import React from "react";

import { Alert, Box, Container } from "@mui/material";
import { intersectionObserverHook } from "../hooks/intersectionObserverHook";
import { fetchDataHook } from "../hooks/fetchDataHook";

const CardSkeleton = React.lazy(() => import("./CardSkeleton"));
const GridSearchSort = React.lazy(() => import("./GridSearchSort"));
const Header = React.lazy(() => import("./Header"));

let lazyLoadImg;
import("../utils/visibilityUtils").then((mod) => {
  lazyLoadImg = new mod.LazyLoadImages();
});

function Grid() {
  let data = fetchDataHook("meow", 1, true);

  const [state, setState] = React.useState({
    hasNextPage: false,
    isInterSecting: false,
    isNextPageLoading: false,
    nextIdx: 0,
    numItemsPerRequest: 12,
    stopLazyLoading: false,
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
      document.scrollingElement.scrollTop += 400;
      setState(() => ({ ...state, nextIdx: futureIdx }));
    } else if (futureIdx >= data?.length) {
      setState(() => ({ ...state, stopLazyLoading: true }));
    }
  }, [isIOelementVisible]);

  const isItemLoaded = (index) => !state.hasNextPage || index < data.length;

  React.useEffect(() => {
    if (data !== null) {
      setState(() => ({
        ...state,
        nextIdx: state.nextIdx + state.numItemsPerRequest,
      }));
    }
  }, [data]);

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
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            my: 2,
          }}
        >
          <GridSearchSort />
        </Box>
        <Box className="container-img">
          {Array.from(
            data ? data.slice(0, state.nextIdx + state.numItemsPerRequest) : []
          ).map((image: any, imgIdx) => (
            <RenderCard key={imgIdx} item={image} index={imgIdx} />
          ))}
        </Box>
        {!state.stopLazyLoading && (
          <Box ref={ioElementRef} style={{ width: "100%", height: "20px" }}>
            bottom
          </Box>
        )}
      </Container>
    </>
  );

  function _handleNoResults(): any {
    let content;

    if (state.isNextPageLoading) {
      content = <p>...</p>;
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

export default Grid;
