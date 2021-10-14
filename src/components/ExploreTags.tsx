import { State, TypeTag } from "@/types";
import { MouseEventHandler } from "react";

function renderTags(
  galleryTags: State["galleryTags"],
  handleClick: MouseEventHandler<HTMLAnchorElement> | undefined
) {
  return (
    <>
      {Array.from(galleryTags?.tags ? galleryTags.tags.slice(0, 8) : []).map(
        (tag: TypeTag) => (
          <li key={tag?.display_name} className="tag_li">
            <a href="#" data-tag={tag?.name} onClick={handleClick}>
              {tag?.display_name}
            </a>
          </li>
        )
      )}
    </>
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
    <div className="text-black">
      <h4>Tags</h4>
      <ul className="explore_tags">{renderTags(galleryTags, handleClick)}</ul>
    </div>
  );
}

export default ExploreTags;
