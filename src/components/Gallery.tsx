import Card from "@/components/Card";
import { ObserveElementsInView } from "@/utils/visibilityUtils";
import { useCallback } from "react";

import "~styles/masonry.scss";

const imgObserver = new ObserveElementsInView();

function imgRefCallback() {
  return useCallback((node) => {
    if (node !== null) {
      imgObserver.observeElements([node]);
    }
  }, []);
}

/**
 * Gallery component that renders items
 *
 * A callback is passed to each card and used
 * by the IntersectionObserver to load images
 * after they appear in the viewport
 *
 * @returns
 */

function Gallery({ state }) {
  const cardImgRef = imgRefCallback();

  return (
    <div className="masonry">
      {Array.from(state.items).map((image: any, imgIdx) => (
        <Card item={image} key={imgIdx} imgRef={cardImgRef} />
      ))}
    </div>
  );
}

export default Gallery;
