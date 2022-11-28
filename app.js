const express = require('express')
const app = express()
const port = 3000

const testRouter = require('./router/testRouter')
const mainRouter = require('./router/mainRouter')

app.set('view engine','ejs');

app.use('/test',testRouter);
app.use('/todayPlayer',mainRouter);


app.use(function(req,res,next){
    res.status(404).send('404 Error shit');
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})