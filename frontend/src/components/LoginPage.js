//packages
import { useRef, useEffect } from "react";
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
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
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
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
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
        <button onClick={signUpUser}>Sign Up</button>
      </div>
    </div>
  );
}

export default LoginPage;
