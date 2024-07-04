import axiosInstance from "../../axios/axiosInstance";
import { LOG_IN, LOG_OUT, SIGN_UP } from "../actionType";
const initialState = {
  type: null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        type: action.payload.type,
      };
    case SIGN_UP:
      return {
        ...state,
        token: null,
        user: null,
        type: action.payload.type,
      };
    case LOG_OUT:
      return {
        ...state,
        token: null,
        user: null,
        type: action.payload.type,
      };
    default:
      return state;
  }
};

export const login = (type, user, token) => {
  return function (dispatch, getState) {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: LOG_IN,
      payload: {
        type: type,
        user: user,
        token: token,
      },
    });
  };
};

export const signup = (name, email, password) => {
  return async function (dispatch, getState) {
    try {
      const res = await axiosInstance.post("/auth/signup", {
        name: name,
        email: email,
        password: password,
      });
      dispatch({
        type: SIGN_UP,
        payload: {
          type: null,

          token: null,
          user: null,
        },
      });
      window.location.href = "/login";
    } catch (err) {
      dispatch({
        type: "",
        payload: {
          type: null,

          token: null,
          user: null,
        },
      });
      alert("Gặp lỗi khi tạo tài khoản. Vui lý nhap lai");
    }
  };
};

export const logout = () => {
  return async function (dispatch, getState) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
      type: LOG_OUT,
      payload: {
        type: null,
        token: null,
        user: null,
      },
    };
  };
};

export default authReducer;
