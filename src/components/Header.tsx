import { useRef } from "react";
import "@/styles/layout/header.scss";

import galleryIcon from "@/assets/gallery.svg";
import profileIcon from "@/assets/profile.svg";

function Header(props: {
  dispatchState: (arg0: { type: string; query: string }) => void;
  defaultQuery: string | number | readonly string[] | undefined;
}): JSX.Element {
  function _handleSubmit(event: { preventDefault: () => void }) {
    if (inputRef.current && inputRef.current.value.length) {
      props.dispatchState({
        type: "submitSearchRequest",
        query: inputRef.current.value,
      });
    }
    event.preventDefault();
  }

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="header">
      <a href="/" className="header__logo">
        <img src={galleryIcon} alt="Logo" width="64" height="64" />
      </a>
      <div className="search-box">
        <button className="btn-search" type="submit" onClick={_handleSubmit}>
          <i className="search-icon"></i>
        </button>
        <form onSubmit={_handleSubmit}>
          <input
            type="search"
            className="input-search"
            placeholder="Search for it"
            defaultValue={props.defaultQuery}
            ref={inputRef}
          />
        </form>
      </div>
      <div className="header__profile">
        <img src={profileIcon} alt="Profile" width="46" height="46" />
      </div>
    </header>
  );
}

export default Header;
