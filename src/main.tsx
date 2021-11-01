import App from "@/components/App";
import { GlobalContextProvider } from "@/state/GlobalContext";
import "@/styles/index.scss";
import { render } from "react-dom";

render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
  document.getElementById("root")
);
