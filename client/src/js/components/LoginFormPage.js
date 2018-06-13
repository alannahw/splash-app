import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LoginForm from "./LoginForm";

const FormPageStyle = styled.div`
  width: 300px;
  height: 360px;
  overflow: hidden;
  margin: auto;
  margin-top: calc(50vh - 170px);
  box-sizing: border-box;
  @media (max-width: 700px) {
    margin-top: 20px;
  }
`;
const HeaderStyle = styled.div`
  font-size: 85px;
  font-family: "Arvo";
  text-align: center;
  @media (max-width: 700px) {
    font-size: 60px;
  }
`;
const SubHeaderStyle = styled.div`
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

const PosRelStyle = styled.div`
  position: relative;
  margin: 20px 10px;
`;

class LoginFormPage extends Component {
  handleLoginBtnClick = () => {};
  render() {
    const {
      handleCreateUser,
      handleLogin,
      loginFormState,
      errorText,
      handleResetMessage,
      updateInputValue,
      inputVal
    } = this.props;

    const CreateUserForm = (
      <CSSTransition
        key="loginform_1"
        timeout={300}
        classNames="slideInFromLeft"
      >
        <LoginForm
          placeholder="Create username..."
          btnText="Create Account"
          switchText="Login"
          handleFormSubmit={handleCreateUser}
          loginFormState={loginFormState}
          setFormState={this.props.setFormState}
          errorText={errorText}
          handleResetMessage={handleResetMessage}
          updateInputValue={updateInputValue}
          inputVal={inputVal}
        />
      </CSSTransition>
    );
    const LoginUserForm = (
      <CSSTransition
        key="loginform_2"
        timeout={300}
        classNames="slideInFromRight"
      >
        <LoginForm
          placeholder="Enter username..."
          btnText="Log In"
          switchText="Create account"
          handleFormSubmit={handleLogin}
          loginFormState={loginFormState}
          setFormState={this.props.setFormState}
          errorText={errorText}
          handleResetMessage={handleResetMessage}
          updateInputValue={updateInputValue}
          inputVal={inputVal}
        />
      </CSSTransition>
    );
    const userForm = loginFormState ? LoginUserForm : CreateUserForm;
    return (
      <FormPageStyle>
        <HeaderStyle>Splash</HeaderStyle>
        <SubHeaderStyle>Creative Writing Helper</SubHeaderStyle>
        <PosRelStyle>
          <TransitionGroup>{userForm}</TransitionGroup>
        </PosRelStyle>
      </FormPageStyle>
    );
  }
}

export default LoginFormPage;
