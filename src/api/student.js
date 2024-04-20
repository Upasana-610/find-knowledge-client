import { showAlert } from "./alerts";
import axios from "axios";

import { BASE_URL } from "./AllAPIRoutes";

export const sendRequestToTeacherProfile = async ({ PendingRequestSent }) => {
  console.log(PendingRequestSent);

  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/api/v1/student/sendRequest`,
      data: {
        PendingRequestSent,
        studentjwt: localStorage.getItem("jwt"),
      },
    });
    console.log(res);
    // if (res.data.status === "success") {
    //   showAlert("success", "Logged in successfully!", 2);

    //   localStorage.setItem("jwt", res.data.token);
    //   return res.data.data.user;
    // }
    return true;
  } catch (err) {
    showAlert("error", "Login Error", 2);
    return false;
  }
};

export const leaveTeacherProfile = async ({ pastTeachers }) => {
  console.log(pastTeachers);

  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/api/v1/student/leaveTeacher`,
      data: {
        pastTeachers,
        studentjwt: localStorage.getItem("jwt"),
      },
    });
    console.log(res);
    // if (res.data.status === "success") {
    //   showAlert("success", "Logged in successfully!", 2);

    //   localStorage.setItem("jwt", res.data.token);
    //   return res.data.data.user;
    // }
    return true;
  } catch (err) {
    showAlert("error", "Login Error", 2);
    return false;
  }
};
