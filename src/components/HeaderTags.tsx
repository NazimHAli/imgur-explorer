import { useStore } from "@/state/ZuState";
import {
  dispatchIsLoading,
  dispatchRequestArgs,
} from "@/state/dispatchHelpers";
import { capitalize } from "@/utils/dataUtils";
import { TypeState, TypeTag } from "@/utils/types";
import { MouseEvent, MouseEventHandler } from "react";
import shallow from "zustand/shallow";

function renderTags(
  galleryTags: TypeState["galleryTags"],
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

function HeaderTags() {
  const { galleryTags } = useStore(
    (state) => ({ galleryTags: state.galleryTags }),
    shallow
  );

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    dispatchIsLoading(true);
    dispatchRequestArgs({
      filter: true,
      method: "tagName",
      newSearch: true,
      query: "",
      tagName: event.currentTarget?.dataset?.tag,
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
