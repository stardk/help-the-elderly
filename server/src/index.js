const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs')

const app = express();

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Connect to mongodb
mongoose.connect(config.database, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", (callback) => {
  console.log("Connection succeeded");
  app.listen(process.env.PORT || config.port, () => {
    console.log(`Server started on port ${config.port} ...`)
  });
});

// Auth config
app.use(session({
  secret: 'diploma',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

// Task's queries
let Task = require('../models/task');

app.post('/tasks', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var address = req.body.address;
  var datetime = req.body.datetime;
  var istaken = req.body.istaken;
  var newTask = new Task({
    title: title,
    description: description,
    address: address,
    datetime: datetime,
    istaken: istaken
  });

  newTask.save(function (error) {
    if (error) {
      console.log(error)
    }
    else {
      res.send({
        success: true,
        message: 'Post saved successfully!'
      })
    }
  })
});

app.get('/tasks', (req, res) => {
  res.locals.user = req.user || null;
  Task.find({ istaken: false }, 'title description address datetime', function (error, tasks) {
    if (error) { console.log(error) }
    else {
      res.send({
        tasks: tasks
      })
    }
  }).sort({_id: -1})
});

app.get('/task/:id', (req, res) => {
	var db = req.db;
	Task.findById(req.params.id, 'title description address datetime istaken', function (error, task) {
	  if (error) {
      console.error(error)
    }
	  else {
      res.send(task)
    }
	})
})

app.put('/tasks/:id', (req, res) => {
	var db = req.db;
	Task.findById(req.params.id, 'title description address datetime istaken', function (error, task) {
	  if (error) { console.error(error); }
	  task.title = req.body.title;
	  task.description = req.body.description;
    task.address = req.body.address;
    task.datetime = req.body.datetime;
    task.istaken = req.body.istaken;
	  task.save(function (error) {
			if (error) {
				console.log(error)
			}
			else res.send({
				success: true
			})
		})
	})
})

app.delete('/tasks/:id', (req, res) => {
  var db = req.db;
  Task.remove({
    _id: req.params.id
  }, function(err, task){
    if (err)
      res.send(err)
    else res.send({
      success: true
    })
  })
});

// User's queries
let User = require('../models/user');

app.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      res.send({ success: false });
      console.log("false");
    } else {
      let newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser.save( (err) => {
            if (err) {
              console.log(err);
              return;
            } else {
              res.send({ success: true });
              console.log("true");
            }
          });
        });
      });
    }
  })
});

app.post('/signin',
  passport.authenticate('local'),
  function(req, res) {
    res.send({ success: true })
  }
);

app.get('/signout', (req, res) => {
  req.logout();
});
