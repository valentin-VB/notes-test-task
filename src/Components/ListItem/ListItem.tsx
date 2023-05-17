import { ListItemButton, Typography } from "@mui/material";
import { INote } from "../../Services/types";
import { getFirstKeyValue, getFormattedDate } from "Services/helpers";
import { useContext, useEffect, useState } from "react";
import { CurrentNote, CurrentNoteText } from "App";
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

  const { updated_at, values, id } = note;
  const noteText = getFirstKeyValue(values);
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
      <Typography>
        {shouldListTitleUpdate ? textContext?.currentText : title}
      </Typography>
      <p>{formattedDate}</p>
    </ListItemButton>
  );
}

export default ListItem;
