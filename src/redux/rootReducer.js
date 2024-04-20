import categoryReducer from "./category/categoryReducer";
import userReducer from "./user/userReducer";
import errorReducer from "./usererror/errorReducer";
import teacherProfileReducer from "./teacherProfile/teacherProfileReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  autherr: [],
  student: [],
  teacher: [],
  teacherProfile: teacherProfileReducer,
  category: categoryReducer,
  autherr: errorReducer,
});

export default rootReducer;
