import { combineReducers } from "redux";
import * as types from "../actions/actionTypes";
import produce from "immer";

function user(
  state = {
    userIsLoading: false,
    user: {}
    // user: {
    //   _id: "5ad6f77678e3980ca1ff0122",
    //   name: "Chloe",
    //   settings: { listView: "thumb", sortBy: "oldestdate" }
    // }
  },
  action
) {
  // produces draft of current state and outputs next immutable state
  return produce(state, draft => {
    switch (action.type) {
      case types.SET_USER_DATA: {
        draft.user = action.user;
        return;
      }
      case types.USER_IS_LOADING: {
        draft.isLoading = action.isLoading;
        return;
      }
      case types.SET_LIST_VIEW: {
        draft.settings.listView = action.listView;
        return;
      }
      case types.SET_LIST_SORT_BY: {
        draft.settings.sortBy = action.sortBy;
        return;
      }
    }
  });
}

function notes(
  state = {
    notes: [],
    isLoading: false,
    hasErrored: false,
    //currNoteId: "",
    currNoteState: ""
  },
  action
) {
  // produces draft of current state and outputs next immutable state
  return produce(state, draft => {
    switch (action.type) {
      case types.SET_NOTES: {
        draft.notes = action.notes;
        return;
      }
      case types.NOTES_IS_LOADING: {
        draft.isLoading = action.isLoading;
        return;
      }
      case types.NOTES_HAS_ERRORED: {
        draft.hasErrored = action.hasErrored;
        return;
      }
      // case types.SET_CURRENT_NOTE_ID: {
      //   draft.currNoteId = action.noteId;
      //   return;
      // }
      case types.SET_CURRENT_NOTE_STATE: {
        draft.currNoteState = action.noteObj;
        return;
      }
    }
  });
}

function layout(
  state = {
    menu: false,
    unsplashCollection: [],
    loginImgId: null,
    loginFormState: false,
    errorText: "",
    succesText: "",
    loginInputVal: "",
    popupId: "",
    settingsNameInputVal: "",
    searchVal: ""
  },
  action
) {
  // produces draft of current state and outputs next immutable state
  return produce(state, draft => {
    switch (action.type) {
      case types.SET_MENU_STATE: {
        draft.menu = action.menu;
        return;
      }
      case types.SET_UNSPLASH: {
        draft.unsplashCollection = action.collection;
        return;
      }
      case types.SET_LOGINIMG_ID: {
        draft.loginImgId = action.loginImgId;
        return;
      }
      case types.SET_LOGIN_FORM_STATE: {
        draft.loginFormState = action.loginFormState;
        return;
      }
      case types.SET_ERROR_TEXT: {
        draft.errorText = action.errorText;
        return;
      }
      case types.SET_SUCCESS_TEXT: {
        draft.successText = action.successText;
        return;
      }
      case types.SET_LOGIN_INPUT_VAL: {
        draft.loginInputVal = action.loginInputVal;
        return;
      }
      case types.SET_POPUP: {
        draft.popupId = action.id;
        return;
      }
      case types.SET_CHANGE_NAME_INPUT_VAL: {
        draft.changeNameInputVal = action.inputVal;
        return;
      }
      case types.SET_SEARCH_VAL: {
        draft.searchVal = action.searchVal;
        return;
      }
    }
  });
  //return state;
}

// Combine Reducers
var reducers = combineReducers({
  user,
  notes,
  layout
});

export default reducers;
