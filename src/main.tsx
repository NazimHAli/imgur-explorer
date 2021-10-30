import App from "@/components/App";
import { GlobalContextProvider } from "@/state/GlobalContext";
import "@/styles/index.scss";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { StrictMode } from "react";
import { render } from "react-dom";

Sentry.init({
  dsn: "https://835823f448e64a669d1ebe74eaa9c0f9@o1056215.ingest.sentry.io/6042399",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </StrictMode>,
  document.getElementById("root")
);
