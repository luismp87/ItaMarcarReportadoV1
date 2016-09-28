var almacen = {
	/*variables sobre usuario*/
	usuario: null,
	pass: null,
	origen: null,
	myArray: null,
	CreaSINOExiste: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios (usuario,pass,origen)");										
									},
	error: function(){
										//alert("Error al acceder a la Base de Datos");
										navigator.notification.alert("Error al acceder a la Base de Datos", null, "Error", "Aceptar");
									},
	Correcto: function(){
										//alert("Reserva guardada en espera de sincronización");
										navigator.notification.alert("Ejecución satisfactoria", null, "Correcto", "Aceptar");
									},
		/*FUNCION PARA LEER EN BASE DE DATOS*/
	leerNumeroUsuarios: function(){
			 navigator.notification.alert("mensaje 3",null,"breaks","Aceptar");      
			almacen.db = window.openDatabase("ItaMUDB","1.0","ItaMUV1 Storage",20000);
			 navigator.notification.alert("mensaje 4",null,"breaks","Aceptar");      
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			 navigator.notification.alert("mensaje 5",null,"breaks","Aceptar");      
			almacen.db.transaction(almacen.ConsultaNumeroDeUsuario, almacen.error, null);
			 navigator.notification.alert("mensaje 6",null,"breaks","Aceptar");      
		},
									ConsultaNumeroDeUsuario: function(tx){
										tx.executeSql("SELECT count(*) as filas FROM usuarios", [], function(tx2, t){
											for(i = 0; i < t.rows.length; i++){
												$("#NumUsuarios").val("" + t.rows.item(i).filas); 
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("id_ext: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}

//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
										
		},
/*FUNCION PARA GUARDAR EN BASE DE DATOS*/
	guardarUsuario: function(myArray){		
		almacen.myArray	= myArray;        
			almacen.db = window.openDatabase("ItaMUDB","1.0","ItaMUV1 Storage",20000);
			almacen.db.transaction(almacen.GuardarUsuario, almacen.error, null);
			
		},
									GuardarUsuario: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios (usuario,pass,origen)");
										    //navigator.notification.alert("longitud " +almacen.myArray.length ,null,"Listo","Aceptar");      
										    for(i = 0; i<almacen.myArray.length; i++) 
										    {
										    	if((almacen.myArray[i] != "") && (almacen.myArray[i] != undefined))
										    	{
										    		tx.executeSql("INSERT INTO usuarios (usuario,pass,origen) VALUES ('"+almacen.myArray[i]+"')");
    											}
        									}        
									},
	/*FUNCION PARA ELIMINAR EN BASE DE DATOS*/
		eliminarUsuarios: function(tx){
			almacen.db = window.openDatabase("ItaMUDB","1.0","ItaMUV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.eliminarUsuariosQuery, almacen.error, almacen.Correcto);
		},
									eliminarUsuariosQuery: function(tx){
									tx.executeSql("DELETE FROM usuarios");
	}

}