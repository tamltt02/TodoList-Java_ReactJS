import React, { Component } from "react";
import { Button, Table, Tag, Pagination, Select, Input } from "antd";
import { openNotification } from "./config";
import ModalComom from "../commom/ModalComom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Isremote, LIMIT } from "../contants";
import "../css/Items.css";
import TodoDetailContainer from "../container/TodoDetailContainer";
const { Search } = Input;
export default class TodoComponent extends Component {
  state = {
    job: {
      ten: "",
    },
    id: "",
    search: "",
    currentPage: 1,
    sortOrder: "asc",
    sortCulumn: "idJob",
    isOpen: false,
    confirmLoading: false,
    title: "",
    value: "",
    okText: "",
    TodoDetail: [],
    isOpenDetail: false,
    idJob: "",
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
        this.setState({
          isOpen: true,
          title: Isremote.IsUpdate,
          value: record.ten,
          okText: "Update",
        });
        this.setState((prevState) => {
          const jobUpdate = {
            id: record.idJob,
            ...prevState.job,
            ten: record.ten,
          };
          return { job: jobUpdate };
        });
      }
      if (isRemote == "xóa") {
        this.setState({
          isOpen: true,
          title: Isremote.IsDelete,
          value: record.ten,
          okText: "Submit",
          id: record.idJob,
        });
      }
    };
    const handleClose = () => {
      this.setState({
        isOpen: !this.state.isOpen,
        isOpenDetail: false,
        value: "",
      });
    };
    const handleCloseDetail = () => {
      this.setState({
        isOpenDetail: false,
      });
      const option = {
        idJob: this.state.idJob,
        sortOrder: "asc",
        sortCulumn: "idJob",
        page: 1,
        search: "",
      };
      this.props.paginationSearchSortTodoList(option);
    };
    const handleOk = () => {
      if (this.state.title == Isremote.IsCreate) {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
          this.setState({ isOpen: !this.state.isOpen });
          this.setState({ confirmLoading: !this.state.confirmLoading });
          this.setState({ value: "" });
          this.props.addTodoList(this.state.job);
          openNotification("topRight", messageA);
        }, 2000);
      }
      if (this.state.title == Isremote.IsUpdate) {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
          this.setState({ isOpen: !this.state.isOpen });
          this.setState({ confirmLoading: !this.state.confirmLoading });
          const data = {
            job: this.state.job,
            page: this.state.currentPage,
          };
          this.props.updateTodoList(data);
          openNotification("topRight", messageA);
        }, 2000);
      }
      if (this.state.title == Isremote.IsDelete) {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
          this.setState({ isOpen: !this.state.isOpen });
          this.setState({ confirmLoading: !this.state.confirmLoading });
          this.props.deleteTodoList(this.state.id);
          openNotification("topRight", messageA);
        }, 2000);
      }
    };
    const handleDataChange = (e) => {
      this.setState({ value: e.target.value });
      const { name, value } = e.target;
      this.setState((prevState) => {
        const jobupdate = { ...prevState.job, [name]: value };
        return { job: jobupdate };
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
        this.props.paginationSearchSortTodoList(options);
      }
      if (this.state.search != "") {
        const option = {
          sortOrder: this.state.sortOrder,
          sortCulumn: this.state.sortCulumn,
          page: page,
          search: this.state.search,
        };
        this.props.paginationSearchSortTodoList(option);
      }
    };
    const handelDetailData = (record) => {
      // this.props.getDetail({ page: 1, idJob: record.id });
      console.log(record, "record");
      this.setState({
        isOpenDetail: true,
        idJob: record.idJob,
      });

      setTimeout(() => {}, 100);
      const option = {
        idJob: record.idJob,
        sortOrder: "asc",
        sortCulumn: "idJobDetail",
        page: 1,
        search: "",
      };
      console.log("option", option);
      this.props.paginationSearchSorttoDoDetail(option);
      this.props.getStatusList();
    };
    const columns = [
      {
        title: "Id",
        dataIndex: "idJob",
        key: "idJob",
        // render: (text) => <a>{text}</a>,
      },
      {
        title: "Tên",
        dataIndex: "ten",
        key: "ten",
        render: (_, record) => (
          <a
            onClick={() => {
              handelDetailData(record);
            }}
          >
            {record.ten}
          </a>
        ),
      },
      {
        title: "Tiến độ",
        dataIndex: "tiLe",
        key: "tiLe",
        // render: (text) => <a>{text}</a>,
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <>
            <Button
              onClick={() => {
                handleOpen("sửa", record);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                handleOpen("xóa", record);
              }}
              style={{ marginLeft: "12px" }}
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

      this.props.paginationSearchSortTodoList(option);
    };
    return (
      <div>
        <div className="header">
          <h1>Chào mừng đến với trang Todo</h1>
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
        <TodoDetailContainer
          idJob={this.state.idJob}
          isOpennn={this.state.isOpenDetail}
          close={handleCloseDetail}
          handleOk={handleCloseDetail}
        />
      </div>
    );
  }
}
