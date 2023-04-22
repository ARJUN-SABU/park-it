//packages
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../app/parkingSlice";
import { actions as userActions } from "../app/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

//components
import DateTimePicker from "./DateTimePicker";
import ParkingArea from "./ParkingArea";
import ParkingBooking from "./ParkingBooking";
import BookedSlotDetailsCard from "./BookedSlotDetailsCard";

//styles
import ".././styles/HomePage.css";

function HomePage() {
  const parkingState = useSelector((state) => state.parking);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //states
  const [showLoader, setShowLoader] = useState(false);
  const [date, setDate] = useState(new Date().toDateString());
  const [arrivalTime, setArrivalTime] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`
  );
  const [departureTime, setDepartureTime] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`
  );
  const [slotBookings, setSlotBookings] = useState({
    blockA: [null, null, null, null, null, null, null, null],
    blockB: [null, null, null, null, null, null, null, null],
    blockC: [null, null, null, null, null, null, null, null],
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userActions.setUser(user.email));
      }
    });
  }, []);

  //utility functions
  function getParkingSlotBookings() {
    let currentTime = new Date().getTime();
    let newArrivalTime = new Date(`${date} ${arrivalTime}`).getTime();
    let newDepartureTime = new Date(`${date} ${departureTime}`).getTime();

    if (newArrivalTime <= currentTime) {
      alert("Arrival Time must be greater than current time.");
    } else if (newDepartureTime <= currentTime) {
      alert("Departure Time must be greater than current time.");
    } else if (newDepartureTime <= newArrivalTime) {
      alert("Departure Time must be greater than Arrival time.");
    } else {
      //get the bookings
      let url = `https://park-it-omega.vercel.app/time-slots?date=${date}&arrivalTime=${arrivalTime}&departureTime=${departureTime}`;
      setShowLoader(true);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setSlotBookings(data);
          setShowLoader(false);
        })
        .catch((err) => console.log(err));

      dispatch(
        actions.setParkingDetails({
          block: parkingState.block,
          slot: parkingState.slot,
          showParkingBooking: false,
          date: date,
          arrival: arrivalTime,
          departure: departureTime,
        })
      );
    }
  }

  return (
    <div className="homePage">
      <div className="dateTimeSearch">
        <DateTimePicker
          date={date}
          setDate={setDate}
          setArrivalTime={setArrivalTime}
          setDepartureTime={setDepartureTime}
        />
        <button onClick={getParkingSlotBookings}>
          <b>Find Parking</b>
        </button>
      </div>

      <ParkingArea slotBookings={slotBookings} />

      {parkingState.showParkingBooking ? (
        <div className="parkingBookingOverlay">
          <ParkingBooking setSlotBookings={setSlotBookings} />
        </div>
      ) : (
        ""
      )}

      {parkingState.bookedSlotDetails ? (
        <div className="parkingBookingOverlay">
          <BookedSlotDetailsCard />
        </div>
      ) : (
        ""
      )}

      {showLoader && (
        <div className="parkingBookingOverlay">
          <h1 className="homePage__loader">Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default HomePage;
