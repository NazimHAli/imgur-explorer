import { useStore } from "@/state/ZuState";
import { TypeState, TypeGallery } from "@/utils/types";
import shallow from "zustand/shallow";

function renderGallery(
  galleries: TypeState["galleryTags"]["galleries"]
): JSX.Element {
  return (
    <div className="explore__galleries">
      {Array.from(galleries ? galleries : []).map((gallery: TypeGallery) => (
        <a
          key={gallery?.id}
          className="explore__galleries__item"
          href="#explore"
        >
          <h3>{gallery?.name}</h3>
          <p>{gallery?.description}</p>
        </a>
      ))}
    </div>
  );
}

function ExploreGalleries() {
  const { galleryTags } = useStore(
    (state) => ({ galleryTags: state.galleryTags }),
    shallow
  );

  return (
    <>
      <h2 id="explore" className="explore__title">
        Explore Galleries
      </h2>
      {renderGallery(galleryTags?.galleries)}
    </>
  );
}

export default ExploreGalleries;
