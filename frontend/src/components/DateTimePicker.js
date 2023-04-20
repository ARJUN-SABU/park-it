function DateTimePicker({ date, setDate, setArrivalTime, setDepartureTime }) {
  return (
    <div className="dateTimePicker">
      <div className="datePicker">
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          onChange={(event) =>
            setDate(new Date(`${event.target.value}`).toDateString())
          }
        ></input>
      </div>
      <div className="timePicker">
        <input
          type="time"
          onChange={(event) => setArrivalTime(event.target.value)}
        />
        <input
          type="time"
          onChange={(event) => setDepartureTime(event.target.value)}
        />
      </div>
    </div>
  );
}

export default DateTimePicker;
