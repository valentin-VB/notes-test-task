import { Filter, NotesContext } from "App";
import ListItem from "Components/ListItem";
import { FIELD_ID } from "Services/api";
import { useContext, useState } from "react";
import { Box } from "@mui/material";

function Sidebar() {
  const notesContext = useContext(NotesContext);
  const filter = useContext(Filter);
  const [selected, setSelected] = useState(NaN);
  const handleNoteClick = (index: number) => {
    setSelected(index);
  };

  const visibleNotes =
    notesContext?.filter((note) => {
      const filterToLC = filter?.filter?.toLowerCase() ?? "";
      const isNoteEmpty = Object.keys(note.values).length === 0;
      return (
        isNoteEmpty || note.values[FIELD_ID].toLowerCase().includes(filterToLC)
      );
    }) ?? [];

  return (
    <Box sx={{ backgroundColor: "#cbcbcbf" }}>
      <ul>
        {visibleNotes.map((note, index) => (
          <ListItem
            key={note.id}
            note={note}
            index={index}
            selected={selected}
            onNoteClick={handleNoteClick}
          />
        ))}
      </ul>
    </Box>
  );
}

export default Sidebar;
