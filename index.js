require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const router = require("./router/");
const { v4: uuidv4 } = require("uuid");
require("./passport");
const { default: mongoose } = require("mongoose");

const app = express();

const session = require("express-session");
const errorMiddleware = require("./middleware/error.middleware");
const FileStore = require("session-file-store")(session);

app.use(
  session({
    genid: (req) => {
      // console.log("1. in genid req.sessionID: ", req.sessionID);
      return uuidv4();
    },
    store: new FileStore(),
    secret: "a private key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Middleware для парсинга JSON данных
app.use(express.json());

app.use("/", router);

app.use(errorMiddleware);

const port = process.env.PORT || 8080;
const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(`Listen at port ${port} : ${new Date().toLocaleString()}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

startApp();
