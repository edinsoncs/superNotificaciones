var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var puerto = require('./puerto');
var cantUser = require('./cantidad');
var prompt = require('prompt');

var path = require('path');


//app.use(express.static(path.join(__dirname, 'frontend')));
var usuarios = [];
var usuario = [];

var arr = [];

prompt.start();


app.get('/', function(req, res, next){
	res.status(200);
	res.write('<h1>Hola!!! Edinson</h1>');
	res.end();
});



io.on('connect', function(socket){
	console.log('-----------Usuario ya conectado-----------------')

	var id = socket.id;
	
	socket.on('usuariosAdd', function(insertUser){
		
		arr.push(insertUser);

		socket.emit('usuariosConectados', arr);

		//var emitir = io.sockets.connected[arr[0].NombreUsuario];
		//console.log(io.sockets.connected);

		/*for(var i = 0; i < arr.length; i++) {
			console.log(arr[i].idSocket);

			if(arr[i].NombreUsuario == 'edinson' && '/#'+arr[i].idSocket == id) {
				var push = io.sockets.connected[id];
				push.emit('usuario', {
					bienvenido: 'hola que tal!!!'
				});
				console.log('hola');
			}
			else if(arr[i].NombreUsuario == 'sergio' && '/#'+arr[i].idSocket == id) {
				var push = io.sockets.connected[id];
				push.emit('usuario', {
					bienvenido: 'hola que tal sergio, que haces oe hahahah'
				});
				console.log('hola sergio');
			}

		
		}*/



		socket.on('enviarMensaje', function(data){
			
			for(var i = 0; i < arr.length; i++) {
				
				if(arr[i].NombreUsuario == data.receptor) {

					var idUnico = '/#'+arr[i].idSocket;
					
					var push = io.sockets.connected[idUnico];
					push.emit('usuario', {
						bienvenido: data.mensaje
					});
					console.log('hola bienvenido');

				}
				
			
			}
		});


		

	});





	io.on('connection', function(socket){

		console.log('conectados')

		socket.on('disconnect', function(){
			console.log('se desconecto');
		});

		setTimeout(function(){
			arr.shift(socket.id);
		}, 15000);


		
	});


	/*socket.on('demo', function(data){
		arr.push(data); 

		console.log(data.nombre + data.grupo);

		setTimeout(function(){
			console.log(arr);
		},10000);
	});*/



});








server.listen(puerto.puerto(), function(){
	console.log(puerto.name() + ' en: ' +  puerto.puerto());
});