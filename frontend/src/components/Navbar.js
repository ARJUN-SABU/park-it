//styles
import "../styles/Navbar.css";

//Icons
import { AiFillCaretDown } from "react-icons/ai";

function Navbar() {
  function toggleAuthOptions() {
    document
      .querySelector(".navbar__authOptions")
      .classList.toggle("navbar--hide");
  }

  return (
    <div className="navbar">
      <h1 className="navbar__logo">Park.it</h1>
      <div className="navbar__authcontainer">
        <button className="navbar__authSignIn">Sign In</button>
        {/* <p className="navbar__authUserName" onClick={toggleAuthOptions}>
          Hello, username{" "}
          <span className="icon">
            <AiFillCaretDown />
          </span>
        </p> */}
        <div className="navbar__authOptions navbar--hide">
          <p>My Bookings</p>
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
