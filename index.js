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
      var nombre = req.body.result.parameters.nombre ? req.body.result.parameters.nombre : ""
      var introduccion = req.body.result.parameters.introduccion ? req.body.result.parameters.introduccion : ""
      var gustos = req.body.result.parameters.gustos ? req.body.result.parameters.gustos : ""
      var caracter = req.body.result.parameters.caracter ? req.body.result.parameters.caracter : ""
      var otros_gustos = req.body.result.parameters.otros_gustos ? req.body.result.parameters.otros_gustos : ""
      var modelo = req.body.result.parameters.modelo ? req.body.result.parameters.modelo : ""
      var decision_computacion = req.body.result.parameters.decision_computacion ? req.body.result.parameters.decision_computacion : ""
      var curso_favorito = req.body.result.parameters.curso_favorito ? req.body.result.parameters.curso_favorito : ""
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