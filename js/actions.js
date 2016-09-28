var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){        
        if(fn.estaRegistrado() == false)
        {
        window.location.href = '#login';      
        }
        else
        {
        window.location.href = '#IngresoCubo';     
        }
		// LOGIO EN EL SERVIDOR --> $('#btnautentificar').tap(fn.autentificar);
        //$('#btnautentificar').tap(fn.autentificarJSON);
        $('#btnautentificar').tap(fn.autentificarSQL);
        $('#CerrarSesion').tap(fn.cerrarsesion);
        $('#ConsultarCUBO').tap(fn.ConsultarCUBO);
        $('#ConsultaNumUsuarios').tap(fn.ConsultaNumUsuarios);
        $('#btnMigrarUsuarios').tap(fn.btnMigrarUsuarios);
        $('#btnEliminarUsuarios').tap(fn.btnEliminarUsuarios);
        
 
	},
    autentificarJSON : function() {         
    var usuariof = $('#txtusuario').val();
    var passf =   $('#txtcontrasena').val();  
    var out = "";
    var i;
    var encontrado = "false";
    //alert("hola1");
    for(i = 0; i<usuarios.length; i++) {
        if(( usuarios[i].usuario == usuariof) && (usuarios[i].pass == passf)){
        window.localStorage.setItem("user",usuariof);
            

        //alert(""+usuariof);
        window.location.href = '#IngresoCubo';
        encontrado = "true";
        break;
        }        
        //alert("hola" + myArray.length);
        //out += '<a href="' + myArray[i].usuario + '">' + myArray[i].pass + '</a><br>';
    }
    if(encontrado == "false")
    {
      alert("Verifique el usuario y la contraseña");
      //navigator.notification.alert("Verifique el usuario y la contraseña",null,"Error al Ingresar","Aceptar");  
    }
    //document.getElementById("id01").innerHTML = out;
    },
     estaRegistrado: function(){
        var usr = window.localStorage.getItem("user");
        if(usr == undefined || usr == '' || usr == null)
        {
            return false;
        }
        else
        {
            return true;
        }
    },
    cerrarsesion: function(){
    window.localStorage.setItem("user",'');   
    $("#txtusuario").val("");
    $("#txtcontrasena").val("");
window.location.href = '#login';
    },
    ConsultarCUBO: function(){         
        var cubo = $('#txtcubo').val();       
        if(cubo != ''){   
            $.mobile.loading("show",{theme: 'b'});
            $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsitamarcarunidades/Service1.asmx/MuestraInfoCubo',              
                data: {cubo: cubo},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].Respuesta == "encontro")
                            {                           
                            window.location.href = '#MuestraInfoCubo';
                            $("#hFOLIOCUBO").text($('#txtcubo').val());
                            $("#hORIGENUSUARIO").text(window.localStorage.getItem("origen"));
                            $("#hNPROVEEDOR").text(msg[i].vendor_name);
                            $("#hPLACA").text(msg[i].tm_vehicle_id);
                            $("#hDESCRIPCIONCUBO").text(msg[i].description);

                            }
                        else if(msg[i].Respuesta == "noencontro")
                            {
                            navigator.notification.alert("No se encontro información.",null,"Error al consultar CUBO","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });                 
                },
                error: function(jq, txt){
                    //alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error al consultar CUBO","Aceptar");
                }
            });
        }
        else{
            navigator.notification.alert("El CUBO es Requeridos",null,"Error al consultar CUBO","Aceptar");
            //alert("todos los campos son requeridos");
        }   
    },
    ConsultaNumUsuarios: function(){      
        almacen.leerNumeroUsuarios();     
        window.location.href = '#RemotaALocal';
    
    },
    btnMigrarUsuarios: function(){ 
        var myArray = new Array(30); 
        var registros = $('#NumUsuarios').val();  
        if(registros == 0)
            {
                $.mobile.loading("show",{theme: 'b'});
                $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsitamarcarunidades/Service1.asmx/enviarcatalogocompletodeusuarios',              
                //data: {usuario: nom, contrasena: passw},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        myArray[i] = msg[i].usuario + "','" + msg[i].pass + "','" + msg[i].origen;
                    }); 
                    almacen.guardarUsuario(myArray);
                    almacen.leerNumeroUsuarios();  
                    navigator.notification.alert("Migración Correcta",null,"Listo","Aceptar");               
        },
        error: function(jq, txt){
                    //alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
                }
            });
                    //navigator.notification.alert("a guardar",null,"Error al Ingresar","Aceptar");    
                            //almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio);
                    
                    }
                    else
                    {
                       navigator.notification.alert("Se tienen registros en la base de datos, antes eliminelos",null,"Advertencia","Aceptar");    
                    }
        },
    btnEliminarUsuarios: function(){        
            almacen.eliminarUsuarios();
            almacen.leerNumeroUsuarios();  
    },
    autentificarSQL: function(){
        var usu = $('#txtusuario').val();      
        var con = $('#txtcontrasena').val(); 
        if((usu != '') || (con != '')){   
            $.mobile.loading("show",{theme: 'b'});
            almacen.leerinformacionUsuario();
            $.mobile.loading("hide");
        }
        else{
            navigator.notification.alert("Ingrese los datos requeridos",null,"Error al Ingresar","Aceptar");
            //alert("Ingrese el ID del extintor");
        }   
    }
};
$(fn.init);
//$(fn.ready);