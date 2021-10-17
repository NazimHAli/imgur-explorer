import { State } from "@/types";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { lazy, useCallback, useEffect, useRef, useState } from "react";

const ImageGridCard = lazy(() => import("@/components/ImageGridCard"));

const imgObserver = new ObserveElementsInView();

function ImageGrid(props: { items: State["items"] }): JSX.Element {
  const { items } = props;
  const [idxsToLoad, setidxsToLoad] = useState([0, 1, 2, 3, 4]);
  const cardImgRef = useCallback((node) => {
    if (node !== null) {
      imgObserver.observeElements([node]);
    }
  }, []);
  const offsetY = 0;

  const ioRef = useRef<HTMLDivElement | null>(null);
  const entry = ioHook(ioRef, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible && idxsToLoad.length < items.length) {
      const newIdxs = [
        ...idxsToLoad,
        idxsToLoad.length + 1,
        idxsToLoad.length + 2,
        idxsToLoad.length + 3,
        idxsToLoad.length + 4,
        idxsToLoad.length + 5,
      ];

      if (newIdxs.length <= items.length) {
        setidxsToLoad(newIdxs);
      }
      console.log("Render Section", { isVisible });
    }
    return () => {};
  }, [isVisible]);

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
      <button
        onClick={() => setidxsToLoad([...idxsToLoad, idxsToLoad.length + 1])}
      >
        add more
      </button>
      <span
        ref={ioRef}
        style={{ display: "block", width: "10rem", height: "10rem" }}
      >
        IO Lazyload Observer
      </span>
    </div>
  );
}

export default ImageGrid;
