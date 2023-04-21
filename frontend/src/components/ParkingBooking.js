//packages
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../app/parkingSlice";
import { useRef } from "react";

//styles
import "../styles/ParkingBooking.css";

function ParkingBooking({ setSlotBookings }) {
  const parkingState = useSelector((state) => state.parking);
  const dispatch = useDispatch();
  const vehicleType = useRef();
  const vehicleNumber = useRef();

  function bookParking() {
    if (vehicleType.current.value == "") {
      alert("vehicle type cannot be empty");
    } else if (vehicleNumber.current.value == "") {
      alert("vehicle number cannot be empty");
    } else if (parkingState.date == "") {
      alert("Please choose a parking date!");
    } else if (parkingState.arrival == "") {
      alert("Please select the arrival time!");
    } else if (parkingState.departure == "") {
      alert("Please select the departure time");
    } else {
      let data = {
        vehicleType: vehicleType.current.value,
        vehicleNumber: vehicleNumber.current.value,
        block: parkingState.block,
        slot: parkingState.slot,
        date: parkingState.date,
        expireAt: new Date(`${parkingState.date} ${parkingState.departure}`), //same as departure time
        arrival: `${parkingState.date} ${parkingState.arrival}`,
        departure: `${parkingState.date} ${parkingState.departure}`,
      };

      console.log(data);
      // let url1 = "http://localhost:8000/add-booking/";
      let url2 = "https://park-it-omega.vercel.app/add-booking/";
      fetch(url2, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // let url1 = `http://localhost:8000/time-slots?date=${date}&arrivalTime=${arrivalTime}&departureTime=${departureTime}`;
          let url = `https://park-it-omega.vercel.app/time-slots?date=${parkingState.date}&arrivalTime=${parkingState.arrival}&departureTime=${parkingState.departure}`;
          console.log(url);
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              console.log("This is the data", data);
              setSlotBookings(data);
              dispatch(
                actions.setParkingDetails({
                  block: "",
                  slot: "",
                  showParkingBooking: false,
                  bookedSlotDetails: null,
                  date: "",
                  arrival: "",
                  departure: "",
                })
              );
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="parkingBooking">
      <p
        className="parkingBookingClose"
        onClick={() => {
          dispatch(
            actions.setParkingDetails({
              block: parkingState.block,
              slot: parkingState.slot,
              showParkingBooking: false,
              bookedSlotDetails: null,
              date: parkingState.date,
              arrival: parkingState.arrival,
              departure: parkingState.departure,
            })
          );
          document.querySelector("body").style.overflowY = "scroll";
        }}
      >
        X
      </p>
      <div className="parkingBookingContainer">
        <p>
          Slot:{" "}
          <b>
            {parkingState.block}
            {parkingState.slot}
          </b>
        </p>
        <p>
          Date: <b>{parkingState.date}</b>
        </p>
        <p>
          Arrival: <b>{parkingState.arrival}</b>
        </p>
        <p>
          Departure: <b>{parkingState.departure}</b>
        </p>
        <input type="text" placeholder="Vehicle Type" ref={vehicleType}></input>
        <input
          type="text"
          placeholder="Vehicle Number"
          ref={vehicleNumber}
        ></input>
        <button className="parkingBooking__bookButton" onClick={bookParking}>
          Book
        </button>
      </div>
    </div>
  );
}

export default ParkingBooking;
