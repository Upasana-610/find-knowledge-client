import {
  FETCH_TEACHERPROFILE_BY_CATEGORY_SUBCATEGORY,
  FETCH_TEACHERPROFILE_BY_CATEGORY_SUBCATEGORY_FAIL,
  FETCH_ALL_TEACHERPROFILE,
  FETCH_ALL_TEACHERPROFILE_FAIL,
} from "./teacherProfileTypes";

const initialState = {
  teacher_profiles: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEACHERPROFILE_BY_CATEGORY_SUBCATEGORY:
      // console.log(action.payload.teacher_profiles);
      return {
        ...state,
        teacher_profiles: action.payload.teacher_profiles,
        error: "",
      };
    case FETCH_TEACHERPROFILE_BY_CATEGORY_SUBCATEGORY_FAIL:
      return {
        teacher_profiles: [],
        error: action.error,
      };
    case FETCH_ALL_TEACHERPROFILE:
      return {
        teacher_profiles: action.payload.teacher_profiles,
        error: action.error,
      };
    case FETCH_ALL_TEACHERPROFILE_FAIL:
      return {
        teacher_profiles: [],
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
