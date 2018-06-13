import React, { Component } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import _ from "lodash";
import { connect } from "react-redux";
import { BtnStyle } from "../util/styled";
import Textarea from "react-textarea-autosize";
import {
  deleteNote,
  updateNote,
  setCurrentNoteId,
  setCurrentNoteState,
  emailNote
} from "../actions/noteActions";
import UnsplashImg from "../components/UnsplashImg";

const CtStyle = styled.div`
  width: 100%;

  perspective: 1px;
  transform-style: preserve-3d;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
`;
const ParallaxImgCtStyle = styled.div`
  display: flex;
  flex: 1 0 auto;
  transform: translateZ(-1px) scale(2) translateY(-13%);
  z-index: -1;

  position: relative;
  max-width: 100%;
  height: 66vh;
  overflow: hidden;
`;
const NoteInnerStyle = styled.div`
  max-width: 644px;
  padding: 10px;
  box-sizing: border-box;
  margin: auto;
  @media (max-width: 640px) {
    padding: 20px;
  }
`;
const NoteCtStyle = styled.div`
  display: block;
  position: relative;
  z-index: 1;

  width: 100%;
  background: #fff;
  min-height: 100vh;
`;

const IconBtnStyle = BtnStyle.extend`
  position: absolute;
  right: 20px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  &:hover {
    color: #fff;
  }
`;
const MenuBtnStyle = IconBtnStyle.extend`
  top: 20px;
  &::after {
    font-family: Ionicons;
    content: "\f20d";
    font-size: 28px;
  }
`;
const TextareaStyle = styled(Textarea)`
  width: 100%;
  border: none;
  resize: none;
  &::placeholder {
    color: ${props => props.theme.lightGray};
  }
  &:focus {
    outline: none;
  }
`;
const TitleStyle = TextareaStyle.extend`
  margin: 20px auto;
  text-align: center;
  font-size: 36px;
  font-family: Arvo;
  @media (max-width: 640px) {
    margin: 15px auto;
    font-size: 24px;
  }
`;
const DateStyle = styled.div`
  margin: 10px auto;
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
  color: #ccc;
`;
const BodyStyle = TextareaStyle.extend`
  margin: 20px auto 120px;
  line-height: 1.5em;
  text-align: left;
  font-size: 16px;
  @media (max-width: 640px) {
    margin: 15px auto 60px;
    font-size: 14px;
  }
`;

class NoteEditCt extends Component {
  constructor() {
    super();
    this.debounceUpdate = _.debounce(this.debounceUpdate, 1000);
  }
  handleExitNote = async () => {
    const { dispatch, currNoteState } = this.props;
    await this.handleUpdateNote(currNoteState);
    this.props.dispatch(setCurrentNoteState(""));
  };
  handleReloadImgId = async imgId => {
    const { currNoteState, dispatch } = this.props;
    await dispatch(
      setCurrentNoteState({ ...currNoteState, unsplashId: imgId })
    );
    this.debounceUpdate();
  };
  handleBodyChange = async e => {
    const { currNoteState, dispatch } = this.props;
    await dispatch(
      setCurrentNoteState({ ...currNoteState, body: e.target.value })
    );
    this.debounceUpdate();
  };
  handleTitleChange = async e => {
    const { currNoteState, dispatch } = this.props;
    await dispatch(
      setCurrentNoteState({ ...currNoteState, title: e.target.value })
    );
    this.debounceUpdate();
  };
  debounceUpdate = () => {
    const { currNoteState } = this.props;
    this.handleUpdateNote(currNoteState);
  };
  handleUpdateNote = note => {
    const { dispatch } = this.props;
    dispatch(updateNote(note));
  };
  render() {
    const { currNoteState, imgs } = this.props;
    let noteImg = "";
    let title = "";
    let date = new Date().setHours(0, 0, 0, 0);
    let body = "";
    if (Object.keys(currNoteState).length) {
      noteImg = (
        <UnsplashImg
          h={700}
          w={1700}
          imgId={currNoteState.unsplashId}
          imgs={imgs}
          reloadImgId={this.handleReloadImgId}
        />
      );
      title = currNoteState.title;
      date = currNoteState.date;
      body = currNoteState.body;
    }

    return (
      <CtStyle>
        <ParallaxImgCtStyle>
          {noteImg}
          <MenuBtnStyle onClick={this.handleExitNote} />
        </ParallaxImgCtStyle>

        <NoteCtStyle>
          <NoteInnerStyle>
            <TitleStyle
              value={title}
              placeholder="New Note"
              onChange={this.handleTitleChange}
            />
            <DateStyle>
              <Moment format="ddd D MMM YYYY">{date}</Moment>
            </DateStyle>
            <BodyStyle
              value={body}
              placeholder="..."
              onChange={this.handleBodyChange}
            />
          </NoteInnerStyle>
        </NoteCtStyle>
      </CtStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    imgs: state.layout.unsplashCollection,
    user: state.user.user,
    currNoteState: state.notes.currNoteState
  };
};

export default connect(mapStateToProps)(NoteEditCt);
