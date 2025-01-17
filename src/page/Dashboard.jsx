import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu';
import Sidebar from '../component/core/dashboard/Sidebar';
import { useSelector } from 'react-redux';


export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/dashboard");
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen z-0"> 
      {isMobile ? (
        <Menu >
          <Sidebar />
        </Menu>
      ) : (
        <div><Sidebar /></div>
      )}

      <div className={`flex justify-center items-center w-full transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        <div className="h-full overflow-auto"> 
          <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
