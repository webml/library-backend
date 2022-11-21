const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const bodyParser = require("body-parser");
const logOriginalURL = require("./middleware/logOriginalURL");

dotenv.config();

const { PORT, API_URL, DB_CONNECT } = process.env;

mongoose.connect(DB_CONNECT, (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB");
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logOriginalURL);

app.use(userRouter);
app.use(bookRouter);
app.all("*", (request, response, next) => {
  response.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`Server is started on ${API_URL}:${PORT}`);
});
