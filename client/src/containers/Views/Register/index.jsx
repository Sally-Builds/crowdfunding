import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register, reset } from "../../../store/user/userSlice";
import TextField from "../../../components/Form/TextField";
import Spinner from "../../../components/Spinner";
import {
  MailIcon,
  LockClosedIcon,
  UserAddIcon,
  UserIcon,
} from "@heroicons/react/outline";

const Register = () => {
  const [state, setState] = useState({
    user: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.user
  );

  const validateForm = (e) => {
    e.preventDefault();
    if (!state.user.name) {
      return toast.error("*Name is Required.");
    }
    if (!state.user.email) {
      return toast.error("*Email is Required.");
    }
    if (!state.user.password) {
      return toast.error("*Password is required");
    }

    if (state.user.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (state.user.confirmPassword !== state.user.password) {
      return toast.error("Password does not match");
    }
    const formData = {
      name: state.user.name,
      email: state.user.email,
      password: state.user.password,
    };
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const user = state.user;
    user[name] = value;
    setState({ user });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="m-16  grid md:grid-cols-3">
        <form
          className="shadow-lg border-gray-500 md:col-start-2 md:col-end-2"
          onSubmit={validateForm}
        >
          <div className="bg-teal-500">
            <div className="text-gray-50 font-light text-center text-2xl m-2 p-2">
              <span className="m-3">User Registration</span>
              <UserAddIcon className="w-5 inline-block"></UserAddIcon>
            </div>
          </div>

          <div className="m-3">
            <TextField
              label={"* Name"}
              Icon={UserIcon}
              type={"text"}
              name={"name"}
              placeholder={"John Doe"}
              value={state.user.name}
              onChange={handleChange}
            ></TextField>
          </div>

          <div className="m-3">
            <TextField
              label={"* Email"}
              Icon={MailIcon}
              type={"email"}
              name={"email"}
              placeholder={"example@email.com"}
              value={state.user.email}
              onChange={handleChange}
            ></TextField>
          </div>

          <div className="m-3">
            <TextField
              label={"* Password"}
              Icon={LockClosedIcon}
              type={"password"}
              name={"password"}
              placeholder={"********"}
              value={state.user.password}
              onChange={handleChange}
            ></TextField>
          </div>

          <div className="m-3">
            <TextField
              label={"* Confirm Password"}
              Icon={LockClosedIcon}
              type={"password"}
              name={"confirmPassword"}
              placeholder={"********"}
              value={state.user.confirmPassword}
              onChange={handleChange}
            ></TextField>
          </div>

          <div className="m-3 text-center">
            <div className="text-sm">
              Already have an account?
              <button
                type=""
                className="m-2 cursor-pointer text-gray-400 underline"
              >
                Login
              </button>
            </div>
            <button
              type="submit"
              value="Register"
              className="font-semibold text-gray-200 uppercase text-sm 
                cursor-pointer
                hover:text-gray-400 hover:bg-white border-2
                 bg-blue-500 hover:border-gray-500 p-2 rounded-md tracking-wider pl-2 pr-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
