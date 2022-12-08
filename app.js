const express = require("express");

const app = express();

const mainRouter = require("./router/mainRouter");
const fileRouter = require("./router/fileRouter");
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/videos'));

app.use("/", mainRouter);
app.use("/", fileRouter);

const port = 3000;

app.listen(port, (req, res) => {
  console.log(`Example app listening at http://localhost:${port}`);
});
