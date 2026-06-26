import React from "react";

function Button({
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
