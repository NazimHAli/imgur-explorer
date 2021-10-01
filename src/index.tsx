import { createTheme, ThemeProvider } from "@mui/material";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style/index.scss";

const CssBaseline = React.lazy(() => import("./intermediates/muiCssBaseline"));
const HeaderSearch = React.lazy(() => import("./components/PrimaryHeader"));
const GridGallery = React.lazy(() => import("./components/GridGallery"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.render(
  <React.Suspense fallback={<div>...</div>}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HeaderSearch />
      <GridGallery />
    </ThemeProvider>
  </React.Suspense>,
  document.getElementById("root")
);
