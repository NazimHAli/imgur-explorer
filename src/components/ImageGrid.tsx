import { useStore } from "@/state/ZuState";
import { lazy, useEffect, useState } from "react";

const ItemModal = lazy(() => import("@/components/ItemModal"));
const ImageGridCard = lazy(() => import("@/components/ImageGridCard"));

function ImageGrid(): JSX.Element {
  const isLoading = useStore((state) => state.isLoading);
  const items = useStore((state) => state.items);
  const requestArgs = useStore((state) => state.requestArgs);
  const [idxsToLoad, _setidxsToLoad] = useState([0, 1, 2, 3, 4]);

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (requestArgs.selectedItemID.length) {
      setIsOpen(true);
    }
  }, [requestArgs.selectedItemID]);

  return (
    <div className="grid-viewport">
      <ItemModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="image-grid">
        {idxsToLoad.map((idx) => (
          <ImageGridCard
            item={items?.length > 0 && items[idx]}
            key={`${idx || "0"}-${items?.length > 0 && items[idx].id}`}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
