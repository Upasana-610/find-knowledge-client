import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherProfilesByCategoryOrSubcategory } from "../redux";

const CategoriesProfile = ({ handleChange }) => {
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

  return (
    <>
      <select
        className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        onChange={(e) => {
          handleCategoryChange(e.target.value);
          handleChange(e);
        }}
        name="category"
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
          onChange={(e) => {
            handleSubcategoryCategoryChange(e.target.value);
            handleChange(e);
          }}
          name="subcategory"
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
    </>
  );
};

export default CategoriesProfile;
