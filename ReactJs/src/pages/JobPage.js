import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

import TodoContainer from "../container/TodoContainer";

export default class JobPage extends Component {
  render() {
    return (
      <div>
        <TodoContainer />
      </div>
    );
  }
}
