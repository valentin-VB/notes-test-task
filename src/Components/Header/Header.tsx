import { AppBar, Toolbar, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext } from "react";
import { CurrentNote, InputState } from "App";
import NoteFilter from "Components/NoteFilter/NoteFilter";
import { ModalContext } from "../../App";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

function Header({ onAddBtnClick }: { onAddBtnClick: () => Promise<void> }) {
  const noteContext = useContext(CurrentNote);
  const modalContext = useContext(ModalContext);
  const inputContext = useContext(InputState);

  const handleEditBtnClick = () => {
    if (inputContext) {
      const { setIsMarkdownShown, isMarkdownShown } = inputContext;
      setIsMarkdownShown(!isMarkdownShown);
    }
  };

  return (
    <AppBar
      component="header"
      sx={{
        position: "sticky",
        backgroundColor: "#dbf7e8",
        pt: "5px",
        pb: "5px",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          pl: "5px !important",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
          <Button onClick={() => onAddBtnClick()}>
            <AddIcon></AddIcon>
          </Button>
          <Button
            disabled={!noteContext?.currentNote}
            onClick={() => modalContext?.setIsOpen(true)}
          >
            <DeleteOutlineIcon />
          </Button>
          <Button
            disabled={!noteContext?.currentNote}
            onClick={() => handleEditBtnClick()}
          >
            <ModeEditOutlineIcon />
          </Button>
        </Box>
        <NoteFilter />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
