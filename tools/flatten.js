'use strict';

var _ = require('lodash');

/**
 * Return the desired Traits normalized
 * @param  {profile}     JSON personality results object
 * @param  int type   type of personality results being normalized
 * @return Array      The normalized traits
 */
var traits = function(profile, type) {
    profile = typeof(profile) === 'string' ? JSON.parse(profile) : profile;

    var _traits;

    switch(type){
        case 'personality':
            _traits = _.flatten(_.map(profile[type],'children'));            
            break;
        case 'needs':
            _traits = profile[type];
            break;
        case 'values':
            _traits = profile[type];
            break;
        default:
            _traits = [];
    }

    return _traits.map(function(trait) {
        return {
            name: trait.name,
            value: trait.percentile
        };
    });
};

module.exports.traits = traits;