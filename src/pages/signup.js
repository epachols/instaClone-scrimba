import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../images/logo.png";
import * as ROUTES from "../constants/routes";
import { doesUserNameExist } from "../services/firebase";
import FirebaseContext from "../context/firebase";

export default function Signup() {
  const [emailAddress, setEmailAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [error, setError] = useState("");
  const isInvalid =
    userName === "" ||
    fullName === "" ||
    password === "" ||
    emailAddress === "";

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  useEffect(() => {
    document.title = "Signup - Finstagram";
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();

    const userNameExists = await doesUserNameExist(userName);

    if (!userNameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        await createdUserResult.user.updateProfile({
          displayName: userName,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: userName.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUserName("");
      setFullName("");
      setEmailAddress("");
      setPassword("");
      setError("That username is already taken, please try a different one.");
    }
  };

  return (
    <div className="container flex mx-auto max-w-xs items-center h-screen">
      <div className="flex flex-col">
        <div className="flex flex-col items-center bg-white p-4 border mb-4">
          <h1 className="flex justify-center w-full">
            <img src={Logo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && (
            <p className="mb-4 text-xs text-red-500 text-center">{error}</p>
          )}

          <form method="POST" onSubmit={handleSignup}>
            <input
              aria-label="Enter your user name"
              className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              type="text"
              placeholder="Username"
              autoComplete="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value.trim().toLowerCase());
              }}
            />
            <input
              aria-label="Enter your full name"
              className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => {
                setFullName(
                  e.target.value.replace(/^[a-z]|\s[a-z]/g, (char) =>
                    char.toUpperCase()
                  )
                );
              }}
            />
            <input
              aria-label="Enter your email address"
              className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              type="text"
              name="email"
              placeholder="Email address"
              autoComplete="username"
              value={emailAddress}
              onChange={(e) => {
                setEmailAddress(e.target.value.trim().toLowerCase());
              }}
            />
            <input
              aria-label="Enter your password"
              className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
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
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// #F1DED0
