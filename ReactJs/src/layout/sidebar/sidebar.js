import React, { Component } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import "./index.css";
import { NavLink } from "react-router-dom";

export default class sidebar extends Component {
  state = {
    current: "1",
  };
  render() {
    const items = [
      {
        label: <NavLink to={"/job"}>Quản lý công việc</NavLink>,
        key: "1",
      },
      {
        label: <NavLink to={"/status"}>Quản lý trạng thái</NavLink>,
        key: "2",
      },
    ];
    return (
      <div className="container">
        <div className="avata">
          <Avatar shape="square" size={100} icon={<UserOutlined />} />
        </div>
        <div className="nabar">
          <Menu
            openKeys={["1"]}
            selectedKeys={[this.state.current]}
            mode="vertical"
            items={items}
            theme="light"
            onClick={(e) => {
              this.setState({ current: e.key });
            }}
          />
        </div>
      </div>
    );
  }
}
