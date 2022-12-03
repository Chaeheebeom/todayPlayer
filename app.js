const express = require("express");

const app = express();

const mainRouter = require("./router/mainRouter");
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

app.use("/todayPlayer", mainRouter);



const port = 3000;

app.listen(port, (req, res) => {
  console.log(`Example app listening at http://localhost:${port}`);
});
