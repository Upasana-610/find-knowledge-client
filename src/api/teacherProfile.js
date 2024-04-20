import axios from "axios";
import { showAlert } from "./alerts";

import { BASE_URL } from "./AllAPIRoutes";

export const fetchTeacherProfiles = async (id) => {
  try {
    const result = await axios.get(
      `${BASE_URL}/api/v1/teacherprofile/findteacher/${id}`
    );
    // console.log(result.data.data.teacher_profiles);
    const processedData = await Promise.all(
      result.data.data.teacher_profiles.map(async (doc) => {
        var subcategories = doc.category ? doc.category.subcategories : [];
        var filteredSubcategories = subcategories.filter(
          (e) => e._id.toString() === doc.subcategory.toString()
        );
        var subcategory;
        // console.log(filteredSubcategories);
        if (filteredSubcategories.length != 0)
          subcategory = filteredSubcategories[0].Subcategory;

        // Modify the document properties
        doc.category = doc.category.category;
        doc.subcategory = subcategory;

        return doc;
      })
    );
    // console.log(processedData);

    return processedData; // Assuming the API response has a 'profiles' property containing the data
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllTeacherProfiles = async () => {
  try {
    const result = await axios.get(`${BASE_URL}/api/v1/teacherprofile/getAll`);

    // Map over the data and perform asynchronous operations
    // console.log(result.data.data.data);
    const processedData = await Promise.all(
      result.data.data.data.map(async (doc) => {
        var subcategories = doc.category ? doc.category.subcategories : [];
        var filteredSubcategories = subcategories.filter(
          (e) => e._id.toString() === doc.subcategory.toString()
        );
        var subcategory;
        // console.log(filteredSubcategories);
        if (filteredSubcategories.length != 0)
          subcategory = filteredSubcategories[0].Subcategory;

        // Modify the document properties
        doc.category = doc.category.category;
        doc.subcategory = subcategory;

        return doc;
      })
    );

    // console.log(processedData);

    return processedData;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it elsewhere if necessary
  }
};

export const getStudentsTeacherProfile = async (id) => {
  try {
    const result = await axios.get(
      `${BASE_URL}/api/v1/teacherprofile/getCurrentStudents/${id}`
    );
    // console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it elsewhere if necessary
  }
};

export const createTeacherProfile = async ({
  teacherId,
  username,
  category,
  subcategory,
  daysAvailable,
  remuneration,
}) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/teacherprofile/create`,
      data: {
        teacherId,
        username,
        category,
        subcategory,
        daysAvailable,
        remuneration,
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
    showAlert("error", "Username Already Taken", 2);
    return false;
  }
};
