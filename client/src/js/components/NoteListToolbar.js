import React, { Component } from "react";
import styled from "styled-components";
import { BtnStyle, Theme, InputStyle } from "../util/styled";
import DropdownMenu from "../components/DropdownMenu";

const ToolBarCtStyle = styled.div`
  width: 100%;
  padding: 10px 5px;
  box-sizing: border-box;
  @media (max-width: 640px) {
  }
`;
const LeftCtStyle = styled.div`
  display: inline-block;
  width: 70px;
  text-align: left;
`;
const RightCtStyle = styled.div`
  display: inline-block;
  width: calc(100% - 70px);
  text-align: right;
`;
const ListIconBtnStyle = BtnStyle.extend`
  &::after {
    font-family: Ionicons;
    content: "\f394";
    font-size: 21px;
  }
`;
const ThumbIconBtnStyle = BtnStyle.extend`
  &::after {
    font-family: Ionicons;
    content: "\f35c";
    font-size: 21px;
  }
`;
const SmallInputStyle = InputStyle.extend`
  padding: 3px 5px 3px 25px;
  margin: 0;
  font-size: 12px;
  @media (max-width: 700px) {
    padding: 3px 5px 3px 25px;
  }
`;
const SearchGroupStyle = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 0 0 15px;
  width: 50%;
  max-width: 150px;
`;
const SearchIconStyle = styled.div`
  &::before {
    font-family: Ionicons;
    content: "\f4a4";
    color: ${props => props.theme.lightGray};
    font-size: 16px;
    position: absolute;
    top: 4px;
    left: 8px;
  }
`;

class NoteListToolbar extends Component {
  handleIconClick = view => {
    this.props.handleSwitchListView(view);
  };

  render() {
    const {
      listView,
      sortBy,
      handleChangeSortBy,
      searchVal,
      handleSearchVal
    } = this.props;
    const ThumbColor = listView === "thumb" ? Theme.main : Theme.midGray;
    const ListColor = listView === "list" ? Theme.main : Theme.midGray;
    const sortByItems = [
      { id: "mostrecentdate", name: "Most Recent" },
      { id: "oldestdate", name: "Oldest" },
      { id: "alphabetically", name: "Title" }
    ];
    return (
      <ToolBarCtStyle>
        <LeftCtStyle>
          <ThumbIconBtnStyle
            clr={ThumbColor}
            onClick={() => this.handleIconClick("thumb")}
          />{" "}
          <ListIconBtnStyle
            clr={ListColor}
            onClick={() => this.handleIconClick("list")}
          />
        </LeftCtStyle>
        <RightCtStyle>
          <DropdownMenu
            showActiveName="true"
            items={sortByItems}
            activeItemId={sortBy}
            handleOnClick={handleChangeSortBy}
          />
          <SearchGroupStyle>
            <SmallInputStyle value={searchVal} onChange={handleSearchVal} />
            <SearchIconStyle />
          </SearchGroupStyle>
        </RightCtStyle>
      </ToolBarCtStyle>
    );
  }
}

export default NoteListToolbar;
