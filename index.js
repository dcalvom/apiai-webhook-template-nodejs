'use strict';

var personality = require('./personality.js'),
    express = require('express'),
    bodyParser = require('body-parser'),
    async = require('async');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/tutoria', function(req, res) {
    async.series([ 
        function(callback) {
            var userDescription = "";
            var name;
            var error;
            if (req.body.result && req.body.result.parameters) {
                name = req.body.result.parameters.nombre ? req.body.result.parameters.nombre.concat(".\n") : "";
                var introduccion = req.body.result.parameters.introduccion ? req.body.result.parameters.introduccion.concat(".\n") : "";
                var gustos = req.body.result.parameters.gustos ? req.body.result.parameters.gustos.concat(".\n") : "";
                var caracter = req.body.result.parameters.caracter ? req.body.result.parameters.caracter.concat(".\n") : "";
                var otros_gustos = req.body.result.parameters.otros_gustos ? req.body.result.parameters.otros_gustos.concat(".\n") : "";
                var modelo = req.body.result.parameters.modelo ? req.body.result.parameters.modelo.concat(".\n") : "";
                var decision_computacion = req.body.result.parameters.decision_computacion ? req.body.result.parameters.decision_computacion.concat(".\n") : "";
                var curso_favorito = req.body.result.parameters.curso_favorito ? req.body.result.parameters.curso_favorito.concat(".\n") : "";
                userDescription = userDescription.concat(introduccion, gustos, caracter, otros_gustos, modelo, decision_computacion, curso_favorito);
                if(userDescription.length > 100){
                    personality.getProfile(userDescription, name, function(err, personality){
                        if(err){
                            var error = {
                                err: err,
                                speech: 'Ha ocurrido un error procesando tu perfil. Te pido disculpas',
                                displayText: 'Ha ocurrido un error procesando tu perfil. Te pido disculpas',
                                source: 'tutor-carrera-webhook'
                            };
                            return callback(error, null);
                        }
                        var response = {
                            speech: 'Tu perfil está listo',
                            displayText: 'Tu perfil está listo',
                            personality: personality,
                            source: 'tutor-carrera-webhook'
                        };
                        return callback(null, response);
                    });
                }
                else{
                    error = "Lo siento pero no puedo generar un análisis con la cantidad de información que me diste";
                }
            }
            else {
                error = "No te he podido escuchar bien y no te he entendido.";
            }
            var error = {
                err: err,
                speech: 'Ha ocurrido un error procesando tu perfil. Te pido disculpas',
                displayText: 'Ha ocurrido un error procesando tu perfil. Te pido disculpas',
                source: 'tutor-carrera-webhook'
            };
            return callback(error, null);
        }
    ],
    function(err, results) {
        res.json(results[0]);
    });
});

restService.post('/tutoria', function(req, res) {
    var userDescription = "";
    var name;
    var error;
    if (req.body.result && req.body.result.parameters) {
        name = req.body.result.parameters.nombre ? req.body.result.parameters.nombre.concat(".\n") : "";
        var introduccion = req.body.result.parameters.introduccion ? req.body.result.parameters.introduccion.concat(".\n") : "";
        var gustos = req.body.result.parameters.gustos ? req.body.result.parameters.gustos.concat(".\n") : "";
        var caracter = req.body.result.parameters.caracter ? req.body.result.parameters.caracter.concat(".\n") : "";
        var otros_gustos = req.body.result.parameters.otros_gustos ? req.body.result.parameters.otros_gustos.concat(".\n") : "";
        var modelo = req.body.result.parameters.modelo ? req.body.result.parameters.modelo.concat(".\n") : "";
        var decision_computacion = req.body.result.parameters.decision_computacion ? req.body.result.parameters.decision_computacion.concat(".\n") : "";
        var curso_favorito = req.body.result.parameters.curso_favorito ? req.body.result.parameters.curso_favorito.concat(".\n") : "";
        userDescription = userDescription.concat(introduccion, gustos, caracter, otros_gustos, modelo, decision_computacion, curso_favorito);
        if(userDescription.length > 100){
            personality.getProfile(userDescription, name, function(err, personality){
                if(err){
                    return res.json({
                        err: err,
                        speech: 'Ha ocurrido un error procesando tu perfil. Te pido disculpas',
                        displayText: 'Ha ocurrido un error procesando tu perfil. Te pido disculpas',
                        source: 'tutor-carrera-webhook'
                    });
                }
                return res.json({
                    speech: 'Tu perfil está listo',
                    displayText: 'Tu perfil está listo',
                    personality: personality,
                    source: 'tutor-carrera-webhook'
                });
            });
        }
        else{
            error = "Lo siento pero no puedo generar un análisis con la cantidad de información que me diste";
        }
    }
    else {
        error = "No te he podido escuchar bien y no te he entendido.";
    }
    
    return res.json({
        speech: error,
        displayText: error,
        source: 'tutor-carrera-webhook'
    });

});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});