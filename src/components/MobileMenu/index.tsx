// MobileMenu.js
import React from 'react';

const MobileMenu = () => {
  return (
    <div className="md:hidden">
      {/* Ícone hamburguer para o modo móvel */}
      <button className="text-white p-4">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default MobileMenu;

