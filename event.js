/**
 * Created by Miguel on 17/12/2015.
 */
var mongoose=require("mongoose");


var event=new mongoose.Schema({
    title: String,
    content: String,
    place: String,
    type: String,
    date: Date,
    description: String,
    free: Boolean,
    url:String,
    district:String,
    coordX: Number,
    coordY: Number,
    urlPlace: String,
    city:String,
    eventID:String,

})

module.exports=mongoose.model("Event",event);
