import { ICurrentNote } from "Services/types";
import { useState, useEffect, useContext, useMemo } from "react";
import { CurrentNoteText, InputState } from "../../App";
import { Typography } from "@mui/material";
import SimpleMDE, { SimpleMdeToCodemirrorEvents } from "react-simplemde-editor";

function Workspace({ note }: { note: ICurrentNote | null }) {
  const context = useContext(CurrentNoteText);
  const inputContext = useContext(InputState);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!note) return;
    setValue(note?.noteText || "");
    context?.setCurrentText(note?.noteText || "");
  }, [note]);

  const events = useMemo(() => {
    return {
      blur: () => inputContext?.setIsBlur(true),
    } as SimpleMdeToCodemirrorEvents;
  }, []);

  // useEffect(() => {
  //   if (inputContext && ref) {
  //     inputContext.inputRef?.current = ref.current;
  //   }
  // }, [inputContext]);

  //   console.log("value:", value);
  return (
    <div>
      <span>{note?.updated_at}</span>
      {note && (
        <>
          {inputContext?.isMarkdownShown ? (
            <SimpleMDE
              value={value}
              events={events}
              onChange={(value) => {
                setValue(value);
                context?.setCurrentText(value);
              }}
            ></SimpleMDE>
          ) : (
            <Typography>{value}</Typography>
          )}
        </>
      )}
    </div>
  );
}

export default Workspace;
