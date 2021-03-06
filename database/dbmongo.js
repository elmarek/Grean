const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/grean', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})

/*
=========================================================
Mongoose connection
=========================================================
*/

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function() {
  console.log('Connected to mongoose!')
})

/*
=========================================================
Project schema and data types
=========================================================
*/

let projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  created_by: String,
  location: {
    type: {
      type: String,
      enum: [ 'Point' ],
      required: true
    },
    coordinates: {
      type: [ Number ],
      required: true
    }
  },
  litter_types: [ String ],
  project_type: [ String ],
})
let Project = mongoose.model("Project", projectSchema)

/*
=========================================================
Event schema and data types
=========================================================
*/

let eventSchema = new mongoose.Schema({
  project: String,
  name: String,
  description: String,
  created_by: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  date_start: Date,
  date_end: Date,
  attendees_requested: Number,
  pickup: Boolean,
  pickup_notes: String,
  sponsored: Boolean,
  sponsored_notes: String,
  attendees: [ String ],
  equipment: [ String ]
})
let Event = mongoose.model('Event', eventSchema)

/*
=========================================================
Users schema and data types
=========================================================
*/

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  first: String,
  last: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  zip_code: {
    type: String,
  },
  saved_projects: [ String ],
  events_attended: [ String ]
})
let User = mongoose.model('User', userSchema)

/*
=========================================================
Comments schema and data types
=========================================================
*/

let commentSchema = new mongoose.Schema({
  event: String,
  project: String,
  user: String,
  comment: String,
  created_at: {
    type: Date,
    default: Date.now
  }
})
let Comment = mongoose.model('Comment', commentSchema)

/*
=========================================================
Read query routes
=========================================================
*/

const getAllProjects = () => {
  //get all projects
  //take location as an input to query
  //find based on math of map shown in window
  var projects = Project.find({})

  return projects;
}

const getAllEvents = () => {
  //get all events
  //take location as an input to query
  //find based on math of map shown in window
  //filter upcoming only by date_start
  var events = Event.find({})

  return events;
}

const getUsers = () => {
  console.log('I got a getUsers request')
  var users = User.find({})
  return users;
}

const getEventsByProject = (project) => {
  //get events by project id
  var events = Event.find({ project: project }).lean()
  //filter by upcoming
  //sort by start_date (soonest first)
  return events;
}

const getComments = (project, event) => {
  //get comments associated with a specific project or event (or both)
  var comments = [];
  if (!event) {
    comments = Comment.find({ project: project })
  } else {
    comments = Comment.find({ event: event })
  }
  //sort by most recent based on created_at

  return comments;
}

/*
=========================================================
Create query routes
=========================================================
*/

const saveProject = (project) => {
  //save a new project with the project data passed in
  var project = Project.create(project);
  return project;

}
const saveEvent = (event) => {
  //save event, specifying project id and user id
  var event = Event.create(event);
  return event;
}
const saveUser = (user) => {
  //create new user with data passed in
  var user = User.create(user);
  return user;
}
const saveComment = (comment, project, event, user) => {
  //save new comment
  //add project id
  //if event specified, add event id
  //add user id

}

/*
=========================================================
Update query routes
=========================================================
*/
const newRSVP = (rsvp) => {
  let event = Event.findByIdAndUpdate(rsvp.event, {
    // taken from MVP, adds attendee to array
    $push: {attendees: rsvp.name},
  });
  return event;
}

/*
=========================================================
Delete query routes
=========================================================
*/


/*
=========================================================
Exports
=========================================================
*/

module.exports = {
  getAllProjects: getAllProjects,
  getAllEvents: getAllEvents,
  getEventsByProject: getEventsByProject,
  getComments: getComments,
  saveUser: saveUser,
  getUsers: getUsers,
  saveProject: saveProject,
  saveEvent: saveEvent,
}
