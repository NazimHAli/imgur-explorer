import { State, TypeTag } from "@/types";
import "@/styles/component/explore-galleries.scss";
import { MouseEventHandler } from "react";

function renderTags(
  galleryTags: State["galleryTags"],
  handleClick: MouseEventHandler<HTMLAnchorElement> | undefined
) {
  return (
    <ul className="explore-tags-list">
      {Array.from(galleryTags?.tags ? galleryTags.tags.slice(0, 8) : []).map(
        (tag: TypeTag) => (
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

function ExploreTags(props: {
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
    <>
      <h4>Tags</h4>
      {renderTags(galleryTags, handleClick)}
    </>
  );
}

export default ExploreTags;
