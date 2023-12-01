// Input.js
import React from 'react';

const Input = ({ label, name, type, register, errors, pattern }) => {
  return (
    <div className="formControll flex flex-col mb-4 w-[350px]">
      <label htmlFor={name}>{label}</label>
      <input
        className="py-1.5 px-2 mt-1 border-solid border-[1px] border-slate-300 rounded-xl"
        type={type}
        id={name}
        {...register(name, {
          required: `${label} is required`,
          pattern: {
            value: pattern,
            message: `Invalid ${label} format`,
          },
        })}
      />
      <p className="error -text--rose-500 text-[13px] font-semibold py-1 px-2">
        {errors[name]?.message}
      </p>
    </div>
  );
};

export default Input;
