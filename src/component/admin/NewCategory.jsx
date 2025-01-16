import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createCategory } from '../../services/operations/category';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon

export default function AddCategoryForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const { token } = useSelector((state) => state.auth);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file changes
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleBannerChange = (e) => setBanner(e.target.files[0]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('image', image);
    data.append('banner', banner);

    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await createCategory(data, token);
      // setMessage(response.data.message || 'Category added successfully!');
      toast.success('Category added successfully');
    } catch (error) {
      setMessage('Error adding category: ' + (error.response?.data?.message || error.message));
      toast.error('Failed to add category');
    } finally {
      setLoading(false); // Set loading to false after form submission is complete
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      {/* Breadcrumbs */}
      <div className="text-sm mb-6 text-gray-600">
        <Link to="/dashboard/categories" className="hover:text-green-500 cursor-pointer">
          Category
        </Link>
        <span className="mx-1"> &gt; </span>
        <span className="text-gray-900 font-semibold">Add Category</span>
      </div>

      {/* Form Title */}
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Add New Category</h2>

      {/* Success/Error Message */}
      {message && <p className="mb-4 text-green-700 font-medium">{message}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            placeholder="Enter category name"
            disabled={loading} // Disable input when loading
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            placeholder="Enter description"
            disabled={loading} // Disable input when loading
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded p-1.5 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-600 hover:file:bg-green-100"
            disabled={loading} // Disable input when loading
          />
        </div>

        {/* Banner Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Banner</label>
          <input
            type="file"
            onChange={handleBannerChange}
            required
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded p-1.5 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-600 hover:file:bg-green-100"
            disabled={loading} // Disable input when loading
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green text-white font-semibold py-3 rounded shadow hover:bg-green transition duration-200"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" /> // Show spinner if loading
          ) : (
            "Add Category"
          )}
        </button>
      </form>
    </div>
  );
}
