var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconnect from server");
});

socket.on("newMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("H:mm");
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
});

socket.on("newLocationMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("H:mm");
  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
});

$("#message-form").on("submit", function(e) {
  e.preventDefault();
  var messageTextBox = $("[name=message]");

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: messageTextBox.val()
    },
    function() {
      messageTextBox.val("");
    }
  );
});

var loactionButton = $("#send-location");

loactionButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by yout browser.");
  }

  loactionButton.attr("disabled", "disabled").text("Sending location...");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      loactionButton.removeAttr("disabled").text("Send location");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      loactionButton.removeAttr("disabled").text("Send location");
      alert("Unable to fetch location.");
    }
  );
});
