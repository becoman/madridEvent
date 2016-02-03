/**
 * Created by Miguel on 17/12/2015.
 */
var Event= require("./event");
module.exports = function (app){
    // GET
    findAllEvents= function (req,res){
        Event.find(function (err,events){
            if(!err) res.send(events);
            else console.log("Error al consultar a mongo:"+err);
        });
    };

    //GET
    findEventByID=function (req,res){
        Event.findById(req.param.id,function(err,event){
            if(!err) res.send(event);
            else console.log("Error al consultar a mongo:"+err);
        });
    };

    // POST
    addEvent= function (req,res){
        console.log("Añadir Evento");
        console.log(req.body);
        var event=new Event({
            title: req.body.title,
            content: req.body.content,
            place: req.body.place,
            type: req.body.type,
            date: req.body.date,
            description: req.body.description,
            free: req.body.free
        });
        event.save(function (err){
            if(err) console.log("Error añadir evento "+err);
            else
                console.log(" Evento guardado");
        });
        res.send(event);
    };

    //POST
    updateEvent=function (req,res){
        Event.findById(req.param.id,function(err,event){
                event.title= req.body.title;
                event.content= req.body.content;
                event.place= req.body.place;
                event.type= req.body.type;
                event.date= req.body.date;
                event.description= req.body.description;
                event.free= req.body.free;

        });
        event.save(function (err){
            if(err) console.log("Error añadir evento "+err);
            else
                console.log(" Evento guardado");
        });
    };

    // DELETE
    deleteEvent=function (req,res){
        Event.findById(req.param.id,function(err,event){
            event.remove(function (err){
                if(err) console.log("Error añadir evento "+err);
                else
                    console.log(" Evento guardado");
            });
        });
    };

    

};
