import React, { Component } from "react";
import styled from "styled-components";
import { BtnStyle, InputStyle, MainBtnStyle } from "../util/styled";

const BgStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;
const PopupStyle = styled.div`
  background: white;
  position: relative;
  padding: 10px;
  overflow: scroll;
  border-radius: 10px;
`;
const CloseBtnStyle = BtnStyle.extend`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${props => props.theme.midGray};
  &::after {
    font-family: Ionicons;
    content: "\f2d7";
    font-size: 18px;
  }
`;

class PopUp extends Component {
  close = () => {
    this.props.onClose();
  };
  render() {
    return (
      <BgStyle>
        <PopupStyle>
          <CloseBtnStyle onClick={this.close} />
          {this.props.children}
        </PopupStyle>
      </BgStyle>
    );
  }
}

export default PopUp;
