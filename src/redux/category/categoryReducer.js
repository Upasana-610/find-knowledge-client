import {
  FETCH_ALL_CATEGORY_REQUEST,
  FETCH_ALL_CATEGORY_SUCCESS,
  FETCH_ALL_CATEGORY_FAILURE,
} from "./categoryTypes";

const initialState = {
  loading: false,
  categories: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: action.payload.categories,
        error: "",
      };
    case FETCH_ALL_CATEGORY_FAILURE:
      return {
        loading: false,
        categories: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
