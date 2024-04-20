import axios from "axios";

import { BASE_URL } from "./AllAPIRoutes";

export const fetchAllCategories = async () => {
  try {
    let result = await axios.get(
      `${BASE_URL}/api/v1/category/getAllCategories`
    );

    return result.data.data.data;
  } catch (err) {
    console.log(err);
  }
};
