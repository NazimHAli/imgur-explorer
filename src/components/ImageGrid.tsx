import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { lazy, useCallback } from "react";
import { State } from "@/types";

const ImageGridCard = lazy(() => import("@/components/ImageGridCard"));

const imgObserver = new ObserveElementsInView();

/**
 * Gallery component that renders images
 *
 * A callback is passed to each card and used
 * by the IntersectionObserver to load images
 * after they appear in the viewport
 *
 * @returns
 */

function ImageGrid(props: { items: State["items"] }): JSX.Element {
  const { items } = props;

  const cardImgRef = useCallback((node) => {
    if (node !== null) {
      imgObserver.observeElements([node]);
    }
  }, []);

  return (
    <div className="image-grid">
      {Array.from(items).map(
        (image): JSX.Element => (
          <ImageGridCard item={image} key={image.id} imgRef={cardImgRef} />
        )
      )}
    </div>
  );
}

export default ImageGrid;
