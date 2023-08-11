import React, { Component } from "react";
import { Modal, Input } from "antd";
import "./ModalCommom.css";
import { Isremote } from "../contants";

export default class ModalComom extends Component {
  render() {
    let content;
    if (this.props.Title == Isremote.IsDelete) {
      content = (
        <p>
          Bạn có chắc chắn muốn xóa
          <span style={{ color: "red" }}>{this.props.inputValue} </span>
          không ?
        </p>
      );
    } else {
      content = (
        <>
          <label>Tên Công việc:</label>
          <Input
            onChange={this.props.onDataInputChange}
            value={this.props.inputValue}
            name="ten"
          />
        </>
      );
    }
    return (
      <div>
        <Modal
          className={
            this.props.Title == Isremote.IsCreate
              ? "Modal-Create"
              : this.props.Title == Isremote.IsUpdate
              ? "Modal-Update"
              : "Modal-Delete"
          }
          okText={this.props.okText}
          title={
            this.props.Title == Isremote.IsCreate
              ? "Thêm công việc"
              : this.props.Title == Isremote.IsUpdate
              ? "Sửa công việc"
              : "Xóa công việc"
          }
          open={this.props.isOpen}
          onOk={this.props.handleOk}
          onCancel={this.props.handleClose}
          confirmLoading={this.props.confirmLoading}
        >
          {content}
        </Modal>
      </div>
    );
  }
}
