const express = require("express");

const mainRouter = express.Router(); // router 인스턴스 생성

let path = __dirname.replace("\\src\\router", "");

const PAGETABLE = {
  UPLOAD: path + "/views/main/modal/upload.ejs",
};

const serverDefines = require("../config/serverDefines");
console.log("serverDefines", serverDefines);

const connect = require("../config/connect");
console.log("객체생성 : ", connect);

mainRouter.get("/", function (req, res) {
  res.render("main/main", { serverDefines });
});

mainRouter.get("/page/:key", function (req, res) {
  console.log("page path :", PAGETABLE[req.params.key]);
  res.sendFile(PAGETABLE[req.params.key]);
});

module.exports = mainRouter;
