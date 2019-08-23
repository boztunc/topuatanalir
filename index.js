var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./routes/api.js');
app.use(router);


app.get('/', function (req, res) {
    console.log("get request");
    res.end();
});


app.listen(port, function () {
    console.log("Server Listening... " + port);
})



