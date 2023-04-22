//packages
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

//components
import UserBookingCard from "./UserBookingCard";

//styles
import "../styles/UserBookingPage.css";

function UserBookingsPage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        fetch(
          `https://park-it-omega.vercel.app/user-bookings?email=${user.email}`
        )
          .then((res) => res.json())
          .then((docs) => {
            console.log(docs);
            setUserBookings(docs);
          })
          .catch((err) => console.log(err));
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="userBookingPage">
      <p>Active Bookings</p>
      {userBookings.length == 0 ? (
        <p className="userBookingPage__noBookingMessage">
          Sorry, no bookings found.
        </p>
      ) : (
        userBookings.map((booking) => (
          <UserBookingCard
            key={booking._id}
            vehicleType={booking.vehicleType}
            vehicleNumber={booking.vehicleNumber}
            block={booking.block}
            slot={booking.slot}
            id={booking._id}
            date={booking.date}
            arrival={booking.arrival}
            departure={booking.departure}
            userEmail={userEmail}
            setUserBookings={setUserBookings}
          />
        ))
      )}
    </div>
  );
}

export default UserBookingsPage;
