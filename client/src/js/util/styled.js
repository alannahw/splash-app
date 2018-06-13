import styled from "styled-components";
import { LightenDarkenColor } from "./";

export const Theme = {
  main: "#1dd6c9",
  ultralightGray: "#f2f2f2",
  lightGray: "#dddddd",
  midGray: "#aaaaaa",
  darkGray: "#333333",
  error: "#f44542",
  success: "#1dd6c9"
};
export const BtnSimpleStyle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
export const BtnStyle = styled.button`
  transition: color 0.3s;
  font-size: 14px;
  background: none;
  border: none;
  color: ${props => (props.clr ? props.clr : props.theme.main)};
  cursor: pointer;
  &:hover {
    color: ${props =>
      props.clr
        ? LightenDarkenColor(props.clr, 20)
        : LightenDarkenColor(props.theme.main, 20)};
  }
`;
export const OutlineBtnStyle = BtnStyle.extend`
  transition: color 0.3s, border-color 0.3s;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid ${props => props.theme.main};
  &:hover {
    border-color: ${props => props.theme.mainHighlight};
  }
`;

export const ThumbnailStyle = styled.div`
  transition: background 0.3s;
  margin: 3px;
  width: 200px;
  height: 200px;
  display: inline-block;
  text-align: center;
  position: relative;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  vertical-align: top;
  &:hover {
    background: ${props => props.theme.ultralightGray};
  }
  @media (max-width: 640px) {
  }
`;

export const InputStyle = styled.input`
  font-size: 14px;
  width: 100%;
  padding: 10px;
  border: solid 1px #ddd;
  box-sizing: border-box;
  border-radius: 3px;
  margin: 5px 0;
  &::placeholder {
    color: #ccc;
  }
  @media (max-width: 700px) {
    padding: 8px;
  }
`;
export const MainBtnStyle = styled.button`
  transition: background 0.3s;
  background: ${props => props.theme.main};
  border: none;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 3px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
  &:hover {
    background: ${props => LightenDarkenColor(props.theme.main, 25)};
  }
`;
export const MessageStyle = styled.div`
  margin: 10px 0;
  color: ${props => props.theme.midGray};
  font-size: 12px;
  text-align: center;
`;
export const ErrorMessageStyle = MessageStyle.extend`
  color: ${props => props.theme.error};
`;
export const SuccessMessageStyle = MessageStyle.extend`
  color: ${props => props.theme.success};
`;
