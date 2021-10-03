import { Backdrop, CircularProgress } from "@mui/material";
import * as React from "react";

export default function LoadingResults({ open = false }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => !!open}
      transitionDuration={1000}
      invisible={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
