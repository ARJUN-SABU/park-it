const express = require("express");
const { ObjectId } = require("mongodb");
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

//middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

//routes

//get the booking details
//overlapping with the given particluar
//date, arrival and departure times.
app.get("/time-slots", (req, res) => {
  let blockA = [];
  let blockB = [];
  let blockC = [];
  for (let i = 0; i < 6; i++) {
    blockA.push(null);
    blockB.push(null);
    blockC.push(null);
  }

  let date = req.query.date;
  let arrivalTime = new Date(`${req.query.date} ${req.query.arrivalTime}`);
  let departureTime = new Date(`${req.query.date} ${req.query.departureTime}`);

  db.collection("parking")
    .find({ date: date })
    .toArray()
    .then((docs) => {
      docs.forEach((doc) => {
        let newDoc = null;

        if (
          arrivalTime.getTime() < new Date(doc.departure).getTime() &&
          new Date(doc.arrival).getTime() < departureTime.getTime()
        ) {
          newDoc = {
            arrival: doc.arrival,
            departure: doc.departure,
            xCoordinate: doc.xCoordinate,
            yCoordinate: doc.yCoordinate,
          };
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

//get the booking details of a particular user
app.get("/user-bookings", (req, res) => {
  db.collection("parking")
    .find({ email: req.query.email })
    .toArray()
    .then((docs) => {
      docs.sort((doc1, doc2) => {
        return (
          new Date(doc1.arrival).getTime() - new Date(doc2.arrival).getTime()
        );
      });
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//delete a particular booking
app.delete("/remove-booking/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("parking")
      .deleteOne({
        _id: new ObjectId(req.params.id),
      })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(400).json({
      error_message: "Invalid Id",
    });
  }
});

//add a booking to the database
app.post("/add-booking", (req, res) => {
  req.body.expireAt = new Date(req.body.expireAt);
  db.collection("parking")
    .insertOne(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err));
});
