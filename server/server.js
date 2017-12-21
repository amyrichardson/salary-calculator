const express = require('express');
const app = express();


app.use(express.static('server/public'));






//set up server
const port = 5000;
app.listen(port, function(){
    console.log('server up on: ', port);
});