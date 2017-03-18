var fs = require('fs');
var yaml = require('yaml');

var CONFIG = process.env.config || 'config.yml';

var conf = {
    system: {
        port: 8080,
        log: 'INFO'
    }
};

// from http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
var deepExtend = function(destination, source) {
    for (var property in source) {
        if (source[property] && source[property].constructor &&
            source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

var fileContents = fs.readFileSync('config.yml').toString();

module.exports = deepExtend(conf, yaml.eval(fileContents));
