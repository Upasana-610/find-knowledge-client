import React from "react";
import Layout from "./Layout/Layout";
import MyOrder from "./TeacherProfileStudents";
import DropdownList from "./TeacherProfileStudents";

const Home = () => {
  return (
    <>
      <Layout>
        <h1
          style={{
            fontWeight: "bold",
            margin: "20px",
            fontSize: "30px",
            textAlign: "center",
          }}
        >
          Your Profiles
        </h1>
        <MyOrder />
      </Layout>
    </>
  );
};

export default Home;
