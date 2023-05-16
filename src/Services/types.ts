import React from "react";
export interface IValue {
  [key: string]: string;
}

export interface INote {
  id: string;
  updated_at: string;
  values: IValue;
}

export interface ICurrentNote {
  id: string;
  values: IValue;
  noteText: string;
  updated_at: string;
}

export interface ICurrentNoteContext {
  currentNote: ICurrentNote | null;
  setCurrentNote: React.Dispatch<React.SetStateAction<ICurrentNote | null>>;
}

export interface ICurrentNoteText {
  currentText: string | null;
  setCurrentText: React.Dispatch<React.SetStateAction<string>>;
}

export interface IFilter {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export interface IModalOpen {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInputState {
  isBlur: boolean;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBlur: React.Dispatch<React.SetStateAction<boolean>>;
}
