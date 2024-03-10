import { useForm } from 'react-hook-form';
import { useAuth } from './AuthProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import Input from '../../common/Input';
import { useEffect } from 'react';
import { useQuery } from '../../hooks/useQuery';

const LoginForm = () => {
  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const query = useQuery();
  const redirect = query.get('redirect') || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    login(username, email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate(redirect, { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full relative flex laptop:h-[115vh] tablet:h-[120vh] mobile:h-[125vh] ">
      <div className="w-full blur-sm">
        <img
          className="login__img"
          src={'/public/assets/img/city-iran.jpg'}
          alt="image doesn't show"
        />
      </div>
      <div className="login__form ">
        <form className="form  " onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className=" mb-8 mt-4 font-bold text-[22px] text-center ">
            Login
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
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            }
            register={register}
            errors={errors}
          />

          <button
            className="btn btn--secondary  w-[350px] mb-8 mt-5"
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
            {isAuthenticated && user ? (
              ''
            ) : (
              <div className=" flex-1 relative h-full">
                <NavLink to="/signup" className="text-blue-700 ml-3 ">
                  <u>Signup</u>
                </NavLink>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
