import React from "react";

function Button({
  buttonName,
  type = "Button",
  bgcolor = "bg-blue-600",
  textColor = "text-white",
  classname = "",
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {buttonName}
    </button>
  );
}

export default Button;
