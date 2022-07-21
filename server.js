const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // socket.on("chat", (payload) => {
  //   console.log("What is payload", payload);
  //   io.emit("chat", payload);
  // });

  io.emit("welcome");

  // emeiting the event to only one user who is listing to that event
  socket.on("user", (payload) => {
    socket.emit("user", payload);
  });

  // emeiting the emt to all the user
  socket.on("userAll", (payload) => {
    io.emit("userAll", payload);
  });

  /// emiting the event to all user except one who is emiting it
  socket.on("toAllexceptOne", (payload) => {
    socket.broadcast.emit("toAllexceptOne", payload);
  });
});

// app.listen(5000, () => console.log("server is active..."));

server.listen(5000, () => {
  console.log("Server is listening at port 5000...");
});
