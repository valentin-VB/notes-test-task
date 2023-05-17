import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { useContext } from "react";
import { Filter } from "App";

function NoteFilter() {
  const context = useContext(Filter);
  return (
    <TextField
      placeholder="Search"
      fullWidth
      size="small"
      variant="filled"
      onChange={(e) => context?.setFilter(e.currentTarget.value)}
      sx={{ maxWidth: "500px", paddingRight: "25px" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
    />
  );
}

export default NoteFilter;
