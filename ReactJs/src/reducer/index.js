import { combineReducers } from "redux";
import statusReducer from "./StatusReducer";
import TodoReducer from "./TodoReducer";
import TodoDetailReducer from "./TodoDetailReducer";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  statusList: statusReducer,
  TodoList: TodoReducer,
  TodoDetail: TodoDetailReducer,
});

export default rootReducer;
