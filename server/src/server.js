const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const cors = require("cors");

const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

dotenv.config();

app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 10000000000,
    },
  })
);

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const chatRouter = require("./routes/chat.routes");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chats", chatRouter);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat-message", (message) => {
    io.emit("newMessage", message);
  });
});

server.listen(8080, () => {
  console.log(`http://localhost:8080`);
});
