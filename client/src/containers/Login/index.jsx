import React, { useState, useEffect } from "react";
import { LoginIcon, MailIcon, LockClosedIcon } from "@heroicons/react/outline";
import {
  loginUser,
  getUser,
  getProject,
  APIGetUser,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  // const project = useSelector(getProject);

  useEffect(() => {
    dispatch(APIGetUser());
  }, []);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = (e) => {
    e.preventDefault();
    if (!email) {
      return setEmailError("Email is required");
    }

    if (password.length < 8) {
      return setPasswordError("Password length must be greater than 8");
    }

    setEmailError("");
    setPasswordError("");

    console.log(email, password);
    console.log(user);
  };
  return (
    <div>
      {/* <Header /> */}
      <div className="m-16  grid md:grid-cols-3">
        <form
          className="shadow-lg border-gray-500 md:col-start-2 md:col-end-2"
          onSubmit={validateForm}
        >
          <div className="bg-teal-500">
            <div className="text-gray-50 font-light text-center text-2xl m-2 p-2">
              <span className="m-3">User Login</span>
              <LoginIcon className="w-5 inline-block"></LoginIcon>
            </div>
          </div>

          <div className="m-3">
            <label className="text-gray-500 text-sm font-bold m-2">
              <span>Email</span>
              <MailIcon className="w-5 inline-block ml-2"></MailIcon>
            </label>
            <input
              className="shadow appearance-none border rounded w-full m-2 p-3 text-gray-700 
      leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-sm text-red-600 font-light m-2 p-3">
              {emailError}
            </span>
          </div>

          <div className="m-3">
            <label className="text-gray-500 text-sm font-bold m-2">
              <span>Password</span>
              <LockClosedIcon className="w-5 inline-block ml-2"></LockClosedIcon>
            </label>
            <input
              className="shadow appearance-none border rounded w-full m-2 p-3 text-gray-700 
      leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-sm text-red-600 font-light m-2 p-3">
              {passwordError}
            </span>
          </div>

          <div className="m-3 text-center">
            <input
              type="submit"
              value="register"
              className="font-semibold text-gray-200 uppercase text-sm 
                cursor-pointer
                hover:text-gray-400 hover:bg-white
                 bg-secondary-200 border-secondary-200 p-2 rounded-md tracking-wider pl-2 pr-2 border-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
