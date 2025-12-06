import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/auth";
import { userLogout } from "../lib/appwriteAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import { useState } from "react";

function Profile() {
  const userData = useSelector((store) => store.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await userLogout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-10 py-10">
      {/* Profile Header */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 pt-6">My Profile</h1>

      {/* Profile Card */}
      <div className="w-full max-w-md bg-black/70 backdrop-blur-lg rounded-md shadow-lg p-6 sm:p-8 flex flex-col gap-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={userData?.avatar || "https://i.pravatar.cc/150?img=3"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-red-600"
          />
          <h2 className="text-xl sm:text-2xl font-semibold">
            {userData?.name || "Guest User"}
          </h2>
          <p className="text-gray-300 text-sm">
            {userData?.email || "No Email"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => navigate("/forgot-password")}
          >
            Reset Password
          </Button>

          <Button
            variant="danger"
            className={`w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
