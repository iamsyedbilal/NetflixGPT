function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
  size = "md",
  onClick,
  ...props
}) {
  const baseStyles =
    "font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ";

  const variantStyles = {
    primary:
      "bg-[#E50914] text-white hover:bg-[#f6131b] focus:ring-[#E50914] cursor-pointer",
    secondary: "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500",
    custom: "",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${
        sizeStyles[size]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
