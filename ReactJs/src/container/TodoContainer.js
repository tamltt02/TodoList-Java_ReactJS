import React, { Component } from "react";
import TodoComponent from "../components/TodoComponent";
import * as Action from "../action/TodoAction";
import * as ActionDetail from "../action/toDoDetailAction";
import * as ActionStatus from "../action/statusAction";
import { connect } from "react-redux";
class TodoContainer extends Component {
  render() {
    return <TodoComponent {...this.props} />;
  }
  componentDidMount() {
    this.props.paginationSearchSortTodoList({
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
    addTodoList: (Data) => {
      return dispatch(Action.addTodoListAction(Data));
    },
    deleteTodoList: (Data) => {
      return dispatch(Action.deleteTodoListAction(Data));
    },
    updateTodoList: (Data) => {
      return dispatch(Action.updateTodoListAction(Data));
    },

    paginationSearchSortTodoList: (Data) => {
      return dispatch(Action.paginationSearchSortTodoListAction(Data));
    },
    paginationSearchSorttoDoDetail: (Data) => {
      return dispatch(ActionDetail.paginationSearchSorttoDoDetailAction(Data));
    },
    getStatusList: () => {
      return dispatch(ActionStatus.getStatusAction());
    },
  };
};

const mapStatetoProps = (state) => {
  return {
    ListData: state.TodoList.ListData,
    Message: state.TodoList.message,
    totalPage: state.TodoList.totalPage,
    totalItem: state.TodoList.totalItem,
    page: state.TodoList.page,
    errorMess: state.TodoList.errorMess,
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(TodoContainer);
//mapDispatchToProps để gọi -> reducer mà trong reducer lại định nghĩa ra todoList
//muốn compoment đẩy lên web dùng componentDidMount
