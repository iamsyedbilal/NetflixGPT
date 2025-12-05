import { Link } from "react-router-dom";
import { Logo } from "./";
import { userLogout } from "../lib/appwriteAuth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/auth";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import { userAvatar } from "../constants/constant";
import { toggleGptSearchView } from "../features/gpt/gptSlice";

function Header() {
  const [toggleProfile, setToggleProfile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userLoginStatus = useSelector((store) => store.auth.userStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Detect scroll → dark background (like Netflix)
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleLogoutFunc() {
    await userLogout();
    dispatch(logout());
    navigate("/login");
  }

  function handleGptToggle() {
    dispatch(toggleGptSearchView());
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full h-20 z-50 px-10 flex items-center transition-colors duration-300 
      ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md"
          : "bg-linear-to-b from-black/80 to-transparent"
      }`}
    >
      {/* Left Section: Logo + Navigation ------------------------------------------- */}
      <div className="flex items-center gap-10">
        <Link to="/">
          <Logo className="h-8" />
        </Link>

        {userLoginStatus && (
          <nav className="hidden md:flex items-center gap-6 text-gray-200 text-sm">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/tv-shows" className="hover:text-white">
              TV Shows
            </Link>
            <Link to="/movies" className="hover:text-white">
              Movies
            </Link>
            <Link to="/popular" className="hover:text-white">
              New & Popular
            </Link>
            <Link to="/my-list" className="hover:text-white">
              My List
            </Link>
          </nav>
        )}
      </div>

      {/* Right Section ------------------------------------------------------------ */}
      {userLoginStatus && (
        <div className="ml-auto flex items-center gap-6 relative">
          <BiSearch
            size={24}
            className="cursor-pointer text-white"
            onClick={handleGptToggle}
          />

          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-10 h-10 rounded cursor-pointer"
            onClick={() => setToggleProfile((prev) => !prev)}
          />

          {/* Dropdown */}
          {toggleProfile && (
            <div className="absolute right-0 top-14 bg-black/90 text-white px-4 py-4 rounded-md w-44 shadow-lg flex flex-col gap-3">
              <Link to="/profile" className="hover:text-red-400 transition">
                Profile
              </Link>

              <button
                onClick={handleLogoutFunc}
                className="text-left hover:text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
