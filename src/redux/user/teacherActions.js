import axios from "axios";
import { returnErrors, clearErrors } from "./../usererror/errorActions";

import {
  AUTH_ERROR,
  TEACHER_LOADED,
  TEACHER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  NOT_LOGGEDIN,
} from "./teacherTypes";

import { GET_ERRORS, CLEAR_ERRORS } from "./../usererror/errorTypes";
import { login, logout } from "../../api/teacherAuth";
import { getStudentsTeacherProfile } from "../../api/teacherProfile";

import { showAlert } from "../../api/alerts";

import { BASE_URL } from "../../api/AllAPIRoutes";

// check token and load user
export const loadTeacher = () => {
  return async (dispatch, getState) => {
    //   User Loading
    dispatch({ type: TEACHER_LOADING });

    axios
      .get(`${BASE_URL}/api/v1/teacher/me`, tokenConfig(getState))
      .then(async (res) => {
        var user = res.data.data.data;
        user.teacherProfiles = await Promise.all(
          user.teacherProfiles.map(async (teacher) => {
            const data = await getStudentsTeacherProfile(teacher.id);
            const currentStudents = data.data.data.currentStudents;
            const pendingRequests = data.data.data.pendingRequests;
            const pastStudents = data.data.data.pastStudents;
            return {
              ...teacher,
              currentStudents,
              pendingRequests,
              pastStudents,
            };
          })
        );
        const userData = {
          user: user,
          token: localStorage.getItem("jwt"),
        };
        console.log(userData);
        dispatch({
          type: TEACHER_LOADED,
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
export const loginTeacher = ({ email, password }) => {
  return async (dispatch, getState) => {
    try {
      const user = await login({ email, password });
      console.log("happen");

      const userData = {
        user: user,
        token: localStorage.getItem("jwt"),
        profile: "Teacher",
      };

      dispatch({
        type: TEACHER_LOADED,
        payload: userData,
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userData,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
      dispatch(loadTeacher());
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch(returnErrors("Unable to Login", 401, "LOGIN_FAIL"));
    }
  };
};

// Register User
export const registerTeacher =
  ({ email, password, passwordConfirm, name }) =>
  (dispatch, getState) => {
    const h = JSON.stringify({ name, email, password, passwordConfirm });
    console.log("register");
    axios
      .post(`${BASE_URL}/api/v1/teacher/signup`, h, tokenConfig(getState))
      .then((res) => {
        const userData = {
          user: res.data.data.user,
          token: res.data.token,
          profile: "Teacher",
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
export const logoutTeacher = () => async (dispatch) => {
  await logout();

  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

// Set up config.headers and token
export const tokenConfig = (getState) => {
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
