import * as React from "react";
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SORT_MAP = {
  0: "time",
  1: "viral",
  2: "top",
};

function GridSearchSort({ handleSortChange }) {
  const [sortOption, setSortOption] = React.useState<string | number>(1);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof sortOption>) => {
    setSortOption(event.target.value);
    handleSortChange({ sort: SORT_MAP[event.target.value] });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 100 }}>
      <InputLabel id="sort-select" sx={{ left: "-1rem" }}>
        Sort
      </InputLabel>
      <Select
        sx={{ mt: 0 }}
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

export default GridSearchSort;
