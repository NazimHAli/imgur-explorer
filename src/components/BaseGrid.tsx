import React, { useRef, useEffect } from "react";
import InfiniteLoader from "react-window-infinite-loader";

import { BaseGridList } from "./BaseGridList";

const SearchSort = React.lazy(() => import("./SearchSort"));
const BaseCard = React.lazy(() => import("./BaseCard"));

let inObserver;
import("../utils/visibilityUtils").then((mod) => {
  inObserver = new mod.ObserveElementsInView();
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
          <p>No search results found :(</p>
        );
      }

      return content;
    }

    useEffect(() => {
      const elsToObserve = innerListRef.current.querySelectorAll(
        "img.MuiCardMedia-img:not([style*='opacity: 100'])"
      );
      inObserver.observeElements(elsToObserve);
    }, []);

    const rowData = items[index];

    return (
        <div style={style}>
          {Array.from(rowData).map((image: any, imgIdx) => (
            <BaseCard key={`${index}-${imgIdx}`} item={image} />
          ))}
        </div>
    );
  };

  return (
    <React.Fragment>
      <SearchSort />
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
