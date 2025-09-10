import {NavLink, useNavigate} from 'react-router-dom';
import {FaBookOpen, FaDoorOpen, FaHome} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios";
import { FaUser, FaBook} from 'react-icons/fa';



function Sidebar() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.delete("http://127.0.0.1:8000/api/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json"
        },
      });
  
      localStorage.removeItem("token");
      navigate("/login", {replace: true});


    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  const confirmLogout = () => {
    setShowConfirm(true);
  };

  



  return (
    <>
      

      <div
        className="h-full fixed left-0 top-0 z-40
          bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
          text-white w-[60px] lg:w-56
          shadow-xl flex flex-col justify-between
          transition-all duration-300 "
      >
        {/* Logo / Header */}
        <div className="p-4 flex items-center justify-center lg:justify-start">
          <span className="hidden lg:block text-lg font-bold tracking-wide">
            📚 Perpus
          </span>
        </div>

        {/* Menu Utama */}
        <ul className="flex-1 px-2 space-y-2 lg:mt-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition-all 
                ${isActive
                  ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white m-0"
                  : "hover:bg-white/10 hover:shadow-sm"}`
              }
            >
              <FaHome className="w-5 h-5" />
              <span className="hidden lg:inline text-sm">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              rel="noopener noreferrer"
              to="/buku"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white m-0"
                    : "hover:bg-white/10 hover:shadow-sm "
                }`
              }
            >
              <FaBook className="w-5 h-5" />
              <span className="hidden lg:inline text-sm">Data Buku</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              rel="noopener noreferrer"
              to="/anggota"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white m-0"
                    : "hover:bg-white/10 hover:shadow-sm "
                }`
              }
            >
              <FaUser className="w-5 h-5" />
              <span className="hidden lg:inline text-sm">Data Anggota</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              rel="noopener noreferrer"
              to="/peminjaman"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white m-0"
                    : "hover:bg-white/10 hover:shadow-sm "
                }`
              }
            >
              <FaBookOpen className="w-5 h-5" />
              <span className="hidden lg:inline text-sm">Peminjaman</span>
            </NavLink>
          </li>
          <li>

            <button
              onClick={confirmLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all 
              hover:bg-white/10 hover:shadow-sm w-full"
            >
              <FaDoorOpen className="w-5 h-5" />
              <span className="hidden lg:inline text-sm">Logout</span>
            </button>

          </li>



        </ul>

        

        {/* Footer */}
        <div className="p-4 text-xs text-gray-400 hidden lg:block">
            

          © 2025 Perpus App
        </div>
      </div>



      {/* modal konfir log out */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>

          
          <div className="relative bg-white text-gray-800 rounded-xl p-6 shadow-2xl max-w-sm w-full animate__animated animate__zoomIn">
            <p className="text-lg font-semibold mb-4 text-center">Apa kamu yakin ingin logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-8 py-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
              >
                Ya
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-8 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}



    </>
  )
}

export default Sidebar


