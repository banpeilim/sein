const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const serveIndex = require("serve-index");
const multer = require("multer");

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

app.use("/pages/index", express.static("pages/index.html"));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/public/files");
  },
  // Sets file(s) to be saved in uploads folder in same directory
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
  // Sets saved filename(s) to be original filename(s)
});

// Set saved storage options:
const upload = multer({ storage: storage });

app.post("/upload_api", upload.array("files"), (req, res) => {
  // Sets multer to intercept files named "files" on uploaded form data

  console.log(req.body); // Logs form body values
  console.log(req.files); // Logs any files
  res.json({ message: "File(s) uploaded successfully" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
