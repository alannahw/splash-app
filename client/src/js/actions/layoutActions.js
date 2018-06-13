import * as types from "./actionTypes";

// Layout
export function setMenuState(menu) {
  return { type: types.SET_MENU_STATE, menu };
}
export function setUnsplash(collection) {
  return { type: types.SET_UNSPLASH, collection };
}
export function setLoginImgId(loginImgId) {
  return { type: types.SET_LOGINIMG_ID, loginImgId };
}
export function setLoginFormState(bool) {
  return { type: types.SET_LOGIN_FORM_STATE, loginFormState: bool };
}
export function setErrorText(errorText) {
  return { type: types.SET_ERROR_TEXT, errorText };
}
export function setSuccessText(successText) {
  return { type: types.SET_SUCCESS_TEXT, successText };
}
export function setLoginInputVal(loginInputVal) {
  return { type: types.SET_LOGIN_INPUT_VAL, loginInputVal };
}
export function setPopup(id) {
  return { type: types.SET_POPUP, id };
}
export function setChangeNameInputVal(inputVal) {
  return { type: types.SET_CHANGE_NAME_INPUT_VAL, inputVal };
}
export function setSearchVal(searchVal) {
  return { type: types.SET_SEARCH_VAL, searchVal };
}

export function fetchUnsplashData(url) {
  return async dispatch => {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const body = await response.json();
    dispatch(setUnsplash(body));
  };
}
