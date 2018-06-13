import * as types from "./actionTypes";

// Layout
export function setMenuState(menu) {
  return { type: types.SET_MENU_STATE, menu };
}
