import React from "react";

function Footer() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{/* Your main content here */}</main>
      <footer className="text-sm bg-gray-900 text-white p-4 text-center sticky bottom-0">
        Made by Upasana Pan
      </footer>
    </div>
  );
}

export default Footer;
