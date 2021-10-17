import { Action, State } from "@/types";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import {
  Dispatch,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const ImageGridCard = lazy(() => import("@/components/ImageGridCard"));
const LazyLoadingSpinner = lazy(
  () => import("@/components/LazyLoadingSpinner")
);

const imgObserver = new ObserveElementsInView();

function ImageGrid(props: {
  state: State;
  dispatchState: Dispatch<Action>;
}): JSX.Element {
  const { state, dispatchState } = props;
  const [idxsToLoad, setidxsToLoad] = useState([0, 1, 2, 3, 4]);

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

  const elementObserverRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(elementObserverRef);
  const shouldLoadNewItems = !!entry?.isIntersecting;

  useEffect(() => {
    if (shouldLoadNewItems && idxsToLoad.length < state.items.length) {
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
      }
    }
    return () => {};
  }, [shouldLoadNewItems]);

  return (
    <div className="grid-viewport">
      <div
        className="image-grid"
        style={{
          willChange: "transform",
          transform: "translateY(0px)",
        }}
      >
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
      <span ref={elementObserverRef} className="block w-4 h-4"></span>
    </div>
  );
}

export default ImageGrid;
