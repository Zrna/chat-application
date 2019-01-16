const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  socket.emit("newEmail", {
    from: "luka@example.com",
    text: "hey",
    createdAt: 123
  });

  socket.emit("newMessage", {
    from: "marko@example.com",
    text: "Meetup in 6h?",
    createdAt: 456
  });

  socket.on("createMessage", message => {
    console.log("Create message", message);
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
