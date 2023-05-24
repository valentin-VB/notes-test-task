import { INote } from "./types";
export const getFormattedDate = (defaultDate: string) => {
  const date: Date = new Date(defaultDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const sortNotesByDate = (notes: INote[]) => {
  return notes.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
};

export const removeSymbols = (str: string | null) => {
  if (typeof str !== "string") return "";
  let result = "";
  const symbols = ">#*";
  for (const symbol of str) {
    if (!symbols.includes(symbol)) {
      result += symbol;
    }
  }

  return result.replace("(https://)", "");
};
