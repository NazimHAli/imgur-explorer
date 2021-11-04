import imgurLogo from "@/assets/imgur.svg";
import profileIcon from "@/assets/profile.svg";
import HeaderTags from "@/components/HeaderTags";
import { useStore } from "@/state/ZuState";
import { dispatchRequestArgs } from "@/state/dispatchHelpers";
import { memo, RefObject, useRef } from "react";
import shallow from "zustand/shallow";

function handleClearQuery(
  defaultQuery: string,
  inputRef: RefObject<HTMLInputElement>
) {
  if (defaultQuery === "" && inputRef.current) {
    inputRef.current.value = defaultQuery;
  }
}

function Header(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const { requestArgs } = useStore(
    (state) => ({ requestArgs: state.requestArgs }),
    shallow
  );

  function _handleSubmit(event: { preventDefault: () => void }) {
    const isValid =
      inputRef.current &&
      inputRef.current.value.length &&
      inputRef.current.value !== requestArgs.query;

    if (isValid) {
      dispatchRequestArgs({
        method: "search",
        newSearch: true,
        query: inputRef.current.value,
      });
    }

    event.preventDefault();
  }

  handleClearQuery(requestArgs.query, inputRef);

  const logo = (
    <a href="/" className="header__logo">
      <img src={imgurLogo} alt="Logo" width="100" height="35" />
      <span>explorer</span>
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
        defaultValue={requestArgs.query}
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
      <HeaderTags />
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

export default memo(Header);
