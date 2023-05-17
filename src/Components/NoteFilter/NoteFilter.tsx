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
      onChange={(e) => context?.setFilter(e.currentTarget.value)}
      sx={{
        maxWidth: "600px",
        alignItems: "center",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default NoteFilter;
