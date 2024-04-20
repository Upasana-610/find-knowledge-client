import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router";
// import { Itemcss } from "../../Pages/cartPage/Cart.style";

import { useSelector, useDispatch } from "react-redux";

import { loadStudent, loadTeacher } from "../redux";
import {
  acceptRequestForTeacherProfile,
  removeStudentFromTeacherProfile,
} from "../api/teacher";

// TeacherProfileModalContent component to render the modal content
const TeacherProfileModalContent = ({ teacherProfile }) => {
  const { remuneration, daysAvailable, username, category, subcategory } =
    teacherProfile;
  if (!teacherProfile || Object.keys(teacherProfile).length === 0) {
    return <div>No teacher profile data available</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Teacher Profile</h2>
      <p className="mb-2">
        <strong>Username:</strong> {username}
      </p>
      <p className="mb-2">
        <strong>Category:</strong> {category.category}
      </p>
      <p className="mb-2">
        <strong>Subcategory:</strong>{" "}
        {category.subcategories.map((subcategory) => {
          if (subcategory._id === teacherProfile.subcategory) {
            return subcategory.Subcategory;
          }
        })}
      </p>
      <p className="mb-2">
        <strong>Days Available:</strong>{" "}
        {daysAvailable && daysAvailable.join(", ")}
      </p>
      <p className="mb-2">
        <strong>Remuneration:</strong>{" "}
        {remuneration ? (
          <ul>
            <li>Online - Private: {remuneration.online?.private}</li>
            <li>Online - Group: {remuneration.online?.group}</li>
            <li>Offline - Private: {remuneration.offline?.private}</li>
            <li>Offline - Group: {remuneration.offline?.group}</li>
          </ul>
        ) : (
          "Not available"
        )}
      </p>
    </div>
  );
};

