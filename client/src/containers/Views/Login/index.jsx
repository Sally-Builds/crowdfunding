import React, { useState, useEffect } from "react";
import { LoginIcon, MailIcon, LockClosedIcon } from "@heroicons/react/outline";
import {} from "../../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../../components/Form/TextField";

const Login = () => {
  const dispatch = useDispatch();
  // const user = useSelector(getUser);
  // const project = useSelector(getProject);

  useEffect(() => {
    // dispatch(APIGetUser());
  }, []);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [state, setState] = useState({
    user: {
      email: "",
      password: "",
    },
  });

  const validateForm = async (e) => {
    e.preventDefault();
    if (!state.user.email) {
      return setEmailError("*Email is Required.");
    }
    if (!state.user.password) {
      return setPasswordError("*Password is required");
    }

    if (state.user.password.length < 8) {
      return setPasswordError("Password must be at least 8 characters");
    }

    setEmailError("");
    setPasswordError("");
    console.log("logged");

    // dispatch(APILogin(state.user));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const user = state.user;
    user[name] = value;
    setState({ user });
  };

  return (
    <div>
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
            <TextField
              label={"Email"}
              Icon={MailIcon}
              type={"email"}
              name={"email"}
              placeholder={"example@email.com"}
              value={state.user.email}
              onChange={handleChange}
              error={emailError}
            ></TextField>
          </div>

          <div className="m-3">
            <TextField
              label={"Password"}
              Icon={LockClosedIcon}
              type={"password"}
              name={"password"}
              placeholder={"********"}
              value={state.user.password}
              onChange={handleChange}
              error={passwordError}
            ></TextField>
          </div>

          <div className="m-3 text-center">
            <div className="text-sm">
              Don't have an account?
              <button className="m-2 cursor-pointer text-gray-400 underline">
                Register
              </button>
            </div>
            <input
              type="submit"
              value="Login"
              className="font-semibold text-gray-200 uppercase text-sm 
                cursor-pointer
                hover:text-gray-400 hover:bg-white border-2
                 bg-blue-500 hover:border-gray-500 p-2 rounded-md tracking-wider pl-2 pr-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
