const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Aylien = require("aylien_textapi");

const PORT = 8000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("dist"));

const textApi = new Aylien({
  application_id: "7b077f8c",
  application_key: "d595f5fbce12d44b5a727e21394625a7"
});

app.get("/", (req, res) => res.sendFile("index.html"));

app.post("/api", (req, res) => {
  const { text } = req.body;
  console.log("Request to '/api' endpoint", text);
  textApi.sentiment({ text }, (error, result, remaining) => {
    console.log("Aylien Callback", result, remaining);
    res.send(result);
  });
});

app.post("/article", (req, res) => {
  const { text } = req.body;
  console.log("Request to '/article' endpoint", text);
  textApi.sentiment({ url: text }, (error, result, remaining) => {
    console.log("Aylien Callback", result, remaining);
    res.send(result);
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
