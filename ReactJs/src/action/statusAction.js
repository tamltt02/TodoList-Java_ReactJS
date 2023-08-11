import * as types from "../contants";

function addStatusAction(payload) {
  return {
    type: types.ADD_STATUS_REQUEST, // tên action
    payload,
  };
}
function deleteStatusAction(payload) {
  return {
    type: types.DELETE_STATUS_REQUEST, // tên action
    payload,
  };
}

function updateStatusAction(payload) {
  return {
    type: types.UPDATE_STATUS_REQUEST, // tên action
    payload,
  };
}

function paginationSearchSortStatusAction(payload) {
  return {
    type: types.PAGINATION_SEARCH_SORT_STATUS_REQUEST, // tên action
    payload,
  };
}

function getStatusAction(payload) {
  return {
    type: types.GET_STATUS_REQUEST, // tên action
    payload,
  };
}
export {
  addStatusAction,
  deleteStatusAction,
  updateStatusAction,
  paginationSearchSortStatusAction,
  getStatusAction,
};
