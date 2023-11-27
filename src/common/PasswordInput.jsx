import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = ({ formik, name, placeholder, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="formControl">
      <label htmlFor={name}>{label}</label>
      <div className="password-input-container">
        <input
          style={{ border: 'none' }}
          type={showPassword ? 'text' : 'password'}
          id={name}
          name={name}
          {...formik.getFieldProps(name)}
          placeholder={placeholder}
          autoComplete="off"
        />
        {showPassword ? (
          <FiEyeOff className="eye-icon" onClick={handleTogglePassword} />
        ) : (
          <FiEye className="eye-icon" onClick={handleTogglePassword} />
        )}
      </div>
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default PasswordInput;
