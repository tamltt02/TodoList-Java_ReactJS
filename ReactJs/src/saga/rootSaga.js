import { all } from "redux-saga/effects";
import { sagaStatusList } from "./StatusSaga";
import { sagaTodoList } from "./TodoSaga";
import { sagaDETAILList } from "./TodoDetailSaga";
export default function* rootSaga() {
  yield all([...sagaTodoList]);
  yield all([...sagaStatusList]);
  yield all([...sagaDETAILList]);
}
