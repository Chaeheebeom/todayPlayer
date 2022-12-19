const express = require("express");
let bodyParser = require('body-parser');

const app = express();

const mainRouter = require("./src/router/mainRouter");
const fileRouter = require("./src/file/router/fileRouter");
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/audios'));

app.use(bodyParser.urlencoded({ extended : false }))

app.use("/", mainRouter);
app.use("/", fileRouter);


const testRouter = require('./src/test/router/testRouter')
app.use("/music",testRouter)

const port = 3000;

app.listen(port, (req, res) => {
  console.log(`Example app listening at http://localhost:${port}`);
});
