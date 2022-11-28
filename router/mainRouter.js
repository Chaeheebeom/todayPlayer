const express = require('express')     
const axios = require('axios')  

const mainRouter = express.Router() // router 인스턴스 생성

const PAGETABLE = {
    TEST: '/nodeTest/views/testpage/test.ejs'
}

mainRouter.get('/',function(req,res){
    console.log("여기야?")
    res.render('main/main');
})

mainRouter.get('/page/:key',function(req,res){
    res.sendFile(PAGETABLE[req.params.key]);
});

module.exports = mainRouter