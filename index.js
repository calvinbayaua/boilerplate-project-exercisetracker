const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.DB_URL);

const UserSchema = new Schema({
  username: String,
});
const User = mongoose.model("User", UserSchema);

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

app.post("/api/users", async (req, res) => {
  const userObj = new User({
    username: req.body.username,
  });

  try {
    const user = await userObj.save();
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

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

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
