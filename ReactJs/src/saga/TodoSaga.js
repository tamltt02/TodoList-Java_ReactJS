import { put, takeEvery, select } from "redux-saga/effects";
import * as types from "../contants";

import {
  AddTodolist,
  DeleteTodolist,
  UpdateTodolist,
  PaginationSortSearchTodolist,
} from "../fetchAPI/ToDoAPI";

export function* addTodolist({ payload }) {
  try {
    const res = yield AddTodolist(payload);
    // console.log(Math.ceil(res));
    yield put({
      type: types.ADD_TODOLIST_SUCCESS,
      payload: {
        message: res.message,
      },
    });
    const data = yield select((state) => state.TodoList);
    console.log(res);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_TODOLIST_REQUEST,
      payload: {
        page: res.totalPage,
        search: data.search,
        sortCulumn: data.sortCulumn,
        sortOrder: data.sortOrder,
      },
    });
  } catch (error) {
    yield put({
      type: types.ADD_TODOLIST_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}

export function* deleteTodolist(action) {
  try {
    // console.log("đã vô delete");
    const res = yield DeleteTodolist(action.payload);
    console.log(res);
    yield put({
      type: types.DELETE_TODOLIST_SUCCESS,
      payload: {
        message: res.message,
        totalPage: res.totalPage,
      },
    });
    const data = yield select((state) => state.TodoList);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_TODOLIST_REQUEST,
      payload: {
        page: data.totalPage,
        search: data.search,
        sortCulumn: data.sortCulumn,
        sortOrder: data.sortOrder,
      },
    });
  } catch (error) {
    yield put({
      type: types.DELETE_TODOLIST_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}

export function* updateTodolist({ payload }) {
  try {
    // console.log(action.payload, "payload");
    const res = yield UpdateTodolist(payload.job.id, payload);
    yield put({
      type: types.UPDATE_TODOLIST_SUCCESS,
      payload: {
        message: res.message,
      },
    });
    const data = yield select((state) => state.TodoList);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_TODOLIST_REQUEST,
      payload: {
        page: data.page,
        search: data.search,
        sortCulumn: data.sortCulumn,
        sortOrder: data.sortOrder,
      },
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_TODOLIST_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}

export function* paginationSearchSortTodolist(action) {
  try {
    console.log(action, "pagination");
    const res = yield PaginationSortSearchTodolist(action.payload);
    yield put({
      type: types.PAGINATION_SEARCH_SORT_TODOLIST_SUCCESS,
      payload: {
        dataTable: res.content,
        totalItem: res.totalItem,
      },
    });
  } catch (error) {
    yield put({
      type: types.PAGINATION_SEARCH_SORT_TODOLIST_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
export const sagaTodoList = [
  takeEvery(types.ADD_TODOLIST_REQUEST, addTodolist),
  takeEvery(types.DELETE_TODOLIST_REQUEST, deleteTodolist),
  takeEvery(types.UPDATE_TODOLIST_REQUEST, updateTodolist),
  takeEvery(
    types.PAGINATION_SEARCH_SORT_TODOLIST_REQUEST,
    paginationSearchSortTodolist
  ),
];
