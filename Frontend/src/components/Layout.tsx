import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
    className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 via-blue-300 to-gray-100 sm:bg-gradient-to-b sm:from-blue-200 sm:via-gray-300 sm:to-gray-100 md:bg-gradient-to-tl md:from-blue-200 md:via-gray-100 md:to-blue-50 lg:bg-gradient-to-br xl:bg-gradient-to-l"
    style={{
      backgroundSize: "400% 400%",
      animation: "gradientShift 8s ease infinite",
    }}
  >
    <Navbar />
    <main className="flex-grow p-6">
      {children}
    </main>
    <footer className="bg-gradient-to-r from-gray-700 via-gray-800 to-black bg-opacity-70 p-4 text-center text-white">
      <p>NutriCare Hub &copy; 2025</p>
    </footer>
  
    <style>
      {`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}
    </style>
  </div>  
  );
};

export default Layout;
