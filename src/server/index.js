const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const users = {};
io.on("connection", socket => {
  console.log("a user connected");
  socket.on("new_user", userName => {
    users[socket.id] = userName;
    socket.broadcast.emit("user_connected", userName);
  });
  socket.on("chat-message", message => {
    console.log(users[socket.id]);
    socket.broadcast.emit("chat-message", {
      userName: users[socket.id],
      text: message
    });
  });
});

http.listen(3000, function() {
  console.log("listening on :3000");
});
