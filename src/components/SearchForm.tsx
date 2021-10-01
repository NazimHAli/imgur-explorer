import * as React from "react";

function SearchForm({ handleOnSubmit }) {
  const isValidQuery = (event) => {
    return (
      event.keyCode === 13 && event.target.value.replace(/\s+/g, "").length
    );
  };

  const onSubmit = (event) => {
    if (isValidQuery(event)) {
      handleOnSubmit(event.target.value);
      event.preventDefault();
    }
  };

  return (
    <React.Fragment>
      <input
        id="search-input"
        color="primary"
        placeholder="Search for goodies"
        type="search"
        defaultValue="meow"
        onKeyDown={onSubmit}
      />
    </React.Fragment>
  );
}

export default SearchForm;
