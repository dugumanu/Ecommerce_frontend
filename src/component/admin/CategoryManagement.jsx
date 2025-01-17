import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { deleteCategoryById, fetchAllCategories } from '../../services/operations/category';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { token } = useSelector((state) => state.auth);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await fetchAllCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category deletion
  const handleDelete = async () => {
    try {
      await deleteCategoryById(selectedCategory._id, token);
      setCategories(categories.filter((category) => category._id !== selectedCategory._id));
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Open confirmation modal
  const openModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  // Close confirmation modal
  const closeModal = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Category Management</h2>
        <Link
          to="/dashboard/newcategory"
          className="bg-green text-white py-2 px-4 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Category
        </Link>
      </div>

      <Table className="min-w-full bg-white border">
        <Thead>
          <Tr>
            <Th className="py-3 px-5 border-b text-left">Name</Th>
            <Th className="py-3 px-5 border-b text-left">Description</Th>
            <Th className="py-3 px-5 border-b text-left">Image</Th>
            <Th className="py-3 px-5 border-b text-left">Banner</Th>
            <Th className="py-3 px-5 border-b text-left">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories &&
            categories.map((category, index) => (
              <Tr
                key={category._id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <Td className="py-3 px-5 border-b">{category.name}</Td>
                <Td className="py-3 px-5 border-b">{category.description || 'N/A'}</Td>
                <Td className="py-3 px-5 border-b">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-10 w-10 object-cover"
                    />
                  ) : (
                    'No image'
                  )}
                </Td>
                <Td className="py-3 px-5 border-b">
                  {category.banner ? (
                    <img
                      src={category.banner}
                      alt={`${category.name} banner`}
                      className="h-10 w-20 object-cover"
                    />
                  ) : (
                    'No banner'
                  )}
                </Td>
                <Td className="py-3 px-5 border-b">
                  <button
                    onClick={() => openModal(category)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      {/* Confirmation Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-5 rounded-md shadow-lg w-full max-w-md mx-4 sm:mx-8 md:mx-0">
      <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">
        Confirm Deletion
      </h3>
      <p className="mb-4 text-sm sm:text-base text-center sm:text-left">
        Are you sure you want to delete the category{' '}
        <span className="font-bold">{selectedCategory.name}</span>? This will also delete all products associated with this category.
      </p>
      <div className="flex justify-center sm:justify-end space-x-4">
        <button
          onClick={closeModal}
          className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
