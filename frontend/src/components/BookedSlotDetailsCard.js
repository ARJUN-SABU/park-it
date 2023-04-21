//packages
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../app/parkingSlice";

//styles
import "../styles/BookedSlotDetailsCard.css";

function BookedSlotDetailsCard() {
  const parkingState = useSelector((state) => state.parking);
  const dispatch = useDispatch();

  return (
    <div className="bookedSlotDetailsCard">
      <p className="bookedSlotDetailsCard__SlotNumber">
        <b>
          {parkingState.block}
          {parkingState.slot}
        </b>{" "}
        Booking Details
      </p>
      <p>
        Arrival: <b>{parkingState.bookedSlotDetails.arrival}</b>
      </p>
      <p>
        Departure: <b>{parkingState.bookedSlotDetails.departure}</b>
      </p>

      <p
        className="bookedSlotDetailsCard--close"
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
    </div>
  );
}

export default BookedSlotDetailsCard;
