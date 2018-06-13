import * as types from "./actionTypes";
import { getDefaultNote } from "../util";

// Notes
export function setNotes(notes) {
  return { type: types.SET_NOTES, notes };
}
export function notesIsLoading(bool) {
  return { type: types.NOTES_IS_LOADING, isLoading: bool };
}
export function fetchNotesData(userId) {
  return async dispatch => {
    dispatch(notesIsLoading(true));
    const response = await fetch("notes/user/" + userId);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    dispatch(notesIsLoading(false));
    const body = await response.json();
    dispatch(setNotes(body));
  };
}
export function createNote(userId) {
  return async dispatch => {
    const data = getDefaultNote(userId);
    const response = await fetch("/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      dispatch(fetchNotesData(userId));
      dispatch(setCurrentNoteState(body));
    }
  };
}
export function updateNote(noteObj) {
  return async dispatch => {
    const data = noteObj;
    const response = await fetch("/notes/note/" + noteObj._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      dispatch(fetchNotesData(noteObj.userId));
    }
  };
}
export function deleteNote(noteId) {
  return async (dispatch, getState) => {
    const { user } = getState();
    const response = await fetch("/notes/note/" + noteId, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    dispatch(fetchNotesData(user.user._id));
  };
}
export function setCurrentNoteState(noteObj) {
  return { type: types.SET_CURRENT_NOTE_STATE, noteObj };
}
