const express = require("express");
const cors = require("cors");
const Promise = require("bluebird");
const bodyParser = require("body-parser");
const path = require("path");
const hash = require("hash.js");
//ex: hash.sha256().update('abc').digest('hex')
const db = require('../database/dbmongo.js');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../dist")));
app.use(bodyParser.json());

Promise.promisifyAll(require('mongoose'));

//Get all projects
app.get("/projects", function (req, res) {
  console.log('I got a get for all projects')
  db.getAllProjects()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      console.log("Error getting all projects: ", err);
      res.sendStatus(500);
    });
});

//Get all events
app.get("/events", function (req, res) {
  console.log('I got a get for all events')
  db.getAllEvents()
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      console.log("Error getting all events: ", err);
      res.sendStatus(500);
    });
});

//get all events with specific project id
app.get("/events/:project", function (req, res) {
  console.log('I got a get for events by project')
  db.getEventsByProject(req.params.project)
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      console.log("Error getting events by project: ", err);
      res.sendState(500);
    });
});

//get all comments by either project or event
app.get("/comments/:project", function (req, res) {
  console.log('I got a get for comments')
  db.getComments(req.params.project, req.body.event)
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      console.log("Error getting all events: ", err);
      res.sendStatus(500);
    });
});

//var users = require('../database/faker.js')
//console.log(users)

app.post('/users/newUser', function(req, res) {
  console.log('I got a post for a new user: ', req.body);
  db.saveUser(req.body)
    .then((user) => {
      console.log('I got user: ', user)
      res.json(user);
    })
    .catch((err) => {
      console.log('error saving new user');
      res.sendStatus(500);
    })
})

//Create a new project
// app.post("/projects/newProject", function (req, res) {
//   let project = req.body;
//   console.log("got post project: ", project);
//   db.saveProject(project)
//     .then(res.send(200))
//     .catch((err) => {
//       console.log("Error saving new project: ", err);
//       res.sendStatus(500);
//     });
// });

//create a new event
// app.post("/events/newEvent", function (req, res) {
//   let event = req.body;
//   console.log("got post event: ", event);
//   db.saveEvent(event)
//     .then(res.send(200))
//     .catch((err) => {
//       console.log("Error saving new event: ", err);
//       res.sendStatus(500);
//     });
// });

//Add name, people attending to event based on RSVP
// app.post("/RSVP", function (req, res) {
//   //console.log('Got an RSVP request for people: ', req.body)
//   db.rsvp(req.body)
//     .then(res.send(200))
//     .catch((err) => {
//       console.log("Error saving RSVP: ", err);
//       res.sendStatus(500);
//     });
// });

const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});
