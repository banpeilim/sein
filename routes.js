const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Routes
router.get("/users", controller.getAllUsers);
router.post("/users", controller.createUser);
router.put("/users/:name/attendance", controller.updateUserAttendance);
router.get("/products", controller.getAllProducts);
router.post("/attendee", controller.createAttendee);
router.get("/attendee", controller.getAllAttendee);
router.post("/company", controller.createCompany);
router.get("/company", controller.getAllCompany);
router.post("/companylist", controller.createCompanyList);
router.get("/companylist", controller.getAllCompanyList);

module.exports = router;
