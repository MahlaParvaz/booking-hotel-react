import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider';
import { NavLink } from 'react-router-dom';
import { useQuery } from '../../Hooks/useQuery';
import Input from '../../common/Input';

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
