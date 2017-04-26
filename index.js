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
                name = req.body.result.parameters.nombre ? req.body.result.parameters.nombre : "";
                var introduccion = req.body.result.parameters.introduccion ? req.body.result.parameters.introduccion.concat(".\n") : "";
                var gustos = req.body.result.parameters.gustos ? req.body.result.parameters.gustos.concat(".\n") : "";
                var caracter = req.body.result.parameters.caracter ? req.body.result.parameters.caracter.concat(".\n") : "";
                var otrosGustos = req.body.result.parameters.otrosGustos ? req.body.result.parameters.otrosGustos.concat(".\n") : "";
                var modelo = req.body.result.parameters.modelo ? req.body.result.parameters.modelo.concat(".\n") : "";
                var decisionComputacion = req.body.result.parameters.decisionComputacion ? req.body.result.parameters.decisionComputacion.concat(".\n") : "";
                var cursoFavorito = req.body.result.parameters.cursoFavorito ? req.body.result.parameters.cursoFavorito.concat(".\n") : "";
                userDescription = userDescription.concat(introduccion, gustos, caracter, otrosGustos, modelo, decisionComputacion, cursoFavorito);
                if (userDescription.split(' ').length > 100) {
                    personality.getProfile(userDescription, name, function (err, personality) {
                        if(err){
                            console.log(err);
                            var error = {
                                err: err,
                                speech: 'Ha ocurrido un error procesando tu perfil. Te pido disculpas',
                                displayText: 'Ha ocurrido un error procesando tu perfil. Te pido disculpas',
                                source: 'tutor-carrera-webhook'
                            };
                            return callback(error, null);
                        }
                        var responseText = personality.user + ', el análisis de tu perfil está listo. Según lo que pude apreciar de vos, el énfasis que te recomiendo tomar es: ' + personality.similar_personalities[0].emphasis;
                        var response = {
                            speech: responseText,
                            displayText: responseText,
                            source: 'tutor-carrera-webhook'
                        };
                        return callback(null, response);
                    });
                }
                else{                  
                    var error = {
                        speech: 'Lo siento pero no puedo generar un análisis con la cantidad de información que me diste',
                        displayText: 'Lo siento pero no puedo generar un análisis con la cantidad de información que me diste',
                        source: 'tutor-carrera-webhook'
                    };
                    return callback(error, null);
                }
            }
            else {               
                var error = {
                    speech: 'No te he podido escuchar bien y no te he entendido.',
                    displayText: 'No te he podido escuchar bien y no te he entendido.',
                    source: 'tutor-carrera-webhook'
                };
                return callback(error, null);
            }
        }
    ],
    function(err, results) {
        if(err){
            res.json(err);
        }
        else{
            res.json(results[0]);
        }
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});