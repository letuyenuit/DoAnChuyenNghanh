let express = require("express");
let http = require("http");
let app = express();
let cors = require("cors");
let dotenv = require("dotenv");
let server = http.createServer(app);
let socketio = require("socket.io");
const { Server } = require("socket.io");
dotenv.config();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  path: "/socket/",
});
const PORT = process.env.PORT || 8000;

let users = {};

let socketToRoom = {};

const maximum = process.env.MAXIMUM || 4;

app.get("/test", (req, res) => {
  console.log(process.env.FRONTEND_URL);
  res.send("hello");
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    if (users[data.room]) {
      const length = users[data.room].length;
      if (length === maximum) {
        socket.to(socket.id).emit("room_full");
        return;
      }
      users[data.room] = users[data.room].filter(
        (user) => user.id !== socket.id
      );
      users[data.room].push({ id: socket.id, email: data.email });
    } else {
      users[data.room] = [{ id: socket.id, email: data.email }];
    }
    socketToRoom[socket.id] = data.room;

    socket.join(data.room);

    const usersInThisRoom = users[data.room].filter(
      (user) => user.id !== socket.id
    );

    io.sockets.to(socket.id).emit("all_users", usersInThisRoom);
  });

  socket.on("offer", (data) => {
    socket.to(data.offerReceiveID).emit("getOffer", {
      sdp: data.sdp,
      offerSendID: data.offerSendID,
      offerSendEmail: data.offerSendEmail,
    });
  });

  socket.on("answer", (data) => {
    socket
      .to(data.answerReceiveID)
      .emit("getAnswer", { sdp: data.sdp, answerSendID: data.answerSendID });
  });

  socket.on("candidate", (data) => {
    socket.to(data.candidateReceiveID).emit("getCandidate", {
      candidate: data.candidate,
      candidateSendID: data.candidateSendID,
    });
  });
  socket.on("join_room_chat", (data) => {
    socket.join(data.room);
    io.to(data.room).emit("user_join", {
      id: socket.id,
      message: `${socket.id} has joined the chat`,
    });
  });
  socket.on("new_chat", (data) => {
    socket.broadcast.emit("receive_new_chat", data);
  });
  socket.on("sendMessage", (data) => {
    socket.to(socket.id).emit("new_message");
    io.to(data.room).emit("receiveMessage", {
      id: socket.id,
      message: data.message,
    });
  });
  socket.on("leave_room_chat", (data) => {
    socket.leave(data.room);
  });
  socket.on("typing", (data) => socket.broadcast.in(data.room).emit("typing"));
  socket.on("stop typing", (data) =>
    socket.broadcast.in(data.room).emit("stop typing")
  );
  socket.on("reaction", (data) => {
    io.to(data.room).emit("getReaction", data);
  });
  socket.on("make_call", (data) => {
    socket.broadcast.emit("receive_call", data);
  });

  socket.on("share_screen", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_screen", data);
  });
  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((user) => user.id !== socket.id);
      users[roomID] = room;
      if (room.length === 0) {
        delete users[roomID];
        return;
      }
    }
    socket.to(roomID).emit("user_exit", { id: socket.id });
  });
});
server.listen(PORT, () => {});
