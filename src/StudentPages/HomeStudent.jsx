import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTeacherProfile } from "../redux";
import Layout from "./Layout/Layout";
import TeacherListPast from "./TeacherListPast";
import TeacherListPending from "./TeacherListPending";
import TeacherListSubscribed from "./TeacherListSubscribed";
import TeacherProfilesList from "./TeacherProfileList";

const HomeStudent = () => {
  let dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(getAllTeacherProfile());
  }, []);
  return (
    <>
      <Layout>
        <h1
          style={{
            fontSize: "30px",
            textAlign: "center",
            margin: "20px",
            fontWeight: "bold",
          }}
        >
          Subscribed Teachers
        </h1>
        <TeacherListSubscribed />

        <h1
          style={{
            fontSize: "30px",
            textAlign: "center",
            margin: "20px",
            marginTop: "120px",

            fontWeight: "bold",
          }}
        >
          Pending Requests
        </h1>
        <TeacherListPending />
        <h1
          style={{
            fontSize: "30px",
            textAlign: "center",
            margin: "20px",
            marginTop: "120px",
            fontWeight: "bold",
          }}
        >
          Past Teachers{" "}
        </h1>
        <TeacherListPast />
      </Layout>
    </>
  );
};

export default HomeStudent;
