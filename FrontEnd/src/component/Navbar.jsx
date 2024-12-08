import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-white text-3xl font-extrabold tracking-wide">
        <Link to="/dashboard" className="hover:underline">
          Hi... I Am KAJA
        </Link>
      </div>

      {/* Conditional Login/Logout Button */}
      <div>
        {!isAuth ? (
          <Link to="/">
            <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition-all">
              Login
            </button>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
