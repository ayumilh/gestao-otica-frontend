import React from "react";

const InputMoeda = ({
  label,
  name,
  value,
  onChange,
  isInvalid = false,
  required = false,
}) => {
  const handleChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 0) {
      const float = parseFloat(raw) / 100;
      const formatted = float.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      onChange(formatted, float);
    } else {
      onChange("", 0);
    }
  };

  return (
    <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
      <label
        htmlFor={name}
        className="block font-medium text-sm text-neutral-700"
      >
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">
          R$
        </span>
        <input
          name={name}
          value={value}
          onChange={handleChange}
          type="text"
          required={required}
          className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
            isInvalid ? "outline-red-500 focus:outline-red-500" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default InputMoeda;