const Modal = ({ isOpen, onClose, teacherProfile }) => {
  let dispatch = useDispatch();

  if (!teacherProfile || Object.keys(teacherProfile).length === 0) {
    return <div>No teacher profile data available</div>;
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white rounded-lg p-8 z-10">
          <TeacherProfileModalContent teacherProfile={teacherProfile} />
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const PaginationBar = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className="w-full bg-white"
      aria-label="Pagination"
      style={{ marginTop: "50px" }}
    >
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              } font-bold py-2 px-4 rounded mx-1`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const MyOrder = () => {
  const { teacherProfiles } = useSelector((state) =>
    state.user.user ? state.user.user : { teacherProfiles: [] }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacherProfile, setSelectedTeacherProfile] = useState({});
  const openModal = (teacherProfile) => {
    setSelectedTeacherProfile(teacherProfile);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(teacherProfiles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teacherProfiles.slice(
    indexOfFirstItem,
    Math.min(indexOfLastItem, teacherProfiles.length) // Adjust here
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        {currentItems && currentItems.length !== 0
          ? currentItems.map((teacherProfile, idx) => (
              <>
                <OrderDropDown
                  teacherProfile={teacherProfile}
                  key={teacherProfile._id}
                  onOpenModal={() => {
                    openModal(teacherProfile);
                  }}
                />
              </>
            ))
          : "No Past Orders"}
      </div>
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        teacherProfile={selectedTeacherProfile}
      />
    </>
  );
};

const OrderDropDown = ({ teacherProfile, onOpenModal }) => {
  let [toggleCurrStudents, setToggleCurrStudents] = useState(false);
  let [togglePenStudents, setTogglePenStudents] = useState(false);
  let [togglePastStudents, setTogglePastStudents] = useState(false);
  let navigate = useNavigate();
  return (
    <>
      <div
        className="flex justify-between items-center border rounded overflow-hidden shadow-lg p-4 w-90 m-4"
        style={{ width: "70%", margin: "auto", marginTop: "40px" }}
      >
        <div style={{ alignItems: "center" }}>
          {" "}
          <div
            className="font-bold text-xl mb-2"
            style={{
              fontSize: "25px",
              marginBottom: "25px",
            }}
          >
            {teacherProfile.username}
          </div>
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Category:{" "}
            <span className="ml-2">{teacherProfile.category.category}</span>
          </p>
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Subcategory:{" "}
            <span className="ml-2">
              {teacherProfile.category.subcategories.map((subcategory) => {
                if (subcategory._id === teacherProfile.subcategory) {
                  return subcategory.Subcategory;
                }
              })}
            </span>
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              setTogglePenStudents(false);
              setTogglePastStudents(false);
              if (!togglePenStudents && !togglePastStudents)
                setToggleCurrStudents(!toggleCurrStudents);
            }}
            className="bg-blue-500 text-white hover:bg-blue-800 font-bold py-2 px-4 mr-2 rounded"
          >
            View Current Students
          </button>
          <button
            onClick={() => {
              setToggleCurrStudents(false);
              setTogglePastStudents(false);
              if (!toggleCurrStudents && !togglePastStudents)
                setTogglePenStudents(!togglePenStudents);
            }}
            className="bg-blue-500 text-white hover:bg-blue-800 font-bold py-2 px-4 mr-2 rounded"
          >
            View Pending Requests
          </button>
          <button
            onClick={() => {
              setToggleCurrStudents(false);
              setTogglePenStudents(false);
              if (!togglePenStudents && !toggleCurrStudents)
                setTogglePastStudents(!togglePastStudents);
            }}
            className="bg-blue-500 text-white hover:bg-blue-800 font-bold py-2 px-4 mr-2 rounded"
          >
            View Past Students
          </button>
          <button
            onClick={() => {
              onOpenModal();
            }}
            className="bg-blue-500 text-white hover:bg-blue-800 font-bold py-2 px-4 mr-2 rounded"
          >
            View Profile
          </button>
        </div>
      </div>
      {toggleCurrStudents ? (
        <Students
          teacherProfile={teacherProfile}
          Students={teacherProfile.currentStudents}
          type={"Current"}
        />
      ) : (
        ""
      )}
      {togglePenStudents ? (
        <Students
          teacherProfile={teacherProfile}
          Students={teacherProfile.pendingRequests}
          type={"Pending"}
        />
      ) : (
        ""
      )}
      {togglePastStudents ? (
        <Students
          teacherProfile={teacherProfile}
          Students={teacherProfile.pastStudents}
          type={"Past"}
        />
      ) : (
        ""
      )}
    </>
  );
};

const Students = ({ teacherProfile, Students, type }) => {
  console.log(teacherProfile);
  console.log(Students);
  console.log(type);

  //   let [joinDate, setJoinDate] = useState("");
  //   let [leavingDate, setLeavingDate] = useState("");
  //   let [entryMsg, setEntryMsg] = useState("");
  //   let [leavingMsg, setLeavingMsg] = useState("");
  //   let [name, setName] = useState("");
  //   let [email, setEmail] = useState("");

  return (
    <>
      {type === "Current" &&
        Students.length !== 0 &&
        Students.map((student) => {
          {
            /* setName(student.name);
          setEmail(student.email); */
          }

          return (
            student.subscribedTeachers &&
            student.subscribedTeachers.length !== 0 &&
            student.subscribedTeachers.map((teacher) => {
              if (teacher.teacherprofileId._id === teacherProfile._id) {
                {
                  /* setJoinDate(teacher.joiningDate);
                setEntryMsg(teacher.subscribedentrymessage); */
                }
                var date = new Date(teacher.joiningDate);
                const options = {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                };
                const formattedJoiningDate = date.toLocaleDateString(
                  "en-US",
                  options
                );

                return (
                  <SingleStudent
                    key={student.id} // Add a unique key
                    formattedJoiningDate={formattedJoiningDate}
                    entryMsg={teacher.subscribedentrymessage}
                    name={student.name}
                    email={student.email}
                    joinDate={teacher.joiningDate}
                    type={type}
                    id={student._id}
                    teacherprofileId={teacherProfile._id}
                  />
                );
              }
            })
          );
        })}
      {type === "Pending" &&
        Students.length !== 0 &&
        Students.map((student) => {
          {
            /* setName(student.name);
          setEmail(student.email); */
          }
          {
            /* console.log(student); */
          }
          return (
            student.PendingRequestSent &&
            student.PendingRequestSent.length !== 0 &&
            student.PendingRequestSent.map((teacher) => {
              if (teacher.teacherprofileId._id === teacherProfile._id) {
                {
                  /* setEntryMsg(teacher.pendingentrymessage); */
                }
                return (
                  <SingleStudent
                    key={student._id} // Add a unique key
                    entryMsg={teacher.pendingentrymessage}
                    name={student.name}
                    email={student.email}
                    id={student._id}
                    teacherprofileId={teacherProfile._id}
                    type={type}
                  />
                );
              }
            })
          );
        })}
      {type === "Past" &&
        Students.length !== 0 &&
        Students.map((student) => {
          {
            /* setName(student.name);
          setEmail(student.email); */
          }

          return (
            student.pastTeachers &&
            student.pastTeachers.length !== 0 &&
            student.pastTeachers.map((teacher) => {
              if (teacher.teacherprofileId._id === teacherProfile._id) {
                {
                  /* setJoinDate(teacher.pastjoiningDate);
                setLeavingDate(teacher.leavingDate);
                setEntryMsg(teacher.pastentrymessage);
                setLeavingMsg(teacher.pastleavingmessage); */
                }
                var date = new Date(teacher.pastjoiningDate);
                const options = {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                };
                const formattedJoiningDate = date.toLocaleDateString(
                  "en-US",
                  options
                );
                date = new Date(teacher.leavingDate);
                const formattedLeavingDate = date.toLocaleDateString(
                  "en-US",
                  options
                );
                return (
                  <SingleStudent
                    key={student.id} // Add a unique key
                    formattedJoiningDate={formattedJoiningDate}
                    formattedLeavingDate={formattedLeavingDate}
                    entryMsg={teacher.pastentrymessage}
                    leavingMsg={teacher.pastleavingmessage}
                    name={student.name}
                    email={student.email}
                    joinDate={teacher.pastjoiningDate}
                    leavingDate={teacher.leavingDate}
                    type={type}
                    id={student._id}
                    teacherprofileId={teacherProfile._id}
                  />
                );
              }
            })
          );
        })}
      {type !== "Current" && type !== "Pending" && type !== "Past"}
    </>
  );
};

const SingleStudent = ({
  formattedJoiningDate,
  formattedLeavingDate,
  joinDate,
  entryMsg,
  leavingMsg,
  leavingDate,
  name,
  email,
  id,
  teacherprofileId,
  type,
}) => {
  let dispatch = useDispatch();
  const acceptRequest = async () => {
    // Your logic for sending the request goes here
    // For example, you can make an API call or update the state
    const requestData = {
      id: id,
      subscribedTeachers: {
        teacherprofileId: teacherprofileId,
        // Set the entry message here
      },
    };
    var sent;
    sent = await acceptRequestForTeacherProfile(requestData);
    console.log(sent);
    if (sent) {
      dispatch(loadTeacher());
    }
  };

  const removeStudent = async () => {
    // Your logic for sending the request goes here
    // For example, you can make an API call or update the state
    console.log("object enter");
    const requestData = {
      id: id,
      pastTeachers: {
        teacherprofileId: teacherprofileId,
        pastleavingmessage: entryMsg,
        // Set the entry message here
      },
    };
    var sent;
    sent = await removeStudentFromTeacherProfile(requestData);
    console.log(sent);
    if (sent) {
      dispatch(loadTeacher());
    }
  };
  //   console.log(type);

  return (
    <div
      className="flex justify-between items-center border rounded overflow-hidden shadow-lg p-4 w-90 m-4 bg-blue-100"
      style={{ width: "50%", margin: "auto", marginTop: "40px" }}
    >
      <div style={{ alignItems: "center" }}>
        <h1 style={{ fontSize: "25px", marginBottom: "10px" }}>
          {type} Students
        </h1>{" "}
        {name && name.length !== 0 ? (
          <div
            className="font-bold text-xl mb-2"
            style={{
              fontSize: "25px",
              marginBottom: "25px",
            }}
          >
            Name: <span>{name}</span>
          </div>
        ) : (
          ""
        )}
        {email && email.length !== 0 ? (
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Email: <span>{email}</span>
          </p>
        ) : (
          ""
        )}
        {joinDate && joinDate.length !== 0 ? (
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Joining Date: <span>{formattedJoiningDate}</span>
          </p>
        ) : (
          ""
        )}
        {entryMsg && entryMsg.length !== 0 ? (
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Entry Message: <span>{entryMsg}</span>
          </p>
        ) : (
          ""
        )}
        {leavingDate && leavingDate.length !== 0 ? (
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Leaving Date: <span>{formattedLeavingDate}</span>
          </p>
        ) : (
          ""
        )}
        {leavingMsg && leavingMsg.length !== 0 ? (
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Leaving Message: <span>{leavingMsg}</span>
          </p>
        ) : (
          ""
        )}
      </div>

      <div>
        {(!joinDate || joinDate.length === 0) &&
        (!leavingDate || leavingDate.length === 0) ? (
          <button
            onClick={acceptRequest}
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            }
          >
            Accept Request{" "}
          </button>
        ) : joinDate &&
          joinDate.length !== 0 &&
          (!leavingDate || leavingDate.length === 0) ? (
          <button
            onClick={removeStudent}
            className={
              "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            }
          >
            Remove Student{" "}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyOrder;
