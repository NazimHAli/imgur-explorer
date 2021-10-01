import React from "react";
import ReactDOM from "react-dom";
import "./style/index.scss";

const HeaderSearch = React.lazy(() => import("./components/PrimaryHeader"));
const GridGallery = React.lazy(() => import("./components/GridGallery"));

ReactDOM.render(
  <React.Suspense fallback={<div>...</div>}>
    <HeaderSearch />
    <GridGallery />
  </React.Suspense>,
  document.getElementById("root")
);
