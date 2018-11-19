var shell = require('shelljs');
var morgan = require('morgan');
var express = require('express');
//var logger = require('./log').logger;
//var bodyParser = require('body-parser');

var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(3000);

app.use(morgan('combined'))
    .set('view engine', 'html')
    .use(express.static(__dirname + '/public'))
    .set('views', __dirname + '/public/views')
    .use('/chart.js', express.static(__dirname + '/node_modules/chart.js/dist/'))
    .get('/', function (req, res) {
        res.render(__dirname + 'index')
    })
    .use(function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page not found');
    });

function update_data() {
    const {code} = shell.exec('c/cpu_temp');
    io.emit('cpu_load', shell.exec('top -R -F -n0 -s3 -l 1 | grep "CPU usage"', {silent: true}));
    io.emit('cpu_temp', code);
}

setInterval(update_data, 1000);