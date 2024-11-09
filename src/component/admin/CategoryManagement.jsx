import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { deleteCategoryById, fetchAllCategories } from '../../services/operations/category';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'; // Import the default styles

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
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
  const handleDelete = async (id) => {
    try {
      await deleteCategoryById(id, token);
      setCategories(categories.filter((category) => category._id !== id));
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
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

      {/* Make the table responsive using react-super-responsive-table */}
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
          {categories.map((category, index) => (
            <Tr
              key={category._id}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} // Odd-Even row coloring
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
                  onClick={() => handleDelete(category._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
