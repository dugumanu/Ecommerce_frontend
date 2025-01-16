import React from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuLayoutDashboard } from "react-icons/lu";
export default function Sidebar() {
  const location = useLocation();
  const { profileData } = useSelector((state) => state.auth);

  
  const role = profileData?.role || "customer";
  const isActive = location.pathname === "/dashboard";

  return (
    <div className="md:bg-transparent no-scrollbar bg-black text-white w-[20rem] h-screen fixed  md:py-8 shadow-lg"> 
      <div className="flex flex-col p-5 space-y-6">
        <Link
          to="/dashboard"
          className={`flex items-center p-3 space-x-3 transition-colors duration-300 rounded-md 
            ${isActive ? "bg-green text-white font-semibold" : "text-gray-400 hover:text-green hover:bg-gray-800"}`}
        >
          <LuLayoutDashboard style={{width:"22px", height:"22px"}} />
          <span className="ml-3"> { role === "customer" ? "Dashboard" : "Dashboard" } </span>
        </Link>

        {sidebarLinks
          .filter((link) => link.userType.includes(role) || link.userType === "all")
          .map((link) => (
            <SidebarLink key={link.id} link={link} />
          ))}
      </div>
    </div>
  );
}
