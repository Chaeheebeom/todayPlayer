const express = require("express");

const testRouter = express.Router();

let service = require("../service/testService");

testRouter.get("/", function (req, res) {
  service.get().then((ret) => res.json(ret));
});

testRouter.get("/:id", function (req, res) {
  service.get(req.params.id).then((ret) => res.json(ret));
});

module.exports = testRouter;
