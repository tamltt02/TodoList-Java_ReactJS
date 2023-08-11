import React, { Component } from "react";
import TodoDetailComponent from "../components/TodoDetailComponent";
import * as Action from "../action/toDoDetailAction";
import * as ActionStatus from "../action/statusAction";
import { connect } from "react-redux";
class TodoDetailContainer extends Component {
  render() {
    return <TodoDetailComponent {...this.props} />;
  }
  // componentDidMount() {
  //   this.props.paginationSearchSorttoDoDetail({
  //     idJob: this.props.idJob,
  //     search: "",
  //     page: 1,
  //     sortCulumn: "id",
  //     sortOrder: "asc",
  //   });
  // }
}
const mapDispatchToProps = (dispatch) => {
  // connect action with redux
  return {
    addtoDoDetail: (Data) => {
      return dispatch(Action.addtoDoDetailAction(Data));
    },
    deletetoDoDetail: (Data) => {
      return dispatch(Action.deletetoDoDetailAction(Data));
    },
    updatetoDoDetail: (Data) => {
      return dispatch(Action.updatetoDoDetailAction(Data));
    },

    paginationSearchSorttoDoDetail: (Data) => {
      return dispatch(Action.paginationSearchSorttoDoDetailAction(Data));
    },
  };
};

const mapStatetoProps = (state) => {
  return {
    TodoDetail: state.TodoDetail.ListData,
    ListStatus: state.statusList.ListData,
    Message: state.TodoDetail.message,
    totalPage: state.TodoDetail.totalPage,
    totalItem: state.TodoDetail.totalItem,
    page: state.TodoDetail.page,
    errorMess: state.TodoDetail.errorMess,
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(TodoDetailContainer);
//mapDispatchToProps để gọi -> reducer mà trong reducer lại định nghĩa ra AddTodoDetaillistList
//muốn compoment đẩy lên web dùng componentDidMount
