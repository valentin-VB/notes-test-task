import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { CurrentNote, ModalContext } from "App";
import { ICurrentNote } from "Services/types";
import { useContext } from "react";

function Modal({
  handleDeleteBthClick,
}: {
  handleDeleteBthClick: (activeNote: ICurrentNote) => Promise<void>;
}) {
  const modalContext = useContext(ModalContext);
  const noteContext = useContext(CurrentNote);
  return (
    <Dialog
      open={modalContext ? modalContext?.isOpen : false}
      onClose={(e) => modalContext?.setIsOpen(false)}
    >
      <DialogTitle>Delete Note</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this note?</p>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={(e) => modalContext?.setIsOpen(false)}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            noteContext?.currentNote &&
              handleDeleteBthClick(noteContext?.currentNote);
            modalContext?.setIsOpen(false);
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
