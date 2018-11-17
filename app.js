var logger = require('morgan');
var shell = require('shelljs');
var express = require('express');
var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use(logger('dev'))
    .get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

io.sockets.on('connection', function (socket) {


});

function emit_cpu_temp() {
    const {code} = shell.exec('c/cpu_temp');
    io.emit('iostat', shell.exec('top -R -F -n0 -s3 -l 1 | grep "CPU usage"', {silent: true}));
    io.emit('iostat', code);
}

setInterval(emit_cpu_temp, 1000);

server.listen(3000);