import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherProfilesByCategoryOrSubcategory } from "../redux";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  useEffect(async () => {}, []);
  let dispatch = useDispatch();

  let { categories } = useSelector((state) =>
    state.category ? state.category : undefined
  );

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryCategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleFindTeacher = (e) => {
    // Call the function to find teachers by subcategory here

    e.preventDefault();
    e.target.value = "";
    FindTeacherBySubcategory(selectedCategory);
  };

  const FindTeacherBySubcategory = async (selectedCategory) => {
    // console.log(selectedCategory);

    if (selectedSubcategory === null) {
      await dispatch(
        fetchTeacherProfilesByCategoryOrSubcategory(selectedCategory)
      );
    } else {
      await dispatch(
        fetchTeacherProfilesByCategoryOrSubcategory(selectedSubcategory)
      );
    }
  };

  return (
    <form className="w-full max-w-md mx-auto mt-4" onSubmit={handleFindTeacher}>
      <select
        className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        onChange={(e) => handleCategoryChange(e.target.value)}
        value={selectedCategory}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.category}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <select
          className="block w-full mt-2 px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          onChange={(e) => handleSubcategoryCategoryChange(e.target.value)}
          value={selectedSubcategory}
        >
          <option value="">Select Subcategory</option>
          {categories
            .find((category) => category._id === selectedCategory)
            .subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.Subcategory}
              </option>
            ))}
        </select>
      )}

      <button
        type="submit"
        className="block w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Find Teacher
      </button>
    </form>
  );
};

export default Categories;
