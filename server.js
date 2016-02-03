/**
 * Created by Miguel on 17/12/2015.
 */
var express=require("express");
var mongoose=require("mongoose");
var app=express();
var database = require('./config/database');
mongoose.connect(database.url, function (err, res) {
    if(err) console.log("Error Conexion BD "+err);
    else console.log("Mongo Conectado");
});

require('./app/routes')(app);

app.listen(5000);
console.log("Servidor Corriendo en el puerto 5000");
