import React, { useState } from 'react';

const EditProfile = ({ userData, onSave }) => {
  const [fullName, setFullName] = useState(userData.fullName || '');
  const [email, setEmail] = useState(userData.email || '');
  const [address, setAddress] = useState(userData.address || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState(userData.profileImage || '');
  const [imagePreview, setImagePreview] = useState(userData.profileImage || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (newPassword && newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('password', newPassword || currentPassword);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    onSave(formData);
  };

  return (
    <div className="w-full  p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-green mb-6">Edit Your Profile</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Full Name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            placeholder="Email"
            disabled
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Address"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">Profile Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full text-gray-600"
        />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 rounded-full border border-gray-300 object-cover" />
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-medium text-gray-700 mb-4">Password Changes</h3>
      
      <div className="mb-4">
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Current Password"
        />
      </div>
      
      <div className="mb-4">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="New Password"
        />
      </div>
      
      <div className="mb-6">
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Confirm New Password"
        />
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green text-white rounded-md hover:bg-green focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
