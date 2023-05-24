import { ListItemButton, Typography, Box } from "@mui/material";
import { INote } from "Services/types";
import { getFormattedDate, removeSymbols } from "Services/helpers";
import { useContext, useEffect, useState } from "react";
import { CurrentNote, CurrentNoteText, InputState } from "App";
import { FIELD_ID } from "Services/api";

function ListItem({
  note,
  index,
  selected,
  onNoteClick,
}: {
  note: INote;
  index: number;
  selected: number;
  onNoteClick: (index: number) => void;
}) {
  const noteContext = useContext(CurrentNote);
  const textContext = useContext(CurrentNoteText);
  const inputContext = useContext(InputState);
  const { updated_at, values, id } = note;
  const noteText = values[FIELD_ID];
  const formattedDate = getFormattedDate(updated_at);
  const [title, setTitle] = useState("");
  const shouldListTitleUpdate =
    selected === index && textContext?.currentText?.length;

  useEffect(() => {
    setTitle(note.values[FIELD_ID]);
  }, [note]);

  return (
    <ListItemButton
      component="li"
      selected={selected === index}
      sx={{
        borderBottom: "3px solid #5db09a",
        minHeight: "120px",
      }}
      onClick={() => {
        onNoteClick(index);
        noteContext?.setCurrentNote({
          noteText,
          updated_at: formattedDate,
          id,
          values,
        });
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {shouldListTitleUpdate && inputContext?.isMarkdownShown
            ? removeSymbols(textContext?.currentText)
            : removeSymbols(title)}
        </Typography>
        <Typography>{formattedDate}</Typography>
      </Box>
    </ListItemButton>
  );
}

export default ListItem;
