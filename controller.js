const { Attendee, Registration } = require("./model");
const axios = require("axios");

exports.createRegistration = async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAttendee = async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    await attendee.save();
    res.status(201).json(attendee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRegistration = async (req, res) => {
  try {
    const registration = await Registration.find();
    res.status(200).json(registration);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAttendee = async (req, res) => {
  try {
    const attendee = await Attendee.find();
    res.status(200).json(attendee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSingleRegistration = async (req, res) => {
  const API_URL = "https://sein-0boe.onrender.com/api/registration";

  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    const desiredUid = req.params.uid;
    const result = data.find((item) => item.uid === desiredUid);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    console.error("Error fetching data from the API:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
