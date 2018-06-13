import React, { Component } from "react";
import styled from "styled-components";
import {
  BtnStyle,
  InputStyle,
  MainBtnStyle,
  MessageStyle
} from "../util/styled";
import { LightenDarkenColor } from "../util";

const LargeInputStyle = InputStyle.extend`
  font-size: 16px;
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  margin: 5px;
  @media (max-width: 700px) {
    padding: 15px;
  }
`;

const FormCtStyle = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  top: 0;
`;

const LoginBtnStyle = MainBtnStyle.extend`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  font-size: 16px;
  margin: 5px 5px 10px;
  @media (max-width: 700px) {
    padding: 15px;
  }
`;

class LoginForm extends Component {
  handleFormBtnClick = () => {
    this.props.handleFormSubmit();
  };
  toggleFormState = () => {
    this.props.setFormState(!this.props.loginFormState);
  };
  handleInputChange = e => {
    const {
      updateInputValue,
      loginMessageText,
      handleResetMessage
    } = this.props;
    updateInputValue(e.target.value);
    if (loginMessageText) {
      handleResetMessage("");
    }
  };
  handleKeyPress = e => {
    e.key === "Enter" && this.handleFormBtnClick();
  };
  componentWillUnmount() {
    this.props.updateInputValue("");
  }
  render() {
    const {
      placeholder,
      inputVal,
      btnText,
      switchText,
      errorText
    } = this.props;
    let message = "";
    if (errorText) {
      message = <MessageStyle>{errorText}</MessageStyle>;
    }

    return (
      <FormCtStyle>
        <LargeInputStyle
          placeholder={placeholder}
          onChange={this.handleInputChange}
          value={inputVal}
          onKeyPress={this.handleKeyPress}
        />
        {message}
        <LoginBtnStyle
          disabled={inputVal.length < 1}
          onClick={this.handleFormBtnClick}
        >
          {btnText}
        </LoginBtnStyle>
        <BtnStyle onClick={this.toggleFormState}>{switchText}</BtnStyle>
      </FormCtStyle>
    );
  }
}

export default LoginForm;
