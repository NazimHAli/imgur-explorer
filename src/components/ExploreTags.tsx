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
          <a
            key={tag?.display_name}
            href="#explore-tags"
            data-tag={tag?.name}
            onClick={handleClick}
            className="explore__tags__item"
          >
            {tag?.display_name}
          </a>
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
      <h2 id="explore-tags" className="explore__title">
        Tags
      </h2>
      <div className="explore__tags">
        {renderTags(galleryTags, handleClick)}
      </div>
    </div>
  );
}

export default ExploreTags;
