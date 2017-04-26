'use strict';

var _ = require('lodash');

/**
 * Return the euclidean distance between two profiles
 * @param  json origin The personality insights profile
 * @param  json target The personality insights profile
 * @param  int  type   Type of trait being compared
 * @return Array      The 5 main traits
 */
var similarity = function( /*object*/ origin, /*object*/ target, type) {
  origin = typeof(origin) === 'string' ? JSON.parse(origin) : origin;
  target = typeof(target) === 'string' ? JSON.parse(target) : target;
  var distance = 0.0;
  var origin_traits, target_traits;

  switch(type){
    case 'personality':
      origin_traits = _.flatten(_.map(origin[type],'children'));
      target_traits = _.flatten(_.map(target[type],'children'));
      break;
    case 'needs':
      origin_traits = origin[type];
      target_traits = target[type];
      break;
    case 'values':
      origin_traits = origin[type];
      target_traits = target[type];
      break;
    default:
      origin_traits = [];
      break;
  }

  // for each trait in origin personality...
  origin_traits.forEach(function(trait, i) {
    distance += Math.pow(trait.percentile - target_traits[i].percentile, 2);
  });
  var ret = 1 - (Math.sqrt(distance / origin_traits.length));
  return ret;
};

module.exports = similarity;