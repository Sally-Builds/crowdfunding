import React, { useState } from "react";
import PropType from "prop-types";

const TextField = ({
  label,
  Icon,
  type,
  placeholder,
  value,
  onChange,
  error,
  name,
}) => {
  return (
    <div>
      <label className="text-gray-500 text-sm font-bold m-2">
        <span>{label}</span>
        <Icon className="w-5 inline-block ml-2"></Icon>
      </label>
      <input
        className="shadow appearance-none border rounded w-full m-2 p-3 text-gray-700 
      leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        // onChange={(e) => setEmail(e.target.value)}
        onChange={onChange}
      />
      <span className="text-sm text-red-600 font-light m-2 p-3">{error}</span>
    </div>
  );
};

TextField.prototype = {
  label: PropType.string.isRequired,
  type: PropType.oneOf(["text", "email", "password"]).isRequired,
  placeholder: PropType.string.isRequired,
  value: PropType.string.isRequired,
  name: PropType.string.isRequired,
};

export default TextField;
