import React from "react";
import ReactDOM from "react-dom";
// import "./style/index.scss";

const NVcontent = React.lazy(() => import("./components/next/NVcontent"));

ReactDOM.render(
  <React.Suspense fallback={<div>...</div>}>
    <NVcontent />
  </React.Suspense>,
  document.getElementById("root")
);
