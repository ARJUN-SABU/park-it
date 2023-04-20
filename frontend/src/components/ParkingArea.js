//components
import ParkingBlock from "./ParkingBlock";

//styles
import "../styles/ParkingArea.css";

function ParkingArea({ slotBookings }) {
  return (
    <div className="parkingArea">
      <ParkingBlock block={"A"} bookings={slotBookings.blockA} />
      <ParkingBlock block={"B"} bookings={slotBookings.blockB} />
      <ParkingBlock block={"C"} bookings={slotBookings.blockC} />
    </div>
  );
}

export default ParkingArea;
