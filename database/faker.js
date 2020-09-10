var faker = require('faker');

var users = [];
var userCount = 0;
while (userCount < 100) {
  var user = {
    username: faker.internet.userName(),
    first: faker.name.firstName(),
    last: faker.name.lastName(),
    created_at: faker.date.past(),
    zip_code: faker.address.zipCode(),
    saved_projects: [],
    events_attended: []
  }
  users.push(user);
  userCount++;
}

module.exports.users = users

const getProjects = (users) => {
  var projects = [];
  var projectCount = 0;
  while (projectCount < 200) {
    var user = users[Math.floor((Math.random() * users.length))];
    var project = {
      name: faker.lorem.words(),
      description: faker.lorem.sentences(),
      created_at: faker.date.past(),
      created_by: user._id,
      location: {
        "type" : "Point",
        "coordinates": [
          faker.address.longitude(),
          faker.address.latitude()
        ]
      },
      litter_types: [],
      project_type: [],
    }
    projects.push(project);
    projectCount++;
  }
  //return projects list
  return projects;
}

module.exports.getProjects = getProjects

const getEvents = (projects, users) => {
  var events = [];
  var eventCount = 0;
  while (eventCount < 200) {
    var user = users[Math.floor((Math.random() * users.length))];
    var project = projects[Math.floor((Math.random() * projects.length))];
    var event = {
      project: project._id,
      name: faker.lorem.words(),
      description: faker.lorem.sentences(),
      created_at: faker.date.past(),
      created_by: user._id,
      date_start: faker.date.future(),
      attendees_requested: faker.random.number(),
      pickup: true,
      pickup_notes: faker.lorem.sentence(),
      sponsored: true,
      sponsored_notes: faker.lorem.sentence(),
      attendees: [ user._id ],
      equipment: []
    }
    event.date_end = ( event.date_start.setHours( event.date_start.getHours() + 3  )),
    events.push(event);
    eventCount++;
  }
  //return projects list
  return events;
}

module.exports.getEvents = getEvents
