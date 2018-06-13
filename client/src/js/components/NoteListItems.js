import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import NoteListItem from "../components/NoteListItem";

const FullWidthStyle = styled.div`
  width: 100%;
`;

class NoteListItems extends Component {
  render() {
    const { handleAddNote, handleOpenNote, handleDeleteNote } = this.props;
    return (
      <FullWidthStyle>
        {this.props.notes.map(n => {
          return (
            <NoteListItem
              key={`notelistitem_${n._id}`}
              note={n}
              handleOpenNote={handleOpenNote}
              handleDeleteNote={handleDeleteNote}
            />
          );
        })}
      </FullWidthStyle>
    );
  }
}

export default NoteListItems;
