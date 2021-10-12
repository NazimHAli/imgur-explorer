import { State } from "@/state";
import "@/styles/component/explore-galleries.scss";

function ExploreGalleries(props: { galleryTags: State["galleryTags"] }) {
  const { galleryTags } = props;

  return (
    <div className="explore-galleries">
      <h4>Tags</h4>
      <ul className="explore-tags-list">
        {Array.from(galleryTags?.tags ? galleryTags.tags.slice(0, 8) : []).map(
          (tag: any) => (
            <li key={tag?.display_name}>
              <a href="#">{tag?.display_name}</a>
            </li>
          )
        )}
      </ul>

      <h2>Explore Galleries</h2>
      <ul className="explore-galleries__list">
        {Array.from(galleryTags?.galleries ? galleryTags.galleries : []).map(
          (gallery: any) => renderTag(gallery)
        )}
      </ul>
    </div>
  );

  function renderTag(gallery: any): JSX.Element {
    return (
      <li key={gallery?.id} className="explore-galleries__list_item">
        <h3>{gallery?.name}</h3>
        <p>{gallery?.description}</p>
      </li>
    );
  }
}

export default ExploreGalleries;
