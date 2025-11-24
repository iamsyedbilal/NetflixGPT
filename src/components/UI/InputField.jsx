import { forwardRef, useId } from "react";

const InputField = forwardRef(function InputField(
  { label, type = "text", placeholder, name, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name || id}
          className="block mb-1 text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}

      <input
        id={name || id}
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full font-sans font-medium px-4 py-3 bg-[#302e2e] text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#E50914]"
        {...props}
      />
    </div>
  );
});

export default InputField;
