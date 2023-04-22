//packages
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function UserBookingsPage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}

export default UserBookingsPage;
