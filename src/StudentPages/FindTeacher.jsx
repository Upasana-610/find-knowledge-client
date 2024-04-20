import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeacherProfile } from "../redux";
import Categories from "./Categories";
import Layout from "./Layout/Layout";
import TeacherProfilesList from "./TeacherProfileList";

const FindTeacher = () => {
  let dispatch = useDispatch();

  let { Allcategories } = useSelector((state) =>
    state.category ? state.category : undefined
  );
  return (
    <Layout>
      {/* Your content here */}
      <Categories />
      <TeacherProfilesList />
    </Layout>
  );
};

export default FindTeacher;
