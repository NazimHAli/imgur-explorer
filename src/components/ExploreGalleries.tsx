import { State, TypeGallery } from "@/types";

function renderGallery(galleryTags: State["galleryTags"]): JSX.Element {
  return (
    <ul className="explore_galleries">
      {Array.from(galleryTags?.galleries ? galleryTags.galleries : []).map(
        (gallery: TypeGallery) => (
          <li key={gallery?.id} className="flex flex-col">
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
      <h2 className="explore_title">Explore Galleries</h2>
      {renderGallery(galleryTags)}
    </>
  );
}

export default ExploreGalleries;
