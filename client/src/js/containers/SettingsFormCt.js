import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  BtnStyle,
  InputStyle,
  MainBtnStyle,
  ErrorMessageStyle,
  SuccessMessageStyle
} from "../util/styled";
import { changeUserName } from "../actions/userActions";
import PopUp from "../components/PopUp";
import {
  setPopup,
  setChangeNameInputVal,
  setErrorText,
  setSuccessText
} from "../actions/layoutActions";

const CtStyle = styled.div`
  text-align: center;
  width: 100%;
  max-width: 350px;
  padding: 20px 40px 40px;
  box-sizing: border-box;
  background: #fff;
  margin: auto;
`;
const SubmitBtnStyle = MainBtnStyle.extend`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  margin: 5px 0;
`;
const HeadingStyle = styled.div`
  width: 100%;
  margin: 20px 0;
  font-size: 16px;
  font-weight: 700;
  font-family: Arvo;
`;

const TextStyle = styled.div`
  width: 100%;
  font-size: 12px;
  text-align: left;
  margin: 10px 0;
`;

class SettingsFormCt extends Component {
  handleSetInputVal = e => {
    const { errorText, successText, dispatch } = this.props;
    this.props.dispatch(setChangeNameInputVal(e.target.value));
    if (errorText || successText) {
      this.props.dispatch(setSuccessText(""));
      this.props.dispatch(setErrorText(""));
    }
  };
  handleSubmitForm = () => {
    const { user, changeNameInputVal, dispatch } = this.props;
    if (changeNameInputVal === user.name) {
      dispatch(setErrorText("Please select a different username."));
    } else {
      dispatch(changeUserName({ ...user, name: changeNameInputVal }));
    }
  };

  handleOnClose = () => {
    this.props.dispatch(setChangeNameInputVal(""));
    this.props.dispatch(setPopup(""));
    this.props.dispatch(setSuccessText(""));
    this.props.dispatch(setErrorText(""));
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.user.name !== nextProps.user.name) {
      this.props.dispatch(setSuccessText("Username updated"));
    }
  }
  render() {
    const { errorText, successText } = this.props;
    let error = "";
    let success = "";
    if (errorText) {
      error = <ErrorMessageStyle>{errorText}</ErrorMessageStyle>;
    }
    if (successText) {
      success = <SuccessMessageStyle>{successText}</SuccessMessageStyle>;
    }
    return (
      <PopUp onClose={this.handleOnClose}>
        <CtStyle>
          <HeadingStyle>Change User Name</HeadingStyle>
          <TextStyle>
            Select a new user name. This will be the user name you use to log in
            with in future.
          </TextStyle>
          <InputStyle
            value={this.changeNameInputVal}
            onChange={this.handleSetInputVal}
          />
          {error}
          <SubmitBtnStyle onClick={this.handleSubmitForm}>
            Change Username
          </SubmitBtnStyle>
          {success}
        </CtStyle>
      </PopUp>
    );
  }
}

const mapStateToProps = state => {
  return {
    popupId: state.layout.popupId,
    changeNameInputVal: state.layout.changeNameInputVal,
    errorText: state.layout.errorText,
    successText: state.layout.successText,
    user: state.user.user
  };
};

export default connect(mapStateToProps)(SettingsFormCt);
