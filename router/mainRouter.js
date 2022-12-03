const express = require("express");

const mainRouter = express.Router(); // router 인스턴스 생성

let path = __dirname.replace("\\router", "");

const PAGETABLE = {
  UPLOAD: path +"/views/main/modal/upload.ejs"
};

const serverDefines = require("../serverDefines");
console.log("serverDefines",serverDefines)

mainRouter.get("/", function (req, res) {
  res.render("main/main",{serverDefines});
});

mainRouter.get("/page/:key", function (req, res) {
  res.sendFile(PAGETABLE[req.params.key]);
});

module.exports = mainRouter;
