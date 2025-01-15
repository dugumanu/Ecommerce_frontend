import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllCategories } from '../../services/operations/category';
import { createProduct } from '../../services/operations/product';

export default function CreateProduct() {
  const { token, profileData } = useSelector((state) => state.auth);  // Get user token from Redux state
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    categoryId: '',
    name: '',
    about: '',
    originalPrice: '',
    price: '',
    state: 'Bihar',
    city: '',
    images: [],
    sellerId: profileData._id,
  });

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData((prevState) => ({
      ...prevState,
      images: files,
    }));
  };

  const [loading,setLoading] = useState(false)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('categoryId', productData.categoryId);
    formData.append('name', productData.name);
    formData.append('about', productData.about);
    formData.append('originalPrice', productData.originalPrice);
    formData.append('price', productData.price);
    formData.append('state', productData.state);
    formData.append('city', productData.city);
    formData.append('sellerId', productData._id);
    productData.images.forEach((image) => {
      formData.append('images', image);
    });

    setLoading(true)

    await createProduct(formData, token);
    setLoading(false)
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="categoryId"
            value={productData.categoryId}
            onChange={handleInputChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="about" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="about"
            name="about"
            value={productData.about}
            onChange={handleInputChange}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="4"
          />
        </div>

        {/* Price and Original Price */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="originalPrice" className="block text-lg font-medium text-gray-700">Original Price</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              value={productData.originalPrice}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* State and City */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="state" className="block text-lg font-medium text-gray-700">State</label>
            <input
            disabled
              type="text"
              id="state"
              name="state"
              value={productData.state}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-lg font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={productData.city}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Product Images</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 bg-green text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            {
                loading ? ( <button disabled className=' animate-bounce ' >"Creating..."</button> ) : ("Submit")
            }
          </button>
        </div>
      </form>
    </div>
  );
}
