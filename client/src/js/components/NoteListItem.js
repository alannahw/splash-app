import React, { Component } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { BtnStyle } from "../util/styled";
import { LightenDarkenColor } from "../util";

const CtStyle = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  text-align: left;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  transition: background 0.3s;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.ultralightGray};
  }
  &:last-child {
    border-bottom: 1px solid #ddd;
  }
`;
const RowLinkStyle = styled.div`
  width: calc(100% - 30px);
  display: flex;
  align-items: center;
`;
const ImgCtStyle = styled.img`
  object-fit: cover;
  width: 30px;
  height: 30px;
  vertical-align: bottom;
  @media (max-width: 640px) {
  }
`;
const TitleStyle = styled.div`
  width: calc(65% - 25px);
  display: inline-block;
  font-size: 14px;
  padding: 7px 0;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 640px) {
    font-size: 12px;
  }
`;
const DateStyle = styled.div`
  width: calc(35% - 15px);
  display: inline-block;
  font-size: 12px;
  text-align: right;
  padding: 7px 0;
  color: #ccc;
  @media (max-width: 640px) {
    font-size: 10px;
  }
`;
const DeleteBtnStyle = BtnStyle.extend`
  display: inline-block;
  margin-left: 5px;
  box-sizing: border-box;
  color: ${props => props.theme.midGray};
  &::after {
    font-family: Ionicons;
    content: "\f37f";
    font-size: 14px;
  }
`;

class NoteListItem extends Component {
  handleOpenNoteClick = () => {
    this.props.handleOpenNote(this.props.note);
  };
  handleDeleteBtnClick = () => {
    const { note, handleDeleteNote } = this.props;
    handleDeleteNote(note._id, note.title);
  };

  render() {
    const { title, date, unsplashId } = this.props.note;
    return (
      <CtStyle>
        <RowLinkStyle onClick={this.handleOpenNoteClick}>
          <ImgCtStyle
            src={`https://picsum.photos/640/320/?image=${unsplashId}`}
          />
          <TitleStyle>{title}</TitleStyle>
          <DateStyle>
            <Moment format="ddd, D MMM YYYY">{date}</Moment>
          </DateStyle>
        </RowLinkStyle>
        <DeleteBtnStyle onClick={this.handleDeleteBtnClick} />
      </CtStyle>
    );
  }
}

export default NoteListItem;
