//packages
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../app/parkingSlice";
import { useRef } from "react";

//styles
import "../styles/ParkingBooking.css";

function ParkingBooking() {
  const parkingState = useSelector((state) => state.parking);
  const dispatch = useDispatch();
  const vehicleType = useRef();
  const vehicleNumber = useRef();

  function bookParking() {
    console.log({
      vehicleType: vehicleType.current.value,
      vehicleNumber: vehicleNumber.current.value,
      date: parkingState.arrival,
      expireAt: parkingState.departure, //same as departure time
      arrival: parkingState.arrival,
      departure: parkingState.departure,
      block: parkingState.block,
      slot: parkingState.slot,
    });
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
              date: parkingState.date,
              arrival: parkingState.arrival,
              departure: parkingState.departure,
            })
          );
          document.querySelector("body").style.overflowY = "auto";
        }}
      >
        X
      </p>
      <div className="parkingBookingContainer">
        <p>
          Slot: {parkingState.block}
          {parkingState.slot}
        </p>
        <p>Date: {parkingState.date}</p>
        <p>Arrival: {parkingState.arrival}</p>
        <p>Departure: {parkingState.departure}</p>
        <input type="text" placeholder="Vehicle Type" ref={vehicleType}></input>
        <input
          type="text"
          placeholder="Vehicle Number"
          ref={vehicleNumber}
        ></input>
        <button onClick={bookParking}>Book</button>
      </div>
    </div>
  );
}

export default ParkingBooking;
