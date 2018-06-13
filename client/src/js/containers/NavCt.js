import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { BtnStyle, OutlineBtnStyle, Theme } from "../util/styled";
import { setUserData } from "../actions/userActions";
import { setNotes, createNote } from "../actions/noteActions";
import { setPopup } from "../actions/layoutActions";
import DropdownMenu from "../components/DropdownMenu";
import UserMenu from "../components/UserMenu";

const CtStyle = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #ddd;
  vertical-align: bottom;
`;
const ToolBarStyle = styled.div`
  display: inline-block;
  width: 50%;
  text-align: right;
`;
const LogoCtStyle = styled.div`
  display: inline-block;
  width: 50%;
  font-family: Arvo;
`;
const SpacerStyle = styled.div`
  display: inline-block;
  width: 20px;
`;

class NavCt extends Component {
  handleLogOutClick = () => {
    this.props.dispatch(setUserData("", ""));
    this.props.dispatch(setNotes([]));
  };
  handleNewNoteClick = () => {
    this.props.dispatch(createNote(this.props.userId));
  };
  handleSettingsClick = item => {
    if (item.id === "settings_logout") {
      this.handleLogOutClick();
    } else if (item.id === "settings_username") {
      this.props.dispatch(setPopup(item.id));
    }
  };
  render() {
    return (
      <CtStyle>
        <LogoCtStyle>Splash</LogoCtStyle>
        <ToolBarStyle>
          <UserMenu
            handleSettingsClick={this.handleSettingsClick}
            userName={this.props.userName}
          />
          <SpacerStyle />
          <OutlineBtnStyle onClick={this.handleNewNoteClick}>
            New Note
          </OutlineBtnStyle>
        </ToolBarStyle>
      </CtStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    userId: state.user.user._id,
    userName: state.user.user.name
  };
};

export default connect(mapStateToProps)(NavCt);
