import { put, takeEvery, select } from "redux-saga/effects";
import * as types from "../contants";

import {
  AddTodoDetaillist,
  DeleteTodoDetaillist,
  UpdateTodoDetaillist,
  PaginationSortSearchTodoDetaillist,
} from "../fetchAPI/ToDoDetailAPI";

export function* addDETAILlist({ payload }) {
  try {
    const res = yield AddTodoDetaillist(payload);
    // console.log(Math.ceil(res));
    yield put({
      type: types.ADD_DETAIL_SUCCESS,
      payload: {
        message: res.message,
      },
    });
    // console.log();
    const data = yield select((state) => state.TodoDetail);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_DETAIL_REQUEST,
      payload: {
        idJob: payload.job,
        page: res.totalPage,
        search: data.search,
        sortCulumn: data.sortCulumn,
        sortOrder: data.sortOrder,
      },
    });
  } catch (error) {
    yield put({
      type: types.ADD_DETAIL_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}

export function* deleteDETAILlist(action) {
  try {
    const res = yield DeleteTodoDetaillist(action.payload.id);
    console.log(res);
    yield put({
      type: types.DELETE_DETAIL_SUCCESS,
      payload: {
        message: res.message,
        totalPage: res.totalPage,
      },
    });
    const data = yield select((state) => state.TodoDetail);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_DETAIL_REQUEST,
      payload: {
        idJob: action.payload.idJob,
        page: data.totalPage,
        search: data.search,
        sortCulumn: data.sortCulumn,
        sortOrder: data.sortOrder,
      },
    });
  } catch (error) {
    yield put({
      type: types.DELETE_DETAIL_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}

export function* updateDETAILlist(action) {
  try {
    const res = yield UpdateTodoDetaillist(
      action.payload.jobDetail.id,
      action.payload
    );
    yield put({
      type: types.UPDATE_DETAIL_SUCCESS,
      payload: {
        message: res.message,
      },
    });
    const data = yield select((state) => state.TodoDetail);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_DETAIL_REQUEST,
      payload: {
        idJob: action.payload.jobDetail.job,
        page: data.page,
        search: data.search,
        sortCulumn: data.sortCulumn,
        sortOrder: data.sortOrder,
      },
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_DETAIL_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}

export function* paginationSearchSortDETAILlist(action) {
  try {
    console.log(action, "pagination");
    const res = yield PaginationSortSearchTodoDetaillist(action.payload);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_DETAIL_SUCCESS,
      payload: {
        dataTable: res.content,
        totalItem: res.totalItem,
      },
    });
  } catch (error) {
    yield put({
      type: types.PAGINATION_SEARCH_SORT_DETAIL_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
export const sagaDETAILList = [
  takeEvery(types.ADD_DETAIL_REQUEST, addDETAILlist),
  takeEvery(types.DELETE_DETAIL_REQUEST, deleteDETAILlist),
  takeEvery(types.UPDATE_DETAIL_REQUEST, updateDETAILlist),
  takeEvery(
    types.PAGINATION_SEARCH_SORT_DETAIL_REQUEST,
    paginationSearchSortDETAILlist
  ),
];
