const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const users = {};

io.on("connection", (socket) => {
  socket.on("set username", (username) => {
    users[socket.id] = username;
    socket.emit("username set", username);
  });

  socket.on("chat message", (msg) => {
    const username = users[socket.id];
    io.emit("chat message", { username, message: msg });
  });
});

server.listen(3000, function () {
  console.log("server rodando na porta 3000");
});
