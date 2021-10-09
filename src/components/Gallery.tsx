import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { lazy, useCallback } from "react";
import "~styles/masonry.scss";

const Card = lazy(() => import("@/components/Card"));

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

function Gallery({ images }): JSX.Element {
  const cardImgRef = useCallback((node) => {
    if (node !== null) {
      imgObserver.observeElements([node]);
    }
  }, []);

  return (
    <div className="masonry">
      {Array.from(images).map((image: any) => (
        <Card item={image} key={image.id} imgRef={cardImgRef} />
      ))}
    </div>
  );
}

export default Gallery;
