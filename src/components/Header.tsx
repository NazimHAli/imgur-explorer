import { Action } from "@/state";
import { useRef } from "react";
import "@/styles/layout/header.scss";

function Header(props: { dispatchState: (arg0: Action) => void }): JSX.Element {
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
      <div className="header_logo">LOGO</div>
      <div className="search-box">
        <button className="btn-search" type="submit" onClick={_handleSubmit}>
          <i className="search-icon"></i>
        </button>
        <form onSubmit={_handleSubmit}>
          <input
            type="search"
            className="input-search"
            placeholder="Search for it"
            ref={inputRef}
          />
        </form>
      </div>
      <div className="profile">PROFILE</div>
    </header>
  );
}

export default Header;
