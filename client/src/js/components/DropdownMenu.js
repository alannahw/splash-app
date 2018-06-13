import React, { Component } from "react";
import styled from "styled-components";
import { LightenDarkenColor } from "../util";

const Header = styled.div`
  transition: color 0s;
  font-size: 12px;
  color: ${props => props.theme.main};
  &::after {
    font-size: 12px;
    font-family: "Ionicons";
    content: " \f3d0";
  }
  &:focus {
    outline: none;
  }
`;
const HeaderPart = styled.div`
  display: inline-block;
  margin: 0 1px;
  color: ${props => (props.clr ? props.clr : props.theme.main)};
`;
const Divider = styled.div`
  display: inline-block;
  margin: 0 10px;
  color: ${props => (props.clr ? props.clr : props.theme.main)};
`;
const Menu = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:focus {
    pointer-events: none;
    outline: none;
  }
  ul {
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    list-style-type: none;
    padding-left: 0;
    min-width: 150px;
    background: #fff;
    border-radius: 5px;
  }
  li {
    width: 100%;
  }
`;

const MenuBtn = styled.button`
  transition: background 0.3s;
  cursor: pointer;
  width: 100%;
  text-align: left;
  color: ${props => props.theme.main};
  font-size: 12px;
  padding: 10px;
  border-radius: 3px;
  border: none;
  background: ${props => (props.active === "true" ? "#f7f7f7" : "#fff")};
  &:hover {
    background: #f7f7f7;
  }
`;

const MenuContent = styled.div`
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: -5px;
  z-index: 1;

  /* use opacity to fake immediate toggle */
  opacity: 0;
  visibility: hidden;
  border: 1px solid #ddd;
  border-radius: 3px;
  transition: visibility 0.8s, opacity 0.3s;
  ${Menu}:focus & {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
`;

class MenuItem extends Component {
  clickEvent = () => {
    this.props.handleOnClick(this.props.item);
  };
  render() {
    const { item, activeItemId } = this.props;
    return (
      <li>
        <MenuBtn
          id={item.id}
          onClick={this.clickEvent}
          active={item.id === activeItemId ? "true" : "false"}
        >
          {item.name}
        </MenuBtn>
      </li>
    );
  }
}

class DropdownMenu extends Component {
  render() {
    const {
      menuTitle,
      classNames,
      items,
      handleOnClick,
      activeItemId,
      showActiveName
    } = this.props;
    const title = menuTitle ? menuTitle : " ";
    const activeItem = items.find(i => i.id === activeItemId);
    const divider =
      menuTitle && showActiveName ? <Divider clr="#aaa">|</Divider> : "";
    const active = showActiveName ? activeItem.name : "";
    return (
      <div style={{ display: "inline-block" }}>
        <Menu tabIndex="0">
          <Header>
            <HeaderPart clr="#aaa">{title}</HeaderPart>
            {divider}
            <HeaderPart>{active}</HeaderPart>
          </Header>
          <MenuContent>
            <ul>
              {items ? (
                items.map(i => (
                  <MenuItem
                    item={i}
                    handleOnClick={handleOnClick}
                    activeItemId={activeItemId}
                    key={`menuitem_${i.id}`}
                  />
                ))
              ) : (
                <span />
              )}
            </ul>
          </MenuContent>
        </Menu>
      </div>
    );
  }
}

export default DropdownMenu;
