var express = require('express')
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

const mongoose = require ('mongoose');
//mongoose.connect('mongodb://127.0.0.1/rev-socia');
mongoose.connect('mongodb://heroku_x421bc1k:hmdhnl4bdkkcmb2v0c40pdst76@ds125892.mlab.com:25892/heroku_x421bc1k');


app.use(function (req,res,next) {

    var allowedOrigins = ['http://localhost:4200', 'https://rev-socia-angular-client.herokuapp.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    cookie:{
        maxAge: 30 * 60 * 1000
    },
    rolling : true
}
));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



require('./services/user.service.server')(app);
require('./services/work.service.server')(app);
require('./services/reviewer.service.server')(app);
require('./services/review.service.server')(app);



// app.listen(3000);

 app.listen(process.env.PORT || 3000);

//  app.listen(process.env.PORT || 3000) ;