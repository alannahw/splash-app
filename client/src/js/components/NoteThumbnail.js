import React, { Component } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { ThumbnailStyle, BtnStyle } from "../util/styled";
import { LightenDarkenColor } from "../util";

const ImgCtStyle = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100px;
  @media (max-width: 640px) {
  }
`;
const ContentStyle = styled.div`
  width: 100%;
  height: 100px;
`;
const TextCtStyle = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
  @media (max-width: 640px) {
  }
`;
const TitleStyle = styled.div`
  font-size: 16px;
  font-family: Arvo;
  width: 100%;
  max-height: 55px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media (max-width: 640px) {
  }
`;
const DateStyle = styled.div`
  font-size: 12px;
  margin-top: 5px;
  color: #ccc;
  @media (max-width: 640px) {
  }
`;
const DeleteBtnStyle = BtnStyle.extend`
  position: absolute;
  top: -5px;
  right: -5px;
  color: ${props => props.theme.midGray};
  background: #fff;
  border: 1px solid ${props => props.theme.lightGray};
  border-radius: 13px;
  height: 25px;
  width: 25px;
  z-index: 50;
  &::after {
    font-family: Ionicons;
    content: "\f2d7";
    font-size: 14px;
  }
`;

class NoteThumbnail extends Component {
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
      <ThumbnailStyle>
        <ImgCtStyle
          src={`https://picsum.photos/640/320/?image=${unsplashId}`}
          onClick={this.handleOpenNoteClick}
        />
        <ContentStyle onClick={this.handleOpenNoteClick}>
          <DateStyle>
            - <Moment format="ddd D MMM YYYY">{date}</Moment> -
          </DateStyle>
          <TextCtStyle>
            <TitleStyle>{title}</TitleStyle>
          </TextCtStyle>
        </ContentStyle>
        <DeleteBtnStyle onClick={this.handleDeleteBtnClick} />
      </ThumbnailStyle>
    );
  }
}

export default NoteThumbnail;
