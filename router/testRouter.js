const express = require("express");

const testRouter = express.Router()

const connect = require('../connect');
console.log('객체생성 : ',connect)


async function getMusic(){
    let readQuery = `MATCH (n:Music) RETURN n`;
    let readResult = await connect.getInstacne().session.executeRead(tx =>
        tx.run(readQuery)
    );
    console.log('결과',readResult);
    console.log('결과',readResult.records);

    let ret = []
    readResult.records.forEach(record=>{
        let r = record.get('n')
        console.log('뭔데',r)
        let vo ={
            label:r.labels[0],
            id:r.identity.low,
        }
        for(var prop in r.properties){
            vo[prop] = r.properties[prop];
        }
        ret.push(vo);
    })
    console.log('파싱',ret);
    console.log('파싱2',JSON.stringify(ret));
    return ret
} 

testRouter.get("/", function (req, res) {
  
    let data;
    getMusic().then((ret)=>{
        data=ret;
        res.json(data);
    })

    
});

module.exports = testRouter;