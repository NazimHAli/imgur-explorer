import { imgObserver } from "@/components/ImageGrid";
import { Action, State } from "@/types";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

function HandleImageLazyLoad(
  state: State,
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

function HandleNewItems(
  shouldLoadNewItems: boolean,
  idxsToLoad: number[],
  state: State,
  dispatchState: Dispatch<Action>,
  setidxsToLoad: Dispatch<SetStateAction<number[]>>
): void {
  useEffect(() => {
    if (
      shouldLoadNewItems &&
      !state.finishedLazyLoading &&
      idxsToLoad.length < state.items.length
    ) {
      const newIdxs = [...Array(idxsToLoad.length + 10).keys()];

      if (state.items.length - newIdxs.length <= 20) {
        dispatchState({
          type: "submitSearchRequest",
          page: state.requestArgs.page + 1,
          newSearch: false,
        });
      }

      if (newIdxs.length <= state.items.length) {
        setidxsToLoad(newIdxs);
      } else {
        dispatchState({ type: "setItems", finishedLazyLoading: true });
      }
    }
  }, [shouldLoadNewItems]);
}

export { HandleNewItems, HandleImageLazyLoad };
