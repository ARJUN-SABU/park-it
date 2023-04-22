//styles
import "../styles/UserBookingCard.css";

function UserBookingCard(props) {
  function removeBooking() {
    console.log(props.id);
    fetch(`https://park-it-omega.vercel.app/remove-booking/${props.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        fetch(
          `https://park-it-omega.vercel.app/user-bookings?email=${props.userEmail}`
        )
          .then((res) => res.json())
          .then((docs) => {
            console.log(docs);
            props.setUserBookings(docs);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

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

      <button onClick={removeBooking}>
        <b>Cancel Booking</b>
      </button>
    </div>
  );
}

export default UserBookingCard;
