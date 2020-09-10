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

//This requires the faker file and the exported functions there that create fake data
var dataGen = require('../database/faker.js')
/*
=========================================================
Step 1:
  a) uncomment the loadUsers function and call below
    This will run the create fake users function and load 100 users to the db
  b) save this file
  c) comment the functions out again to avoid re running and save.

=========================================================
*/
//Call this function to save users on each value in the users array
// var loadUsers = (users) => {
//   for (var i = 0; i < users.length; i++) {
//     db.saveUser(users[i])
//   }
// }
//loadUsers(dataGen.users);


/*
=========================================================
Step 2:
  a) uncomment the loadProjects function and call below
    This will query for all the users, and using a random users's object id will create 200 projects and load them to the db
  b) save this file
  c) comment the functions out again to avoid re running and save.
=========================================================
*/
//Call this function (as below) to get all the users and create projects based on the users ids, then load the projects into the db
// var loadProjects = (cb) => {
//   db.getUsers()
//     .then((users) => {
//       console.log('I got my users')
//       return cb(users)
//     })
//     .then((projects) => {
//       console.log('I got my projects')
//       for (var i = 0; i < projects.length; i++) {
//         db.saveProject(projects[i])
//       }
//     })
// }
//loadProjects(dataGen.getProjects)


/*
=========================================================
Step 3:
  a) uncomment the loadEvents function and call below
    This will query for all the users and all the projects, will create 200 events based on the users ids and the projects
  b) save this file
  c) comment the functions out again to avoid re running and save.
=========================================================
*/
//Call this function to get all the projects and users, create the events and load the events into the db
// var loadEvents = () => {
//   db.getUsers()
//     .then((users) => {
//       console.log('I got my users')
//       db.getAllProjects()
//         .then((projects) => {
//           console.log('I got my projects')
//           return dataGen.getEvents(projects, users)
//         })
//         .then((events) => {
//           for (var i = 0; i < events.length; i++) {
//             db.saveEvent(events[i])
//           }
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     })
// }
//loadEvents();

//Get all projects
app.get("/projects", function (req, res) {
  console.log('I got a get for all projects')
  db.getAllProjects()
    .then((projects) => {
      res.send(projects);
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

//get all users
app.get('/users', function (req, res) {
  console.log('I got a get for all users')
  db.getUsers()
    .then((users) => {
      res.json(users);
    })
})


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
