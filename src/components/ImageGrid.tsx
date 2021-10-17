import { State } from "@/types";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { lazy, useCallback, useEffect, useRef, useState } from "react";

const ImageGridCard = lazy(() => import("@/components/ImageGridCard"));

const imgObserver = new ObserveElementsInView();

function ImageGrid(props: {
  items: State["items"];
  dispatchState;
  requestArgs: State["requestArgs"];
}): JSX.Element {
  const { items, dispatchState, requestArgs } = props;
  const [idxsToLoad, setidxsToLoad] = useState([0, 1, 2, 3, 4]);
  const cardImgRef = useCallback((node) => {
    if (node !== null) {
      imgObserver.observeElements([node]);
    }
  }, []);

  const offsetY = 0;
  const ioRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(ioRef);
  const shouldLoadNewItems = !!entry?.isIntersecting;

  useEffect(() => {
    if (shouldLoadNewItems && idxsToLoad.length < items.length) {
      const newIdxs = [...Array(idxsToLoad.length + 10).keys()];

      if (items.length - newIdxs.length <= 20) {
        dispatchState({
          type: "submitSearchRequest",
          page: requestArgs.page + 1,
          newSearch: false,
        });
        console.log(`Req. p${requestArgs.page + 1} newIdxs: ${newIdxs.length}`);
      }

      if (newIdxs.length <= items.length) {
        setidxsToLoad(newIdxs);
        console.log("Loading items", { shouldLoadNewItems }, newIdxs.length);
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
          transform: `translateY(${offsetY}px)`,
        }}
      >
        {idxsToLoad.map(
          (idx): JSX.Element => (
            <ImageGridCard
              item={items[idx]}
              key={items[idx].id}
              imgRef={cardImgRef}
            />
          )
        )}
      </div>
      <span
        ref={ioRef}
        style={{ display: "block", width: "1px", height: "1px" }}
      ></span>
    </div>
  );
}

export default ImageGrid;
