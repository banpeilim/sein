const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Routes
router.get("/users", controller.getAllUsers);
router.post("/users", controller.createUser);

module.exports = router;
