import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button"; 

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-700 via-gray-800 to-black bg-opacity-70 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl hover:underline">
          NurtiCare Hub
        </Link>
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" className="text-black hover:text-blue-600 border-white">
            <Link to="/signup">Signup</Link>
          </Button>
          <Button asChild variant="outline" className="text-black hover:text-blue-600 border-white">
            <Link to="/pantry">Pantry</Link>
          </Button>
          <Button asChild variant="outline" className="text-black hover:text-blue-600 border-white">
            <Link to="/deliverypersonnel">Delivery Personnel</Link>
          </Button>
          <Button asChild variant="outline" className="text-black hover:text-blue-600 border-white">
            <Link to="/manager">Hospital Food Manager</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
  
};

export default Navbar;

