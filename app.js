const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const serveIndex = require("serve-index");

const app = express();

app.use(cors());

// Connect to database
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Failed to connect to database", err);
  });

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const routes = require("./routes");
app.use("/api", routes);

app.use(
  "/files",
  express.static("public/files"),
  serveIndex("public/files", { icons: true })
);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
