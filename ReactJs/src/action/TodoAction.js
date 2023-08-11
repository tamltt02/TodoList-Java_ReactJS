import * as types from "../contants";

function addTodoListAction(payload) {
  return {
    type: types.ADD_TODOLIST_REQUEST, // tên action
    payload,
  };
}
function deleteTodoListAction(payload) {
  return {
    type: types.DELETE_TODOLIST_REQUEST, // tên action
    payload,
  };
}

function updateTodoListAction(payload) {
  return {
    type: types.UPDATE_TODOLIST_REQUEST, // tên action
    payload,
  };
}

function paginationSearchSortTodoListAction(payload) {
  return {
    type: types.PAGINATION_SEARCH_SORT_TODOLIST_REQUEST, // tên action
    payload,
  };
}
export {
  addTodoListAction,
  deleteTodoListAction,
  updateTodoListAction,
  paginationSearchSortTodoListAction,
};
