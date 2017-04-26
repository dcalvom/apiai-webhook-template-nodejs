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
      var nombre = req.body.result.parameters.nombre ? req.body.result.parameters.nombre.concat(".\n") : ""
      var introduccion = req.body.result.parameters.introduccion ? req.body.result.parameters.introduccion.concat(".\n") : ""
      var gustos = req.body.result.parameters.gustos ? req.body.result.parameters.gustos.concat(".\n") : ""
      var caracter = req.body.result.parameters.caracter ? req.body.result.parameters.caracter.concat(".\n") : ""
      var otros_gustos = req.body.result.parameters.otros_gustos ? req.body.result.parameters.otros_gustos.concat(".\n") : ""
      var modelo = req.body.result.parameters.modelo ? req.body.result.parameters.modelo.concat(".\n") : ""
      var decision_computacion = req.body.result.parameters.decision_computacion ? req.body.result.parameters.decision_computacion.concat(".\n") : ""
      var curso_favorito = req.body.result.parameters.curso_favorito ? req.body.result.parameters.curso_favorito.concat(".\n") : ""
      respuesta = respuesta.concat(introduccion,gustos,caracter,otros_gustos,modelo,decision_computacion,curso_favorito)
    }
    else{
      respuesta = "No te he podido escuchar bien y no te he entendido."
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