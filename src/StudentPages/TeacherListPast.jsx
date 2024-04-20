import React, { useState } from "react";
import { useSelector } from "react-redux";

// TeacherProfileModalContent component to render the modal content
const TeacherProfileModalContent = ({ teacherProfile }) => {
  const {
    leavingDate,
    pastentrymessage,
    pastjoiningDate,
    pastleavingmessage,
    teacherprofileId,
  } = teacherProfile;

  var date = new Date(pastjoiningDate);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedJoiningDate = date.toLocaleDateString("en-US", options);

  var date = new Date(leavingDate);
  const formattedLeavingDate = date.toLocaleDateString("en-US", options);
  if (!teacherprofileId || Object.keys(teacherprofileId).length === 0) {
    return <div>No teacher profile data available</div>;
  }

  const { remuneration, daysAvailable, username, category, subcategory } =
    teacherprofileId;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Teacher Profile</h2>
      <p className="mb-2">
        <strong>Username:</strong> {username}
      </p>
      <p className="text-gray-700 text-base mb-2" style={{ fontSize: "14px" }}>
        <strong>Email:</strong> {teacherprofileId.email}{" "}
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
        <strong>Leaving Date:</strong> {formattedLeavingDate}
      </p>
      <p className="mb-2">
        <strong>Entry Message:</strong> {pastentrymessage}
      </p>
      <p className="mb-2">
        <strong>Joining Date:</strong> {formattedJoiningDate}
      </p>
      <p className="mb-2">
        <strong>Leaving Message:</strong> {pastleavingmessage}
      </p>
    </div>
  );
};
// Modal component
const Modal = ({ isOpen, onClose, teacherProfile }) => {
  console.log(teacherProfile);

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
              )}{" "}
            </span>
          </p>
        </div>
        <button
          onClick={() => onOpenModal()}
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
      className="w-full bg-white"
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

const TeacherListPast = () => {
  const { pastTeachers } = useSelector((state) =>
    state.user && state.user.user ? state.user.user : { pastTeachers: [] }
  );
  // console.log(pastTeachers);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPastTeacher, setSelectedPastTeacher] = useState({});

  const openModal = (teacherProfile) => {
    setSelectedPastTeacher(teacherProfile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(pastTeachers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pastTeachers.slice(
    indexOfFirstItem,
    Math.min(indexOfLastItem, pastTeachers.length) // Adjust here
  );
  // console.log(currentItems);
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
        teacherProfile={selectedPastTeacher}
      />
    </div>
  );
};

export default TeacherListPast;
