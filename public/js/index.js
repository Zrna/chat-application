var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");

  socket.emit("createMessage", {
    from: "josip@example.com",
    text: "See ya at 6"
  });
});

socket.on("disconnect", function() {
  console.log("Disconnect from server");
});

socket.on("newEmail", function(email) {
  console.log("New email", email);
});

socket.on("newMessage", function(message) {
  console.log("New message", message);
});
