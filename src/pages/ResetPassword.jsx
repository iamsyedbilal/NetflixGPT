import { Button, ErrorMessage, InputField } from "../components";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userResetPassword } from "../lib/appwriteAuth";
import { useForm } from "react-hook-form";
import { IoEyeOff, IoEye } from "react-icons/io5";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const password = watch("newPassword");

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  if (!userId || !secret) {
    setTimeout(() => navigate("/login"), 3000);
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-700 text-5xl">
        <p>Invalid or missing reset link.</p>
      </div>
    );
  }

  async function handleResetPassword(data) {
    setErrMsg("");
    setSuccessMsg("");

    if (data.newPassword !== data.confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }
    try {
      await userResetPassword(userId, secret, data.newPassword);
      setSuccessMsg("Password successfully updated! Redirecting to login...");
      reset();
    } catch (error) {
      console.error(error);
      setErrMsg("Failed to reset password. Please try again.");
    } finally {
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black/70 backdrop-blur-lg w-full max-w-md p-8 sm:p-10 rounded-md shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>
        {errMsg && <ErrorMessage message={errMsg} />}
        {successMsg && (
          <p className="text-green-500 text-sm mb-4">{successMsg}</p>
        )}
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <div className="relative">
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
            </span>
          </div>
          {errors.newPassword && (
            <ErrorMessage message={errors.newPassword.message} />
          )}
          <div className="relative">
            <InputField
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <IoEyeOff size={22} /> : <IoEye size={22} />}
            </span>
          </div>
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword.message} />
          )}
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
