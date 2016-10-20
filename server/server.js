const express = require('express');
const app = express();

app.use(express.static('../client'));

const port = process.env.PORT || 8080;

app.listen(port, console.log('Magic happens on port ==> ', port));