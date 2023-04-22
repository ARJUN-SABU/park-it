//styles
import "../styles/UserBookingCard.css";

function UserBookingCard(props) {
  return (
    <div className="userBookingCard">
      <p>
        Vehicle Type: <b>{props.vehicleType}</b>
      </p>
      <p>
        Vehicle Number: <b>{props.vehicleNumber}</b>
      </p>
      <p>
        Booked Slot:{" "}
        <b>
          {props.block}
          {props.slot}
        </b>
      </p>
      <p>
        Booking Date: <b>{props.date}</b>
      </p>
      <p>
        Arrival Time: <b>{props.arrival.split(props.date)[1]}</b>
      </p>
      <p>
        Departure Time: <b>{props.departure.split(props.date)[1]}</b>
      </p>

      <button>Cancel Booking</button>
    </div>
  );
}

export default UserBookingCard;
