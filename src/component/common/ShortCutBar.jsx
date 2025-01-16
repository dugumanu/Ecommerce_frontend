import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
    <div className="fixed right-4 md:right-8 top-1/3 flex flex-col gap-4 z-50">
      {/* Call Shortcut */}
      <a
        href="tel:+1234567890"
        className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        title="Call"
      >
        <img src={call} alt="Call" className="w-8 h-8" />
      </a>

      {/* WhatsApp Shortcut */}
      <a
        href="https://wa.me/1234567890"
        className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
      >
        <img src={whatsapp} alt="WhatsApp" className="w-8 h-8" />
      </a>

      {/* Twitter Shortcut */}
      <a
        href="https://twitter.com/yourhandle"
        className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        target="_blank"
        rel="noopener noreferrer"
        title="Twitter"
      >
        <img src={twitter} alt="Twitter" className="w-8 h-8" />
      </a>

      {/* Instagram Shortcut */}
      <a
        href="https://instagram.com/yourhandle"
        className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
      >
        <img src={instagram} alt="Instagram" className="w-8 h-8" />
      </a>

      {/* Email Shortcut */}
      <a
        href="mailto:your-email@example.com"
        className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        title="Email"
      >
        <img src={email} alt="Email" className="w-8 h-8" />
      </a>
    </div>
  );
}

export default ShortcutBar;
