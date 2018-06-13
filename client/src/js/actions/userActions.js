import * as types from "./actionTypes";
import { setErrorText } from "./layoutActions";
import { fetchNotesData } from "./noteActions";
import { getDefaultUser } from "../util";

// User

export function createUser(userName) {
  return async dispatch => {
    const data = getDefaultUser(userName);
    const response = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    if (!response.ok) {
      throw Error(response.statusText);
    } else if (body.error === "username taken") {
      dispatch(setErrorText("User name taken. Try another."));
    } else {
      dispatch(fetchUserData(body.name));
    }
  };
}

export function userIsLoading(bool) {
  return { type: types.USER_IS_LOADING, isLoading: bool };
}
export function updateUser(userObj) {
  return async dispatch => {
    const data = userObj;
    const response = await fetch("/users/" + userObj._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      dispatch(setUserData(body));
    }
  };
}
export function changeUserName(userObj) {
  return async dispatch => {
    const user = await dispatch(checkUserName(userObj.name));
    if (user.error === "not found") {
      dispatch(updateUser(userObj));
    } else {
      dispatch(setErrorText("Username already exists."));
    }
  };
}
export function checkUserName(userName) {
  return async dispatch => {
    const response = await fetch("/users/" + userName);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const body = await response.json();
    return body;
  };
}
export function fetchUserData(userName) {
  return async dispatch => {
    const user = await dispatch(checkUserName(userName));
    if (user.error === "not found") {
      dispatch(setErrorText("User name not found."));
    } else {
      dispatch(setUserData(user));
      dispatch(fetchNotesData(user._id));
    }
  };
}
export function setUserData(user) {
  return { type: types.SET_USER_DATA, user };
}

export function setListView(listView) {
  return { type: types.SET_LIST_VIEW, listView };
}
export function setListSortBy(sortBy) {
  return { type: types.SET_LIST_SORT_BY, sortBy };
}
