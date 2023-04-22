//packages
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions as userActions } from "../app/userSlice";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

//styles
import "../styles/Navbar.css";

//Icons
import { AiFillCaretDown } from "react-icons/ai";

function Navbar() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [userStatus, setUserStatus] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // setUserStatus(userState.user);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserStatus(user.email);
      } else {
        setUserStatus(null);
      }
    });
  }, []);

  function toggleAuthOptions() {
    document
      .querySelector(".navbar__authOptions")
      .classList.toggle("navbar--hide");
  }

  function signOutUser() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate
        dispatch(userActions.setUser(null));
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="navbar__logo">Park.it</h1>
      </Link>
      <div className="navbar__authcontainer">
        {userStatus ? (
          <p className="navbar__authUserName" onClick={toggleAuthOptions}>
            Hello, {userStatus}
            <span className="icon">
              <AiFillCaretDown />
            </span>
          </p>
        ) : (
          <Link to="/login">
            <button className="navbar__authSignIn">Sign In</button>
          </Link>
        )}

        <div className="navbar__authOptions navbar--hide">
          <p
            onClick={() => {
              toggleAuthOptions();
              navigate("/bookings");
            }}
          >
            My Bookings
          </p>
          <p
            onClick={() => {
              signOutUser();
              toggleAuthOptions();
            }}
          >
            Sign Out
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
