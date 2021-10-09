import { useRef } from "react";
import "~styles/search-box.scss";

function Header({ dispatchState }) {
  function handleSubmit(event) {
    if (inputRef.current && inputRef.current.value.length) {
      dispatchState({
        type: "submitSearchRequest",
        query: inputRef.current.value,
      });
    }
    event.preventDefault();
  }

  const inputRef = useRef(null);

  return (
    <header className="header">
      <div className="header_logo">LOGO</div>
      <div className="search-box">
        <button className="btn-search" onClick={handleSubmit}>
          <i className="search-icon"></i>
        </button>
        <form onSubmit={handleSubmit}>
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
