import { Filter, NotesContext } from "App";
import ListItem from "Components/ListItem";
import { useContext, useState } from "react";

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
        isNoteEmpty ||
        note.values.ddGLe7j8nnE4oDAfXnWQrQ.toLowerCase().includes(filterToLC)
      );
    }) ?? [];

  return (
    <div>
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
    </div>
  );
}

export default Sidebar;