import React, { Component } from "react";
import WrapBody from "./PageWrapper/body/body";
import SiderWrap from "./sidebar/sidebar";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

export default class index extends Component {
  render() {
    const { Sider, Content } = Layout;
    return (
      <Layout>
        <Sider>
          <SiderWrap />
        </Sider>
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
