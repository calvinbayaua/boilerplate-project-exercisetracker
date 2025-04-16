const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.DB_URL);

// DB - Add user schema to database
const UserSchema = new Schema({
  username: String,
});
const User = mongoose.model("User", UserSchema);

// DB - Add Excercise schema to database
const ExcerciseSchema = new Schema({
  user_id: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
});
const Excercise = mongoose.model("Exercise", ExcerciseSchema);

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// DB - Adds an instance of User to database
app.post("/api/users", async (req, res) => {
  const userObj = new User({
    username: req.body.username,
  });

  try {
    // DB - Saves user object to database
    const user = await userObj.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

// DB - Returns all users stored in database
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  if (!users) {
    res.send("There are currently no users in database");
  } else {
    res.json(users);
  }
});

// DB - Adds an instance of Exercise to database associated with the user id
app.post("/api/users/:_id/exercises", async (req, res) => {
  const id = req.params._id;
  const { description, duration, date } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.send("Could not find user");
    } else {
      // DB - Create a new instance of Exercise object using form data
      const exerciseObj = new Excercise({
        user_id: user._id,
        description,
        duration,
        date: date ? new Date(date) : new Date(),
      });
      const exercise = await exerciseObj.save();

      // FRONT - Send saved exercise object to the frontend
      res.json({
        _id: user._id,
        username: user.username,
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString(),
      });
    }
  } catch (err) {
    console.log(err);
    res.send("Error saving exercise");
  }
});

// DB - Returns a structured Exercise log associated with the user id
app.get("/api/users/:_id/logs", async (req, res) => {
  const id = req.params._id;
  const user = await User.findById(id);
  if (!user) {
    res.send("Could not find user");
    return;
  }

  const { from, to, limit } = req.query;
  let dateObj = {};
  if (from) {
    dateObj["$gte"] = new Date(from);
  }
  if (to) {
    dateObj["$lte"] = new Date(to);
  }
  let filter = {
    user_id: id,
  };
  if (from || to) {
    filter.date = dateObj;
  }

  // DB - Retrieve exercises from database and format accordingly
  const exercises = await Excercise.find(filter).limit(+limit ?? 100);
  const log = exercises.map((e) => ({
    description: e.description,
    duration: e.duration,
    date: e.date.toDateString(),
  }));

  res.json({
    username: user.username,
    count: exercises.length,
    _id: user._id,
    log: log,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
