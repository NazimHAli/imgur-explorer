import { createTheme, ThemeProvider } from "@mui/material";
import React, { Suspense } from "react";
import { render } from "react-dom";
import "./style/index.scss";

const CssBaseline = React.lazy(() => import("./intermediates/muiCssBaseline"));
const Grid = React.lazy(() => import("./components/App"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

render(
  <Suspense fallback={<div>...</div>}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid />
    </ThemeProvider>
  </Suspense>,
  document.getElementById("root")
);
