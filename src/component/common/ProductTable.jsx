import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({ data = [], onEdit, onDelete }) => {
  const navigate = useNavigate();

  // Redirect on product name click
  const handleProductClick = (item) => {
    const productCategory = item.categoryId?.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown-category';
    const productName = item.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown-product';
    navigate(`/product/${productCategory}/${productName}/${item._id}`);
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full border border-gray-300 text-sm text-gray-700">
        <Thead className="bg-green text-white">
          <Tr>
            <Th className="p-4 border">Product Name</Th>
            <Th className="p-4 border">Category</Th>
            <Th className="p-4 border">Original Price</Th>
            <Th className="p-4 border">Discount</Th>
            <Th className="p-4 border">Price</Th>
            <Th className="p-4 border">Description</Th>
            <Th className="p-4 border">Rating & Reviews</Th>
            <Th className="p-4 border">Images</Th>
            <Th className="p-4 border">Seller</Th>
            <Th className="p-4 border">Location</Th>
            <Th className="p-4 border">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <Tr
                key={item._id || index}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition duration-200`}
              >
                <Td 
                  className="p-4 border cursor-pointer text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={() => handleProductClick(item)}
                >
                  {item.name || 'Unknown Product'}
                </Td>
                <Td className="p-4 border">{item.categoryId?.name || 'N/A'}</Td>
                <Td className="p-4 border">₹{item.originalPrice || 0}</Td>
                <Td className="p-4 border">{item.discount || 0} %</Td>
                <Td className="p-4 border">₹{item.price || 0}</Td>
                <Td className="p-4 border">
                  {item.about ? item.about.substring(0, 50) + '...' : 'No description available'}
                </Td>
                <Td className="p-4 border">{item.ratingAndReviewIds?.length || 0} Reviews</Td>
                <Td className="p-4 border">
                  {item.image && item.image.length > 0 ? (
                    item.image.map((img, idx) => (
                      <img key={idx} src={img} alt="product" className="w-12 h-12 object-cover rounded-md mb-1" />
                    ))
                  ) : (
                    <p className="text-gray-500">No images available</p>
                  )}
                </Td>
                <Td className="p-4 border">
                  <p>{item.sellerId?.fullName || 'Unknown Seller'}</p>
                  <p>{item.sellerId?.email || 'N/A'}</p>
                </Td>
                <Td className="p-4 border">
                  {item.city || 'Unknown City'}, {item.state || 'Unknown State'}
                </Td>
                <Td className="p-4 border flex justify-center space-x-3">
                  <button onClick={() => onEdit(item)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(item._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="11" className="text-center p-4 text-gray-500">
                No products available
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
