import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../reducer/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import logger from "redux-logger";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger),
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
sagaMiddleware.run(rootSaga);
export default store;
