import * as React from "react";
import { TextField } from "@mui/material";

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
      <TextField
        sx={{
          display: "flex",
          justifyContent: "center",
          mx: "auto",
          width: "50%",
        }}
        id="search-input"
        color="primary"
        label="Search"
        placeholder="Search for goodies"
        type="search"
        defaultValue="meow"
        onKeyDown={onSubmit}
      />
    </React.Fragment>
  );
}

export default SearchForm;
