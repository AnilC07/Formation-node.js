"use strict";

var dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
}); // Affiche notre environnement actuelle
// console.log(app.get('env'));
// console.log(process.env.PORT);

var app = require('./app'); // START SERVER


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Running on port ".concat(port));
});