import React from 'react';
import * as VscIcons from "react-icons/vsc";
import * as CiIcons from "react-icons/ci";
import * as FaIcons from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function SidebarLink({ link }) {
  const location = useLocation();

  const getIconComponent = () => {
    switch (link.library) {
      case "vsc":
        return VscIcons[link.icon];
      case "ci":
        return CiIcons[link.icon];
      case "fa":
        return FaIcons[link.icon];
      default:
        return null;
    }
  };

  const IconComponent = getIconComponent();
  const isActive = location.pathname === link.path;

  return (
    <Link
      to={link.path}
      className={`flex items-center p-3 space-x-3 transition-colors duration-300 rounded-md 
        ${isActive ? "bg-green text-white font-semibold" : "text-gray-400 hover:text-green hover:bg-gray-800"}`}
    >
      {IconComponent && <IconComponent size={24} />}
      <span className="ml-3">{link.name}</span>
    </Link>
  );
}
