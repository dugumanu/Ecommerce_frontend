import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { fetchAllProducts, deleteProductById } from '../../services/operations/product';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'; 

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const { token } = useSelector((state) => state.auth);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetchAllProducts();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      await deleteProductById(id, token);
      setProducts(products.filter((product) => product._id !== id)); // Remove deleted product from the list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <Link
          to="/dashboard/newproduct"
          className="bg-green text-white py-2 px-4 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Product
        </Link>
      </div>

      {/* Make the table responsive using react-super-responsive-table */}
      <Table className="min-w-full bg-white border">
        <Thead>
          <Tr>
            <Th className="py-3 px-5 border-b text-left">Name</Th>
            <Th className="py-3 px-5 border-b text-left">Category</Th>
            <Th className="py-3 px-5 border-b text-left">Price</Th>
            <Th className="py-3 px-5 border-b text-left">Image</Th>
            <Th className="py-3 px-5 border-b text-left">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product, index) => (
            <Tr
              key={product._id}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} // Odd-Even row coloring
            >
              <Td className="py-3 px-5 border-b">{product.name}</Td>
              <Td className="py-3 px-5 border-b">{product.categoryId?.name || 'N/A'}</Td>
              <Td className="py-3 px-5 border-b">{product.price}</Td>
              <Td className="py-3 px-5 border-b">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-10 w-10 object-cover"
                  />
                ) : (
                  'No image'
                )}
              </Td>
              <Td className="py-3 px-5 border-b">
                <button
                  onClick={() => handleDelete(product._id)}
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
