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
  //   let date = new Date().toDateString();
  //   let date = "Wed Apr 19 2023";
  //   db.collection("parking")
  //     .find({ date: date })
  //     .toArray()
  //     .then((docs) => res.status(200).json(docs))
  //     .catch((err) => res.status(500).send(err));

  let blockA = [];
  let blockB = [];
  let blockC = [];
  for (let i = 0; i < 8; i++) {
    blockA.push({});
    blockB.push({});
    blockC.push({});
  }

  let date = "Tue Apr 18 2023";
  let arrivalTime = new Date(`${date} ${"21:00:00"}`);
  let departureTime = new Date(`${date} ${"21:30:00"}`);

  //   console.log(arrivalTime.getTime());
  //   console.log(departureTime.getTime());
  //   console.log(departureTime.getTime() > arrivalTime.getTime());

  db.collection("parking")
    .find({ date: date })
    .toArray()
    .then((docs) => {
      docs.forEach((doc) => {
        let newDoc = {
          slot: doc.slot,
          arrival: doc.arrival,
          departure: doc.departure,
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

        // console.log(newDoc);
        // console.log(Number(doc.slot));
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
      vehicleType: "Bugatti",
      vehicleNumber: "KL1342",
      expireAt: new Date("April 19, 2023 20:57:00"), //same as departure time
      date: new Date("April 19, 2023").toDateString(),
      arrival: new Date("April 18, 2023 19:00:00"),
      departure: new Date("April 18, 2023 21:30:00"),
      block: "A",
      slot: { $numberInt: "7" },
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});
