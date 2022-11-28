const express = require('express')
const common = require('./js/common.js')

const app = express()


const mainRouter = require('./router/mainRouter')

app.set('view engine','ejs');

app.use('/js/common',function(req,res){
  res.sendFile('/nodeTest/js/common.js')
});

app.use('/todayPlayer',mainRouter);


app.use(function(req,res,next){
    res.status(404).send('404 Error shit');
    next();
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
  });


const port = 3000

app.listen(port, (req,res) => {
  console.log(`Example app listening at http://localhost:${port}`)
})