import axios from "axios";
import { IValue } from "./types";
import debounce from "lodash.debounce";

const API_ID = "beb8ojj15oo4oEod7cSWKv";
const BASE_URL = `https://quintadb.com/apps/${API_ID}/dtypes`;
const FORM_ID = "agi33dRsPhpA0GWPpdTGSv";
const API_KEY = "ddQSk6WPXdIPZdMJVdShDR";
export const FIELD_ID = "ddGLe7j8nnE4oDAfXnWQrQ";

export async function fetchNotes() {
  const url = `${BASE_URL}/entity/${FORM_ID}.json?rest_api_key=${API_KEY}`;
  const response = await axios.get(url);

  return response.data.records;
}

async function putNewTitle(id: string, newText: string, oldValues: IValue) {
  console.log("oldValues:", oldValues);
  console.log("newText:", newText);
  const values = { ...oldValues };
  values[FIELD_ID] = newText;
  console.log("values:", values);
  const url = `${BASE_URL}/${id}.json?rest_api_key=${API_KEY}`;
  const response = await axios.put(url, { values });
  console.log(response);
  return response;
}

export const debouncePutNewTitle = debounce(putNewTitle, 700);

export async function deleteNote(id: string) {
  const url = `${BASE_URL}/${id}.json/?rest_api_key=${API_KEY}`;
  const response = await axios.delete(url);

  console.log(response);
  return response;
}

export async function createNewNote(text: string) {
  const url = `${BASE_URL}.json/?rest_api_key=${API_KEY}`;
  const response = await axios.post(url, {
    values: { [FIELD_ID]: text, entity_id: FORM_ID },
  });
  return response;
}