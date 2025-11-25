import { Button, ErrorMessage, InputField } from "../components";
import { useForm } from "react-hook-form";
import { userForgotPassword } from "../lib/appwriteAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const naviagte = useNavigate();

  console.log(import.meta.env.VITE_FRONTEND_URL);

  async function handleForgotSubmit(data) {
    try {
      await userForgotPassword(data.email);
      setSuccessMsg("Recovery email sent! Please check your inbox.");
      reset();
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black/70 backdrop-blur-lg w-full max-w-md p-8 sm:p-10 rounded-md shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>

        {/* Error / Success Messages */}
        {errorMsg && <ErrorMessage message={errorMsg} />}
        {successMsg && (
          <p className="text-green-500 text-sm mb-4">{successMsg}</p>
        )}

        <form onSubmit={handleSubmit(handleForgotSubmit)} className="space-y-4">
          <InputField
            name="email"
            placeholder="Email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email address must be valid",
              },
            })}
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}

          <Button type="submit" className="w-full">
            Send Email
          </Button>
        </form>

        <p
          className="text-sm text-gray-300 mt-6 text-center cursor-pointer hover:underline"
          onClick={() => naviagte("/login")}
        >
          Back to Sign In
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
