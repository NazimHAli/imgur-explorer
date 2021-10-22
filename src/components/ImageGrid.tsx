import { Action, State } from "@/types";
import { getSelectedItem } from "@/utils/dataUtils";
import { HandleNewItems, HandleImageLazyLoad } from "@/utils/imageGridHelpers";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { Dispatch, lazy, useRef, useState } from "react";

import ItemModal from "./ItemModal";

const ImageGridCard = lazy(() => import("@/components/ImageGridCard"));
const LazyLoadingSpinner = lazy(
  () => import("@/components/LazyLoadingSpinner")
);

export const imgObserver = new ObserveElementsInView();

function ImageGrid(props: {
  dispatchState: Dispatch<Action>;
  state: State;
}): JSX.Element {
  const { state, dispatchState } = props;
  const [idxsToLoad, setidxsToLoad] = useState([0, 1, 2, 3, 4]);
  const cardImgRef = HandleImageLazyLoad(state, setidxsToLoad);

  const elementObserverRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(elementObserverRef);
  const isIntersecting = entry?.isIntersecting || false;

  HandleNewItems(
    isIntersecting,
    idxsToLoad,
    state,
    dispatchState,
    setidxsToLoad
  );

  const selectedItem =
    (state.requestArgs.selectedItemID.length > 0 &&
      getSelectedItem(state.requestArgs.selectedItemID, state.items)) ||
    undefined;

  return (
    <div className="grid-viewport">
      {state?.selectedItemComments.length > 0 && (
        <ItemModal
          selectedItem={selectedItem}
          selectedItemComments={state.selectedItemComments}
        />
      )}

      <div className="image-grid">
        {idxsToLoad.map(
          (idx) =>
            state.items[idx] && (
              <ImageGridCard
                item={state.items[idx]}
                key={`${idx || "0"}-${state.items[idx].id}`}
                imgRef={cardImgRef}
                dispatchState={dispatchState}
              />
            )
        )}
      </div>
      {state.isLoading && <LazyLoadingSpinner />}
      <span ref={elementObserverRef} className="block w-px h-px"></span>
    </div>
  );
}

export default ImageGrid;
