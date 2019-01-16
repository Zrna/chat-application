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

  socket.on("createMessage", message => {
    console.log("Create message", message);

    // emit event to EVERY single connection
    io.emit("newMessage", {
      from: message.from, // from client side
      text: message.text, // from client side
      createdAt: new Date().getTime()
    });
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
