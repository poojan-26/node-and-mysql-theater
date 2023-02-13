var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const config = require('./api/utils/config')
var app = express();

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

//parse request data content type application/json
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// var url = require('url');
// var adr = 'https://en.wikipedia.org/wiki/Sachin_Tendulkar';
// var q = url.parse(adr, true);

// console.log(q.host); //returns 'localhost:8080'
// console.log(q.pathname); //returns '/default.htm'
// console.log(q.search); //returns '?year=2017&month=february'

// var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
// console.log(qdata.month); //returns 'february'


// const port = process.env.PORT || 5000;
// const host = process.env.HOST || "localhost";

// define root route
// //  app.get('/',(req,res)=>{
//      res.send("hello world..12546t4!");
// });

//import theater_db routes
const theaterRoutes = require('./routes/theater');

//create routes(middleware)
app.use('/theater/v1', theaterRoutes)

// app.use('/api/v1', v1Routes)
app.listen(config.port, () => {
  console.log(`Server Started at http://${config.host}:${config.port}`)
})

module.exports = app;

// app.listen(port, () => {
//   console.log(`Server Started at http://localhost:${port}`);
//     })



