const Input = ({ label, name, type, register, errors, pattern }) => {
  return (
    <div className="formControll flex flex-col  w-[350px] mb-4">
      <label className="mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        className="p-2 mt-1 text-[16px] border-solid border-[1px] border-slate-300 rounded-xl"
        type={type}
        id={name}
        placeholder={`Enter ${name}`}
        {...register(name, {
          required: `${label} is required`,
          pattern: {
            value: pattern,
            message: `Invalid ${label} format`,
          },
        })}
      />
      <p className="error -text--rose-500 text-[13px] font-semibold py-1 px-2 mt-1">
        {errors[name]?.message}
      </p>
    </div>
  );
};

export default Input;
