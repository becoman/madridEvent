/**
 * Created by Miguel on 17/12/2015.
 */
module.exports = function (app){

    var Event= require("./event");


    // GET
    findAllEvents= function (req,res){
        Event.find(function (err,events){
            if(!err) res.send(events);
            else console.log("Error al consultar a mongo:"+err);
        });
    };

    //GET
    findEventByID=function (req,res){

    }

}
