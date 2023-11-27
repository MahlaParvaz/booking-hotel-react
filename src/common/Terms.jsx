import React from 'react';
const Terms = ({ name, formik, label }) => {
  return (
    <div className="formControl">
      <input
        type="checkbox"
        id="terms"
        value={true}
        name={name}
        onChange={formik.handleChange}
        checked={formik.values.terms}
      />
      <label htmlFor="terms">{label}</label>

      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Terms;
