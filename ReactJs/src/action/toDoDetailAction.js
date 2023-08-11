import * as types from "../contants";

function addtoDoDetailAction(payload) {
  return {
    type: types.ADD_DETAIL_REQUEST, // tên action
    payload,
  };
}
function deletetoDoDetailAction(payload) {
  return {
    type: types.DELETE_DETAIL_REQUEST, // tên action
    payload,
  };
}

function updatetoDoDetailAction(payload) {
  return {
    type: types.UPDATE_DETAIL_REQUEST, // tên action
    payload,
  };
}

function paginationSearchSorttoDoDetailAction(payload) {
  return {
    type: types.PAGINATION_SEARCH_SORT_DETAIL_REQUEST, // tên action
    payload,
  };
}
export {
  addtoDoDetailAction,
  deletetoDoDetailAction,
  updatetoDoDetailAction,
  paginationSearchSorttoDoDetailAction,
};
