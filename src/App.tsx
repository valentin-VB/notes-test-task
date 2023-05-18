import { createContext, useEffect, useState } from "react";
import { createNewNote, deleteNote, fetchNotes } from "./Services/api";
import {
  ICurrentNote,
  ICurrentNoteContext,
  ICurrentNoteText,
  IFilter,
  IInputState,
  IModalOpen,
  INote,
} from "./Services/types";
import Sidebar from "Components/Sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import Workspace from "Components/Workspace/Workspace";
import { debouncePutNewTitle } from "Services/api";
import Header from "Components/Header/Header";
import Modal from "Components/Modal/Modal";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import SnackbarAlert from "Components/SnackbarAlert/SnackbarAlert";

export const NotesContext = createContext<INote[] | null>(null);
export const CurrentNote = createContext<ICurrentNoteContext | null>(null);
export const CurrentNoteText = createContext<ICurrentNoteText | null>(null);
export const Filter = createContext<IFilter | null>(null);
export const ModalContext = createContext<IModalOpen | null>(null);
export const InputState = createContext<IInputState | null>(null);

function App() {
  const [notes, setNotes] = useState<INote[] | []>([]);
  const [error, setError] = useState<string | null>(null);

  const [currentNote, setCurrentNote] = useState<ICurrentNote | null>(null);
  const [currentText, setCurrentText] = useState<string>("");

  const [isNoteDelete, setIsNoteDelete] = useState(false);
  const [isNoteCreated, setIsNoteCreated] = useState(false);

  const [filter, setFilter] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [isBlur, setIsBlur] = useState(false);
  const [isMarkdownShown, setIsMarkdownShown] = useState(false);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const result: INote[] = await fetchNotes();
        setNotes(result);
      } catch (err) {
        setError(error);
        console.error(err);
      } finally {
        setIsNoteCreated(false);
        setIsNoteDelete(false);
        setIsBlur(false);
      }
    };
    fetchAllNotes();
  }, [error, isNoteDelete, isNoteCreated, isBlur]);

  useEffect(() => {
    const putNewText = async () => {
      if (!currentNote) return;
      try {
        await debouncePutNewTitle(
          currentNote?.id,
          currentText,
          currentNote?.values
        );
      } catch (err) {
        handleError(err);
      }
    };
    putNewText();
  }, [currentNote, currentText, notes, isBlur, error]);

  const handleDeleteBthClick = async (activeNote: ICurrentNote) => {
    try {
      await deleteNote(activeNote.id);
      setCurrentNote(null);
      setIsNoteDelete(true);
      setCurrentText("");
    } catch (err) {
      handleError(err);
    }
  };

  const handleAddBtnClick = async () => {
    try {
      await createNewNote(" ");
      setIsNoteCreated(true);
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err: any) => {
    if (axios.isAxiosError(err)) {
      setError(err?.message);
    }
    console.error("error", err);
  };

  const onAlertClose = () => setError(null);

  return (
    <NotesContext.Provider value={notes}>
      <CurrentNote.Provider value={{ currentNote, setCurrentNote }}>
        <CurrentNoteText.Provider value={{ currentText, setCurrentText }}>
          <Filter.Provider value={{ filter, setFilter }}>
            <ModalContext.Provider value={{ isOpen, setIsOpen }}>
              <InputState.Provider
                value={{
                  isBlur,
                  setIsBlur,
                  isMarkdownShown,
                  setIsMarkdownShown,
                }}
              >
                <Header onAddBtnClick={handleAddBtnClick} />

                <Grid container component="main">
                  <Grid item xs={12} sm={3}>
                    <Sidebar />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Workspace note={currentNote} />
                  </Grid>
                </Grid>
                {error && <SnackbarAlert text={error} onClose={onAlertClose} isOpen={Boolean(error)} type="error"  />}
                <Modal handleDeleteBthClick={handleDeleteBthClick} />
              </InputState.Provider>
            </ModalContext.Provider>
          </Filter.Provider>
        </CurrentNoteText.Provider>
      </CurrentNote.Provider>
    </NotesContext.Provider>
  );
}

export default App;
