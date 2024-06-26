const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const courseRouter = require("./routes/course");
const loginRouter = require("./routes/login");
const aboutRouter = require("./routes/about-me");
const { erorHandller } = require("./middleware/errorHandller");
const { setHeaders } = require("./middleware/setHeader");

require("./configs/db");

const app = express();

// Base Url site
const baseUrl = process.env.BASE_URL;
app.locals.baseUrl = baseUrl;

// Cors Policy
app.use(setHeaders);

app.use("/css", express.static(path.join(__dirname, "public/style")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")));

// Sessions and Flash
app.use(
  session({
    secret: "My secret key",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/courses", courseRouter);
app.use("/", loginRouter);
app.use("/about-me", aboutRouter);

// 404 Not Found
app.use((req, res) => {
  return res.render("404");
});

// * Error handller
app.use(erorHandller);

app.listen(process.env.Port, () => {
  console.log(`Server Running on Port ${process.env.Port}`);
});
