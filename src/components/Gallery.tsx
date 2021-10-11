import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { lazy, useCallback } from "react";
import { State } from "@/state";

import "@/styles/component/gallery.scss";

const GalleryCard = lazy(() => import("@/components/GalleryCard"));

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

function Gallery(props: { items: State["items"] }): JSX.Element {
  const { items } = props;

  const cardImgRef = useCallback((node) => {
    if (node !== null) {
      imgObserver.observeElements([node]);
    }
  }, []);

  return (
    <div className="gallery-container">
      {Array.from(items).map(
        (image): JSX.Element => (
          <GalleryCard item={image} key={image.id} imgRef={cardImgRef} />
        )
      )}
    </div>
  );
}

export default Gallery;
