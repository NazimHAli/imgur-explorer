import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { lazy, useCallback } from "react";
import { State } from "@/types";

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
    <div className="container mx-auto grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from(items).map(
        (image): JSX.Element => (
          <GalleryCard item={image} key={image.id} imgRef={cardImgRef} />
        )
      )}
    </div>
  );
}

export default Gallery;
