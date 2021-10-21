import galleryIcon from "@/assets/gallery.svg";
import profileIcon from "@/assets/profile.svg";
import { Action, State } from "@/types";
import { Dispatch, RefObject, useRef } from "react";

import ExploreTags from "./ExploreTags";

function handleClearQuery(
  defaultQuery: string,
  inputRef: RefObject<HTMLInputElement>
) {
  if (defaultQuery === "" && inputRef.current) {
    inputRef.current.value = defaultQuery;
  }
}

function Header(props: {
  defaultQuery: string;
  dispatchState: Dispatch<Action>;
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

  const logo = (
    <a href="/" className="header__logo">
      <img src={galleryIcon} alt="Logo" width="64" height="64" />
    </a>
  );

  const searchButton = (
    <button
      className="btn-search"
      type="submit"
      name="Submit search button"
      onClick={_handleSubmit}
    >
      <i className="search-icon"></i>
    </button>
  );

  const searchForm = (
    <form onSubmit={_handleSubmit}>
      <input
        type="search"
        className="input-search"
        placeholder="Search for it"
        defaultValue={defaultQuery}
        ref={inputRef}
      />
    </form>
  );

  const profile = (
    <div className="header__profile">
      <img src={profileIcon} alt="Profile" width="46" height="46" />
    </div>
  );

  const searchBox = (
    <div className="search-box">
      {searchButton}
      {searchForm}
    </div>
  );

  const tagsContainer = (
    <div className="header__tags__container">
      <ExploreTags
        dispatchState={dispatchState}
        galleryTags={state.galleryTags}
      />
    </div>
  );

  return (
    <header className="header">
      <div className="header__top">
        {logo}
        {searchBox}
        {profile}
      </div>

      <div className="header__tags">{tagsContainer}</div>
    </header>
  );
}

export default Header;
