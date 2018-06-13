import React, { Component } from "react";
import "../../css/App.css";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import { fetchUnsplashData, setLoginImgId } from "../actions/layoutActions";
import { fetchNotesData } from "../actions/noteActions";
import LoginCt from "./LoginCt";
import MainCt from "./MainCt";
import { Theme } from "../util/styled";
import { getRandomNum } from "../util";
const AppCtStyled = styled.div`
  width: 100%;
  font-family: "Montserrat", sans-serif;
  color: #333;
`;

class App extends Component {
  componentDidMount() {
    const { userId, dispatch } = this.props;
    const imgId = getRandomNum(999);
    dispatch(fetchUnsplashData("https://picsum.photos/list"));
    dispatch(setLoginImgId(imgId));
    if (userId) {
      dispatch(fetchNotesData(userId));
    }
  }
  render() {
    const { userName } = this.props;
    const page = userName ? <MainCt /> : <LoginCt />;
    return (
      <ThemeProvider theme={Theme}>
        <AppCtStyled>{page}</AppCtStyled>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.user.user.name,
    userId: state.user.user._id,
    currNote: state.notes.currNote
  };
};

export default connect(mapStateToProps)(App);
