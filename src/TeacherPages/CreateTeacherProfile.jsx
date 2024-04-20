import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeacherProfile } from "../api/teacherProfile";
import { loadStudent, loadTeacher } from "../redux";
import CategoriesProfile from "./CategoriesProfile";
import Layout from "./Layout/Layout";

const CreateTeacherProfileForm = () => {
  let dispatch = useDispatch();
  const { _id, email } = useSelector((state) =>
    state.user.user ? state.user.user : { _id: "" }
  );
  const [formData, setFormData] = useState({
    teacherId: _id,
    email: email,
    username: "",
    category: "",
    subcategory: "",
    daysAvailable: [],
    remuneration: {
      online: {
        private: 0,
        group: 0,
      },
      offline: {
        private: 0,
        group: 0,
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRemChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("remuneration.")) {
      const [nm, field, subfield] = name.split(".");
      //   console.log(name, nm, field, subfield);
      setFormData((prevFormData) => ({
        ...prevFormData,
        remuneration: {
          ...prevFormData.remuneration,
          [field]: {
            ...prevFormData.remuneration[field],
            [subfield]: parseInt(value), // Convert value to integer if needed
          },
        },
      }));
    }
  };

  const handleDaysAvailableChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        daysAvailable: [...formData.daysAvailable, value],
      });
    } else {
      setFormData({
        ...formData,
        daysAvailable: formData.daysAvailable.filter((day) => day !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    // Perform submission logic here (e.g., send data to backend)
    var sent;
    sent = await createTeacherProfile(formData);
    console.log(sent);
    if (sent) {
      dispatch(loadTeacher());
    }
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Layout>
      <div
        className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden"
        style={{
          backgroundColor: "lightblue",
          margin: "auto",
          marginTop: "40px",
        }}
      >
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <CategoriesProfile handleChange={handleChange} />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
              Days Available:
            </label>
            <div>
              {daysOfWeek.map((day) => (
                <label key={day} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    name={day}
                    value={day}
                    checked={formData.daysAvailable.includes(day)}
                    onChange={handleDaysAvailableChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">{day}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Remuneration (Online - Private):
            </label>
            <input
              type="number"
              name="remuneration.online.private"
              //   value={formData.remuneration.online.private}
              defaultValue={0}
              onChange={handleRemChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Remuneration (Online - Group):
            </label>
            <input
              type="number"
              name="remuneration.online.group"
              //   value={formData.remuneration.online.private}
              defaultValue={0}
              onChange={handleRemChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Remuneration (Offline - Private):
            </label>
            <input
              type="number"
              name="remuneration.offline.private"
              //   value={formData.remuneration.online.private}
              defaultValue={0}
              onChange={handleRemChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Remuneration (Offline - Group):
            </label>
            <input
              type="number"
              name="remuneration.offline.group"
              //   value={formData.remuneration.online.private}
              defaultValue={0}
              onChange={handleRemChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTeacherProfileForm;
