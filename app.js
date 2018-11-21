var shell = require('shelljs');
var morgan = require('morgan');
var express = require('express');

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
    const {code} = shell.exec('utilities/cpu_temp');
    io.emit('cpu_temp', code);
}

var bandwidth = shell.exec('python3 -u utilities/bandwidth.py', {async: true, silent: true});
bandwidth.stdout.on('data', function (data) {
    io.emit('bandwidth', data);
});

var cpu_load = shell.exec('python3 -u utilities/cpu_load.py', {async: true, silent: true});
cpu_load.stdout.on('data', function (data) {
    io.emit('cpu_load', data);
});

setInterval(update_data, 1000);
