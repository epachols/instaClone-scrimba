import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import IphoneImg from "../images/iphone-with-profile.jpg";
import Logo from "../images/logo.png";
import * as ROUTES from "../constants/routes";
import FirebaseContext from "../context/firebase";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  useEffect(() => {
    document.title = "Login - Finstagram";
  }, []);

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src={IphoneImg} alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border mb-4">
          <h1 className="flex justify-center w-full">
            <img src={Logo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

          <form method="POST" onSubmit={handleLogin}>
            <input
              aria-label="Enter your email address"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              name="email"
              placeholder="Email address"
              autoComplete="username"
              value={emailAddress}
              onChange={(e) => {
                handleChange(e, setEmailAddress);
              }}
            />
            <input
              aria-label="Enter your password"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                handleChange(e, setPassword);
              }}
            />
            <button
              type="submit"
              className={` ${
                isInvalid ? "opacity-50 cursor-not-allowed" : ""
              } bg-blue-500 text-white w-full rounded h-8 font-bold`}
              disabled={isInvalid}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to={ROUTES.SIGN_UP} className="font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
