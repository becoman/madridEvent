/**
 * Created by Miguel on 17/12/2015.
 */
var express=require("express");
var mongoose=require("mongoose");
var app=express();

mongoose.connect("mongodb://localhost/MadEvents", function (err, res) {
    if(err) console.log("Error Conexion BD "+err);
    else console.log("Mongo Conectado");
});

app.get("/",function (req,res){
    res.send("Hola mundo");
});

app.listen(5000)
console.log("Servidor Corriendo en el puerto 5000");