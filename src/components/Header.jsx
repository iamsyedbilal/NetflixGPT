import { Link } from "react-router-dom";
import { Logo } from "./";
import { userLogout } from "../lib/appwriteAuth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/auth";
import { useNavigate } from "react-router-dom";
import { BiSearch, BiMenu, BiX } from "react-icons/bi";
import { useState, useEffect } from "react";
import { userAvatar } from "../constants/constant";
import { toggleGptSearchView } from "../features/gpt/gptSlice";

function Header() {
  const [toggleProfile, setToggleProfile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userLoginStatus = useSelector((store) => store.auth.userStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
        ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }
      `}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 h-20">
        {/* Left: Logo */}
        <Link to="/">
          <Logo className="h-8 sm:h-10" />
        </Link>

        {/* Desktop Nav */}
        {userLoginStatus && (
          <nav className="hidden md:flex items-center gap-6 text-gray-200 text-sm">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <Link to="/now-playing" className="hover:text-white transition">
              Movies
            </Link>
            <Link to="/popular" className="hover:text-white transition">
              Popular
            </Link>
            <Link to="/watch-later" className="hover:text-white transition">
              Watch Later
            </Link>
          </nav>
        )}

        {/* Right Section */}
        {userLoginStatus && (
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Icon */}
            <BiSearch
              size={24}
              className="cursor-pointer text-white"
              onClick={handleGptToggle}
            />

            {/* Profile Avatar */}
            <div className="relative">
              <img
                src={userAvatar}
                alt="User Avatar"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer"
                onClick={() => setToggleProfile((prev) => !prev)}
              />

              {/* Profile Dropdown */}
              {toggleProfile && (
                <div className="absolute right-0 top-12 bg-black/90 text-white px-4 py-4 rounded-md w-40 shadow-lg flex flex-col gap-2 sm:gap-3 z-50">
                  <Link to="/profile" className="hover:text-red-400 transition">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogoutFunc}
                    className="text-left hover:text-red-400 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              {mobileMenuOpen ? (
                <BiX
                  size={28}
                  className="text-white cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                />
              ) : (
                <BiMenu
                  size={28}
                  className="text-white cursor-pointer"
                  onClick={() => setMobileMenuOpen(true)}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md text-white flex flex-col gap-4 px-4 py-4">
          <Link
            to="/"
            className="hover:text-red-400 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/now-playing"
            className="hover:text-red-400 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Movies
          </Link>
          <Link
            to="/popular"
            className="hover:text-red-400 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Popular
          </Link>
          <Link
            to="/watch-later"
            className="hover:text-red-400 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Watch Later
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
