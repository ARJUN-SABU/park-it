const express = require("express");
const { connectToDb, getDb } = require("./db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

//db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log("App is listening at port 8000");
    });
    db = getDb();
  }
});

app.use(
  cors({
    origin: "*",
  })
);

//routes
app.get("/time-slots", (req, res) => {
  console.log(req.query);

  let blockA = [];
  let blockB = [];
  let blockC = [];
  for (let i = 0; i < 8; i++) {
    blockA.push({
      slot: "",
      arrival: "",
      departure: "",
      booked: false,
    });
    blockB.push({
      slot: "",
      arrival: "",
      departure: "",
      booked: false,
    });
    blockC.push({
      slot: "",
      arrival: "",
      departure: "",
      booked: false,
    });
  }

  let date = req.query.date;
  let arrivalTime = new Date(`${req.query.date} ${req.query.arrivalTime}`);
  let departureTime = new Date(`${req.query.date} ${req.query.departureTime}`);

  db.collection("parking")
    .find({ date: date })
    .toArray()
    .then((docs) => {
      docs.forEach((doc) => {
        let newDoc = {
          slot: doc.slot,
          arrival: `${doc.arrival.getHours()}:${doc.arrival.getMinutes()}`,
          departure: `${doc.departure.getHours()}:${doc.departure.getMinutes()}`,
          booked: false,
        };
        if (
          arrivalTime.getTime() < new Date(doc.departure).getTime() &&
          new Date(doc.arrival).getTime() < departureTime.getTime()
        ) {
          newDoc.booked = true;
        }

        if (doc.block == "A") blockA[Number(doc.slot)] = newDoc;
        else if (doc.block == "B") blockB[Number(doc.slot)] = newDoc;
        else blockC[Number(doc.slot)] = newDoc;
      });
      res.status(200).json({
        blockA,
        blockB,
        blockC,
      });
    })
    .catch((err) => res.status(500).send(err));
});

app.post("/add-booking", (req, res) => {
  db.collection("parking")
    .insertOne({
      vehicleType: "Sedan",
      vehicleNumber: "Ciaz",
      expireAt: new Date("April 22, 2023 19:30:00"), //same as departure time
      date: new Date("April 22, 2023").toDateString(),
      arrival: new Date("April 22, 2023 18:00:00"),
      departure: new Date("April 22, 2023 19:30:00"),
      block: "B",
      slot: 7,
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});
