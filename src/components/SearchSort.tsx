import * as React from "react";
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function SearchSort() {
  const [sortOption, setSortOption] = React.useState<string | number>(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof sortOption>) => {
    setSortOption(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 100 }}>
      <InputLabel id="sort-select">Sort</InputLabel>
      <Select
        labelId="sort-select"
        id="sort-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={sortOption}
        label="Sort items"
        onChange={handleChange}
        variant="standard"
        disableUnderline={true}
      >
        <MenuItem value={0}>Time</MenuItem>
        <MenuItem value={1}>Viral</MenuItem>
        <MenuItem value={2}>Top</MenuItem>
      </Select>
    </FormControl>
  );
}
