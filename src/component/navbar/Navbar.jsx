import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdPhone, MdEmail } from 'react-icons/md';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import Button from '../common/Button';
import logo from "../../assets/Logo (1).png";
import logoName from "../../assets/Indiashop.png";
import { IoMdCart } from "react-icons/io";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg'; // Added for profile icon
import { setProductData } from '../../slices/productSlice';
import { searchAll } from '../../services/operations/search';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/auth';
import { socialData } from '../../data/data';


export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { profileData, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  const submitHandler = () => {
    navigate("/register/seller");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); 
  };

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearchSubmit = (e) => {
    navigate("/")
    e.preventDefault();
    if (searchQuery.trim()) {
      searchProducts(searchQuery);
      
      window.scroll({ top: 600, left: 0, behavior: "smooth" });
      toggleMenu();
    }
    
  };

  const searchProducts = async (q) => {
    try {
      const response = await searchAll(q);
      dispatch(setProductData(response));
    } catch (error) {
      console.error("Error searching products: ", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const location = useLocation();

  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <div >
      {/* Top Navbar - Hidden in mobile view */}
      <div className='bg-black text-[14px] p-2 md:px-[8%] text-white flex flex-row justify-between items-center w-full hidden md:flex'>
        
        <div className='flex w-[50%] justify-center items-center space-x-4'>
          <p className='flex items-center'>
            <a href="tel:+1234567890" className='flex justify-center flex-row items-center'>
              <MdPhone className='mr-2' /> {socialData.phone}
            </a>
          </p>
          <p className='flex items-center'>
            <a href="mailto:example@email.com" className='flex justify-center flex-row items-center'>
              <MdEmail className='mr-2' /> {socialData.mail}
            </a>
          </p>
        </div>

        <div className='flex w-[50%] justify-evenly items-center'>
          <div className='flex flex-row justify-center items-center gap-3'>
            <Link to='/login' className='flex flex-row justify-center items-center hover:text-green-500'>
              <FaSignInAlt className='mr-2' /> Login
            </Link>
            <div className='border-[1px] border-white h-[20px] w-[2px]'></div>
            <Link to='/register/customer' className='flex flex-row justify-center items-center hover:text-green-500'>
              <FaUserPlus className='mr-2' /> Register
            </Link>
          </div>

          {/* Social media icons */}
          <div className='flex flex-row gap-3'>
            <a href={`${socialData.facebook}`} target="_blank" rel="noopener noreferrer">
              <FaFacebook className='hover:text-green-500' />
            </a>
            <a href={`${socialData.x}`} target="_blank" rel="noopener noreferrer">
              <FaTwitter className='hover:text-green-500' />
            </a>
            <a href={`${socialData.insta}`} target="_blank" rel="noopener noreferrer">
              <FaInstagram className='hover:text-green-500' />
            </a>
            <a href={`${socialData.linkedin}`} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className='hover:text-green-500' />
            </a>
            <a href={`https://wa.me/${socialData.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className='hover:text-green-500' />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className='py-2 w-[80%] lg:ml-[17%] mx-auto flex flex-row justify-between md:justify-center items-center'>
        <NavLink to="/" className="flex lg:w-[10%] md:w-[30%] gap-2">
          <img src={socialData.logo} alt='logo' />
          <img src={logoName} alt='logoName' />
        </NavLink>

        {/* Desktop Menu */}
        <div className='hidden w-[80%] md:flex md:flex-grow lg:flex-row justify-center items-center gap-4'>
          <NavLink to="/" className={({ isActive }) => isActive ? "text-green font-semibold" : "text-gray-400 font-semibold hover:text-green-500"}>
            HOME
          </NavLink>
          <NavLink to="/order-on-demand" className={({ isActive }) => isActive ? "text-green font-semibold" : "text-gray-400 font-semibold hover:text-green-500"}>
            ORDER ON DEMAND
          </NavLink>
          {/* <NavLink to="/category" className={({ isActive }) => isActive ? "text-green font-semibold" : "text-gray-400 font-semibold hover:text-green-500"}>
            CATEGORY
          </NavLink> */}

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className='w-[25%] flex flex-row justify-center items-center border-2 gap-2 rounded-lg border-gray-300 px-2 py-1'>
            <CiSearch style={{ width: "25px", height: "25px" }} className='text-gray-500' />
            <input
              placeholder='Search for anything'
              className='w-full outline-none bg-transparent'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </form>

          <IoMdCart onClick={() => navigate("/cart")} style={{ width: "27px", height: "27px" }} className='text-green text-2xl' />
          <Button onClick={submitHandler} content={"Become a Seller"} icon={"CiShop"} />

          {/* Profile Image with Dropdown */}
          {token && (
            <div  className="relative">
              <button 
                onClick={toggleDropdown} 
                className="flex items-center justify-center p-2 bg-transparent border-none rounded-full hover:scale-105 transition-transform"
              >
                <img 
                  src={profileData?.profileImage} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full border-2 border-green-500 object-cover"
                />
              </button>
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-50">
                  <Link onClick={() => {
                    navigate("/dashboard")
                  }}  to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">
                    Profile
                  </Link>
                  <button 
                    onClick={() => { logout(dispatch); setDropdownOpen(false); }} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        {
          !isDashboardPage && (
            <div className='flex md:hidden'>
          <FaBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
        </div>
          )
        }
      </div>

      {/* Mobile Menu - Left Side Sliding */}
      <div ref={menuRef} className={`fixed md:hidden top-0 left-0 h-full bg-black text-white w-[250px] z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className='flex justify-between px-4 py-2 items-center'>
        {token ? (
            <div  className="relative">
              <button 
                onClick={toggleDropdown} 
                className="flex items-center py-2"
              >
                <img 
                  src={profileData?.profileImage} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"
                />
                
              </button>
              
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-50">
                  <Link onClick={() => setIsMenuOpen(false)} to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">
                    Profile
                  </Link>
                  <button 
                    onClick={() => { logout(dispatch); setDropdownOpen(false); }} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : ( <p className=' text-green font-bold ' > MENU </p> ) }
          <FaTimes className="text-xl cursor-pointer" onClick={toggleMenu} />
        </div>

        <nav className='flex flex-col p-4'>
          {/* Search on Top in Mobile View */}
          <form onSubmit={handleSearchSubmit} className='flex flex-row items-center border-2 gap-2 rounded-lg border-gray-300 p-2 mb-4'>
            <CiSearch />
            <input
              placeholder='Search for anything'
              className='w-full outline-none bg-transparent'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </form>

          <div className='flex w-full justify-between items-center' >
          <IoMdCart onClick={() => navigate("/cart")} style={{ width: "27px", height: "27px" }} className='text-green text-2xl' />
          <Button onClick={submitHandler} content={"Become a Seller"} icon={"CiShop"} />
          </div>
          <NavLink to="/" className="py-2 hover:text-green" onClick={toggleMenu}>HOME</NavLink>
          <NavLink to="/order-on-demand" className="py-2 hover:text-green" onClick={toggleMenu}>ORDER ON DEMAND</NavLink>
          {/* <NavLink to="/category" className="py-2 hover:text-green" onClick={toggleMenu}>CATEGORY</NavLink> */}
        
          
          
        </nav>


          {/* Login and Register at Bottom */}
        {
          token === null && (
            <div className='flex shadow-sm shadow-gray-200 absolute bottom-0 w-full left-0 p-2 flex-row py-2 justify-between'>
            <Link to='/login' className='flex flex-row justify-center items-center py-2 hover:text-green' onClick={toggleMenu}>
              <FaSignInAlt className='mr-2' /> Login
            </Link>
            <Link to='/register/customer' className='flex flex-row justify-center items-center py-2 hover:text-green' onClick={toggleMenu}>
              <FaUserPlus className='mr-2' /> Register
            </Link>
          </div>
          )
        }

      </div>
    </div>
  );
}
