const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");

app.use(express.static(__dirname + '/client'));
app.use(bodyParser());

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/client'));
});

const port = process.env.PORT || 8080;

app.listen(port, console.log(`Magic happens on port ${port}`));