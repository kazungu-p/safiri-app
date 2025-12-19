import React from "react";

function Input({ type = "text", ...props }) {
  if (type === "textarea") {
    return <textarea {...props} />;
  }
  return <input type={type} {...props} />;
}

export default Input;
