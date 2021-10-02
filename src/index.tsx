import { createTheme, ThemeProvider } from "@mui/material";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style/index.scss";

const CssBaseline = React.lazy(() => import("./intermediates/muiCssBaseline"));
const Grid = React.lazy(() => import("./components/Grid"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.render(
  <React.Suspense fallback={<div>...</div>}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid />
    </ThemeProvider>
  </React.Suspense>,
  document.getElementById("root")
);
