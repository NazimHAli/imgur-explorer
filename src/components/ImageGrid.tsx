import { useGlobalContext } from "@/state/GlobalContext";
import { HandleNewItems, HandleImageLazyLoad } from "@/utils/imageGridHelpers";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { lazy, useEffect, useRef, useState } from "react";

const ItemModal = lazy(() => import("@/components/ItemModal"));
const ImageGridCard = lazy(() => import("@/components/ImageGridCard"));

export const imgObserver = new ObserveElementsInView();

function ImageGrid(): JSX.Element {
  const { setRequestArgs, state, isLoading } = useGlobalContext();
  const [idxsToLoad, setidxsToLoad] = useState([0, 1, 2, 3, 4]);

  const cardImgRef = HandleImageLazyLoad(state, setidxsToLoad);
  const elementObserverRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(elementObserverRef);
  const isIntersecting = entry?.isIntersecting || false;

  HandleNewItems(
    isIntersecting,
    idxsToLoad,
    state,
    setRequestArgs,
    setidxsToLoad
  );

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (state.requestArgs.selectedItemID.length) {
      setIsOpen(true);
    }
  }, [state.requestArgs.selectedItemID]);

  return (
    <div className="grid-viewport">
      <ItemModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedItem={state.selectedItem}
        selectedItemComments={state.selectedItemComments}
      />

      <div className="image-grid">
        {idxsToLoad.map(
          (idx) =>
            state.items[idx] && (
              <ImageGridCard
                item={state.items[idx]}
                key={`${idx || "0"}-${state.items[idx].id}`}
                imgRef={cardImgRef}
                setRequestArgs={setRequestArgs}
              />
            )
        )}
      </div>

      <span ref={elementObserverRef} className="block w-px h-px"></span>
    </div>
  );
}

export default ImageGrid;
