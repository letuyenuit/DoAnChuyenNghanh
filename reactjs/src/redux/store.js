import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./auth/authSlice";
import { thunk } from "redux-thunk";
const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
