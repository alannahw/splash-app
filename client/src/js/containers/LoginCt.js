import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import UnsplashImg from "../components/UnsplashImg";
import {
  setLoginImgId,
  setLoginFormState,
  setErrorText,
  setLoginInputVal
} from "../actions/layoutActions";
import LoginFormPage from "../components/LoginFormPage";
import { createUser, fetchUserData } from "../actions/userActions";

const LoginCtStyle = styled.div`
  display: inline-block;
  width: 40%;
  vertical-align: top;
  height: 100vh;
  background: #fff;
  @media (max-width: 700px) {
    width: 100%;
    height: 66vh;
  }
`;
const UnsplashImgCtStyle = styled.div`
  display: inline-block;
  overflow: hidden;
  width: 60%;
  height: 100vh;
  background: #f4f4f4;
  @media (max-width: 700px) {
    width: 100%;
    height: 33vh;
  }
`;

class LoginCt extends Component {
  setLoginImgId = id => {
    this.props.dispatch(setLoginImgId(id));
  };
  setFormState = bool => {
    this.props.dispatch(setLoginFormState(bool));
  };
  handleCreateUser = () => {
    this.props.dispatch(createUser(this.props.loginInputVal));
  };
  handleLogin = () => {
    this.props.dispatch(fetchUserData(this.props.loginInputVal));
  };
  handleResetMessage = () => {
    this.props.dispatch(setErrorText(""));
  };
  updateInputValue = val => {
    this.props.dispatch(setLoginInputVal(val));
  };

  render() {
    const {
      imgCollection,
      imgId,
      loginFormState,
      errorText,
      loginInputVal
    } = this.props;
    return (
      <div>
        <UnsplashImgCtStyle>
          <UnsplashImg
            reloadImgId={this.setLoginImgId}
            imgs={imgCollection}
            imgId={imgId}
            w={1000}
            h={1000}
          />
        </UnsplashImgCtStyle>
        <LoginCtStyle>
          <LoginFormPage
            loginFormState={loginFormState}
            setFormState={this.setFormState}
            handleLogin={this.handleLogin}
            handleCreateUser={this.handleCreateUser}
            errorText={errorText}
            handleResetMessage={this.handleResetMessage}
            updateInputValue={this.updateInputValue}
            inputVal={loginInputVal}
          />
        </LoginCtStyle>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.user.user.name,
    imgCollection: state.layout.unsplashCollection,
    imgId: state.layout.loginImgId,
    loginFormState: state.layout.loginFormState,
    errorText: state.layout.errorText,
    loginInputVal: state.layout.loginInputVal
  };
};

export default connect(mapStateToProps)(LoginCt);
