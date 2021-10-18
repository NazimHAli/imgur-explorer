import { Action, State } from "@/types";
import { HandleNewItems, HandleImageLazyLoad } from "@/utils/imageGridHelpers";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { Dispatch, lazy, useRef, useState } from "react";

const ImageGridCard = lazy(() => import("@/components/ImageGridCard"));
const LazyLoadingSpinner = lazy(
  () => import("@/components/LazyLoadingSpinner")
);

export const imgObserver = new ObserveElementsInView();

function ImageGrid(props: {
  state: State;
  dispatchState: Dispatch<Action>;
}): JSX.Element {
  const { state, dispatchState } = props;
  const [idxsToLoad, setidxsToLoad] = useState([0, 1, 2, 3, 4]);

  const cardImgRef = HandleImageLazyLoad(state, setidxsToLoad);

  const elementObserverRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(elementObserverRef);
  const shouldLoadNewItems = !!entry?.isIntersecting;

  HandleNewItems(
    shouldLoadNewItems,
    idxsToLoad,
    state,
    dispatchState,
    setidxsToLoad
  );

  return (
    <div className="grid-viewport">
      <div className="image-grid">
        {idxsToLoad.map(
          (idx) =>
            state.items[idx] && (
              <ImageGridCard
                item={state.items[idx]}
                key={state.items[idx].id}
                imgRef={cardImgRef}
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
