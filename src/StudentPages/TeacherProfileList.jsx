import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../api/alerts";
import { sendRequestToTeacherProfile } from "../api/student";
import { loadStudent } from "../redux";

// TeacherProfileModalContent component to render the modal content
const TeacherProfileModalContent = ({ teacherProfile }) => {
  const { remuneration, daysAvailable, username, category, subcategory } =
    teacherProfile;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Teacher Profile</h2>
      <p className="mb-2">
        <strong>Username:</strong> {username}
      </p>
      <p className="mb-2">
        <strong>Category:</strong> {category}
      </p>
      <p className="mb-2">
        <strong>Subcategory:</strong> {subcategory}
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
  const [requestSent, setRequestSent] = useState(false);
  const [buttonContent, setButtonContent] = useState("Send Request");
  const [entryMessage, setEntryMessage] = useState("");

  let dispatch = useDispatch();
  const { subscribedTeachers, PendingRequestSent } = useSelector((state) =>
    state.user && state.user.user
      ? state.user.user
      : { subscribedTeachers: [], PendingRequestSent: [] }
  );

  useEffect(() => {
    console.log("object");
    setButtonContent("Send Request");
    setEntryMessage("");
    setRequestSent(false);
    if (teacherProfile && Object.keys(teacherProfile).length !== 0) {
      const isPendingRequestSent = PendingRequestSent.some(
        (teacher) => teacher.teacherprofileId._id === teacherProfile._id
      );
      const isRequestAccepted = subscribedTeachers.some(
        (teacher) => teacher.teacherprofileId._id === teacherProfile._id
      );

      if (isPendingRequestSent) {
        setButtonContent("Request Already Sent");
        setRequestSent(true);
      } else if (isRequestAccepted) {
        setButtonContent("Request Accepted");
        setRequestSent(true);
      }
    }
  }, [isOpen, onClose, teacherProfile, PendingRequestSent, subscribedTeachers]);

  const sendRequest = async () => {
    // Your logic for sending the request goes here
    // For example, you can make an API call or update the state
    const requestData = {
      PendingRequestSent: {
        teacherprofileId: teacherProfile._id,
        pendingentrymessage: entryMessage, // Set the entry message here
      },
    };
    var sent;
    if (entryMessage != "")
      sent = await sendRequestToTeacherProfile(requestData);
    else showAlert("success", "Provide an entry message", 3);
    console.log(sent);
    if (sent) {
      dispatch(loadStudent());
      setRequestSent(true);
      setButtonContent("Request Sent");
    }
  };

  const handleEntryMessageChange = (event) => {
    setEntryMessage(event.target.value);
  };

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
          {buttonContent === "Send Request" && (
            <textarea
              value={entryMessage}
              onChange={handleEntryMessageChange}
              className="block w-full border border-gray-300 rounded-lg p-2 mt-2"
              placeholder="Entry Message"
              style={{ marginBottom: "30px" }}
            />
          )}
          <button
            onClick={sendRequest}
            className={`${
              requestSent
                ? "bg-gray-500 text-gray-700 cursor-default"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            } font-bold py-2 px-4 rounded mr-2`}
            disabled={requestSent}
          >
            {buttonContent}
          </button>
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

// TeacherProfileListItem component
const TeacherProfileListItem = ({ teacherProfile, onOpenModal }) => {
  return (
    <li
      className="w-90 m-4"
      style={{ width: "70%", margin: "auto", marginTop: "40px" }}
    >
      <div className="flex justify-between items-center border rounded overflow-hidden shadow-lg p-4">
        <div style={{ fontSize: "25px" }}>
          <div
            className="font-bold text-xl mb-2"
            style={{ fontSize: "25px", marginBottom: "25px" }}
          >
            {teacherProfile.username}
          </div>
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Email: <span className="ml-2">{teacherProfile.email}</span>
          </p>
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Category: <span className="ml-2">{teacherProfile.category}</span>
          </p>
          <p
            className="text-gray-700 text-base mb-2"
            style={{ fontSize: "14px" }}
          >
            Subcategory:{" "}
            <span className="ml-2">{teacherProfile.subcategory}</span>
          </p>
        </div>
        <button
          onClick={() => {
            onOpenModal();
          }}
          className="bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          View
        </button>
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
      className="w-full bg-white "
      aria-label="Pagination"
      style={{ marginTop: "50px", marginBottom: "100px" }}
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

const TeacherProfilesList = () => {
  const { teacher_profiles } = useSelector((state) =>
    state.teacherProfile ? state.teacherProfile : { teacher_profiles: [] }
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
  const totalPages = Math.ceil(teacher_profiles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teacher_profiles.slice(
    indexOfFirstItem,
    Math.min(indexOfLastItem, teacher_profiles.length) // Adjust here
  );

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
        teacherProfile={selectedTeacherProfile}
      />
    </div>
  );
};

export default TeacherProfilesList;
