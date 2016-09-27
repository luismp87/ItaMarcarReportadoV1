var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){
        //if(!fn.estaRegistrado())
        //window.location.href = '#login';
		// LOGIO EN EL SERVIDOR --> $('#btnautentificar').tap(fn.autentificar);
        $('#btnautentificar').tap(fn.autentificarJSON);
        $('#CerrarSesion').tap(fn.cerrarsesion);
        $('#ConsultarCUBO').tap(fn.ConsultarCUBO);
        
 
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
        if(usr == undefined || usr == '')
            return false;
        else
            return true;
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
                url: 'http://http://servidoriis.laitaliana.com.mx/LM/wsitamarcarunidades/Service1.asmx/MuestraInfoCubo',              
                data: {cubo: cubo},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].Respuesta == "encontro")
                            {                           
                            window.location.href = '#MuestraInfoCubo';
                            }
                        else if(msg[i].valor1 == "noencontro")
                            {
                            navigator.notification.alert("No se encontro información.",null,"Error al Ingresar","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });                 
                },
                error: function(jq, txt){
                    //alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
                }
            });
        }
        else{
            navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
            //alert("todos los campos son requeridos");
        }   
    }
};
$(fn.init);
//$(fn.ready);