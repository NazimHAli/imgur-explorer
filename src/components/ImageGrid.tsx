import { useStore } from "@/state/ZuState";
import { HandleNewItems } from "@/utils/imageGridHelpers";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { lazy, useCallback, useEffect, useRef, useState } from "react";
import shallow from "zustand/shallow";

const ItemModal = lazy(() => import("@/components/ItemModal"));
const ImageGridCard = lazy(() => import("@/components/ImageGridCard"));

const imgObserver = new ObserveElementsInView();

function ImageGrid(): JSX.Element {
  const { idxsToLoad, items, isLoading, selectedItemID } = useStore(
    (state) => ({
      idxsToLoad: state.idxsToLoad,
      isLoading: state.isLoading,
      items: state.items,
      selectedItemID: state.requestArgs.selectedItemID,
    }),
    shallow
  );

  const elementObserverRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(elementObserverRef);
  const isIntersecting = entry?.isIntersecting || false;

  HandleNewItems(isIntersecting);

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (selectedItemID.length) {
      setIsOpen(true);
    }
  }, [selectedItemID]);

  const cardImgRef = useCallback((node) => {
    if (node !== null) {
      imgObserver.observeElements([node]);
    }
  }, []);

  return (
    <div className="grid-viewport">
      <ItemModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="image-grid">
        {idxsToLoad.map((idx) => (
          <ImageGridCard
            imgRef={cardImgRef}
            item={items?.length > 0 && items[idx]}
            key={`${idx || "0"}-${items?.length > 0 && items[idx]?.id}`}
            isLoading={isLoading}
          />
        ))}

        <span ref={elementObserverRef} className="block w-px h-px" />
      </div>
    </div>
  );
}

export default ImageGrid;
