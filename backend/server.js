// server.js
const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// FULL CORS FIX
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

const emissionsRoute = require("./routes/emissions");
app.use("/api/emissions", emissionsRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Carbon Footprints API" });
});

function tryListen(currentPort) {
  app.listen(currentPort, () => {
    console.log(`Server is running on port ${currentPort}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${currentPort} is in use, trying ${currentPort + 1}...`);
      tryListen(currentPort + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

tryListen(PORT);
