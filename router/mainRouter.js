const express = require("express");

const mainRouter = express.Router(); // router 인스턴스 생성

let path = __dirname.replace("\\router", "");

const PAGETABLE = {
  TEST: path + "/views/testpage/test.ejs",
};

mainRouter.get("/", function (req, res) {
  res.render("main/main");
});

mainRouter.get("/page/:key", function (req, res) {
  res.sendFile(PAGETABLE[req.params.key]);
});

module.exports = mainRouter;
