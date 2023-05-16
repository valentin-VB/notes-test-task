import { ICurrentNote } from "Services/types";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useState, useEffect, useContext, useRef } from "react";
import { CurrentNoteText, InputState } from "../../App";
import { Button } from "@mui/material";

function Workspace({ note }: { note: ICurrentNote | null }) {
  const context = useContext(CurrentNoteText);
  const inputContext = useContext(InputState);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleButtonClick = () => {
    // Set focus on the input element
    console.log("inputRef:", inputRef);
    inputRef.current && inputRef.current.focus();
  };

  useEffect(() => {
    if (!note) return;
    setValue(note?.noteText || "");
    context?.setCurrentText(note?.noteText || "");
  }, [note]);

  //   console.log("value:", value);
  return (
    <div>
      <span>{note?.updated_at}</span>
      {note && (
        <>
          <TextareaAutosize
            ref={inputRef}
            value={value}
            onBlur={() => inputContext && inputContext.setIsBlur(true)}
            onChange={(e) => {
              setValue(e.currentTarget.value);
              context?.setCurrentText(e.currentTarget.value);
            }}
          ></TextareaAutosize>
        </>
      )}
    </div>
  );
}

export default Workspace;
