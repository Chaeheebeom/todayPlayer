const express = require("express");

const jsRouter = express.Router(); // router 인스턴스 생성

let path = __dirname.replace("\\router", "");

jsRouter.get("/axios.js", function (req, res) {
  res.sendFile(path + "/js/axios.js");
});

jsRouter.get("/main.js", function (req, res) {
  res.sendFile(path + "/js/main.js");
});

module.exports = jsRouter;
