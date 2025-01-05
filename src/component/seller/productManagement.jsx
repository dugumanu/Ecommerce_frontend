import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { fetchAllProducts, deleteProductById, getProductByUserID } from '../../services/operations/product';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductTable from '../common/ProductTable';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token, profileData } = useSelector((state) => state.auth);
  const role = profileData?.role;

  // Fetch products based on role
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = role === 'admin' ? await fetchAllProducts() : await getProductByUserID(token);
      setProducts(response);
    } catch (err) {
      setError('Error fetching products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      await deleteProductById(id, token);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <Link to="/dashboard/products/create" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Product
        </Link>
      </div>

      
      {loading && <p>Loading products...</p>}

      
      {error && <p className="text-red-500">{error}</p>}

      
      {!loading && products.length === 0 && (
        <p className="text-gray-500">No products found. Start adding some!</p>
      )}

      
      {!loading && products.length > 0 && (
        <ProductTable data={products} onDelete={handleDelete} />
      )}
    </div>
  );
}
