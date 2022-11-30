const express = require("express");

const app = express();

const mainRouter = require("./router/mainRouter");
const jsRouter = require("./router/jsRouter");

app.set("view engine", "ejs");

console.log("__dirname", __dirname);

app.use(express.static(__dirname + '/public'));

app.use("/todayPlayer", mainRouter);

app.use("/js", jsRouter);

const port = 3000;

app.listen(port, (req, res) => {
  console.log(`Example app listening at http://localhost:${port}`);
});
