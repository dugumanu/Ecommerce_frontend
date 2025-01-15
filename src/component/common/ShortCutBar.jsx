import React, { useEffect, useState } from 'react';

function ShortcutBar() {
  const [isHomePage, setIsHomePage] = useState(false);

  // Check if it's the homepage
  useEffect(() => {
    if (window.location.pathname === '/') {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, []);

  if (!isHomePage) return null; // Hide on pages other than home

  return (
    <div className="fixed left-0 top-1/3 flex flex-col z-50">
      {/* Call Shortcut */}
      <a href="tel:+1234567890" className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white text-2xl shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl">
        📞
      </a>

      {/* WhatsApp Shortcut */}
      <a href="https://wa.me/1234567890" className="flex items-center justify-center w-12 h-12 bg-green-600 text-white text-3xl shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/WhatsApp_logo.svg" alt="WhatsApp" className="w-8 h-8" />
      </a>

      {/* Twitter Shortcut */}
      <a href="https://twitter.com/yourhandle" className="flex items-center justify-center w-12 h-12 bg-blue-400 text-white text-3xl shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl" target="_blank" rel="noopener noreferrer">
        X
      </a>

      {/* Instagram Shortcut */}
      <a href="https://instagram.com/yourhandle" className="flex items-center justify-center w-12 h-12 bg-pink-500 text-white text-3xl shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl" target="_blank" rel="noopener noreferrer">
        📷
      </a>

      {/* Email Shortcut */}
      <a href="mailto:your-email@example.com" className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white text-3xl shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl">
        ✉️
      </a>
    </div>
  );
}

export default ShortcutBar;
