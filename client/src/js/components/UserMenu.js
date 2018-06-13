import React, { Component } from "react";
import DropdownMenu from "../components/DropdownMenu";

class UserMenu extends Component {
  render() {
    const settings = [
      { id: "settings_username", name: "Change User Name" },
      //{id:'settings_password', name:'Change Password'},
      { id: "settings_logout", name: "Log Out" }
    ];
    return (
      <DropdownMenu
        menuTitle={this.props.userName}
        items={settings}
        handleOnClick={this.props.handleSettingsClick}
      />
    );
  }
}


export default UserMenu;
