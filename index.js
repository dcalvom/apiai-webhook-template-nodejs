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
            var lenguaje = 'espaniol';
            console.log(req);
            if (req.body.result && req.body.result.parameters) {
                name = req.body.result.parameters.nombre ? req.body.result.parameters.nombre : "";
                var introduccion = req.body.result.parameters.introduccion ? req.body.result.parameters.introduccion.concat(".\n") : "";
                var gustos = req.body.result.parameters.gustos ? req.body.result.parameters.gustos.concat(".\n") : "";
                var dia = req.body.result.parameters.dia ? req.body.result.parameters.dia.concat(".\n") : "";
                var escenario1 = req.body.result.parameters.escenario1 ? req.body.result.parameters.escenario1.concat(".\n") : "";
                var escenario2 = req.body.result.parameters.escenario2 ? req.body.result.parameters.escenario2.concat(".\n") : "";
                var escenario3 = req.body.result.parameters.escenario3 ? req.body.result.parameters.escenario3.concat(".\n") : "";
                var escenario4 = req.body.result.parameters.escenario4 ? req.body.result.parameters.escenario4.concat(".\n") : "";
                var escenario5 = req.body.result.parameters.escenario5 ? req.body.result.parameters.escenario5.concat(".\n") : "";
                var decision = req.body.result.parameters.decision ? req.body.result.parameters.decision.concat(".\n") : "";
                var cursoGusto = req.body.result.parameters.cursoGusto ? req.body.result.parameters.cursoGusto.concat(".\n") : "";
                var cursoNoGusto = req.body.result.parameters.cursoNoGusto ? req.body.result.parameters.cursoNoGusto.concat(".\n") : "";
                var esperaAprender = req.body.result.parameters.esperaAprender ? req.body.result.parameters.esperaAprender.concat(".\n") : "";
                var trabajoIdeal = req.body.result.parameters.trabajoIdeal ? req.body.result.parameters.trabajoIdeal.concat(".\n") : "";
                var tareasTrabajo = req.body.result.parameters.tareasTrabajo ? req.body.result.parameters.tareasTrabajo.concat(".\n") : "";
                var jefeSalario = req.body.result.parameters.jefeSalario ? req.body.result.parameters.jefeSalario.concat(".\n") : "";
                var primerSalario = req.body.result.parameters.primerSalario ? req.body.result.parameters.primerSalario.concat(".\n") : "";
                userDescription = userDescription.concat(introduccion, gustos, dia, escenario1, escenario2, escenario3, escenario4, escenario5, decision, cursoGusto, cursoNoGusto, esperaAprender, trabajoIdeal, tareasTrabajo, jefeSalario, primerSalario);
                if(req.body.result.parameters.lenguaje){
                    lenguaje = req.body.result.parameters.lenguaje;
                }
                if (userDescription.split(' ').length > 100) {
                    personality.getProfile(userDescription, name, function (err, personality) {
                        if(err){
                            console.log(err);
                            var error = {
                                err: err,
                                speech: lenguaje === 'espaniol' ? 'Ha ocurrido un error procesando tu perfil. Te pido disculpas' : 'An error ocurred during the processing of your profile. I am sorry',
                                displayText: lenguaje === 'espaniol' ? 'Ha ocurrido un error procesando tu perfil. Te pido disculpas' : 'An error ocurred during the processing of your profile. I am sorry',
                                source: 'tutor-carrera-webhook'
                            };
                            return callback(error, null);
                        }
                        var responseText;
                        if(lenguaje === 'espaniol'){
                            responseText = personality.user + ', el análisis de tu perfil está listo. Según lo que pude apreciar de vos, el énfasis que te recomiendo tomar es: ' + personality.similar_personalities[0].emphasis + '. El resumen de tu personalidad es el siguiente: ' + personality.resumen + '. Visita https://goo.gl/WL5fOj para más información.';
                        }
                        else{
                            var emphasis = personality.similar_personalities[0].emphasis;
                            switch (emphasis)
                            {
                                case "Ingeniería de Software":
                                    emphasis = 'Software Engineering';
                                break;
                                case "Ciencias de la Computación":
                                    emphasis = 'Computer Science';
                                break;
                                case "Ingeniería de Tecnologías de la Información":
                                    emphasis = 'Information Technologies Engineering';
                                break;
                                default:
                                    emphasis = '';
                            }
                            responseText = personality.user + ', your profile analysis is ready. According my professional lecture of yourself, the career path that I advice you is: ' + emphasis + '. This is your profile summary: ' + personality.summary + '. Visit dcalvo.com for more information.';
                        }
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
                        speech: lenguaje === 'espaniol' ? 'Lo siento pero no puedo generar un análisis con la cantidad de información que me diste' : 'I am sorry, but I can not generate an analysis with the amount of information you provided',
                        displayText: lenguaje === 'espaniol' ? 'Lo siento pero no puedo generar un análisis con la cantidad de información que me diste' : 'I am sorry, but I can not generate an analysis with the amount of information you provided',
                        source: 'tutor-carrera-webhook'
                    };
                    return callback(error, null);
                }
            }
            else {               
                var error = {
                    speech: lenguaje === 'espaniol' ? 'No te he podido escuchar bien y no te he entendido.' : 'I was not able to hear you and I did not get you.',
                    displayText: lenguaje === 'espaniol' ? 'No te he podido escuchar bien y no te he entendido.' : 'I was not able to hear you and I did not get you.',
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