import {
  AUTH_ERROR,
  TEACHER_LOADED,
  TEACHER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./teacherTypes";
import { STUDENT_LOADED, STUDENT_LOADING, NOT_LOGGEDIN } from "./studentTypes";

const initialState = {
  token: localStorage.getItem("jwt"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  profile: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STUDENT_LOADED: {
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        profile: action.payload.profile,
        user: action.payload.user,
      };
    }
    case TEACHER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TEACHER_LOADED: {
      console.log(action.payload.user);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        profile: action.payload.profile,
        user: action.payload.user,
      };
    }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        profile: action.payload.profile,
        token: action.payload.token,
        user: action.payload.user,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("jwt");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        profile: null,
      };
    case NOT_LOGGEDIN:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        profile: null,
      };
    default:
      return state;
  }
};

export default reducer;
