import { useRef } from "react";
import "@/styles/layout/header.scss";

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
      <div className="header__logo">
        <a href="/">
          <img src="/src/assets/gallery.svg" alt="Logo" />
        </a>
      </div>
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
        <img src="/src/assets/profile.svg" alt="Profile" />
      </div>
    </header>
  );
}

export default Header;
