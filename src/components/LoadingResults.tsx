import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingResults({ open = false }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => !!open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
