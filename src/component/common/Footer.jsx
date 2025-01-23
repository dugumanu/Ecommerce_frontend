import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { socialData } from "../../data/data";

const indiaShop = require("../../assets/Indiashop.png");
const logo = require("../../assets/Logo (1).png");

export default function Footer() {
  return (
    <footer className="bg-black  mt-[5%] text-white px-[5%] py-[2%]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Logo and Tagline */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-2 mb-3">
              <img src={socialData.pngLogo} alt="indiashop logo" className="md:h-12 h-12 w-auto" />
              {/* <img src={indiaShop} alt="indiashop text" className="h-6 w-auto" /> */}
            </div>
            <p className="text-sm">Your one-stop solution. We got you covered!</p>
            <div className="flex space-x-4 mt-4">
              {socialData.facebook && (
                <a href={socialData.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="hover:text-green-500 text-xl" />
                </a>
              )}
              {socialData.x && (
                <a href={socialData.x} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="hover:text-green-500 text-xl" />
                </a>
              )}
              {socialData.insta && (
                <a href={socialData.insta} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="hover:text-green-500 text-xl" />
                </a>
              )}
              {socialData.linkedin && (
                <a href={socialData.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="hover:text-green-500 text-xl" />
                </a>
              )}
              {socialData.whatsapp && (
                <a
                  href={`https://wa.me/${socialData.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="hover:text-green-500 text-xl" />
                </a>
              )}
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Listings
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Contact Info */}
          <div>
            <h3 className="font-bold mb-3">Contact info</h3>
            <ul className="space-y-2 text-sm">
  {/* Phone */}
  <li>
    <a href={`tel:${socialData.phone}`} className=" hover:underline">
      {socialData.phone}
    </a>
  </li>

  {/* Email */}
  <li>
    <a href={`mailto:${socialData.mail}`} className=" hover:underline">
      {socialData.mail}
    </a>
  </li>

  {/* Location */}
  <li>
    <a
      href="https://www.google.com/maps/place/Bihar,+India"
      target="_blank"
      rel="noopener noreferrer"
      className=" hover:underline"
    >
      Bihar, India
    </a>
  </li>
</ul>

          </div>
        </div>
      </div>
    </footer>
  );
}
