import axios from "axios";

import {
  FETCH_TEACHERPROFILE_BY_CATEGORY_SUBCATEGORY,
  FETCH_TEACHERPROFILE_BY_CATEGORY_SUBCATEGORY_FAIL,
  FETCH_ALL_TEACHERPROFILE,
  FETCH_ALL_TEACHERPROFILE_FAIL,
} from "./teacherProfileTypes";

import { BASE_URL } from "../../api/AllAPIRoutes";
import {
  fetchTeacherProfiles,
  fetchAllTeacherProfiles,
} from "../../api/teacherProfile";

export const fetchTeacherProfilesByCategoryOrSubcategory = (id) => {
  return async (dispatch, getState) => {
    try {
      let profiles = await fetchTeacherProfiles(id);
      // console.log(profiles);
      const teacher_profiles = {
        teacher_profiles: profiles,
      };
      dispatch({
        type: FETCH_TEACHERPROFILE_BY_CATEGORY_SUBCATEGORY,
        payload: teacher_profiles,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: FETCH_TEACHERPROFILE_BY_CATEGORY_SUBCATEGORY_FAIL,
        error: "Could not get Teacher Profiles",
      });
    }
  };
};

export const getAllTeacherProfile = () => {
  return async (dispatch, getState) => {
    try {
      let profiles = await fetchAllTeacherProfiles();
      // console.log(profiles);
      const teacher_profiles = {
        teacher_profiles: profiles,
      };
      // console.log(teacher_profiles);
      dispatch({
        type: FETCH_ALL_TEACHERPROFILE,
        payload: teacher_profiles,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: FETCH_ALL_TEACHERPROFILE_FAIL,
        error: "Could not get Teacher Profiles",
      });
    }
  };
};
