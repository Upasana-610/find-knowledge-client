import { showAlert } from "./alerts";
import axios from "axios";

import { BASE_URL } from "./AllAPIRoutes";

export const acceptRequestForTeacherProfile = async ({
  id,
  subscribedTeachers,
}) => {
  console.log(id);
  console.log(subscribedTeachers);

  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/api/v1/teacher/acceptRequest`,
      data: {
        id,
        subscribedTeachers,
        teacherjwt: localStorage.getItem("jwt"),
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

export const removeStudentFromTeacherProfile = async ({ id, pastTeachers }) => {
  console.log(id);
  console.log(pastTeachers);

  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/api/v1/teacher/removeStudent`,
      data: {
        id,
        pastTeachers,
        teacherjwt: localStorage.getItem("jwt"),
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
