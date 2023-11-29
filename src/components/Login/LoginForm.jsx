import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider';
import { NavLink } from 'react-router-dom';
import { useQuery } from '../../Hooks/useQuery';

const LoginForm = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const query = useQuery();
  const redirect = query.get('redirect') || '/';

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    login(username, email, password);
    window.location.reload();
  };

  return (
    <div className="w-full flex items-center justify-center mb-8 ">
      <form
        className="form bg-white w-[450px]  mt-[100px] py-2 px-4 rounded-2xl shadow-xl flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className=" mb-8 mt-4 font-bold text-[22px] text-center ">Login</h2>
        <div className="formControll flex flex-col mb-4 w-[350px] ">
          <label htmlFor="username">Username</label>
          <input
            className="py-1.5 px-2 mt-1 border-solid border-[1px] border-slate-300 rounded-xl"
            type="text"
            id="username"
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
          />
          <p className="error -text--rose-500 text-[13px] font-semibold py-1 px-2">
            {errors.username?.message}
          </p>
        </div>
        <div className="formControll flex flex-col mb-4 w-[350px]">
          <label htmlFor="email">Email</label>
          <input
            className="py-1.5 px-2 mt-1 border-solid border-[1px] border-slate-300 rounded-xl"
            type="email"
            id="email"
            {...register('email', {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email format',
              },
            })}
          />
          <p className="error -text--rose-500 text-[13px] font-semibold py-1 px-2">
            {errors.email?.message}
          </p>
        </div>
        <div className="formControll flex flex-col mb-5 w-[350px]">
          <label htmlFor="password">Password</label>
          <input
            className="py-1.5 px-2 mt-1 border-solid border-[1px] border-slate-300 rounded-xl"
            type="password"
            id="password"
            // {...register('password', {
            //   pattern: {
            //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            //     message: 'Invalid password format',
            //   },
            // })}
          />
          <p className="error -text--rose-500 text-[13px] font-semibold py-1 px-2">
            {errors.password?.message}
          </p>
        </div>

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
          <span>Don't you have an account?</span>
          <NavLink to={`/signup?redirect=${redirect}`} className="text-blue-700 ml-3 ">
            <u>Signup</u>
          </NavLink>
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default LoginForm;
