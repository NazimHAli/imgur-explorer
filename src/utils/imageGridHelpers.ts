import { imgObserver } from "@/components/ImageGrid";
import { initialState } from "@/state";
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

// TODO: Refactor & cleanup the mess
function HandleNewItems(
  isIntersecting: boolean,
  idxsToLoad: number[],
  state: typeof initialState,
  dispatchState: Dispatch<Action>,
  setidxsToLoad: Dispatch<SetStateAction<number[]>>
): void {
  useEffect(() => {
    const checkForNewItems =
      isIntersecting &&
      !state.finishedLazyLoading &&
      idxsToLoad.length < state.items.length;

    if (checkForNewItems) {
      const newIdxs = [...Array(idxsToLoad.length + 10).keys()];

      if (state.items.length - newIdxs.length <= 20) {
        dispatchState({
          newSearch: false,
          page: (state.requestArgs?.page || 0) + 1,
          type: "submitSearchRequest",
        });
      }

      if (newIdxs.length <= state.items.length) {
        setidxsToLoad(newIdxs);
      } else {
        dispatchState({ finishedLazyLoading: true, type: "setItems" });
      }
    }
  }, [isIntersecting]);
}

export { HandleNewItems, HandleImageLazyLoad };
