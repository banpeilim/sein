const { User, Product, Attendee } = require("./model");

// Controller functions
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
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


exports.updateUserAttendance = async (req, res) => {
  try {
    const userName = req.params.name;

    // Update the user's attendance boolean to true
    const user = await User.findOneAndUpdate(
      { name: userName },
      { $set: { attendance: true } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};