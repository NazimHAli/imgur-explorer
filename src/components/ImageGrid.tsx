import { useStore } from "@/state/ZuState";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { lazy, useCallback, useEffect, useState } from "react";

const ItemModal = lazy(() => import("@/components/ItemModal"));
const ImageGridCard = lazy(() => import("@/components/ImageGridCard"));

const imgObserver = new ObserveElementsInView();

function ImageGrid(): JSX.Element {
  const idxsToLoad = useStore((state) => state.idxsToLoad);
  const isLoading = useStore((state) => state.isLoading);
  const items = useStore((state) => state.items);
  const selectedItemID = useStore((state) => state.requestArgs.selectedItemID);

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
      </div>
    </div>
  );
}

export default ImageGrid;
