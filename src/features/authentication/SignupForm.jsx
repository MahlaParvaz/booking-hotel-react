import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import { useAuth } from './AuthProvider';
import { NavLink } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import Input from '../../common/Input';
import toast from 'react-hot-toast';

const SignupForm = () => {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (values) => {
    const { username, email, password, confirmPassword, terms } = values;

    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match.',
      });
      return;
    }

    if (!terms) {
      setError('terms', {
        type: 'manual',
        message: 'You must agree to the terms and conditions.',
      });
      return;
    }

    signup(username, email, password, setError);
  };

  return (
    <div className="w-full relative flex  laptop:h-[140vh] tablet:h-[160vh] mobile:h-[155vh] ">
      <div className="w-full blur-sm ">
        <img
          className="signup__img "
          src="/public/assets/img/city-paris.jpg"
          alt="image doesn't show"
        />
      </div>

      <div className="signup__form ">
        <form
          className="form "
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h2 className="mb-8 mt-4 font-bold text-[22px] text-center ">
            Signup
          </h2>

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
            pattern={
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            }
            register={register}
            errors={errors}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            pattern={
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
            }
            register={register}
            errors={errors}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            pattern={
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
            }
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
            className="btn btn--secondary w-[350px]  mb-8 "
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
            <NavLink to="/login" className="text-blue-700 ml-3 ">
              <u>Login</u>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

function Term({ label, name, type, register, errors }) {
  return (
    <div className=" flex flex-col  items-start justify-between mb-5 w-[380px] ">
      <div>
        <label htmlFor={name} className="ml-4">
          {label}
        </label>
        <input
          className="py-1.5 px-2 ml-5 mt-5 border-solid border-[1px] border-slate-300 rounded-xl"
          type={type}
          id={name}
          {...register(name, {
            required: 'You must agree to the terms and conditions',
          })}
        />
      </div>
      <p className="error -text--rose-500 text-[13px] font-semibold py-1 px-2 mt-1.2 ml-2">
        {errors[name]?.message}
      </p>
    </div>
  );
}
