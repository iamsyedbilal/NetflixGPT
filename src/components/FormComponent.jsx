import { useState } from "react";
import { InputField, Button, ErrorMessage } from "./";
import { useForm } from "react-hook-form";
import { IoEyeOff, IoEye } from "react-icons/io5";

function FormComponent({ signingUp, toggleForm }) {
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onFormSubmit() {}

  return (
    <div className="bg-black backdrop-blur-lg w-full max-w-md p-8 sm:p-10 rounded-md shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6">
        {signingUp ? "Sign Up" : "Sign In"}
      </h2>

      <form className="flex flex-col" onSubmit={handleSubmit(onFormSubmit)}>
        <ErrorMessage message={submitError} />
        {signingUp && (
          <InputField
            name="name"
            placeholder="Full name"
            {...register("name", { required: "Name is required" })}
          />
        )}
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
        <div className="relative">
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          <span
            className="absolute right-3 top-1/3 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
          </span>
        </div>
        {signingUp && (
          <div className="relative">
            <InputField
              type={showConfirm ? "text" : "password"}
              name="confirm"
              placeholder="Confirm Password"
              {...register("confirm", {
                required: "Please confirm password",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match",
              })}
            />

            <span
              className="absolute right-3 top-1/3 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <IoEyeOff size={22} /> : <IoEye size={22} />}
            </span>
          </div>
        )}

        <Button type="submit" variant="primary" className="mt-4 w-full">
          {signingUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-gray-300">
        {signingUp ? "Already have an account?" : "New here?"}
        <span
          className="text-[#E50914] ml-1 cursor-pointer hover:underline"
          onClick={toggleForm}
        >
          {signingUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
}

export default FormComponent;
