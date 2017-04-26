'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/tutoria', function(req, res) {
    var respuesta = ""
    if(req.body.result && req.body.result.parameters){     
      var nombre = req.body.result.parameters.echoText ? req.body.result.parameters.echoText : ""
      var introduccion = req.body.result.parameters.echoText ? req.body.result.parameters.echoText : ""
      var gustos = req.body.result.parameters.echoText ? req.body.result.parameters.echoText : ""
      var caracter = req.body.result.parameters.echoText ? req.body.result.parameters.echoText : ""
      var otros_gustos = req.body.result.parameters.echoText ? req.body.result.parameters.echoText : ""
      var modelo = req.body.result.parameters.echoText ? req.body.result.parameters.echoText : ""
      var decision_computacion = req.body.result.parameters.echoText ? req.body.result.parameters.echoText : ""
      var curso_favorito = req.body.result.parameters.echoText ? req.body.result.parameters.echoText : ""
      respuesta = respuesta.concat(introduccion,"\n",gustos,"\n",caracter,"\n",otros_gustos,"\n",modelo,"\n",decision_computacion,"\n",curso_favorito)
    }
    else{
      respuesta = "No te he podido escuchar bien. Me podés contar de nuevo."
    }
    return res.json({
        speech: respuesta,
        displayText: respuesta,
        source: 'tutor-carrera-webhook'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});