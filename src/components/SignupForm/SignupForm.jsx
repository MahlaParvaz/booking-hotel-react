import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider';
import { NavLink } from 'react-router-dom';
import { useQuery } from '../../Hooks/useQuery';
import Input from '../../common/Input';

const SignupForm = () => {
  const { signup, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  //   const navigate = useNavigate();
  // const query = useQuery();
  // const redirect = query.get('redirect') || '/';

  const onSubmit = async (values) => {
    const { name, username, email, password, confirmPassword, terms } = values;

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match.',
      });
      return;
    }
    // Check if the user agreed to the terms
    if (!terms) {
      setError('terms', {
        type: 'manual',
        message: 'You must agree to the terms and conditions.',
      });
      return;
    }
    const existData = login(username);

    if (existData) {
      setError('username', {
        type: 'manual',
        message: 'This username already exist.',
      });
      //   return;
    }
    signup(name, username, email, password);
    window.location.reload();
  };

  return (
    <div className="w-full flex items-center justify-center mb-20  ">
      <form
        className="form   bg-white w-[450px] mt-[100px] py-2 px-4 rounded-2xl shadow-xl flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className="mb-8 mt-4 font-bold text-[22px] text-center ">Signup</h2>
        <Input label="Name" name="name" type="text" register={register} errors={errors} />
        <Input
          label="Username"
          name="username"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          pattern={/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
          register={register}
          errors={errors}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          pattern={/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/}
          register={register}
          errors={errors}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          pattern={/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/}
          register={register}
          errors={errors}
        />

        <Term
          label="I agree with the rules and regulations"
          type="checkbox"
          name="terms"
          register={register}
          errors={errors}
        />
        <button
          className="btn-submit w-[350px] -bg--red p-2 rounded-xl text-white hover:opacity-75 mb-8"
          type="submit"
        >
          Submit
        </button>
        {errors.login && (
          <p className="error -text--rose-500 text-[13px] font-semibold py-1 px-2">
            {errors.login.message}
          </p>
        )}
        <div className="flex items-center justify-center mb-6">
          <span>Have you an account?</span>
          <button className="text-blue-700 ml-3 ">
            <u>Login</u>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

function Term({ label, name, type, register, errors }) {
  return (
    <div className="formControll flex flex-row-reverse items-center justify-end mb-5 w-[380px]">
      <label htmlFor={name} className="ml-4">
        {label}
      </label>
      <input
        className="py-1.5 px-2 mt-1 border-solid border-[1px] border-slate-300 rounded-xl"
        type={type}
        id={name}
        {...register(name, {
          required: 'You must agree to the terms and conditions', // Adding required validation for a checkbox
        })}
      />
      <p className="error -text--rose-500 text-[13px] font-semibold py-1 px-2">
        {errors[name]?.message}
      </p>
    </div>
  );
}
