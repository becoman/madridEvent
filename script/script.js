// require
//var  xml2js = require('xml2js');
var http = require('http');
var DOMParser = require('xmldom').DOMParser;
var mongoose=require("mongoose");
var Event= require("./../event");
var db=mongoose.connect("mongodb://localhost/MadEvents", function (err, res) {
    if(err) throw( "Error Conexion BD "+err);
    else console.log("Mongo Conectado");
});

//Declaration
var options = {
  host: 'datos.madrid.es',
  port: '80',
  path: '/portal/site/egob/menuitem.ac61933d6ee3c31cae77ae7784f1a5a0/?vgnextoid=00149033f2201410VgnVCM100000171f5a0aRCRD&format=xml&file=0&filename=206974-0-agenda-eventos-culturales-100&mgmtid=6c0b6d01df986410VgnVCM2000000c205a0aRCRD',
  method: 'GET'
};

//utility

var procesarContenido=function (element, index, array) {
  var event=new Event();
  //console.log(element.getElementsByTagName("atributo").length);
  for(i=0;i<element.getElementsByTagName("atributo").length;i++) {
    var attrName=element.getElementsByTagName("atributo")[i].attributes[0].nodeValue;
    var attrValue=element.getElementsByTagName("atributo")[i].childNodes[0].nodeValue;
  //  console.log(attrName+"\n");
    switch(attrName){
      case "ID-EVENTO":
        event.eventID=attrValue;
        break;
      case "TITULO":
        event.title=attrValue;
        break;
      case "GRATUITO":
        event.free=attrValue;
        break;
      case "DESCRIPCION":
        event.content=attrValue;
        break;
      case "LOCALIZACION":
        event=procesarLocalizacion (element.getElementsByTagName("atributo")[i],event);
        break;
      case "TIPO":
        event.type=attrValue.split("/").last;
        break;
      case "URL":
          event.url=attrValue;
       break;
    }
  }
  event.type=element.getElementsByTagName("tipo")[0].childNodes[0].nodeValue;
  //throw("FIN");
  //if(!updateOrInsert(event)) {
    event.save(function (err){
        if(err) console.log("Error añadir evento "+err);
        else
            console.log(" Evento guardado "+event.title+" \n");
    });
  //}
};

var updateOrInsert=function (evento) {
  var event=false;
  Event.find({eventID:evento.eventID},function(err, users) {
      if(!err)
        event=true;
  });
  return event;
};

var procesarLocalizacion= function (nodo, evento) {
  console.log(nodo.getElementsByTagName("atributo").length);
  for(a=0;a<nodo.getElementsByTagName("atributo").length;a++) {
      var attrName=nodo.getElementsByTagName("atributo")[a].attributes[0].nodeValue;
      var attrValue=nodo.getElementsByTagName("atributo")[a].childNodes[0].nodeValue;
    //  console.log(attrName+"\n");
      switch (attrName) {
        case "DISTRITO":
            evento.district=attrValue;
            break;
        case "NOMBRE-INSTALACION":
          evento.place=attrValue;
          break;
        case "LOCALIDAD":
          evento.city=attrValue;
          break;
        case "LATITUD":
          evento.coordX=attrValue;
          break;
        case "LONGITUD":
            evento.coordY=attrValue;
            break;
        case "CONTENT-URL-INSTALACION":
            evento.urlPlace=attrValue;
            break;
      }
  }

  return evento;

};


var parse= function (text){

  var doc = new DOMParser().parseFromString(text ,'text/xml');
  console.log(doc.getElementsByTagName("contenido").length);
  var contenidos=doc.getElementsByTagName("contenido");
  //.forEach(procesarContenido);
  Array.prototype.forEach.call(contenidos,procesarContenido);


};

//Action
var req = http.request(options, function (res){
  console.log(`STATUS PETICION: ${res.statusCode}`);
  //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  var xml;
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    xml=xml+chunk;
  });
  res.on('end', () => {
    parse(xml);
  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});


// write data to request body
req.write("postData");
req.end();
