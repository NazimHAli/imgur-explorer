import {
  dispatchFinishedLazyLoading,
  dispatchRequestArgs,
  useStore,
} from "@/state/ZuState";
import { TypeState } from "@/utils/types";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import shallow from "zustand/shallow";

const imgObserver = new ObserveElementsInView();

function HandleImageLazyLoad(
  state: TypeState,
  setidxsToLoad: Dispatch<SetStateAction<number[]>>
) {
  useEffect(() => {
    if (state.requestArgs.newSearch) {
      setidxsToLoad([0, 1, 2, 3, 4]);
    }
  }, [state.requestArgs.newSearch]);

  const cardImgRef = useCallback((node) => {
    if (node !== null) {
      imgObserver.observeElements([node]);
    }
  }, []);
  return cardImgRef;
}

// TODO: Refactor & cleanup the mess
function HandleNewItems(
  isIntersecting: boolean,
  idxsToLoad: number[],
  setidxsToLoad: Dispatch<SetStateAction<number[]>>
): void {
  const { finishedLazyLoading, items, page } = useStore(
    (state) => ({
      finishedLazyLoading: state.finishedLazyLoading,
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

      // Set request args to get the next page of results
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
        setidxsToLoad(newIdxs);
      } else {
        dispatchFinishedLazyLoading(true);
      }
    }
  }, [isIntersecting]);
}

export { HandleNewItems, HandleImageLazyLoad };
