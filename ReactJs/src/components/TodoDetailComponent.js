import React, { Component } from "react";
import { Button, Table, Tag, Pagination, Select, Input, Modal } from "antd";
import { openNotification } from "./config";
import ModalComomDetail from "../commom/ModalComomDetail";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Isremote, LIMIT } from "../contants";
import "../css/Items.css";
const { Search } = Input;
export default class TodoDetailComponent extends Component {
  state = {
    jobDetail: {
      ten: "",
      status: "",
      job: "",
    },
    id: "",
    search: "",
    currentPage: 1,
    sortOrder: "asc",
    sortCulumn: "idJobDetail",
    isOpen: false,
    confirmLoading: false,
    title: "",
    value: "",
    okText: "",
    datastatus: [],
    idStatus: "",
  };

  render() {
    const data = this.props?.TodoDetail;
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
          idStatus: record.status,
          okText: "Update",
        });
        this.setState((prevState) => {
          const jobUpdate = {
            id: record.idJobDetail,
            ...prevState.jobDetail,
            ten: record.ten == null ? this.state.jobDetail.ten : record.ten,
            job: this.props.idJob,
            status: record.idStatus,
          };
          return { jobDetail: jobUpdate };
        });
      }
      if (isRemote == "xóa") {
        this.setState({
          isOpen: true,
          title: Isremote.IsDelete,
          value: record.ten,
          idStatus: record.idStatus,
          okText: "Submit",
          id: record.idJobDetail,
        });
      }
    };
    const handleClose = () => {
      this.setState({ isOpen: !this.state.isOpen, value: "" });
    };
    const handleOk = () => {
      if (this.state.title == Isremote.IsCreate) {
        console.log(this.state.jobDetail);
        this.setState({ confirmLoading: true });
        setTimeout(() => {
          this.setState({ isOpen: !this.state.isOpen });
          this.setState({ confirmLoading: !this.state.confirmLoading });
          this.setState({ value: "" });
          this.props.addtoDoDetail(this.state.jobDetail);
          openNotification("topRight", messageA);
        }, 2000);
      }
      if (this.state.title == Isremote.IsUpdate) {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
          this.setState({ isOpen: !this.state.isOpen });
          this.setState({ confirmLoading: !this.state.confirmLoading });
          const data = {
            jobDetail: this.state.jobDetail,
            page: this.state.currentPage,
          };
          this.props.updatetoDoDetail(data);
          openNotification("topRight", messageA);
        }, 2000);
      }
      if (this.state.title == Isremote.IsDelete) {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
          this.setState({ isOpen: !this.state.isOpen });
          this.setState({ confirmLoading: !this.state.confirmLoading });
          const data = {
            idJob: this.props.idJob,
            id: this.state.id,
          };
          this.props.deletetoDoDetail(data);
          openNotification("topRight", messageA);
        }, 2000);
      }
    };
    const handleDataChange = (e) => {
      this.setState({ value: e.target.value });
      const { name, value } = e.target;
      this.setState((prevState) => {
        const jobupdate = {
          ...prevState.jobDetail,
          [name]: value,
          job: this.props.idJob,
        };
        console.log(jobupdate);
        return { jobDetail: jobupdate };
      });
    };

    const StatusChange = (value) => {
      this.setState({ idStatus: value });
      console.log("value", value);
      this.setState((prevState) => {
        const job = { ...prevState.jobDetail, status: value };
        console.log(job);
        return { jobDetail: job };
      });
    };

    const onChangePagination = (page) => {
      // sort+page
      if (this.state.search == "") {
        this.setState({ currentPage: page });
        const options = {
          idJob: this.props.idJob,
          search: "",
          sortOrder: this.state.sortOrder,
          sortCulumn: this.state.sortCulumn,
          page: page,
        };
        this.props.paginationSearchSorttoDoDetail(options);
      }
      if (this.state.search != "") {
        const option = {
          idJob: this.props.idJob,
          sortOrder: this.state.sortOrder,
          sortCulumn: this.state.sortCulumn,
          page: page,
          search: this.state.search,
        };
        this.props.paginationSearchSorttoDoDetail(option);
      }
    };

    const columns = [
      {
        title: "Id",
        dataIndex: "idJobDetail",
        key: "idJobDetail",
        // render: (text) => <a>{text}</a>,
      },
      {
        title: "Tên",
        dataIndex: "ten",
        key: "ten",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <>
            <Button
              onClick={() => {
                console.log(record, "recordddd");
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
        idJob: this.props.idJob,
        sortOrder: this.state.sortOrder,
        sortCulumn: this.state.sortCulumn,
        page: 1,
        search: value,
      };
      this.props.paginationSearchSorttoDoDetail(option);
    };
    return (
      <Modal
        style={{ width: "870px" }}
        open={this.props.isOpennn}
        onCancel={this.props.close}
        onOk={this.props.close}
      >
        <div>
          <div className="header">
            <h3>Chào mừng đến với trang Todo</h3>
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
              <Button
                style={{ width: "80px" }}
                onClick={() => handleOpen("thêm")}
              >
                Thêm
              </Button>
            </div>
          </div>
          <ModalComomDetail
            isOpen={this.state.isOpen}
            handleClose={handleClose}
            handleOk={handleOk}
            confirmLoading={this.state.confirmLoading}
            Title={this.state.title}
            onDataInputChange={handleDataChange}
            inputValue={this.state.value}
            okText={this.state.okText}
            dataStatus={this.props?.ListStatus}
            changeStatus={StatusChange}
            selectValue={this.state.idStatus}
          />
          <Table columns={columns} dataSource={data} pagination={false} />

          <Pagination
            onChange={onChangePagination}
            current={this.props.page}
            total={this.props.totalItem}
            defaultPageSize={LIMIT}
          />
        </div>
      </Modal>
    );
  }
}
