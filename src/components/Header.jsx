import { Link } from "react-router-dom";
import { Logo } from "./";
import { userLogout } from "../lib/appwriteAuth";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/auth";
import { useNavigate } from "react-router-dom";
import { userAvatar } from "../constants/constant";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  const [toggleProfile, setToggleProfile] = useState(false);
  const userLoginStatus = useSelector((store) => store.auth.userStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogoutFunc() {
    await userLogout();
    dispatch(logout());
    navigate("/login");
  }

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-transparent backdrop-blur-md z-50  px-6 py-3">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        {userLoginStatus && (
          <div className="relative flex items-center gap-4">
            <BiSearch size={28} className="cursor-pointer" />

            {/* Avatar */}
            <img
              src={userAvatar}
              alt="User Avatar"
              className="cursor-pointer w-10 h-10 rounded"
              onClick={() => setToggleProfile((prev) => !prev)}
            />

            {/* Dropdown Menu */}
            {toggleProfile && (
              <div className="absolute right-0 top-14 bg-black/80 backdrop-blur-md text-white px-4 py-3 rounded-md shadow-lg w-40 flex flex-col gap-3 animate-fadeIn">
                <Link to="/profile" className="hover:text-red-400 transition">
                  Profile
                </Link>

                <button
                  onClick={handleLogoutFunc}
                  className="text-left hover:text-red-400 transitio cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
