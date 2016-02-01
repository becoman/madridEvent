// require
//var  xml2js = require('xml2js');
var http = require('http');
var DOMParser = require('xmldom').DOMParser;


//Declaration
var options = {
  host: 'datos.madrid.es',
  port: '80',
  path: '/portal/site/egob/menuitem.ac61933d6ee3c31cae77ae7784f1a5a0/?vgnextoid=00149033f2201410VgnVCM100000171f5a0aRCRD&format=xml&file=0&filename=206974-0-agenda-eventos-culturales-100&mgmtid=6c0b6d01df986410VgnVCM2000000c205a0aRCRD',
  method: 'GET'
};

//utility

var procesarContenido=function (element, index, array) {
  console.dir(element);
  console.log("\n RRRRRRRRRR \n");

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
