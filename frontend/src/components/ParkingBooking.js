//packages
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../app/parkingSlice";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

//styles
import "../styles/ParkingBooking.css";

function ParkingBooking({ setSlotBookings }) {
  const navigate = useNavigate();
  const parkingState = useSelector((state) => state.parking);
  const userState = useSelector((state) => state.user);
  const [userStatus, setUserStatus] = useState(null);
  const dispatch = useDispatch();
  const vehicleType = useRef();
  const vehicleNumber = useRef();

  useEffect(() => {
    setUserStatus(userState.user);
  }, [userState]);

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
        email: userStatus,
        xCoordinate: parkingState.xCoordinate,
        yCoordinate: parkingState.yCoordinate,
        expireAtUTCFormat: new Date(
          `${parkingState.date} ${parkingState.departure}`
        ).toUTCString(),
      };

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
          if (data.error_message) {
            alert(data.error_message);
          } else {
            let url = `https://park-it-omega.vercel.app/time-slots?date=${parkingState.date}&arrivalTime=${parkingState.arrival}&departureTime=${parkingState.departure}`;

            fetch(url)
              .then((res) => res.json())
              .then((data) => {
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
          }
        })
        .catch((err) => console.log(err));
    }
    document.querySelector("body").style.overflowY = "scroll";
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
          let marker = document.querySelector(
            `#parkingMarker-${parkingState.block}${parkingState.slot}`
          );
          if (marker)
            document
              .querySelector(".parkingView__imageWrapper")
              .removeChild(marker);
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
        {userStatus ? (
          <button className="parkingBooking__bookButton" onClick={bookParking}>
            Book
          </button>
        ) : (
          <button
            className="parkingBooking__signInButton"
            onClick={() => {
              navigate("/login");
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
            Sign In to Book
          </button>
        )}
      </div>
    </div>
  );
}

export default ParkingBooking;
