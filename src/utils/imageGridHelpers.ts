import { useGlobalContext } from "@/state/GlobalContext";
import { TypeState } from "@/utils/types";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

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
  const { setRequestArgs, setState, state } = useGlobalContext();

  useEffect(() => {
    const checkForNewItems =
      isIntersecting &&
      !state.finishedLazyLoading &&
      idxsToLoad.length < state.items.length;

    if (checkForNewItems) {
      const newIdxs = [...Array(idxsToLoad.length + 10).keys()];

      if (state.items.length - newIdxs.length <= 20) {
        setRequestArgs({
          filter: true,
          method: "search",
          newSearch: false,
          page: (state.requestArgs?.page || 0) + 1,
        });
      }

      if (newIdxs.length <= state.items.length) {
        setidxsToLoad(newIdxs);
      } else {
        setState({ ...state, finishedLazyLoading: true });
      }
    }
  }, [isIntersecting]);
}

export { HandleNewItems, HandleImageLazyLoad };
