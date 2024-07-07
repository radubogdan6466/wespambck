const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router"); // Verifică că acesta este importul corect pentru rută

const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Asigură-te că rutele sunt montate corect
app.use("/", router);

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(process.env.DB_URI, dbOptions)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error("DB Connection Error:", err));

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  socket.on("sendMessage", (message) => {
    io.emit(message.room);
    io.emit("newMessage", message); // Emiterea mesajului către toți clienții din același room
    console.log("Message broadcasted to room:", message); // Adăugăm un console.log pentru a verifica emiterea mesajului
  });
});
