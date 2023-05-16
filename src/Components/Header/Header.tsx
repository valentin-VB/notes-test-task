import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext } from "react";
import { CurrentNote } from "App";
import NoteFilter from "Components/NoteFilter/NoteFilter";
import { ModalContext } from "../../App";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

function Header({ onAddBtnClick }: { onAddBtnClick: () => Promise<void> }) {
  const noteContext = useContext(CurrentNote);
  const modalContext = useContext(ModalContext);
  return (
    <Box component="header">
      <Box>
        <Button sx={{ mr: "15px" }} onClick={() => onAddBtnClick()}>
          <AddIcon color="action"></AddIcon>
        </Button>
        <Button
          disabled={!noteContext?.currentNote}
          onClick={() => modalContext?.setIsOpen(true)}
        >
          <DeleteOutlineIcon color="action" />
        </Button>
        <Button
          disabled={!noteContext?.currentNote}
          onClick={() => modalContext?.setIsOpen(true)}
        >
          <ModeEditOutlineIcon color="action" />
        </Button>
      </Box>
      <NoteFilter />
    </Box>
  );
}

export default Header;
