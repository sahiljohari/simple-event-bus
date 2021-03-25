// This service should exist as a separate express app, but
// since I am recording it as a template for learning purpose,
// this file represents what a "Query" service would look like.

// NEVER RUN THIS FILE

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dataStructure = {};

// this serves the "posts" microservice which is running on PORT 4000
app.get("/posts", (req, res) => {
  res.send(dataStructure);
});

// this receives events from Event bus and updates its own
// data structure by consolidating data received in request body
// from other services
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  // for every type of event, perform relevant operations
  switch (type) {
    case "PostCreated":
      const { id, title } = data;
      // update dataStructure
      dataStructure[id] = { id, title };
      break;
  }

  res.send({});
});

app.listen(4002, () => console.log("Listening on 4002"));
