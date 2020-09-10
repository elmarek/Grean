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

/*

    {
      username: 'Cristopher70',
      first: 'Lazaro',
      last: 'Mosciski',
      created_at: 2020-01-17T18:31:11.293Z,
      zip_code: '68356-1186',
      saved_projects: [],
      events_attended: []
    },
    {
      username: 'Judah22',
      first: 'Hayden',
      last: 'Hartmann',
      created_at: 2019-11-12T02:12:43.189Z,
      zip_code: '87967',
      saved_projects: [],
      events_attended: []
    },
    {
      username: 'Serena37',
      first: 'Esta',
      last: 'Christiansen',
      created_at: 2020-04-09T00:58:47.960Z,
      zip_code: '06625-4475',
      saved_projects: [],
      events_attended: []
    },
    {
      username: 'Tito.Senger',
      first: 'Maryjane',
      last: 'Bradtke',
      created_at: 2019-11-09T07:51:05.215Z,
      zip_code: '17595',
      saved_projects: [],
      events_attended: []
    },
    {
      username: 'Bryana.Lubowitz8',
      first: 'Bernie',
      last: 'Conroy',
      created_at: 2020-01-03T02:10:09.275Z,
      zip_code: '09516-6406',
      saved_projects: [],
      events_attended: []
    },
    {
      username: 'Leslie.Predovic',
      first: 'Camylle',
      last: 'Stiedemann',
      created_at: 2020-07-18T08:29:46.620Z,
      zip_code: '28869-8257',
      saved_projects: [],
      events_attended: []
    },
    {
      username: 'Scarlett.Hamill',
      first: 'Richard',
      last: 'Olson',
      created_at: 2020-05-23T03:35:44.428Z,
      zip_code: '08141-2458',
      saved_projects: [],
      events_attended: []
    },
    {
      username: 'Ena91',
      first: 'Flavio',
      last: 'Armstrong',
      created_at: 2020-07-24T04:19:14.654Z,
      zip_code: '04914-5378',
      saved_projects: [],
      events_attended: []
    },
    {
      username: 'Tom79',
      first: 'Jennyfer',
      last: 'MacGyver',
      created_at: 2020-04-25T07:40:44.821Z,
      zip_code: '80849-4348',
      saved_projects: [],
      events_attended: []
    },
    {
      username: 'Wilber_Greenfelder',
      first: 'Everardo',
      last: 'Lebsack',
      created_at: 2020-07-17T01:09:19.053Z,
      zip_code: '46725-2567',
      saved_projects: [],
      events_attended: []
    }
  ]
  */