import { ICurrentNote } from "Services/types";
import { useState, useEffect, useContext, useMemo } from "react";
import { CurrentNoteText, InputState } from "../../App";
import { Typography, Box } from "@mui/material";
import SimpleMDE, { SimpleMdeToCodemirrorEvents } from "react-simplemde-editor";

function Workspace({ note }: { note: ICurrentNote | null }) {
  const context = useContext(CurrentNoteText);
  const inputContext = useContext(InputState);
  const [value, setValue] = useState<null | string>(null);

  useEffect(() => {
    if (value === null) return;
    if (value === "") {
      inputContext?.setIsMarkdownShown(true);
    }
  }, [inputContext, value]);

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

  const shouldMarkdownShown =
    typeof value === "string" &&
    (inputContext?.isMarkdownShown || value.length === 0);

  return (
    <Box sx={{ p: "20px" }}>
      <Typography sx={{ textAlign: "center", mb: "15px" }}>
        {note?.updated_at}
      </Typography>
      {note && (
        <>
          {shouldMarkdownShown ? (
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
            <Typography sx={{ fontSize: "25px" }}>{value}</Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default Workspace;
