const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

const port = 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minites Interval
  max: 6, // limit each IP to 5 request.
  message: "Too many API requests from this IP ,please try again after 15 min",
});

const loginAccountlimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minites Interval
  max: 6, // limit each IP to 5 request.
  message: "Too many login requests. ",
});

// app.use(limiter); -> will work for all routes

app.use("/api", limiter);

app.get("/api/v1", function (req, res) {
  res.json([
    {
      id: 1,
      title: "NodeJS",
      description:
        "Javascript runtime built on Chrome's VS Javascript engine .",
    },
  ]);
});

app.get("/login", loginAccountlimiter, function (req, res) {
  res.send("Imaginary Login form.");
});

app.listen(port, () => console.info(`App listen on port ${port}`));
