//packages
import { useRef, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

//styles
import "../styles/LoginPage.css";

function LoginPage() {
  const signUpEmail = useRef();
  const signUpPassword = useRef();
  const signInEmail = useRef();
  const signInPassword = useRef();
  const navigate = useNavigate();
  const [showLoginError, setShowLoginError] = useState(false);
  const [showSignUpError, setShowSignUpError] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  function signUpUser() {
    if (signUpEmail.current.value == "") {
      alert("Email cannot be empty!");
    } else if (signUpPassword.current.value == "") {
      alert("Password cannot be empty!");
    } else {
      createUserWithEmailAndPassword(
        auth,
        signUpEmail.current.value,
        signUpPassword.current.value
      )
        .then((userCredential) => {
          setShowSignUpError(false);
          navigate("/");
        })
        .catch((error) => {
          setShowSignUpError(true);
        });
    }
  }

  function signInUser() {
    if (signInEmail.current.value == "") {
      alert("Email cannot be empty!");
    } else if (signInPassword.current.value == "") {
      alert("Password cannot be empty!");
    } else {
      signInWithEmailAndPassword(
        auth,
        signInEmail.current.value,
        signInPassword.current.value
      )
        .then((userCredential) => {
          setShowLoginError(false);
          navigate("/");
        })
        .catch((error) => {
          setShowLoginError(true);
        });
    }
  }

  return (
    <div className="loginPage">
      <div className="loginPage__inputBox">
        <p>Login to your account.</p>
        <input type="text" placeholder="email" ref={signInEmail}></input>
        <input
          type="password"
          placeholder="password"
          ref={signInPassword}
        ></input>
        {showLoginError && (
          <p className="login__errorMessage">
            Invalid Email or Password. Try again!
          </p>
        )}
        <button onClick={signInUser}>Sign In</button>
      </div>
      <div className="loginPage__inputBox">
        <p>Don't have an account?</p>
        <input type="text" placeholder="email" ref={signUpEmail}></input>
        <input
          type="password"
          placeholder="password"
          ref={signUpPassword}
        ></input>
        {showSignUpError && (
          <p className="login__errorMessage">
            Invalid Email or Password. Try again!
          </p>
        )}
        <button onClick={signUpUser}>Sign Up</button>
      </div>
    </div>
  );
}

export default LoginPage;
