import { capitalize } from "@/utils/dataUtils";
import { Action, State, TypeTag } from "@/utils/types";
import { Dispatch, MouseEvent, MouseEventHandler } from "react";

function renderTags(
  galleryTags: State["galleryTags"],
  handleClick: MouseEventHandler<HTMLAnchorElement> | undefined
) {
  return (
    <>
      {Array.from(galleryTags?.tags ? galleryTags.tags.slice(0, 10) : []).map(
        (tag: TypeTag) => (
          <a
            key={tag?.display_name}
            href="#header-tags"
            data-tag={tag?.name}
            onClick={handleClick}
            className="header__tags__item"
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

function HeaderTags(props: {
  dispatchState: Dispatch<Action>;
  galleryTags: State["galleryTags"];
}) {
  const { dispatchState, galleryTags } = props;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    dispatchState({
      requestArgs: {
        method: "tagName",
        tagName: event.currentTarget.dataset.tag,
      },
      type: "setTagName",
    });
    event.preventDefault();
  };

  return (
    <>
      <h2 id="header-tags" className="header__tags__title">
        Explore Tags
      </h2>
      <div className="header__tags__list">
        {renderTags(galleryTags, handleClick)}
      </div>
    </>
  );
}

export default HeaderTags;
