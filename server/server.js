const express = require('express');
const app = express();
const bodyParser = require('body-parser')

let employeeArray = [ ];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/employees', function(req, res){
    console.log('post /employees hit!!!', req.body.newEmployee);
    employeeArray.push(req.body.newEmployee);
    res.sendStatus(201);
});

app.get('/employees', function(req, res){
    console.log('get /employees hit!!');
    res.send(employeeArray);
});

//set up server
const port = 5000;
app.listen(port, function(){
    console.log('server up on: ', port);
});