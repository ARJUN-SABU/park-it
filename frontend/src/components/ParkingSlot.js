//packages
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../app/parkingSlice";

//styles
import "../styles/ParkingSlot.css";

function ParkingSlot({ bookingStatus, slotPosition, block, slot }) {
  const dispatch = useDispatch();
  const parkingState = useSelector((state) => state.parking);
  function setBlockAndSlot() {
    if (!bookingStatus) {
      dispatch(
        actions.setParkingDetails({
          block,
          slot,
          showParkingBooking: true,
          bookedSlotDetails: null,
          date: parkingState.date,
          arrival: parkingState.arrival,
          departure: parkingState.departure,
          xCoordinate: parkingState.xCoordinate,
          yCoordinate: parkingState.yCoordinate,
        })
      );
    } else {
      dispatch(
        actions.setParkingDetails({
          block: block,
          slot: slot,
          showParkingBooking: false,
          bookedSlotDetails: bookingStatus,
          date: parkingState.date,
          arrival: parkingState.arrival,
          departure: parkingState.departure,
          xCoordinate: parkingState.xCoordinate,
          yCoordinate: parkingState.yCoordinate,
        })
      );
    }
    document.querySelector("body").style.overflowY = "hidden";
  }

  return (
    <div
      className={`parkingSlot ${
        slotPosition == "Left" ? "parkingSlotLeft" : "parkingSlotRight"
      } ${slot == 0 || slot == 1 ? "parkingTopRow" : ""} ${
        bookingStatus ? "parkingSlot--booked" : "parkingSlot--available"
      }`}
      onClick={setBlockAndSlot}
    >
      <p className="parkingSlot__status">
        {bookingStatus ? "Booked" : "Available"}
      </p>
      <p className="parkingSlot_slotNumber">
        {block}
        {slot}
      </p>
    </div>
  );
}

export default ParkingSlot;
