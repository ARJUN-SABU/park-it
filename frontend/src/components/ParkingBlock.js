//component
import ParkingSlot from "./ParkingSlot";

//styles
import "../styles/ParkingBlock.css";

function ParkingBlock({ block, bookings }) {
  return (
    <div className="parkingBlock">
      <div className="parkingBlockText">
        <p>{block} Block</p>
      </div>
      <div className="parkingBlockText">
        <p>Entry</p>
      </div>
      <div>
        <div className="parkingBlockRow">
          <ParkingSlot
            bookingStatus={bookings[0]}
            slotPosition={"Left"}
            block={block}
            slot={0}
          />
          <ParkingSlot
            bookingStatus={bookings[1]}
            slotPosition={"Right"}
            block={block}
            slot={1}
          />
        </div>
        <div className="parkingBlockRow">
          <ParkingSlot
            bookingStatus={bookings[2]}
            slotPosition={"Left"}
            block={block}
            slot={2}
          />
          <ParkingSlot
            bookingStatus={bookings[3]}
            slotPosition={"Right"}
            block={block}
            slot={3}
          />
        </div>
        <div className="parkingBlockRow">
          <ParkingSlot
            bookingStatus={bookings[4]}
            slotPosition={"Left"}
            block={block}
            slot={4}
          />
          <ParkingSlot
            bookingStatus={bookings[5]}
            slotPosition={"Right"}
            block={block}
            slot={5}
          />
        </div>
        <div className="parkingBlockRow">
          <ParkingSlot
            bookingStatus={bookings[6]}
            slotPosition={"Left"}
            block={block}
            slot={6}
          />
          <ParkingSlot
            bookingStatus={bookings[7]}
            slotPosition={"Right"}
            block={block}
            slot={7}
          />
        </div>
      </div>
      <div className="parkingBlockText">
        <p>Exit</p>
      </div>
    </div>
  );
}

export default ParkingBlock;
