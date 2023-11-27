import { DevTool } from '@hookform/devtools';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthContextProvider, { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

// type FormValues = {
//   username: string,
//   email: string,
//   password: string | number,
// };

const LoginForm = () => {
  const { user, login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('saheb');
  const [email, setEmail] = useState('user@gmail.com');
  const [password, setPassword] = useState('1234');
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if (username && email && password) login(username, email, password);
  };
  // const onSubmit = async (data) => {
  //   if (username && email && password) login(username, email, password);
  //   try {
  //     const response = await axios.post('http://localhost:5000/users', {
  //       username: data.username,
  //       email: data.email,
  //       password: data.password,
  //     });

  //     const user = response.data;

  //     // Assuming the API returns a user object upon successful login
  //     login(user.email, user.password);
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };
  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);
  // const form = useForm({
  //   defaultValues: async () => {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/users');
  //     const data = await response.json();
  //     return {
  //       username: data.username,
  //       email: data.email,
  //       password: data.password,
  //     };
  //   },
  // });
  // const { register, control, handleSubmit, formState } = form;
  // const { errors } = formState;
  // // const { name, ref, onChange, onBlur } = register('username');
  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div className="w-full flex items-center justify-center mb-8 ">
      <form
        className="form -bg--light-gray w-[400px]  mt-[100px] py-2 px-4 rounded-2xl shadow-xl flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className=" mb-8 font-bold text-[22px] text-center ">Login</h2>
        <div className="formControll flex flex-col mb-4 w-[350px] ">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="formControll flex flex-col mb-4 w-[350px]">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          className="btn-submit w-[350px] -bg--red p-2 rounded-xl text-white hover:opacity-75 mb-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default LoginForm;
