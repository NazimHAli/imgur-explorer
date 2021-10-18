import { Action, State, TypeTag } from "@/types";
import { capitalize } from "@/utils/dataUtils";
import { Dispatch, MouseEvent, MouseEventHandler } from "react";

function renderTags(
  galleryTags: State["galleryTags"],
  handleClick: MouseEventHandler<HTMLAnchorElement> | undefined
) {
  return (
    <>
      {Array.from(galleryTags?.tags ? galleryTags.tags.slice(0, 9) : []).map(
        (tag: TypeTag) => (
          <a
            key={tag?.display_name}
            href="#explore-tags"
            data-tag={tag?.name}
            onClick={handleClick}
            className="explore__tags__item"
          >
            <p className="text-lg font-medium">
              {capitalize(tag?.display_name)}
            </p>
            <span>{tag?.total_items?.toLocaleString()} Posts</span>
          </a>
        )
      )}
    </>
  );
}

function ExploreTags(props: {
  dispatchState: Dispatch<Action>;
  galleryTags: State["galleryTags"];
}) {
  const { dispatchState, galleryTags } = props;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const element = event.target as HTMLSelectElement;
    const tagName = element.dataset.tag;

    dispatchState({
      type: "setTagName",
      tagName: tagName,
    });
    event.preventDefault();
  };

  return (
    <div className="text-black">
      <h2 id="explore-tags" className="explore__title">
        Explore Tags
      </h2>
      <div className="explore__tags">
        {renderTags(galleryTags, handleClick)}
      </div>
    </div>
  );
}

export default ExploreTags;
