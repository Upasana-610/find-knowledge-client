import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../api/alerts";
import { leaveTeacherProfile } from "../api/student";
import { loadStudent } from "../redux";

// TeacherProfileModalContent component to render the modal content

const TeacherProfileModalContent = ({ teacherProfile }) => {
  const { subscribedentrymessage, joiningDate, teacherprofileId } =
    teacherProfile;

  if (!teacherprofileId || Object.keys(teacherprofileId).length === 0) {
    return <div>No teacher profile data available</div>;
  }

  var date = new Date(joiningDate);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedJoiningDate = date.toLocaleDateString("en-US", options);

  const { remuneration, daysAvailable, username, category, subcategory } =
    teacherprofileId;

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
        {category.subcategories.map((sub) => {
          if (sub._id === subcategory) {
            return sub.Subcategory;
          }
        })}{" "}
      </p>
      <p className="mb-2">
        <strong>Days Available:</strong>{" "}
        {daysAvailable && daysAvailable.join(", ")}
      </p>
      <p className="mb-2">
        <strong>Remuneration:</strong>{" "}
        {remuneration ? (
          <ul>
            <li>Online - Private: ₹ {remuneration.online?.private}</li>
            <li>Online - Group: ₹{remuneration.online?.group}</li>
            <li>Offline - Private:₹ {remuneration.offline?.private}</li>
            <li>Offline - Group: ₹{remuneration.offline?.group}</li>
          </ul>
        ) : (
          "Not available"
        )}
      </p>
      <p className="mb-2">
        <strong>Entry Message:</strong> {subscribedentrymessage}
      </p>
      <p className="mb-2">
        <strong>Joining Date:</strong> {formattedJoiningDate}
      </p>
    </div>
  );
};

// Modal component
const Modal = ({ isOpen, onClose, teacherProfile }) => {
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
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DelTeacherProfileModalContent = ({ teacherProfile }) => {
  const { teacherprofileId } = teacherProfile;

  if (!teacherprofileId || Object.keys(teacherprofileId).length === 0) {
    return <div>No teacher profile data available</div>;
  }

  const { username } = teacherprofileId;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Are you sure you want to delete teacher profile ({username})?
      </h2>
    </div>
  );
};

// Modal component
const DelModal = ({ isDelOpen, onDelClose, teacherProfile }) => {
  const [leaveTeacherReq, setLeaveTeacher] = useState(false);
  const [buttonContent, setButtonContent] = useState("Leave Teacher");
  const [leavingMessage, setLeavingMessage] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    console.log("object");
    setButtonContent("Leave Teacher");
    setLeavingMessage("");
    setLeaveTeacher(false);
  }, [isDelOpen, onDelClose, teacherProfile]);

  const leaveTeacher = async () => {
    // Your logic for sending the request goes here
    // For example, you can make an API call or update the state
    console.log("leaveTeacher: 660f0e2da6c0be4d80d55662");
    console.log(teacherProfile);
    const requestData = {
      pastTeachers: {
        teacherprofileId: teacherProfile.teacherprofileId._id,
        pastleavingmessage: leavingMessage,
      },
    };
    var sent;

    if (leavingMessage != "") sent = await leaveTeacherProfile(requestData);
    else showAlert("success", "Provide a leaving message", 3);
    console.log(sent);
    if (sent) {
      dispatch(loadStudent());
      setButtonContent("Left Teacher");
      setLeaveTeacher(true);
    }
  };
  const handleLeavingMessageChange = (event) => {
    setLeavingMessage(event.target.value);
  };

  if (!teacherProfile || Object.keys(teacherProfile).length === 0) {
    return <div>No teacher profile data available</div>;
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isDelOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white rounded-lg p-8 z-10">
          <DelTeacherProfileModalContent teacherProfile={teacherProfile} />
          {buttonContent === "Leave Teacher" && (
            <textarea
              value={leavingMessage}
              onChange={handleLeavingMessageChange}
              className="block w-full border border-gray-300 rounded-lg p-2 mt-2"
              placeholder="Entry Message"
              style={{ marginBottom: "30px" }}
            />
          )}
          <button
            onClick={leaveTeacher}
            className={`${
              leaveTeacherReq
                ? "bg-gray-500 text-gray-700 cursor-default"
                : "bg-red-500 hover:bg-red-700 text-white"
            } font-bold py-2 px-4 rounded mr-2`}
            disabled={leaveTeacherReq}
          >
            {buttonContent}
          </button>
          <button
            onClick={onDelClose}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// TeacherProfileListItem component
const TeacherProfileListItem = ({
  teacherProfile,
  onOpenModal,
  onDelOpenModal,
}) => {
  return (
    <li
      className="w-90 m-4"
      style={{ width: "70%", margin: "auto", marginTop: "40px" }}
    >
      <div className="flex justify-between items-center border rounded overflow-hidden shadow-lg p-4">
        <div
          style={{
            fontSize: "25px",
          }}
        >
          <div
            className="font-bold text-xl mb-2"
            style={{ fontSize: "25px", marginBottom: "25px" }}
          >
            {teacherProfile.teacherprofileId.username}
          </div>
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Category:{" "}
            <span className="ml-2">
              {teacherProfile.teacherprofileId.category.category}
            </span>
          </p>
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Subcategory:{" "}
            <span className="ml-2">
              {teacherProfile.teacherprofileId.category.subcategories.map(
                (subcategory) => {
                  if (
                    subcategory._id ===
                    teacherProfile.teacherprofileId.subcategory
                  ) {
                    return subcategory.Subcategory;
                  }
                }
              )}
            </span>
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              onDelOpenModal();
            }}
            className="bg-red-800 text-white font-bold py-2 px-4 mr-2 rounded"
          >
            Leave
          </button>
          <button
            onClick={() => onOpenModal()}
            className="bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            View
          </button>
        </div>
      </div>
    </li>
  );
};

// PaginationBar component (unchanged)
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

const TeacherListSubscribed = () => {
  const { subscribedTeachers } = useSelector((state) =>
    state.user && state.user.user ? state.user.user : { subscribedTeachers: [] }
  );
  console.log(subscribedTeachers);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelModalOpen, setDelIsModalOpen] = useState(false);

  const [selectedSubscribedTeacher, setSelectedSubscribedTeacher] = useState(
    {}
  );

  const openModal = (teacherProfile) => {
    setSelectedSubscribedTeacher(teacherProfile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const delOpenModal = (teacherProfile) => {
    setSelectedSubscribedTeacher(teacherProfile);
    setDelIsModalOpen(true);
  };

  const delCloseModal = () => {
    setDelIsModalOpen(false);
  };

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(subscribedTeachers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subscribedTeachers.slice(
    indexOfFirstItem,
    Math.min(indexOfLastItem, subscribedTeachers.length) // Adjust here
  );
  console.log(currentItems);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="flex justify-center items-center h-full"
      style={{ display: "block" }}
    >
      <ul className="w-full">
        {currentItems.map((profile) => (
          <TeacherProfileListItem
            key={profile._id}
            teacherProfile={profile}
            onOpenModal={() => {
              openModal(profile);
            }}
            onDelOpenModal={() => {
              delOpenModal(profile);
            }}
          />
        ))}
      </ul>
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        teacherProfile={selectedSubscribedTeacher}
      />
      <DelModal
        isDelOpen={isDelModalOpen}
        onDelClose={delCloseModal}
        teacherProfile={selectedSubscribedTeacher}
      />
    </div>
  );
};

export default TeacherListSubscribed;
