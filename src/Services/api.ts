import axios from "axios";
import { IValue } from "./types";
import debounce from "lodash.debounce";
const API_ID = "ddJCk-xSjnWO7dNYTPW514";
const BASE_URL = `https://quintadb.com/apps/${API_ID}/dtypes`;
const FORM_ID = "dcTcynWQjnrOkOWPPKW4qv";
const API_KEY = "cWW7ZdPCjdWPWdW6GaAmk6";
export const FIELD_ID = "cbW6hcVWXjp4kdlblcOSoh";

export async function fetchNotes() {
  const url = `${BASE_URL}/entity/${FORM_ID}.json?rest_api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.records;
}

async function putNewTitle(id: string, newText: string, oldValues: IValue) {
  const values = { ...oldValues };
  values[FIELD_ID] = newText;
  const url = `${BASE_URL}/${id}.json?rest_api_key=${API_KEY}`;
  const response = await axios.put(url, { values });
  return response;
}

export const debouncePutNewTitle = debounce(putNewTitle, 300);

export async function deleteNote(id: string) {
  const url = `${BASE_URL}/${id}.json/?rest_api_key=${API_KEY}`;
  const response = await axios.delete(url);
  return response;
}

export async function createNewNote(text: string) {
  const url = `${BASE_URL}.json/?rest_api_key=${API_KEY}`;
  const response = await axios.post(url, {
    values: { [FIELD_ID]: text, entity_id: FORM_ID },
  });
  return response;
}
