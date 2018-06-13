import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import NoteListItems from "../components/NoteListItems";
import NoteListToolbar from "../components/NoteListToolbar";
import NoteThumbnails from "../components/NoteThumbnails";
import { ThumbnailStyle, OutlineBtnStyle } from "../util/styled";
import { sortNotes, editUserSettingsProperty, filterNotes } from "../util";
import {
  createNote,
  setCurrentNoteId,
  setCurrentNoteState,
  deleteNote
} from "../actions/noteActions";
import { setListView, setListSortBy, updateUser } from "../actions/userActions";
import { setSearchVal } from "../actions/layoutActions";

const CtStyle = styled.div`
  max-width: 644px;
  padding: 10px;
  box-sizing: border-box;
  margin: auto;
`;

class NotesListCt extends Component {
  handleAddNote = () => {
    const { dispatch, user } = this.props;
    dispatch(createNote(user._id));
  };
  handleOpenNote = note => {
    this.props.dispatch(setCurrentNoteState(note));
  };
  handleSwitchListView = view => {
    const { dispatch, user } = this.props;
    const details = editUserSettingsProperty(user, "listView", view);
    dispatch(updateUser(details));
  };
  handleChangeSortBy = order => {
    const { dispatch, user } = this.props;
    const details = editUserSettingsProperty(user, "sortBy", order.id);
    dispatch(updateUser(details));
  };
  handleSearchVal = e => {
    this.props.dispatch(setSearchVal(e.target.value));
  };
  handleDeleteNote = (noteId, noteTitle) => {
    const msg =
      "Do you really want to delete the note '" +
      noteTitle +
      "'? You will lose all the contents permanently.";
    if (window.confirm(msg)) {
      this.props.dispatch(deleteNote(noteId));
    }
  };
  render() {
    const { listView, filteredNotes, sortBy, searchVal } = this.props;
    let sortedNotes = sortNotes(filteredNotes, sortBy);
    let noteListView = "";
    if (listView === "list") {
      noteListView = (
        <NoteListItems
          notes={sortedNotes}
          handleAddNote={this.handleAddNote}
          handleOpenNote={this.handleOpenNote}
          handleDeleteNote={this.handleDeleteNote}
        />
      );
    } else {
      noteListView = (
        <NoteThumbnails
          notes={sortedNotes}
          handleAddNote={this.handleAddNote}
          handleOpenNote={this.handleOpenNote}
          handleDeleteNote={this.handleDeleteNote}
        />
      );
    }
    return (
      <CtStyle>
        <NoteListToolbar
          listView={listView}
          sortBy={sortBy}
          handleSwitchListView={this.handleSwitchListView}
          handleChangeSortBy={this.handleChangeSortBy}
          handleSearchVal={this.handleSearchVal}
          searchVal={searchVal}
        />
        {noteListView}
      </CtStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    filteredNotes: filterNotes(state.notes.notes, state.layout.searchVal),
    imgCollection: state.layout.unsplashCollection,
    user: state.user.user,
    listView: state.user.user.settings.listView,
    sortBy: state.user.user.settings.sortBy,
    searchVal: state.layout.searchVal
  };
};

export default connect(mapStateToProps)(NotesListCt);
