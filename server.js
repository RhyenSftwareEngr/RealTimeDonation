// Import required modules
const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketio(server); // Attach Socket.IO to the server

// Global variable to keep track of total cash
let cash = 100;

// Set EJS as the view engine and configure views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Serve the main page
app.get("/", (req, res) => {
  res.render("index", { cash });
});

// Handle socket connections
io.on("connection", (socket) => {
  // Send the current cash value and a welcome message to the newly connected client
  socket.emit("updateCash", {
    cash,
    message: "Welcome to the Donation Drive!",
  });

  // Listen for 'donate' events from clients
  socket.on("donate", () => {
    cash += 10; // Increase cash by $10
    // Notify all clients of the updated cash and message
    io.emit("updateCash", { cash, message: "Someone donated $10!" });
  });

  // Listen for 'redeem' events from clients
  socket.on("redeem", () => {
    if (cash >= 10) {
      cash -= 10; // Decrease cash by $10
      io.emit("updateCash", { cash, message: "Someone redeemed $10!" });
    } else {
      // If not enough cash, notify only the requesting client
      socket.emit("updateCash", {
        cash,
        message: "Not enough cash to redeem!",
      });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 8888;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
