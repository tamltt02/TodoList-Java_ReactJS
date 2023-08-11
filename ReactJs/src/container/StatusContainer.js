import React, { Component } from "react";
import StatusComponent from "../components/StatusComponent";
import * as Action from "../action/statusAction";
import { connect } from "react-redux";
class StatusContainer extends Component {
  render() {
    return <StatusComponent {...this.props} />;
  }
  componentDidMount() {
    this.props.paginationSearchSortStatusList({
      search: "",
      page: 1,
      sortCulumn: "id",
      sortOrder: "asc",
    });
  }
}
const mapDispatchToProps = (dispatch) => {
  // connect action with redux
  return {
    getStatusList: (Data) => {
      return dispatch(Action.getStatusAction(Data));
    },
    addStatusList: (Data) => {
      return dispatch(Action.addStatusAction(Data));
    },
    deleteStatusList: (Data) => {
      return dispatch(Action.deleteStatusAction(Data));
    },
    updateStatusList: (Data) => {
      return dispatch(Action.updateStatusAction(Data));
    },

    paginationSearchSortStatusList: (Data) => {
      return dispatch(Action.paginationSearchSortStatusAction(Data));
    },
  };
};

const mapStatetoProps = (state) => {
  return {
    ListData: state.statusList.ListData,
    Message: state.statusList.message,
    totalPage: state.statusList.totalPage,
    totalItem: state.statusList.totalItem,
    page: state.statusList.page,
    errorMess: state.statusList.errorMess,
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(StatusContainer);
//mapDispatchToProps để gọi -> reducer mà trong reducer lại định nghĩa ra todoList
//muốn compoment đẩy lên web dùng componentDidMount
