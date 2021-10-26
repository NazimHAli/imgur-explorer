import { TypeState, TypeGallery } from "@/utils/types";

function renderGallery(galleryTags: TypeState["galleryTags"]): JSX.Element {
  return (
    <div className="explore__galleries">
      {Array.from(galleryTags?.galleries ? galleryTags.galleries : []).map(
        (gallery: TypeGallery) => (
          <a
            key={gallery?.id}
            className="explore__galleries__item"
            href="#explore"
          >
            <h3>{gallery?.name}</h3>
            <p>{gallery?.description}</p>
          </a>
        )
      )}
    </div>
  );
}

function ExploreGalleries(props: { galleryTags: TypeState["galleryTags"] }) {
  const { galleryTags } = props;

  return (
    <>
      <h2 id="explore" className="explore__title">
        Explore Galleries
      </h2>
      {renderGallery(galleryTags)}
    </>
  );
}

export default ExploreGalleries;
