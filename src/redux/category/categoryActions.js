import axios from "axios";

import {
  FETCH_ALL_CATEGORY_REQUEST,
  FETCH_ALL_CATEGORY_SUCCESS,
  FETCH_ALL_CATEGORY_FAILURE,
} from "./categoryTypes";
import { GET_ERRORS, CLEAR_ERRORS } from "./../usererror/errorTypes";
import { fetchAllCategories } from "../../api/category";

import { BASE_URL } from "../../api/AllAPIRoutes";

export const fetchAllTheCategories = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_ALL_CATEGORY_REQUEST,
      });
      let allcategories = await fetchAllCategories();
      const categories = {
        categories: allcategories,
      };
      dispatch({
        type: FETCH_ALL_CATEGORY_SUCCESS,
        payload: categories,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: FETCH_ALL_CATEGORY_FAILURE,
        error: "Something went wrong",
      });
    }
  };
};
