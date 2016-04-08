$(document).ready(function(){



	var socket = io.connect('http://192.168.1.16:3535', {'force new connection': true});

	var usuarioName = prompt('que usuario sos?');
	var usuarioGrupo = prompt('que grupo sos?');
	var usuarioId = prompt('que id sos?');

	templateUser = '';
	var usuario = '';

	function select(n){
		return n;
	}

	socket.on('connect', function(){
		/*socket.emit('demo', {
			'nombre': usuarioName,
			'grupo': usuarioGrupo
		});*/
		var id;
		console.log(socket.io.engine.id);
		socket.emit('usuariosAdd', {
			'NombreUsuario': usuarioName,
			'Grupo': usuarioGrupo,
			'UsuarioIdInterno': usuarioId,
			'idSocket': socket.io.engine.id
		});

		socket.on('usuario', function(data){
			alert(data.bienvenido);
		});

		$("#append").change(function(){
			usuario = this.value
		});

		$(".form").submit(function(e){
			
			e.preventDefault();
			
			socket.emit('enviarMensaje', {
				'mensaje': $('input[type="text"]').val(),
				'receptor': usuario,
				'idSocket': id
			});
		})
		
	});


	socket.on('usuariosConectados', function(data){
		for(var i = 0; i < data.length; i++) {
			templateUser += "<option value='"+data[i].NombreUsuario+"'>'"+data[i].NombreUsuario+"'</option>";
		}
		$("#append").append(templateUser);
		console.log(data);
	});

	/*socket.on('usuariosConectados', function(data){
			templateUser += "<option value='"+data.NombreUsuario+"'>'"+data.NombreUsuario+"'</option>";
			$("#append").append(templateUser);
		})*/




});