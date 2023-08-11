import React, { Component } from "react";
import { Button, Table, Tag, Pagination, Select, message, Input } from "antd";
import { openNotification } from "./config";
import ModalComom from "../commom/ModalComom";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Isremote, LIMIT } from "../contants";
import "../css/Items.css";
const { Search } = Input;

export default class StatusComponent extends Component {
  state = {
    status: {
      ten: "",
    },
    id: "",
    search: "",
    currentPage: 1,
    sortOrder: "asc",
    sortCulumn: "idStatus",
    isOpen: false,
    confirmLoading: false,
    title: "",
    value: "",
    okText: "",
  };

  render() {
    const data = this.props?.ListData;
    const messageA = this.props?.Message;
    const handleOpen = (isRemote, record) => {
      if (isRemote == "thêm") {
        this.setState({
          isOpen: true,
          title: Isremote.IsCreate,
          okText: "Submit",
          value: "",
        });
      }
      if (isRemote == "sửa") {
        console.log(record);
        this.setState({
          isOpen: true,
          title: Isremote.IsUpdate,
          value: record.ten,
          okText: "Update",
        });
        this.setState((prevState) => {
          const statusUpdate = {
            id: record.idStatus,
            ...prevState.status,
            ten: record.ten,
          };
          return { status: statusUpdate };
        });
      }
      if (isRemote == "xóa") {
        this.setState({
          isOpen: true,
          title: Isremote.IsDelete,
          value: record.ten,
          okText: "Submit",
          id: record.idStatus,
        });
      }
    };
    const handleClose = () => {
      this.setState({ isOpen: !this.state.isOpen, value: "" });
    };
    const handleOk = async () => {
      if (this.state.title == Isremote.IsCreate) {
        this.setState({ confirmLoading: true });
        setTimeout(async () => {
          this.setState({ isOpen: !this.state.isOpen });
          this.setState({ confirmLoading: !this.state.confirmLoading });
          this.setState({ value: "" });
          await this.props.addStatusList(this.state.status);
          await openNotification("topRight", messageA);
        }, 2000);
      }
      if (this.state.title == Isremote.IsUpdate) {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
          this.setState({ isOpen: !this.state.isOpen });
          this.setState({ confirmLoading: !this.state.confirmLoading });
          const data = {
            status: this.state.status,
            page: this.state.currentPage,
          };
          this.props.updateStatusList(data);
          openNotification("topRight", messageA);
        }, 2000);
      }
      if (this.state.title == Isremote.IsDelete) {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
          this.setState({ isOpen: !this.state.isOpen });
          this.setState({ confirmLoading: !this.state.confirmLoading });
          this.props.deleteStatusList(this.state.id);
          openNotification("topRight", messageA);
        }, 2000);
      }
    };
    const handleDataChange = (e) => {
      this.setState({ value: e.target.value });
      const { name, value } = e.target;
      this.setState((prevState) => {
        const statusupdate = { ...prevState.status, [name]: value };
        return { status: statusupdate };
      });
    };

    const onChangePagination = (page) => {
      // sort+page
      if (this.state.search == "") {
        this.setState({ currentPage: page });
        const options = {
          search: "",
          sortOrder: this.state.sortOrder,
          sortCulumn: this.state.sortCulumn,
          page: page,
        };
        this.props.paginationSearchSortStatusList(options);
      }
      if (this.state.search != "") {
        const option = {
          sortOrder: this.state.sortOrder,
          sortCulumn: this.state.sortCulumn,
          page: page,
          search: this.state.search,
        };
        this.props.paginationSearchSortStatusList(option);
      }
    };
    const columns = [
      {
        title: "Id",
        dataIndex: "idStatus",
        key: "idStatus",
        // render: (text) => <a>{text}</a>,
      },
      {
        title: "ten",
        dataIndex: "ten",
        key: "ten",
        // render: (text) => <a>{text}</a>,
      },
      // {
      //   title: "Tags",
      //   key: "tags",
      //   dataIndex: "tags",
      //   render: (_, { tags }) => (
      //     <>
      //       {tags.map((tag) => {
      //         let color = tag.length > 5 ? "geekblue" : "green";
      //         if (tag === "loser") {
      //           color = "volcano";
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   ),
      // },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <>
            <Button
              onClick={() => {
                handleOpen("sửa", record);
              }}
              style={{ color: "blue" }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                handleOpen("xóa", record);
              }}
              style={{ marginLeft: "12px", color: "red" }}
            >
              <DeleteOutlined />
            </Button>
          </>
        ),
      },
    ];

    const handleChange = (value) => {
      this.setState(
        () => ({ sortOrder: value }),
        () => {
          onChangePagination(this.state.currentPage);
        }
      );
    };
    const items = [
      {
        label: "Từ nhỏ đến lớn",
        value: "asc",
      },
      {
        label: "Từ lớn đến nhỏ",
        value: "desc",
      },
    ];

    const onSearch = (value) => {
      this.setState({ search: value });
      const option = {
        sortOrder: this.state.sortOrder,
        sortCulumn: this.state.sortCulumn,
        page: 1,
        search: value,
      };
      this.props.paginationSearchSortStatusList(option);
    };
    // react k nhận bt được phần tử con nào thuộc phần tử cha nào  => sinh ra key để nhận biết qua index
    return (
      <div>
        <div className="header">
          <h1>Chào mừng đến với trang Status</h1>
        </div>
        <div className="head">
          <Search
            className="search"
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <Select
            className="select"
            defaultValue="asc"
            onChange={handleChange}
            options={items}
          />
          <div className="button-create">
            <Button onClick={() => handleOpen("thêm")}>Thêm</Button>
          </div>
        </div>
        <ModalComom
          isOpen={this.state.isOpen}
          handleClose={handleClose}
          handleOk={handleOk}
          confirmLoading={this.state.confirmLoading}
          Title={this.state.title}
          onDataInputChange={handleDataChange}
          inputValue={this.state.value}
          okText={this.state.okText}
        />
        <Table columns={columns} dataSource={data} pagination={false} />
        <Pagination
          onChange={onChangePagination}
          current={this.props.page}
          total={this.props.totalItem}
          defaultPageSize={LIMIT}
        />
      </div>
    );
  }
}
