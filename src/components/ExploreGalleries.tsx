import { State, TypeGallery } from "@/types";
import "@/styles/component/explore-galleries.scss";

function renderGallery(galleryTags: State["galleryTags"]): JSX.Element {
  return (
    <ul className="container mx-auto grid grid-cols-2 gap-1 md:grid-cols-4">
      {Array.from(galleryTags?.galleries ? galleryTags.galleries : []).map(
        (gallery: TypeGallery) => (
          <li key={gallery?.id} className="explore-galleries__list_item">
            <h3>{gallery?.name}</h3>
            <p>{gallery?.description}</p>
          </li>
        )
      )}
    </ul>
  );
}

function ExploreGalleries(props: { galleryTags: State["galleryTags"] }) {
  const { galleryTags } = props;

  return (
    <>
      <h2>Explore Galleries</h2>
      {renderGallery(galleryTags)}
    </>
  );
}

export default ExploreGalleries;
