import { useState, useEffect } from "react";
import { InputField, Button, ErrorMessage } from "./";
import { useForm } from "react-hook-form";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { createUserAccount, userLogin } from "../lib/appwriteAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/auth";

function FormComponent({ signingUp, toggleForm }) {
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password");

  async function onFormSubmit(data) {
    if (signingUp && data.password !== data.confirm) {
      setSubmitError("Password & Confirm Password not match");
      return;
    }

    try {
      setSubmitError("");
      const { name, email, password } = data;
      if (signingUp) {
        await createUserAccount({ name, email, password });
        reset();
        toggleForm();
        return;
      } else {
        const user = await userLogin({ email, password });
        if (!user) {
          setSubmitError("Invalid Credentials");
          return;
        }
        dispatch(login(user));
        navigate("/");
        reset();
      }
    } catch (error) {
      setSubmitError(error.message);
      // throw new Error(error.message);
    }
  }

  const allErrors = [
    ...Object.values(errors).map((err) => err.message),
    submitError ? submitError : null,
  ].filter(Boolean);

  useEffect(() => {
    if (submitError) {
      const subscription = watch(() => setSubmitError(""));
      return () => subscription.unsubscribe();
    }
  }, [submitError, watch]);

  return (
    <div className="bg-black/40 backdrop-blur-lg w-full max-w-md sm:p-10 rounded-md shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6">
        {signingUp ? "Sign Up" : "Sign In"}
      </h2>

      <form className="flex flex-col" onSubmit={handleSubmit(onFormSubmit)}>
        {allErrors.length > 0 && (
          <div className="mb-4 space-y-2">
            {allErrors.map((msg, idx) => (
              <ErrorMessage key={idx} message={msg} />
            ))}
          </div>
        )}

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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character",
              },
            })}
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
                validate: (value) =>
                  value === password || "Passwords do not match",
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
      {!signingUp && (
        <p
          className="mt-2 text-sm text-[#E50914] cursor-pointer hover:underline"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>
      )}
    </div>
  );
}

export default FormComponent;
