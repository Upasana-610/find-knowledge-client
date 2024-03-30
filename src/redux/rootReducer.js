import teacherReducer from "./teacher/teacherReducer";
import studentReducer from "./student/studentReducer";
import teacherProfileReducer from "./teacherProfile/teacherProfileReducer";
import categoryReducer from "./category/categoryReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  teacher: teacherReducer,
  student: studentReducer,
  teacherProfile: teacherProfileReducer,
  category: categoryReducer,
});

export default rootReducer;
