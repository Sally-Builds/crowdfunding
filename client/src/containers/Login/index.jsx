import React from "react";
import { LoginIcon, MailIcon, LockClosedIcon } from "@heroicons/react/outline";
import Header from "../../components/Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="m-16  grid md:grid-cols-3">
        <form className="shadow-lg md:col-start-2 md:col-end-2 p-3">
          <div className="text-gray-500 font-light text-center text-2xl border-b-2 m-2 p-2">
            <span className="m-3">User Login</span>
            <LoginIcon className="w-5 inline-block"></LoginIcon>
          </div>

          <div className="m-3">
            <label className="text-gray-500 text-sm font-bold m-2" for="email">
              <span>Email</span>
              <MailIcon className="w-5 inline-block ml-2"></MailIcon>
            </label>
            <input
              class="shadow appearance-none border rounded w-full m-2 p-3 text-gray-700 
      leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="m-3">
            <label className="text-gray-500 text-sm font-bold m-2" for="email">
              <span>Password</span>
              <LockClosedIcon className="w-5 inline-block ml-2"></LockClosedIcon>
            </label>
            <input
              class="shadow appearance-none border rounded w-full m-2 p-3 text-gray-700 
      leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="*******"
            />
          </div>

          <div className="m-3 text-center">
            <a
              href="/register"
              className="font-semibold text-gray-200 uppercase text-sm 
                hover:text-gray-400 hover:bg-white bg-primary border-primary p-1 rounded-md tracking-wider pl-2 pr-2 border-2"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
