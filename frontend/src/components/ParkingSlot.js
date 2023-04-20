//packages
import { useDispatch } from "react-redux";
import { actions } from "../app/parkingSlice";

//styles
import "../styles/ParkingSlot.css";

function ParkingSlot({ bookingStatus, slotPosition, block, slot }) {
  const dispatch = useDispatch();
  function setBlockAndSlot() {
    dispatch(
      actions.setParkingDetails({
        block,
        slot,
      })
    );
  }

  return (
    <div
      className={`parkingSlot ${
        slotPosition == "Left" ? "parkingSlotLeft" : "parkingSlotRight"
      }`}
      onClick={setBlockAndSlot}
    >
      <p>{bookingStatus ? "Booked" : "Available"}</p>
      <p className="parkingSlot_slotNumber">
        {block}
        {slot}
      </p>
    </div>
  );
}

export default ParkingSlot;
