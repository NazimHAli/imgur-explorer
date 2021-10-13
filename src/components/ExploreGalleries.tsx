import { State } from "@/types";
import "@/styles/component/explore-galleries.scss";

function renderGallery(galleryTags: State["galleryTags"]): JSX.Element {
  return (
    <ul className="explore-galleries__list">
      {Array.from(galleryTags?.galleries ? galleryTags.galleries : []).map(
        (gallery: any) => (
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
