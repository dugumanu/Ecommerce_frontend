import React from "react";
import { useSelector } from "react-redux";
import { FaUserShield, FaStore, FaShoppingCart } from "react-icons/fa";
import { AiFillSetting, AiOutlineHistory, AiOutlineEdit } from "react-icons/ai";
import { MdCategory, MdDelete } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";

const DefaultDashboard = () => {
  const { profileData } = useSelector((state) => state.auth);

  // Role-specific content and actions
  const roleDetails = {
    admin: {
      message: "Manage all aspects of the platform with comprehensive tools.",
      features: [
        "Manage all user accounts (customers and sellers).",
        "Add, edit, and delete product categories.",
        "Monitor and manage products across the platform.",
      ],
      actions: [
        { label: "Manage Categories", icon: <MdCategory />, route: "/dashboard/categories" },
        { label: "Add Category", icon: <AiFillSetting />, route: "/dashboard/newcategory" },
        { label: "Manage Products", icon: <MdDelete />, route: "/dashboard/products" },
        { label: "Order Tracking", icon: <BsCardChecklist />, route: "/dashboard/order-tracking" },
      ],
    },
    seller: {
      message: "Streamline your product listings and manage orders efficiently.",
      features: [
        "Create new products and manage existing ones.",
        "Track and update order statuses.",
        "View and manage your cart for personal shopping.",
        "Edit your profile to keep information up-to-date.",
      ],
      actions: [
        { label: "Create Product", icon: <FaShoppingCart />, route: "/dashboard/products/create" },
        { label: "Product Management", icon: <MdCategory />, route: "/dashboard/products" },
        { label: "Order Tracking", icon: <FaStore />, route: "/dashboard/order-tracking" },
        { label: "Edit Profile", icon: <AiOutlineEdit />, route: "/dashboard/profile" },
      ],
    },
    customer: {
      message: "Explore products and manage your purchases effortlessly.",
      features: [
        "View and edit your profile information.",
        "Browse your shopping cart and make purchases.",
        "Track your order history and view details.",
      ],
      actions: [
        { label: "View Profile", icon: <FaUserShield />, route: "/dashboard/profile" },
        { label: "View Cart", icon: <FaShoppingCart />, route: "/dashboard/cart" },
        { label: "Order History", icon: <AiOutlineHistory />, route: "/dashboard/order" },
        { label: "Edit Profile", icon: <AiOutlineEdit />, route: "/dashboard/profile" },
      ],
    },
  };

  // Default to customer if no role is found
  const userRole = profileData?.role || "customer";
  const { message, features, actions } = roleDetails[userRole];

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Header Section */}
      <header className="text-center py-10 bg-white shadow-md">
        <h1 className="text-4xl font-bold">
          Welcome, {profileData?.fullName || "User"}!
        </h1>
        <p className="text-lg mt-4 text-gray-600">{message}</p>
      </header>

      {/* Features Section */}
      <section className="px-6 md:px-16 py-10">
        <h2 className="text-2xl font-semibold text-center mb-8">What You Can Do</h2>
        <ul className="list-disc pl-8 text-gray-600">
          {features.map((feature, index) => (
            <li key={index} className="mb-2">{feature}</li>
          ))}
        </ul>
      </section>

      {/* Quick Actions Section */}
      <section className="px-6 md:px-16 py-10">
        <h2 className="text-2xl font-semibold text-center mb-8">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              <div className="text-4xl text-blue-500">{action.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{action.label}</h3>
                <a
                  href={action.route}
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Go to {action.label}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DefaultDashboard;
