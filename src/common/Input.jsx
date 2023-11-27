const Input = ({ label, placeholder, formik, name, type = 'text' }) => {
    return (
      <div className="formControl">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type={type}
          {...formik.getFieldProps(name)}
          name={name}
          placeholder={placeholder}
        />
        {formik.errors[name] && formik.touched[name] && (
          <div className="error">{formik.errors[name]}</div>
        )}
      </div>
    );
  };
  
  export default Input;
  