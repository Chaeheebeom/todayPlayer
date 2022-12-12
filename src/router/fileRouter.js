const express = require("express");
const multer = require("multer");
const response = require("../config/response");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "audios/");
  },
  filename: function (req, file, callback) {
    let basename = path.basename(file.originalname);
    let date = Date.now();
    callback(null, date + "_" + basename);
  },
});

const upload = multer({ storage: storage });

const fileRouter = express.Router(); // router 인스턴스 생성

fileRouter.post("/file", upload.single("file"), function (req, res) {
  res.send(response.SUCCESS);
});

module.exports = fileRouter;
