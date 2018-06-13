import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import NotesListCt from "./NotesListCt";
import NavCt from "./NavCt";
import NoteEditCt from "./NoteEditCt";
import SettingsFormCt from "./SettingsFormCt";
//import EmailDetailsCt from "./EmailDetailsCt";

const CtStyle = styled.div`
  width: 100%;
  margin: auto;
`;

class MainCt extends Component {
  render() {
    const { currNoteState, popupId } = this.props;
    let popup = "";
    if (popupId === "settings_username") {
      popup = <SettingsFormCt />;
    }
    // else if (popupId === "email_details") {
    //   popup = <EmailDetailsCt />;
    // }
    let page = (
      <CtStyle>
        <NavCt />
        <NotesListCt />
      </CtStyle>
    );
    if (currNoteState) {
      page = <NoteEditCt />;
    }
    return (
      <CtStyle>
        {popup}
        {page}
      </CtStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    currNoteState: state.notes.currNoteState,
    popupId: state.layout.popupId
  };
};

export default connect(mapStateToProps)(MainCt);
