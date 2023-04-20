//packages
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//components
import Navbar from "./Navbar";
import DateTimePicker from "./DateTimePicker";
import ParkingArea from "./ParkingArea";

//styles
import ".././styles/HomePage.css";

function HomePage() {
  let parkingState = useSelector((state) => state);

  //states
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
    console.log(parkingState);
  }, [parkingState]);

  //utility functions
  function getParkingSlotBookings() {
    console.log(date);
    console.log(arrivalTime);
    console.log(departureTime);

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
      let url1 = `http://localhost:8000/time-slots?date=${date}&arrivalTime=${arrivalTime}&departureTime=${departureTime}`;
      let url2 = `https://park-it-omega.vercel.app/time-slots?date=${date}&arrivalTime=${arrivalTime}&departureTime=${departureTime}`;
      fetch(url2)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSlotBookings(data);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="homePage">
      <Navbar />

      <div className="dateTimeSearch">
        <DateTimePicker
          date={date}
          setDate={setDate}
          setArrivalTime={setArrivalTime}
          setDepartureTime={setDepartureTime}
        />
        <button onClick={getParkingSlotBookings}>Go</button>
      </div>

      <ParkingArea slotBookings={slotBookings} />
    </div>
  );
}

export default HomePage;
