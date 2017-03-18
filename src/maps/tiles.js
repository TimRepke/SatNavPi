'use strict';

var fs = require('fs'),
    path = require('path'),
    request = require('request');

var express = require('express');

var mbtiles = require('mbtiles');

var startServer = function(configPath, config) {
    return require('./server')({
        configPath: configPath,
        config: config,
        bind: opts.bind,
        port: opts.port
    });
};

var app = express();


app.get('/', function(req, res) {
    res.send('asdsad');
});

module.exports = app;