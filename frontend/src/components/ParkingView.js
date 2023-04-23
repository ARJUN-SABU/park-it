//packages
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../app/parkingSlice";

//styles
import "../styles/ParkingView.css";

// parking slot coordinates
import ParkingLotData from "../data/ParkingLot.json";

function ParkingView({ slotBookings }) {
  const dispatch = useDispatch();
  const parkingState = useSelector((state) => state.parking);

  useEffect(() => {
    //fetch slots from the database.
    console.log(slotBookings);
    removeAllMarkers();
    markBookedSlots(slotBookings.blockA);
    markBookedSlots(slotBookings.blockB);
    markBookedSlots(slotBookings.blockC);
  }, [slotBookings]);

  function markBookedSlots(slotBookingData) {
    slotBookingData.forEach((slot) => {
      if (slot) {
        let slotMarker = document.createElement("div");
        slotMarker.classList.add("parkingMarker--red");
        slotMarker.classList.add("parkingMarker");
        slotMarker.style.left = `${slot.xCoordinate}px`;
        slotMarker.style.top = `${slot.yCoordinate}px`;
        document
          .querySelector(".parkingView__imageWrapper")
          .appendChild(slotMarker);
      }
    });
  }
  function removeAllMarkers() {
    let parkingMarkerPoints = document.querySelectorAll(".parkingMarker");
    parkingMarkerPoints.forEach((point) =>
      document.querySelector(".parkingView__imageWrapper").removeChild(point)
    );
  }
  function removeOneMarker(markerId) {
    let marker = document.querySelector(`#${markerId}`);
    if (marker)
      document.querySelector(".parkingView__imageWrapper").removeChild(marker);
  }

  function markSlotForBooking(event, block, slot) {
    if (slotBookings[`block${block}`][slot]) {
      //show booking details
      dispatch(
        actions.setParkingDetails({
          block: block,
          slot: slot,
          showParkingBooking: false,
          bookedSlotDetails: slotBookings[`block${block}`][slot],
          date: parkingState.date,
          arrival: parkingState.arrival,
          departure: parkingState.departure,
          xCoordinate: parkingState.xCoordinate,
          yCoordinate: parkingState.yCoordinate,
        })
      );
      return;
    }

    let coordinates = event.target.coords.split(",");
    let slotMarker = document.createElement("div");
    slotMarker.classList.add("parkingMarker--green");
    slotMarker.classList.add("parkingMarker");
    slotMarker.id = `parkingMarker-${block}${slot}`;

    let averageXCoordinate =
      (Number(coordinates[0]) + Number(coordinates[2])) / 2;
    let averageYCoordinate =
      (Number(coordinates[1]) + Number(coordinates[3])) / 2;

    //subtract 20 from both because pointer circle's width is 40px
    //so, radius is 20px. That means, the top left corner of the circle
    //should be shifted upwards and leftwards by 20px each, so that
    //the center of the circle is at the calculated coordinates.
    averageXCoordinate = averageXCoordinate - 20;
    averageYCoordinate = averageYCoordinate - 20;
    console.log(averageXCoordinate, averageYCoordinate);
    slotMarker.style.left = `${averageXCoordinate}px`;
    slotMarker.style.top = `${averageYCoordinate}px`;

    //if green dot was already placed before, no need to place it again

    if (!document.querySelector(`#parkingMarker-${block}${slot}`)) {
      console.log("placed");
      document
        .querySelector(".parkingView__imageWrapper")
        .appendChild(slotMarker);
    }

    //dispatch the action of setting the block, slot, coordinates
    //to the global store.
    dispatch(
      actions.setParkingDetails({
        block,
        slot,
        showParkingBooking: true,
        bookedSlotDetails: null,
        date: parkingState.date,
        arrival: parkingState.arrival,
        departure: parkingState.departure,
        xCoordinate: averageXCoordinate,
        yCoordinate: averageYCoordinate,
      })
    );
  }

  return (
    <div className="parkingView">
      <div className="parkingView__imageWrapper">
        <img src="ParkingImage.jpg" useMap="#image-map"></img>
      </div>

      <map name="image-map">
        {ParkingLotData.map((parkingSlot) => (
          <area
            key={`${parkingSlot.block}${parkingSlot.slot}`}
            title={`${parkingSlot.block}${parkingSlot.slot}`}
            coords={parkingSlot.coords}
            shape="rect"
            onClick={(e) =>
              markSlotForBooking(e, parkingSlot.block, parkingSlot.slot)
            }
          />
        ))}
      </map>
      {/* <button onClick={removeAllMarkers}>Remove Markers</button> */}
    </div>
  );
}

export default ParkingView;
