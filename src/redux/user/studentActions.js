import axios from "axios";
import { returnErrors, clearErrors } from "./../usererror/errorActions";

import {
  AUTH_ERROR,
  STUDENT_LOADED,
  STUDENT_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  NOT_LOGGEDIN,
} from "./studentTypes";

import { GET_ERRORS, CLEAR_ERRORS } from "./../usererror/errorTypes";
import { login, logout } from "../../api/studentAuth";
import { showAlert } from "../../api/alerts";

import { BASE_URL } from "../../api/AllAPIRoutes";

// check token and load user
export const loadStudent = () => {
  return async (dispatch, getState) => {
    //   User Loading
    dispatch({ type: STUDENT_LOADING });

    axios
      .get(`${BASE_URL}/api/v1/student/me`, tokenConfigStudent(getState))
      .then((res) => {
        const userData = {
          user: res.data.data.data,
          token: localStorage.getItem("jwt"),
          profile: "Student",
        };
        console.log(userData);
        dispatch({
          type: STUDENT_LOADED,
          payload: userData,
        });
        return true;
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(
          returnErrors(err.response.data.message, err.response.statusCode)
        );
        dispatch({
          type: NOT_LOGGEDIN,
        });
      });
    return false;
  };
};
// Login User
export const loginStudent = ({ email, password }) => {
  return async (dispatch, getState) => {
    try {
      const user = await login({ email, password });
      console.log("happen");

      const userData = {
        user: user,
        token: localStorage.getItem("jwt"),
        profile: "Student",
      };

      dispatch({
        type: STUDENT_LOADED,
        payload: userData,
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userData,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch(returnErrors("Unable to Login", 401, "LOGIN_FAIL"));
    }
  };
};

// Register User
export const registerStudent =
  ({ email, password, passwordConfirm, name }) =>
  (dispatch, getState) => {
    const h = JSON.stringify({ name, email, password, passwordConfirm });
    console.log("register");
    axios
      .post(
        `${BASE_URL}/api/v1/student/signup`,
        h,
        tokenConfigStudent(getState)
      )
      .then((res) => {
        const userData = {
          user: res.data.data.user,
          token: res.data.token,
          profile: "Student",
        };
        localStorage.setItem("jwt", res.data.token);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: userData,
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
        showAlert(
          "success",
          "Signed up successfully! A welcoming email has been sent to you to your registerd mail-id."
        );
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            "REGISTER_FAIL"
          )
        );
        showAlert("error", err.response.data.message);
      });
  };

// logout
export const logoutStudent = () => async (dispatch) => {
  await logout();

  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

// Set up config.headers and token
export const tokenConfigStudent = (getState) => {
  // Get token from localStorage=
  const token = getState().user.token;

  //   Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if token add to headers
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
};
