const express = require("express");
const multer = require("multer");
const path = require("path");
const fileService = require("../service/fileService");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "audios/");
  },
  filename: function (req, file, callback) {
    let basename = path.basename(
      Buffer.from(file.originalname, "latin1").toString("utf8")
    );
    let date = Date.now();
    callback(null, date + "_" + basename);
  },
});

const upload = multer({ storage: storage });

const fileRouter = express.Router(); // router 인스턴스 생성

fileRouter.post("/file", upload.single("file"), function (req, res) {
  let data = JSON.parse(req.body.data); //title,content
  data.path = req.file.path;
  data.filename = req.file.filename;
  data.originalfilename = Buffer.from(req.file.originalname, "latin1").toString(
    "utf8"
  );
  data.mimetype = req.file.mimetype;
  fileService.post(data).then((ret) => res.send(ret));
});

module.exports = fileRouter;
