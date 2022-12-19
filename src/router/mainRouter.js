const express = require("express");

const mainRouter = express.Router(); // router 인스턴스 생성

let path = __dirname.replace("\\src\\router", "");

const PAGETABLE = {
  UPLOAD: path + "/views/main/modal/upload.ejs",
  CONTENT: path + "/views/main/content.ejs",
  PLAYLIST: path + "/views/main/playList.ejs",
};

const serverDefines = require("../config/serverDefines");
console.log("serverDefines", serverDefines);

mainRouter.get("/", function (req, res) {
  res.render("main/main", { serverDefines });
});

mainRouter.get("/page/:key", function (req, res) {
  console.log("page path :", PAGETABLE[req.params.key]);
  res.sendFile(PAGETABLE[req.params.key]);
});

mainRouter.get("/genes",function(req,res){
  let geneArr = [
    "가요",
    "락",
    "재즈",
    "클래식",
    "댄스",
    "시티팝",
    "메탈",
    "힙합",
    "알앤비",
    "국악",
    "소울",
    "팝송",
    "뉴에이지",
    "트로트",
    "로파이",
    "제이팝",
    "오에스티",
    "만화주제가",
    "커버",
    "자작곡"
  ];
  res.send(geneArr);
})

module.exports = mainRouter;
