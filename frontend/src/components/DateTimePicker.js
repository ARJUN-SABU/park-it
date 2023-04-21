//styles
import "../styles/DateTimePicker.css";

function DateTimePicker({ date, setDate, setArrivalTime, setDepartureTime }) {
  return (
    <div className="dateTimePicker">
      <div className="datePicker">
        <p>Date</p>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          onChange={(event) =>
            setDate(new Date(`${event.target.value}`).toDateString())
          }
        ></input>
      </div>
      <div className="timePickerContainer">
        <div className="timePicker">
          <p>Arrival</p>
          <input
            type="time"
            onChange={(event) => setArrivalTime(event.target.value)}
          />
        </div>
        <div className="timePicker">
          <p>Departure</p>
          <input
            type="time"
            onChange={(event) => setDepartureTime(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default DateTimePicker;
