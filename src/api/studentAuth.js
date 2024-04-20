import { showAlert } from "./alerts";
import axios from "axios";

import { BASE_URL } from "./AllAPIRoutes";

export const login = async ({ email, password }) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/student/login`,
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!", 2);

      localStorage.setItem("jwt", res.data.token);
      return res.data.data.user;
    }
  } catch (err) {
    showAlert("error", "Login Error", 2);
  }
};

export const logout = async () => {
  try {
    const res = await axios.get("/api/v1/student/logout");
    showAlert("success", "Logged Out Successfully");
    if ((res.data.status = "success")) window.location.reload(true);
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
};
