import React from "react";
import App from "@/components/App";
import { render } from "react-dom";

import "@/styles/index.scss";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
