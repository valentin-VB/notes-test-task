import { ICurrentNote } from "Services/types";
import { useState, useEffect, useContext, useMemo } from "react";
import { CurrentNoteText, InputState } from "../../App";
import { Typography, Box } from "@mui/material";
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
  }, [inputContext]);

  const options = useMemo(() => {
    const toolbarButtons = [
      "bold",
      "italic",
      "heading",
      "unordered-list",
      "ordered-list",
      "link",
      "quote",
      "code",
    ];

    return {
      toolbar: toolbarButtons,
    };
  }, []) as EasyMDE.Options;
  // const options = {
  //   toolbar: [
  //     "bold",
  //     "italic",
  //     "heading",
  //     "|",
  //     "quote",
  //     "code",
  //     "unordered-list",
  //     "ordered-list",
  //   ],
  // } as EasyMDE.Options;

  // useEffect(() => {
  //   if (inputContext && ref) {
  //     inputContext.inputRef?.current = ref.current;
  //   }
  // }, [inputContext]);

  //   console.log("value:", value);
  return (
    <Box sx={{ p: "20px" }}>
      <Typography sx={{ textAlign: "center", mb: "15px" }}>
        {note?.updated_at}
      </Typography>
      {note && (
        <>
          {inputContext?.isMarkdownShown ? (
            <SimpleMDE
              value={value}
              events={events}
              options={options}
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
    </Box>
  );
}

export default Workspace;
