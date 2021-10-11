import React from "react";
import App from "./components/App";

import "@/styles/utils/_normalize.scss";
import { render } from "react-dom";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
