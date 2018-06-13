import React, { Component } from "react";
import styled from "styled-components";
import NoteThumbnail from "../components/NoteThumbnail";
import { ThumbnailStyle } from "../util/styled";

const SteppedStyle = styled.div`
  margin: auto;
  @media (max-width: 640px) {
    max-width: 440px;
  }
  @media (max-width: 440px) {
    max-width: 220px;
  }
`;
const ThumbnailAddStyle = ThumbnailStyle.extend`
  vertical-align: top;
  position: relative;
  color: #ddd;
  padding-top: 130px;
  box-sizing: border-box;
  &::after {
    font-family: Ionicons;
    content: "\f2bf";
    font-size: 50px;
    position: absolute;
    top: 50px;
    left: 80px;
  }
`;

class NoteThumbnails extends Component {
  render() {
    const { handleAddNote, handleOpenNote, handleDeleteNote } = this.props;
    return (
      <SteppedStyle>
        <ThumbnailAddStyle onClick={handleAddNote}>
          Start new note
        </ThumbnailAddStyle>
        {this.props.notes.map(n => {
          return (
            <NoteThumbnail
              key={`notethumnail_${n._id}`}
              note={n}
              handleOpenNote={handleOpenNote}
              handleDeleteNote={handleDeleteNote}
            />
          );
        })}
      </SteppedStyle>
    );
  }
}

export default NoteThumbnails;
