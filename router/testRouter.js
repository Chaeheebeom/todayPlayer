const express = require('express')     

const testRouter = express.Router() // testRouter 인스턴스 생성

//default index route
testRouter.get('/', function(req,res) {
	//res.send('Hi!! Home!!')
    res.render('testpage/test',{title:'아이아이야'})
})

//main route
testRouter.get('/main', function(req,res) {
	res.send('Hi!! Main!!')
})

//main route
testRouter.get('/main/:id', function(req,res) {
	res.send('Hi!! Main!!'+req.params.id);
})

//end route
testRouter.get('/end', function(req,res) {
	res.send('Hi!! end!!')
})

module.exports = testRouter