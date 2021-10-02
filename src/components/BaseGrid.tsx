import React, { useRef, useEffect } from "react";
import InfiniteLoader from "react-window-infinite-loader";

import { Alert, Box, Container } from "@mui/material";
import { BaseGridList } from "./BaseGridList";

const SearchSort = React.lazy(() => import("./SearchSort"));
const BaseCard = React.lazy(() => import("./BaseCard"));

let imgObserver;
import("../utils/visibilityUtils").then((mod) => {
  imgObserver = new mod.ObserveElementsInView();
});

export default function BaseGrid({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
}) {
  const innerListRef = useRef(null);
  const listRef = useRef(null);

  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  const RenderRow = ({ index, style }) => {
    if (!isItemLoaded(index)) {
      let content;

      if (isNextPageLoading) {
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

    const measuredRef = React.useCallback((node) => {
      if (node !== null && !node.style.opacity) {
        imgObserver.observeElements([node]);
      }
    }, []);

    const rowData = items[index];

    return (
      <Container
        maxWidth="lg"
        className={"lazy-row"}
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={style}>
          {Array.from(rowData).map((image: any, imgIdx) => (
            <BaseCard
              key={`${index}-${imgIdx}`}
              item={image}
              cRef={measuredRef}
            />
          ))}
        </div>
      </Container>
    );
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            my: 2,
          }}
        >
          <SearchSort />
        </Box>
      </Container>
      <InfiniteLoader
        ref={listRef}
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) =>
          BaseGridList(itemCount, onItemsRendered, ref, innerListRef, RenderRow)
        }
      </InfiniteLoader>
    </React.Fragment>
  );
}
