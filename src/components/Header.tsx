import galleryIcon from "@/assets/gallery.svg";
import profileIcon from "@/assets/profile.svg";
import { Action, State, TypeTag } from "@/types";
import { capitalize } from "@/utils/dataUtils";
import { Dispatch, RefObject, useRef } from "react";

function handleClearQuery(
  defaultQuery: string,
  inputRef: RefObject<HTMLInputElement>
) {
  if (defaultQuery === "" && inputRef.current) {
    inputRef.current.value = defaultQuery;
  }
}

function Header(props: {
  dispatchState: Dispatch<Action>;
  defaultQuery: string;
  state: State;
}): JSX.Element {
  const { defaultQuery, dispatchState, state } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  function _handleSubmit(event: { preventDefault: () => void }) {
    const isValid =
      inputRef.current &&
      inputRef.current.value.length &&
      inputRef.current.value !== defaultQuery;

    if (isValid) {
      dispatchState({
        type: "submitSearchRequest",
        query: inputRef.current.value,
        newSearch: true,
      });
    }

    event.preventDefault();
  }

  handleClearQuery(defaultQuery, inputRef);

  return (
    <header className="header">
      <div className="header__top">
        <a href="/" className="header__logo">
          <img src={galleryIcon} alt="Logo" width="64" height="64" />
        </a>
        <div className="search-box">
          <button
            className="btn-search"
            type="submit"
            name="Submit search button"
            onClick={_handleSubmit}
          >
            <i className="search-icon"></i>
          </button>
          <form onSubmit={_handleSubmit}>
            <input
              type="search"
              className="input-search"
              placeholder="Search for it"
              defaultValue={defaultQuery}
              ref={inputRef}
            />
          </form>
        </div>
        <div className="header__profile">
          <img src={profileIcon} alt="Profile" width="46" height="46" />
        </div>
      </div>
      <div className="header__tags">
        <div className="header__tags__container">
          <h4 className="header__tags__title">Tags</h4>
          <div className="header__tags__items">
            {Array.from(
              state["galleryTags"]?.tags
                ? state["galleryTags"].tags.slice(0, 10)
                : []
            ).map((tag: TypeTag) => (
              <>
                <a
                  key={tag?.display_name}
                  href="#explore-tags"
                  data-tag={tag?.name}
                >
                  <p className="text-lg font-medium">
                    {capitalize(tag?.display_name)}
                  </p>
                  <span>{tag?.total_items?.toLocaleString()} Posts</span>
                </a>
                {/* <span>|</span> */}
              </>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
