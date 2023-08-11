import React, { Component } from "react";
import { Modal, Input, Select, Button } from "antd";
import "./ModalCommom.css";
import { Isremote } from "../contants";

export default class ModalComomDetail extends Component {
  render() {
    let listTranfrom = [];
    listTranfrom = this.props.dataStatus.map((index) => {
      return {
        label: index.ten,
        value: index.idStatus,
      };
    });
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
          <label>Tên chi tiết Công việc:</label>
          <Input
            onChange={this.props.onDataInputChange}
            value={this.props.inputValue}
            name="ten"
          />

          <Select
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.props.changeStatus}
            value={this.props.selectValue}
            options={listTranfrom}
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
              ? "Thêm công việc chi tiết"
              : this.props.Title == Isremote.IsUpdate
              ? "Sửa công việc chi tiết"
              : "Xóa công việc chi tiết"
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
