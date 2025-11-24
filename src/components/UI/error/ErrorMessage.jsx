import "./errorMessage.css";

function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="bg-[#E87C03] text-white px-4 py-2 rounded mb-4 text-sm animate-fadeIn animate-shake">
      {message}
    </div>
  );
}

export default ErrorMessage;
