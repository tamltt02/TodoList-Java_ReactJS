import { put, takeEvery, select } from "redux-saga/effects";
import * as types from "../contants";

import {
  AddStatuslist,
  GetStatuslist,
  DeleteStatuslist,
  UpdateStatuslist,
  PaginationSortSearchStatuslist,
} from "../fetchAPI/StatusAPI";

export function* getStatuslist() {
  try {
    const res = yield GetStatuslist();
    yield put({
      type: types.GET_STATUS_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.ADD_STATUS_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
export function* addStatuslist({ payload }) {
  try {
    const res = yield AddStatuslist(payload);
    // console.log(Math.ceil(res));
    yield put({
      type: types.ADD_STATUS_SUCCESS,
      payload: {
        message: res.message,
      },
    });
    const data = yield select((state) => state.statusList);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_STATUS_REQUEST,
      payload: {
        page: res.totalPage,
        search: data.search,
        sortCulumn: data.sortCulumn,
        sortOrder: data.sortOrder,
      },
    });
  } catch (error) {
    yield put({
      type: types.ADD_STATUS_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}

export function* deleteStatuslist(action) {
  try {
    // console.log("đã vô delete");
    const res = yield DeleteStatuslist(action.payload);
    console.log(res);
    yield put({
      type: types.DELETE_STATUS_SUCCESS,
      payload: {
        message: res.message,
        totalPage: res.totalPage,
      },
    });
    const data = yield select((state) => state.statusList);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_STATUS_REQUEST,
      payload: {
        page: data.totalPage,
        search: data.search,
        sortCulumn: data.sortCulumn,
        sortOrder: data.sortOrder,
      },
    });
  } catch (error) {
    yield put({
      type: types.DELETE_STATUS_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}

export function* updateStatuslist({ payload }) {
  try {
    const res = yield UpdateStatuslist(payload.status.id, payload);
    yield put({
      type: types.UPDATE_STATUS_SUCCESS,
      payload: {
        message: res.message,
      },
    });
    const data = yield select((state) => state.statusList);

    yield put({
      type: types.PAGINATION_SEARCH_SORT_STATUS_REQUEST,
      payload: {
        page: data.page,
        search: data.search,
        sortCulumn: data.sortCulumn,
        sortOrder: data.sortOrder,
      },
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_STATUS_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}

export function* paginationSearchSortStatuslist(action) {
  try {
    const res = yield PaginationSortSearchStatuslist(action.payload);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_STATUS_SUCCESS,
      payload: {
        dataTable: res.content,
        totalItem: res.totalItem,
      },
    });
  } catch (error) {
    yield put({
      type: types.PAGINATION_SEARCH_SORT_STATUS_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
export const sagaStatusList = [
  takeEvery(types.ADD_STATUS_REQUEST, addStatuslist),
  takeEvery(types.GET_STATUS_REQUEST, getStatuslist),
  takeEvery(types.DELETE_STATUS_REQUEST, deleteStatuslist),
  takeEvery(types.UPDATE_STATUS_REQUEST, updateStatuslist),
  takeEvery(
    types.PAGINATION_SEARCH_SORT_STATUS_REQUEST,
    paginationSearchSortStatuslist
  ),
];
