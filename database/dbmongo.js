const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/grean', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function() {
  console.log('Connected to mongoose!')
})

let projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: String,
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
  litterTypes: [ String ],
  projectType: [ String ],
})

let eventSchema = new mongoose.Schema({
  project: String,
  name: String,
  description: String,
  created_by: String,
  created_at: {
    type: Date,
    default: Date.now()
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
    type: Number,
    max: 99999
  },
  saved_projects: [ String ],
  events_attended: [ String ]
})

let commentSchema = new mongoose.Schema({
  event: String,
  project: String,
  user: String,
  comment: String
})

let Project = mongoose.model("Project", projectSchema)
let Event = mongoose.model('Event', eventSchema)
let User = mongoose.model('User', userSchema)
let Comment = mongoose.model('Comment', commentSchema)

