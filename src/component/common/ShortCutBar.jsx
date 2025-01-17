import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { socialData } from '../../data/data';


// Import images
const call = require("../../assets/call.png");
const whatsapp = require("../../assets/whatsapp.png");
const twitter = require("../../assets/x.png");
const instagram = require("../../assets/instagram.png");
const email = require("../../assets/email.png");

function ShortcutBar() {
  const [isHomePage, setIsHomePage] = useState(false);
  const location = useLocation(); // Get the current location

  // Check if it's the homepage
  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location]); // Re-run the effect when the location changes

  if (!isHomePage) return null; // Hide on pages other than home

  return (
    <div className="fixed right-2 md:right-4 md:top-1/3 top-[27%] flex flex-col gap-2 z-50">
      {/* Call Shortcut */}
      <a
        href={`tel:${socialData.phone }`}
        className="flex items-center justify-center md:w-12 md:h-12 w-10 h-10 bg-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        title="Call"
      >
        <img src={call} alt="Call" className="md:w-8 md:h-8 w-6 h-6 " />
      </a>

      {/* WhatsApp Shortcut */}
      <a
        href={`https://wa.me/${socialData.whatsapp}`}
        className="flex items-center justify-center md:w-12 md:h-12 w-10 h-10 bg-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
      >
        <img src={whatsapp} alt="WhatsApp" className="md:w-8 md:h-8 w-6 h-6 " />
      </a>

      {/* Twitter Shortcut */}
      <a
        href={`${socialData.x}`}
        className="flex items-center justify-center md:w-12 md:h-12 w-10 h-10 bg-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        target="_blank"
        rel="noopener noreferrer"
        title="Twitter"
      >
        <img src={twitter} alt="Twitter" className="md:w-8 md:h-8 w-6 h-6 " />
      </a>

      {/* Instagram Shortcut */}
      <a
        href={`${socialData.insta}`}
        className="flex items-center justify-center md:w-12 md:h-12 w-10 h-10 bg-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
      >
        <img src={instagram} alt="Instagram" className="md:w-8 md:h-8 w-6 h-6 " />
      </a>

      {/* Email Shortcut */}
      <a
        href={`mailto:${socialData.mail}`}
        className="flex items-center justify-center md:w-12 md:h-12 w-10 h-10 bg-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        title="Email"
      >
        <img src={email} alt="Email" className="md:w-8 md:h-8 w-6 h-6 " />
      </a>
    </div>
  );
}

export default ShortcutBar;
