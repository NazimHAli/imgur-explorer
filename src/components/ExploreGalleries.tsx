import { State } from "@/types";
import "@/styles/component/explore-galleries.scss";
import { MouseEventHandler } from "react";

function ExploreGalleries(props: {
  dispatchState: any;
  galleryTags: State["galleryTags"];
}) {
  const { dispatchState, galleryTags } = props;
  const handleClick = (event: any) => {
    dispatchState({
      type: "setTagName",
      tagName: event.target.dataset.tag,
    });
    event.preventDefault();
  };

  return (
    <div className="explore-galleries">
      <h4>Tags</h4>
      {renderTags(galleryTags, handleClick)}

      <h2>Explore Galleries</h2>
      {renderGallery(galleryTags)}
    </div>
  );
}

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

function renderTags(
  galleryTags: State["galleryTags"],
  handleClick: MouseEventHandler<HTMLAnchorElement> | undefined
) {
  return (
    <ul className="explore-tags-list">
      {Array.from(galleryTags?.tags ? galleryTags.tags.slice(0, 8) : []).map(
        (tag: any) => (
          <li key={tag?.display_name}>
            <a href="#" data-tag={tag?.name} onClick={handleClick}>
              {tag?.display_name}
            </a>
          </li>
        )
      )}
    </ul>
  );
}

export default ExploreGalleries;
