import {
  dispatchFinishedLazyLoading,
  dispatchIdxsToLoad,
  dispatchRequestArgs,
  useStore,
} from "@/state/ZuState";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import shallow from "zustand/shallow";

const imgObserver = new ObserveElementsInView();

function HandleImageLazyLoad(
  isNewSearch: boolean,
  setidxsToLoad: Dispatch<SetStateAction<number[]>>
) {
  useEffect(() => {
    if (isNewSearch) {
      setidxsToLoad([0, 1, 2, 3, 4]);
    }
  }, [isNewSearch]);

  const cardImgRef = useCallback((node) => {
    if (node !== null) {
      imgObserver.observeElements([node]);
    }
  }, []);
  return cardImgRef;
}

// TODO: Refactor & cleanup the mess
function HandleNewItems(isIntersecting: boolean): void {
  const { finishedLazyLoading, idxsToLoad, items, page } = useStore(
    (state) => ({
      finishedLazyLoading: state.finishedLazyLoading,
      idxsToLoad: state.idxsToLoad,
      items: state.items,
      page: state.requestArgs.page,
    }),
    shallow
  );

  useEffect(() => {
    const checkForNewItems =
      isIntersecting &&
      !finishedLazyLoading &&
      idxsToLoad.length < items.length;

    if (checkForNewItems) {
      const newIdxs = [...Array(idxsToLoad.length + 10).keys()];

      // Dispatch request to get the next page of results
      if (items.length - newIdxs.length <= 20) {
        dispatchRequestArgs({
          filter: true,
          method: "search",
          newSearch: false,
          page: page + 1,
        });
      }

      // Add new idxs to lazyload
      // TODO: Account for remaining items that are skipped from being lazyloaded
      if (newIdxs.length <= items.length) {
        dispatchIdxsToLoad(newIdxs);
      } else {
        dispatchFinishedLazyLoading(true);
      }
    }
  }, [isIntersecting]);
}

export { HandleNewItems, HandleImageLazyLoad };
