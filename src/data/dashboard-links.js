export const sidebarLinks = [
  // Links available to all users
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: "VscHome",
    library: "vsc",
    userType: ["customer", "admin", "seller"]
  },
  {
    id: 2,
    name: "Profile",
    path: "/dashboard/profile",
    icon: "FaUserCircle",
    library: "fa",
    userType: ["all"]
  },
  {
    id: 3,
    name: "Order",
    path: "/dashboard/order",
    icon: "FaClipboardList",
    library: "fa",
    userType: ["all"]
  },

  // Admin-specific links
  {
    id: 4,
    name: "Dashboard",
    path: "/dashboard",
    icon: "FaTachometerAlt",
    library: "fa",
    userType: ["admin"]
  },
  {
    id: 5,
    name: "Category Management",
    path: "/dashboard/categories",
    icon: "FaThList",
    library: "fa",
    userType: ["admin"]
  },
  {
    id: 6,
    name: "User Management",
    path: "/dashboard/users",
    icon: "FaUsers",
    library: "fa",
    userType: ["admin"]
  },
  {
    id: 7,
    name: "Order Management",
    path: "/dashboard/orders",
    icon: "FaClipboardList",
    library: "fa",
    userType: ["admin"]
  },
  {
    id: 8,
    name: "Reports",
    path: "/dashboard/reports",
    icon: "VscGraph",
    library: "vsc",
    userType: ["admin"]
  },
  {
    id: 9,
    name: "Settings",
    path: "/dashboard/settings",
    icon: "FaCog",
    library: "fa",
    userType: ["admin"]
  },

  // Seller-specific links
  {
    id: 10,
    name: "Product Management",
    path: "/dashboard/products",
    icon: "FaBoxes",
    library: "fa",
    userType: ["seller"]
  },
  {
    id: 11,
    name: "Create Product",
    path: "/dashboard/products/create",
    icon: "FaPlusCircle",
    library: "fa",
    userType: ["seller"]
  },
  {
    id: 12,
    name: "Order Tracking",
    path: "/dashboard/order-tracking",
    icon: "FaShippingFast",
    library: "fa",
    userType: ["seller"]
  },
  {
    id: 13,
    name: "Shop Profile",
    path: "/dashboard/shop",
    icon: "FaStore",
    library: "fa",
    userType: ["seller"]
  },

  // Customer-specific links
  {
    id: 14,
    name: "Browse Products",
    path: "/products",
    icon: "FaShoppingCart",
    library: "fa",
    userType: ["customer"]
  },
  {
    id: 15,
    name: "Cart",
    path: "/dashboard/cart",
    icon: "FaCartPlus",
    library: "fa",
    userType: ["customer"]
  },
  {
    id: 16,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    icon: "FaHistory",
    library: "fa",
    userType: ["customer"]
  },

  // Links available to both admin and seller
  {
    id: 17,
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: "FaChartLine",
    library: "fa",
    userType: ["admin", "seller"]
  },
  {
    id: 18,
    name: "Order Summary",
    path: "/dashboard/order-summary",
    icon: "CiTrophy",
    library: "ci",
    userType: ["admin", "seller"]
  }
];
