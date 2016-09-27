var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){
        //if(!fn.estaRegistrado())
        //window.location.href = '#login';
		// LOGIO EN EL SERVIDOR --> $('#btnautentificar').tap(fn.autentificar);
        $('#btnautentificar').tap(fn.autentificarJSON);
 
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

        }
};
//$(fn.init);
$(fn.ready);