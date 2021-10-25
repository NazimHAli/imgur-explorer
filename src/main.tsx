import App from "@/components/App";
import GlobalContextProvider from "@/components/GlobalContext";
import "@/styles/index.scss";
import { StrictMode } from "react";
import { render } from "react-dom";

render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </StrictMode>,
  document.getElementById("root")
);
