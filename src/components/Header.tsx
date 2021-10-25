import imgurLogo from "@/assets/imgur.svg";
import profileIcon from "@/assets/profile.svg";
import { GlobalContext } from "@/components/GlobalContext";
import HeaderTags from "@/components/HeaderTags";
import { RefObject, useContext, useRef } from "react";

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
  const { setRequestArgs, state } = useContext(GlobalContext);

  function _handleSubmit(event: { preventDefault: () => void }) {
    const isValid =
      inputRef.current &&
      inputRef.current.value.length &&
      inputRef.current.value !== state.requestArgs.query;

    if (isValid) {
      setRequestArgs({
        method: "search",
        newSearch: true,
        query: inputRef.current.value,
      });
    }

    event.preventDefault();
  }

  handleClearQuery(state.requestArgs.query, inputRef);

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
        defaultValue={state.requestArgs.query}
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
      <HeaderTags galleryTags={state.galleryTags} />
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
