const express = require("express");

const musicRouter = express.Router();

let service = require("../service/musicService");

const musicVO = require("../VO/musicVO");

musicRouter.get("/", function (req, res) {
  musicVO.init();
  musicVO.setName(req.query.name);
  musicVO.setGene(req.query.gene);

  service.get(musicVO).then((ret) => res.json(ret));
});

musicRouter.get("/:id", function (req, res) {
  musicVO.init();
  musicVO.setId(req.params.id);

  service.get(musicVO).then((ret) => res.json(ret));
});

module.exports = musicRouter;
