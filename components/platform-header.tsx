"use client";

import React from "react";

export default function PlatformHeader() {

  const handlePlatformClick = () => {
    // Stay on current site - just refresh/navigate to home
    window.location.href = "https://platform.nwsldata.com";
  };

  const handleDocsClick = () => {
    // Seamless navigation - same tab for natural flow
    window.location.href = "https://platform.nwsldata.com/docs/";
  };

  const handleLogoClick = () => {
    window.location.href = "https://nwsldata.com";
  };

  return (
    <header className="w-full flex justify-between items-center py-6 px-8 bg-white border-b border-gray-200">
      {/* Logo */}
      <div 
        onClick={handleLogoClick}
        className="cursor-pointer"
      >
        <h1 className="text-2xl font-semibold">
          <span className="text-blue-500">NWSL</span>{" "}
          <span className="text-black">Data</span>
        </h1>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        {/* Platform Button */}
        <button
          onClick={handlePlatformClick}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          Platform
        </button>

        {/* Docs Button */}
        <button
          onClick={handleDocsClick}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          Docs
        </button>

      </div>
    </header>
  );
}