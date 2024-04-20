import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import GlobalStyles from "./globalStyle";
import ScrollToTop from "./TeacherPages/core/ScrollToTop";
import SelectProfile from "./TeacherPages/SelectProfile";
import TeacherSignUp from "./TeacherPages/TeacherSignUp";
import StudentSignUp from "./StudentPages/StudentSignUp";
import TeacherLogin from "./TeacherPages/TeacherLogin";
import StudentLogin from "./StudentPages/StudentLogin";
import Home from "./TeacherPages/Home";
import HomeStudent from "./StudentPages/HomeStudent";
import {
  fetchAllTheCategories,
  fetch,
  getAllTeacherProfile,
  loadStudent,
  loadTeacher,
} from "./redux";
import FindTeacher from "./StudentPages/FindTeacher";
import CreateTeacherProfile from "./TeacherPages/CreateTeacherProfile";

function App() {
  useEffect(async () => {
    store.dispatch(fetchAllTheCategories());
    store.dispatch(getAllTeacherProfile());
    let student = await store.dispatch(loadStudent());
    if (!student) {
      console.log(student);
      store.dispatch(loadTeacher());
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <GlobalStyles />
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route exact path="/" element={<SelectProfile />} />
              <Route exact path="/signupteacher" element={<TeacherSignUp />} />
              <Route exact path="/signupstudent" element={<StudentSignUp />} />
              <Route exact path="/loginteacher" element={<TeacherLogin />} />
              <Route exact path="/loginstudent" element={<StudentLogin />} />

              <Route exact path="/login" element={<SelectProfile />} />
              <Route exact path="/teacher/home" element={<Home />} />
              <Route exact path="/student/home" element={<HomeStudent />} />
              <Route
                exact
                path="/findteacher/categories"
                element={<FindTeacher />}
              />
              <Route
                exact
                path="/createteacherprofile"
                element={<CreateTeacherProfile />}
              />
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
