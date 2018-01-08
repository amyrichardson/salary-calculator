const express = require('express');
const bodyParser = require('body-parser')
const employeeRouter = require('./routes/employees.router');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use('/employees', employeeRouter);

//set up server
const port = 5000;
app.listen(port, function(){
    console.log('server up on: ', port);
});