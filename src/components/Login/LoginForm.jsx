import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider';
import { NavLink } from 'react-router-dom';
import Input from '../../common/Input';

const LoginForm = () => {
  const { user, isAuthenticated, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    login(username, email, password);
  };

  return (
    <div className="w-full relative flex laptop:h-[115vh] tablet:h-[120vh] mobile:h-[125vh] ">
      <div className="w-full blur-sm">
        <img
          className="h-full laptop:w-[75%] tablet:w-full mobile:w-full object-cover rounded-tr-3xl rounded-br-3xl  "
          src="/src/assets/img/city-iran.jpg"
          alt="image doesn't show"
        />
      </div>
      <div className="absolute laptop:right-40 tablet:right-40  mobile:right-1.5 z-50">
        <form
          className="form bg-white laptop:bg-opacity-100 tablet:bg-opacity-80 mobile:bg-opacity-80 laptop:w-[450px] tablet:w-[450px] mobile:w-[380px]  laptop:mt-[50px] tablet:mt-[50px] mobile:mt-[50px] py-2 px-4 rounded-2xl shadow-xl flex flex-col items-center justify-center "
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
            pattern={/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/}
            register={register}
            errors={errors}
          />

          <button
            className="btn-submit w-[350px] -bg--red p-2 rounded-xl text-white hover:opacity-75 mb-8 mt-5"
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
              <div className="navbarList flex-1 relative h-full">
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
