const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// represents event bus data store
const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  // add the event to the data store
  events.push(event);

  // These are the different microservices to which we are
  // forwarding/echoing the event data via a POST request.
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  // this could be a Query service which consolidates data
  // from all other services and can be used by a client to
  // make a single GET request (much efficient!)
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

// handler to get all the events that have occured
app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => console.log("Listening on 4005"));
