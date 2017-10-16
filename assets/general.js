/*
  Copyright (C) 2016 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/

var hex_chr;
var IDClass;
var objGlobal;
hex_chr="0123456789abcdef";
IDClass=0;
general=(function(){
    //aqui se escriben las funciones privadas
    // Private variables / properties
   // var p1,p2;

    // Private methods
    //function aPrivateMethod(){
    //programa
	//}
	getdisctId=function(id){
      	var cadena;
      	var idreal;
      	var objeto;
      	if(cadena.search("#")==0){
          	idreal=id.replace("#","");
          	idreal=idreal.replace(".","");
        	objeto=document.getElementById(idreal);
      	}
      	else if(cadena.search(".")==0){
          	idreal=id.replace("#","");
			idreal=idreal.replace(".","");
			objeto=document.getElementsByClassName(idreal);
		}
		else{
			return -1;
		}
	};
	return{
            preventDefault: function(e){
				if(e.preventDefault){
					e.preventDefault();
				}
            },
            stopPropagation: function(e){
				if(e.stopPropagation){
					e.stopPropagation();
				}
            },
            salirSistema: function(e,variable){
                if(confirm(e)){
					location.replace("?" + variable + "=true");
                }
            },
            aviso: function(titul,content,contentdiv){
                getdisctId(id).innerHTML = content;
                getdisctId(id).innerHTML = titul;
                mostrar('alertpers');
            },
            confirmar: function(titul,content){
                document.getElementById('mensajeconfirm').innerHTML = content;
                document.getElementById('menusup2').innerHTML = titul;
                mostrar('confirmpers');
            },
            formu: function(titul,content){
                document.getElementById('mensajeprompt').innerHTML = content;
                document.getElementById('menusup3').innerHTML = titul;
                mostrar('promptpers');
            },
            getVal: function(id){
                var valor;
                var obj;
                obj=getdisctId(id);
                valor=obj.value;
                return valor;
            },
            getList: function(id){
                var e;
                var strUser;
                e = getdisctId(id);
                strUser = e.options[e.selectedIndex].value;
                return strUser;
            },
            redirReplace: function(direccion,variable,valor){
                location.replace([direccion]+"?"+[variable]+"="+[valor]);
            },
            redirHref: function(direccion,variable,valor){
                location.href([direccion]+"?"+[variable]+"="+[valor]);
            },
            base64_encode: function(cadena){
                return btoa(cadena);
            },
            base64_decode: function(cadena){
                return atob(cadena);
            },
            getParam: function(name){
                    var regexS = "[\\?&]"+name+"=([^&#]*)";
                    var regex = new RegExp ( regexS );
                    var tmpURL = window.location.href;
                    var results = regex.exec( tmpURL );
                    if(results==null){
                            return"";   
                    }
                    else{
                        return results[1];
                    }
            },
            utf8_encode: function(argString) {
              //  discuss at: http://phpjs.org/functions/utf8_encode/
              // original by: Webtoolkit.info (http://www.webtoolkit.info/)
              // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
              // improved by: sowberry
              // improved by: Jack
              // improved by: Yves Sucaet
              // improved by: kirilloid
              // bugfixed by: Onno Marsman
              // bugfixed by: Onno Marsman
              // bugfixed by: Ulrich
              // bugfixed by: Rafal Kukawski
              // bugfixed by: kirilloid
              //   example 1: utf8_encode('Kevin van Zonneveld');
              //   returns 1: 'Kevin van Zonneveld'

              if (argString === null || typeof argString === 'undefined') {
                return '';
              }

              var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
              var utftext = '',
                start, end, stringl = 0;

              start = end = 0;
              stringl = string.length;
              for (var n = 0; n < stringl; n++) {
                var c1 = string.charCodeAt(n);
                var enc = null;

                if (c1 < 128) {
                  end++;
                } else if (c1 > 127 && c1 < 2048) {
                  enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                  );
                } else if ((c1 & 0xF800) != 0xD800) {
                  enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                  );
                } else { // surrogate pairs
                  if ((c1 & 0xFC00) != 0xD800) {
                    throw new RangeError('Unmatched trail surrogate at ' + n);
                  }
                  var c2 = string.charCodeAt(++n);
                  if ((c2 & 0xFC00) != 0xDC00) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
                  }
                  c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
                  enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                  );
                }
                if (enc !== null) {
                  if (end > start) {
                    utftext += string.slice(start, end);
                  }
                  utftext += enc;
                  start = end = n + 1;
                }
              }

              if (end > start) {
                utftext += string.slice(start, stringl);
              }

              return utftext;
            },
            utf8_decode: function(str_data) {
              //  discuss at: http://phpjs.org/functions/utf8_decode/
              // original by: Webtoolkit.info (http://www.webtoolkit.info/)
              //    input by: Aman Gupta
              //    input by: Brett Zamir (http://brett-zamir.me)
              // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
              // improved by: Norman "zEh" Fuchs
              // bugfixed by: hitwork
              // bugfixed by: Onno Marsman
              // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
              // bugfixed by: kirilloid
              //   example 1: utf8_decode('Kevin van Zonneveld');
              //   returns 1: 'Kevin van Zonneveld'

              var tmp_arr = [],
                i = 0,
                ac = 0,
                c1 = 0,
                c2 = 0,
                c3 = 0,
                c4 = 0;

              str_data += '';

              while (i < str_data.length) {
                c1 = str_data.charCodeAt(i);
                if (c1 <= 191) {
                  tmp_arr[ac++] = String.fromCharCode(c1);
                  i++;
                } else if (c1 <= 223) {
                  c2 = str_data.charCodeAt(i + 1);
                  tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
                  i += 2;
                } else if (c1 <= 239) {
                  // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
                  c2 = str_data.charCodeAt(i + 1);
                  c3 = str_data.charCodeAt(i + 2);
                  tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                  i += 3;
                } else {
                  c2 = str_data.charCodeAt(i + 1);
                  c3 = str_data.charCodeAt(i + 2);
                  c4 = str_data.charCodeAt(i + 3);
                  c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
                  c1 -= 0x10000;
                  tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
                  tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
                  i += 4;
                }
              }

              return tmp_arr.join('');
            },
            getURLComplete: function(){
                return window.location.href;
            },
            getDomain: function(){
                return document.domain;
            },
            getURI: function(){
                var request_uri;
                request_uri=location.pathname + location.search;
                return request_uri;
            },
            explode: function(variab, delimiter){
              var arraystr;
              return variab.split(delimiter);
            },
            goToURL: function(valselect){
              var URL = "http://";
              var web = document.getElementById(valselect).value;
              location.href=web;
            }
    };
}());

general.objeto=(function(){
  //Submodulo Objeto
	getdisctId=function(id){
          var cadena;
          var idreal;
          var objeto;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto=document.getElementById(idreal);
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto = document.getElementsByClassName(idreal);
          }
          else{
              return -1;
          }
          return  objeto;
    }
  return{
      mostrar:function(id){
        var fila;
          if(!document.getElementById){
              return false;
          }
          fila=getdisctId(id);
          fila.style.display="block"; 
      },
      mostrar_estilo:function(id,estilo){
        var fila;
          if(!document.getElementById){
              return false;
          }
          if(estilo==''){
              return false;
          }
          fila=getdisctId(id);
          fila.style.display=estilo;
      },
      ocultar:function(id){
        var fila;
		if(!document.getElementById){
			return false;
		}
		fila=getdisctId(id);
		fila.style.display="none";
      },
      toggleDisplay: function(id){
        var fila;
            if (!document.getElementById){
                return false;
            }
            fila=getdisctId(id);
            if(fila.style.display != "none"){
              fila.style.display = "none";
            }
            else{
              fila.style.display = "";
            }
        },
        resetText: function(textbox){
          var textcontent;
          textcontent=getdisctId(textbox);
          textcontent.value='';
        },
        getSelectVal: function(id){
          var e;
          var valorselect;
          e ==distId(id);
          valorselect = e.options[e.selectedIndex].value;
          return valorselect; 
        },
        getTecla: function(e){
          if(window.event)keyCode=window.event.keyCode;
          else if(e) keyCode=e.which;
          return keyCode;
        },
        blockToNumber: function(e){
          //bloquear teclado a solo numeros
          teclap=general.objeto.getTecla(e);
          teclan=chr(teclap);
          if(IsNumeric(teclan)==false){
            return "Solo está peritido escribir numeros";
          }
        },
        blockToChar: function(e){
          //bloquear teclado a solo letras
          teclap=general.objeto.getTecla(e);
          teclan=chr(teclap);
          if(IsNumeric(teclan)==true){
            return "Solo está peritido escribir letras";
          }
        },
        val: function(idelement){
          var element;
          element=getdisctId(id);
          return element.value;
        },
        intval: function(number){
          return parseInt(number);
        },
        floatval: function(number){
          return parseFloat(number);
        },
        bloqNum: function(e){
          teclap=general.objeto.getTecla(e);
          teclan=chr(teclap);
          if(IsNumeric(teclan)==false){
            return "Solo esta permitido escribir numeros";
          }
        }
  };
}());

general.efectos=(function(){
  //Submodulo efectos
    var opacity=0;
    var opacityneg=100;
    var Cambiopa=0;
    var CambiopaNeg=0;
    var oncompletefi;
    var oncompletefo;
    var defaultStep = 1;
    var step;
    oncompletefi='';
    oncompletefo='';
	getdisctId=function(id){
          var cadena;
          var idreal;
          var objeto;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto=document.getElementById(idreal);
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto = document.getElementsByClassName(idreal);
          }
          else{
              return -1;
          }
          return  objeto;
    }
  return{
      fadeIn:function(id,tiempo){
        var intervalo;
        intervalo=tiempo/80;
        oncompletefi=arguments[2];
          if(!document.getElementById){
              return false;
          }
          fila=getdisctId(id);
            //programamos cada navegador por separado (lo mismo de antes pero
            obj = fila;
            //con el nuevo valor de la transparencia
            if (document.all){
            //esto es para IE, como siempre hay q programarlo a parte
            obj.style.filter = 'alpha(opacity='+opacity+')';
            }
            else{
            // Safari 1.2, posterior Firefox y Mozilla, CSS3
            obj.style.opacity = opacity /100;
            // anteriores Mozilla y Firefox
            obj.style.MozOpacity = opacity /100;
            // Safari anterior a 1.2, Konqueror
            obj.style.KHTMLOpacity = opacity /100;
            }
            obj.style.display = "block";
          Cambiopa=setInterval(this.cambiaropacity,intervalo);
      },
        cambiaropacity: function(){
            //incrementamos el valor
            opacity += 1;
            console.log(opacity);
            //seteamos al div como objeto para poder usarlo con su ID
            obj = fila;
            console.log(fila.id);
            //programamos cada navegador por separado (lo mismo de antes pero
            //con el nuevo valor de la transparencia
            if (document.all){
                //esto es para IE, como siempre hay q programarlo a parte
                obj.style.filter = 'alpha(opacity='+opacity+')';
            }
            else{
            // Safari 1.2, posterior Firefox y Mozilla, CSS3
            obj.style.opacity = opacity /100;
            // anteriores Mozilla y Firefox
            obj.style.MozOpacity = opacity /100;
            // Safari anterior a 1.2, Konqueror
            obj.style.KHTMLOpacity = opacity /100;
            }
            //si termino la trnsicion borramos el intervalo
            if(opacity==100){
                clearInterval(Cambiopa);
                if(oncompletefi!=''){
                  oncompletefi='';
                }
            }
          },
      fadeOut:function(id,tiempo){
        var intervalo;
        intervalo=tiempo/80;
        oncompletefo=arguments[2];
          if(!document.getElementById){
              return false;
          }
          fila=getdisctId(id);
          //programamos cada navegador por separado (lo mismo de antes pero
          obj = fila;
          //con el nuevo valor de la transparencia
          if (document.all){
            //esto es para IE, como siempre hay q programarlo a parte
            obj.style.filter = 'alpha(opacity='+opacityneg+')';
          }
          else{
            // Safari 1.2, posterior Firefox y Mozilla, CSS3
            obj.style.opacity = opacityneg /100;
            // anteriores Mozilla y Firefox
            obj.style.MozOpacity = opacityneg /100;
            // Safari anterior a 1.2, Konqueror
            obj.style.KHTMLOpacity = opacityneg /100;
          }
          obj.style.display = "block";
          CambiopaNeg=setInterval(this.cambiaropacityneg,intervalo);
      },
        cambiaropacityneg: function(){
            //incrementamos el valor
            opacityneg -= 1;
            console.log(opacityneg);
            //seteamos al div como objeto para poder usarlo con su ID
            obj = fila;
            console.log(fila.id);
            //programamos cada navegador por separado (lo mismo de antes pero
            //con el nuevo valor de la transparencia
            if (document.all){
              //esto es para IE, como siempre hay q programarlo a parte
              obj.style.filter = 'alpha(opacity='+opacityneg+')';
            }
            else{
              // Safari 1.2, posterior Firefox y Mozilla, CSS3
              obj.style.opacity = opacityneg /100;
              // anteriores Mozilla y Firefox
              obj.style.MozOpacity = opacityneg /100;
              // Safari anterior a 1.2, Konqueror
              obj.style.KHTMLOpacity = opacityneg /100;
            }
            //si termino la trnsicion borramos el intervalo
            if(opacityneg==0){
              clearInterval(CambiopaNeg);
              if(oncompletefo!=''){
                oncompletefo();
                oncompletefo='';
              }
            }
          },
    once: function(seconds, callback) {
      var counter = 0;
      var time=setInterval(function(){
        counter++;
        if(counter>=seconds){
          callback();
          clearInterval(time);
        }
      },400);
    },
    gotodiv: function(id){
        var objeto;
        objeto=getdisctId(id);
        objeto.scrollIntoView();
    },
	smooth: function(target, options) {
	    var start = window.pageYOffset,
	        opt = {
	            duration: options.duration,
	            offset: options.offset || 0,
	            callback: options.callback,
	            easing: options.easing || easeInOutQuad
	        },
	        distance = typeof target === 'string'
	            ? opt.offset + document.querySelector(target).getBoundingClientRect().top
	            : target,
	        duration = typeof opt.duration === 'function'
	            ? opt.duration(distance)
	            : opt.duration,
	        timeStart, timeElapsed;
	    requestAnimationFrame(function(time) { timeStart = time; loop(time); });
	    function loop(time) {
	        timeElapsed = time - timeStart;
	
	        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
	
	        if (timeElapsed < duration)
	            requestAnimationFrame(loop)
	        else
	            end();
	    }
	
	    function end() {
	        window.scrollTo(0, start + distance);
	
	        if (typeof opt.callback === 'function')
	            opt.callback();
	    }
	    
	    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
	    function easeInOutQuad(t, b, c, d)  {
	        t /= d / 2
	        if(t < 1) return c / 2 * t * t + b
	        t--
	        return -c / 2 * (t * (t - 2) - 1) + b
	    }
	},
    blink: function(id,status){
        var fila;
        switch(status){
        	'on':
	        	fila=getdisctId(id);
	        	fila.className="blink_div";
	        	break;
	        'off':
	        	fila=getdisctId(id);
	        	fila.className="";
	        	break;
        	
        }
    },
  };
}());


general.ajax=(function(){
  //Submodulo Ajax
	getdisctId=function(id){
          var cadena;
          var idreal;
          var objeto;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto=document.getElementById(idreal);
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto = document.getElementsByClassName(idreal);
          }
          else{
              return -1;
          }
          return  objeto;
    }
  return{
      getxhr:function(){
        var xmlhttp=false;
        try{
          xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e){
            try{
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (E){
              xmlhttp = false;
            }
         }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined'){
          xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
      },
      getTrim: function(cadena){
        return cadena.replace(/^\s+/g,'').replace(/\s+$/g,'');
      },
      valSaveLocal: function(varname,valor){
        //localstorage programming
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage
            localStorage.setItem(varname,valor);
        }
      },
      valGetLocal: function(varname){
        if (typeof(Storage) !== "undefined") {
            localStorage.getItem(varname); 
        }
      },
      valSaveObj: function(varname){
        //escribir el salvar el valor
        //activar en HTMl con onkeyup-->value u onchange-->select*
        var txtcedula;
        txtcedula=document.getElementById(varname).value;
        //localstorage programming
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.setItem(varname,txtcedula);
        }
      },
      processForm: function(){
        var arrayajax;
        var IDClass;
        var cadenaArgs;
        var ajxProtocol;
        var ajxFileS;
        var elementos;
        var formobj;
        var indice;
        var valor;
        var flags;
        var formfinal;
        var sock;
        var enableHTML5;
        enableHTML5=0;
        IDClass=0;
        arrayajax=new Array();
        //almacenar valores en el array 'arrayajax'
        for(var i=0;i<arguments.length;i++){ 
          arrayajax[i]=arguments[i];
        }
        //validar si el numero de argumentos sea mayor a 4
        if((arrayajax.length)>4){
            //Protocolo 0
            //SocketDir 1
            //VariableControl (variable de control para saber que accionar al momento de programar el PHP) 2
            //Contenedor 3
            //formID 4 ID del form
            //Flags 5
            //HTML5enable 6
            //FLAGS de control: si actua dependiendo del enter o no, al estar estado 4 o no, alert o no
            //recoger argumentos con arrayajax[i]
            //Inicializacion de variables
            //FLAGS A MANEJAR
            // 1 NULL
            // 2 VARURL
            // 3 VARANDOM
            //obtener los Flags con los cuales trabajar
            formfinal=getdisctId(arrayajax[4]);
            formid=formfinal.id;
            //contenedorw=getdisctId(arrayajax[3]);
            formobj=formfinal;
            //obtener el id del form al que pertenece el boton
            sock=general.ajax.getxhr();
            //el argumento 0 contiene todos los datos necesarios en una cadena de argumentos
            //desglosar la cadena en array de argumentos llamado arrayajax
            flags=arrayajax[5];
            HTML5enable=arrayajax[6];
            if(formid==''){
              alert("El formulario debe tener ID!");
            }
            //Obtener la lista de controles del form
            elementos=formobj.elements;
            /////////////////INICIALIZACION DE VARIABLES///////////
            cadenaArgs='';
            ajxSocket='';
            ///////////////////////////////////////////////////////
            ajxProtocol=arrayajax[0].toUpperCase();
            ajxFileS=arrayajax[1];
            cadenaArgs=arrayajax[2] + "=true";      
            contenedorw=getdisctId(arrayajax[3]);
            if(flags=="NORMAL" || flags==""){
              //para procesar formularios completos arg1=valor1...&argN=valorN
              for(i=0;i<elementos.length;i++){
                if(elementos[i].type!="submit"){
                  if(elementos.type!="button"){
                    if(elementos[i].type!="select-one"){
                      if(elementos[i].type=="file"){
                        if(elementos[i].files.length>0){
                          if(window.File && window.FileList && window.FileReader){
                            var reader;
                            var data;
                            data=elementos[i].files[0].name;
                            cadenaArgs=cadenaArgs + "&" + elementos[i].id + "=" + elementos[i].files[0].name + "&" + elementos[i].id + "_content=" + data;
                          }
                        }
                      }
                      else{
                        cadenaArgs=cadenaArgs + "&" + elementos[i].id + "=" + elementos[i].value;
                      }
                    }
                    else{
                        indice = elementos[i].selectedIndex;
                        valor = elementos[i].options[indice].value
                        cadenaArgs=cadenaArgs + "&" + elementos[i].id + "=" + valor;
                    } 
                  }
                } 
              }
            }
            if(flags=="VARURL"){
              //para cuando los argumentos son variables pasadas por url
              for(i=6;i<arrayajax.length; i++){
                cadenaArgs=cadenaArgs + "&" + arrayajax[i] + "=" + general.getParam(arrayajax[i]);
              }
            }
            if(flags=="VARANDOM"){
              //para cuando los argumentos estan escritos de esta forma: 'arg1=valor1','arg2=valor2'
              for(i=6;i<arrayajax.length; i++){
                variable=arrayajax[i];
                svar=Array();
                svar=variable.split("=");
                arg1=svar[0];
                arg2=svar[1];
                cadenaArgs=cadenaArgs + "&" + arg1 + "=" + arg2;
              }
            }
            cadenaArgs=this.getTrim(cadenaArgs);
            if(HTML5enable==true){
              if(ajxProtocol=="POST"){
                ajxSocket=general.ajax.getxhr();
                ajxSocket.open(ajxProtocol,ajxFileS,true);
                ajxSocket.onreadystatechange=function(){
                    if(ajxSocket.readyState==4){
                      contenedorw.innerHTML=ajxSocket.responseText;
                    }
                    else{
                      contenedorw.innerHTML="ESPERE...";
                    }
                  }
                ajxSocket.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                ajxSocket.send(cadenaArgs);
              }
              else if(ajxProtocol=="GET"){
                ajxSocket=general.ajax.getxhr();
                ajxSocket.open(ajxProtocol,ajxFileS,true);
                ajxSocket.onreadystatechange=function(){
                    if(ajxSocket.readyState==4){
                      contenedorw.innerHTML=ajxSocket.responseText;
                    }
                    else{
                      contenedorw.innerHTML="ESPERE...";
                    }
                  }
                ajxSocket.send(null);
              }
            }
            else{
              if(ajxProtocol=="POST"){
                ajxSocket=general.ajax.getxhr();
                ajxSocket.open(ajxProtocol,ajxFileS,true);
                ajxSocket.onreadystatechange=function(){
                    if(ajxSocket.readyState==4){
                      contenedorw.innerHTML=ajxSocket.responseText;
                    }
                    else{
                      contenedorw.innerHTML="ESPERE...";
                    }
                  }
                ajxSocket.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                ajxSocket.send(cadenaArgs);
              }
              else{
                ajxSocket=general.ajax.getxhr();
                ajxSocket.open(ajxProtocol,ajxFileS,true);
                ajxSocket.onreadystatechange=function(){
                  if (ajxSocket.readyState==4){
                    contenedorw.innerHTML = ajxSocket.responseText;
                  }
                  else{
                    contenedorw.innerHTML="wait...";
                  }
                }
                ajxSocket.send(null);
              }
            }
          }
          else{
            alert("Error: Faltan argumentos!");
          }
      }
  };
}());
general.webwork=(function(){
	//Submodulo WebWorkers
	getdisctId=function(id){
          var cadena;
          var idreal;
          var objeto;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto=document.getElementById(idreal);
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto = document.getElementsByClassName(idreal);
          }
          else{
              return -1;
          }
          return  objeto;
    }
  return{
      distIdWebWork: function(id){
            var cadena;
            var idreal;
            var filareal;
            var tiporeal;
            cadena=id;
            tipo='';
            if(cadena.search("#")==0){
                idreal=id.replace("#","");
                idreal=idreal.replace(".","");
                tiporeal="ID";
                var filareal={
                  eto: document.getElementById(idreal),
                  tipo: tiporeal,
                  id: idreal
                };
            }
            else if(cadena.search(".")==0){
                idreal=id.replace("#","");
                idreal=idreal.replace(".","");
                tiporeal="CLASS";
                var filareal={
                  eto: document.getElementById(idreal),
                  tipo: tiporeal,
                  id: idreal
                };
            }
            else{
                return -1;
            }
            return  filareal;
      },
      getWebWork: function(archivo){
        var workerSck;
        var workerName;
        if(archivo!=''){
          workerName=getdisctId(archivo);
          if(typeof(Worker)!=="undefined"){
            // Some code.....
            workerSck = new Worker(workerName.id);
            return workerSck;
          }
          else{
            // Sorry! No Web Worker support..
            return -1;
          }
        }
      }
  };
}());


general.watch=(function(){
	//Submodulo WebWorkers
	getdisctId=function(id){
          var cadena;
          var idreal;
          var filareal;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              filareal=document.getElementById(idreal);
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              filareal = document.getElementsByClassName(idreal);
          }
          else{
              return -1;
          }
          return  filareal;
    }
  return{
	  obj: function(archivo){
		if(!Object.prototype.watch) {
			Object.defineProperty(Object.prototype, "watch", {
				  enumerable: false
				, configurable: true
				, writable: false
				, value: function (prop, handler) {
					var
					  oldval = this[prop]
					, newval = oldval
					, getter = function () {
						return newval;
					}
					, setter = function (val) {
						oldval = newval;
						return newval = handler.call(this, prop, oldval, val);
					}
					;
					
					if (delete this[prop]) { // can't watch constants
						Object.defineProperty(this, prop, {
							  get: getter
							, set: setter
							, enumerable: true
							, configurable: true
						});
					}
				}
			});
		}
	}
  };
}());

general.unwatch=(function(){
	//Submodulo WebWorkers
	getdisctId=function(id){
          var cadena;
          var idreal;
          var filareal;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              filareal=document.getElementById(idreal);
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              filareal = document.getElementsByClassName(idreal);
          }
          else{
              return -1;
          }
          return  filareal;
   };
  return{
  	obj: function(){
		if(!Object.prototype.unwatch) {
			Object.defineProperty(Object.prototype, "unwatch", {
				  enumerable: false
				, configurable: true
				, writable: false
				, value: function (prop) {
					var val = this[prop];
					delete this[prop]; // remove accessors
					this[prop] = val;
				}
			});
		}
  	}
  };
}());

general.ui=(function(){
	//Submodulo WebWorkers
	getdisctId=function(id){
          var cadena;
          var idreal;
          var objeto;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto=document.getElementById(idreal);
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto = document.getElementsByClassName(idreal);
          }
          else{
              return -1;
          }
          return  objeto;
    }
	return{
		//Write code below..
	};
}());

general.slideshow=(function(){
	//Submodulo Slideshow
	return{
		//Write code below..
		cycle:function(div){
			
		}
	};
}());
//Rutas personalizadas con argumentos PHP como slash y hashes para los nombres de las páginas a visitar
general.path=(function(){
	//Submodulo Path / Rewrite PathJS
	function version(){
		return "0.8.4"; 
	};
	getdisctId=function(id){
          var cadena;
          var idreal;
          var objeto;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto=document.getElementById(idreal);
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto = document.getElementsByClassName(idreal);
          }
          else{
              return -1;
          }
          return  objeto;
   };
	return{
		//Write code below..
		getVersion:function(){
	        return version();
	    },
	    load:function(div,modulourl){
	        var xmlhttp=false;
	        var filecont;
	        var contentdiv;
	        var n;
	        var allScripts;
	        contentdiv=getdisctId(div);
	        xmlhttp=general.ajax.getxhr();
		    xmlhttp.onreadystatechange = function(){
		        if(xmlhttp.readyState==XMLHttpRequest.DONE){
		           if(xmlhttp.status == 200){
		               contentdiv.innerHTML = xmlhttp.responseText;
		               allScripts=contentdiv.getElementsByTagName('script');
		               for (n=0;n<allScripts.length;n++){
							//run script inside rendered div
							eval(allScripts[n].innerHTML);
		               }
		           }
		           else {
		               alert('Error');
		           }
		        }
		    }

		    xmlhttp.open("GET", modulourl, true);
		    xmlhttp.send();
	    },
	    map:function(path){
	        if(general.path.routes.defined.hasOwnProperty(path)) {
	            return general.path.routes.defined[path];
	        }
	        else{
				return new general.path.core.route(path);
	        }
	    },
	    root: function (path) {
	        general.path.routes.root = path;
	    },
	    rescue: function (fn) {
	        general.path.routes.rescue = fn;
	    },
	    history: {
	        initial:{}, // Empty container for "Initial Popstate" checking variables.
	        pushState: function(state, title, path){
	            if(general.path.history.supported){
	                if(general.path.dispatch(path)){
	                    history.pushState(state, title, path);
	                }
	            } else {
	                if(general.path.history.fallback){
	                    window.location.hash = "#" + path;
	                }
	            }
	        },
	        popState: function(event){
	            var initialPop = !general.path.history.initial.popped && location.href == general.path.history.initial.URL;
	            general.path.history.initial.popped = true;
	            if(initialPop) return;
	            general.path.dispatch(document.location.pathname);
	        },
	        listen: function(fallback){
	            general.path.history.supported = !!(window.history && window.history.pushState);
	            general.path.history.fallback  = fallback;
	
	            if(general.path.history.supported){
	                general.path.history.initial.popped = ('state' in window.history), general.path.history.initial.URL = location.href;
	                window.onpopstate = general.path.history.popState;
	            }
	            else{
	                if(general.path.history.fallback){
	                    for(route in general.path.routes.defined){
	                        if(route.charAt(0) != "#"){
	                          general.path.routes.defined["#"+route] = general.path.routes.defined[route];
	                          general.path.routes.defined["#"+route].path = "#"+route;
	                        }
	                    }
	                    general.path.listen();
	                }
	            }
	        }
	    },
	    match:function (path, parameterize) {
	        var params = {}, route = null, possible_routes, slice, i, j, compare;
	        for (route in general.path.routes.defined) {
	            if (route !== null && route !== undefined) {
	                route = general.path.routes.defined[route];
	                possible_routes = route.partition();
	                for (j = 0; j < possible_routes.length; j++) {
	                    slice = possible_routes[j];
	                    compare = path;
	                    if (slice.search(/:/) > 0) {
	                        for (i = 0; i < slice.split("/").length; i++) {
	                            if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")) {
	                                params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
	                                compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
	                            }
	                        }
	                    }
	                    if (slice === compare) {
	                        if (parameterize) {
	                            route.params = params;
	                        }
	                        return route;
	                    }
	                }
	            }
	        }
	        return null;
	    },
	    dispatch:function (passed_route) {
	        var previous_route, matched_route;
	        if (general.path.routes.current !== passed_route) {
	            general.path.routes.previous = general.path.routes.current;
	            general.path.routes.current = passed_route;
	            matched_route = general.path.match(passed_route, true);
	
	            if (general.path.routes.previous) {
	                previous_route = general.path.match(general.path.routes.previous);
	                if (previous_route !== null && previous_route.do_exit !== null) {
	                    previous_route.do_exit();
	                }
	            }
	
	            if (matched_route !== null) {
	                matched_route.run();
	                return true;
	            } else {
	                if (general.path.routes.rescue !== null) {
	                    general.path.routes.rescue();
	                }
	            }
	        }
	    },
	    listen:function () {
	        var fn = function(){ general.path.dispatch(location.hash); }
	
	        if (location.hash === "") {
	            if (general.path.routes.root !== null) {
	                location.hash = general.path.routes.root;
	            }
	        }
	
	        // The 'document.documentMode' checks below ensure that PathJS fires the right events
	        // even in IE "Quirks Mode".
	        if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)) {
	            window.onhashchange = fn;
	        } else {
	            setInterval(fn, 50);
	        }
	
	        if(location.hash !== "") {
	            general.path.dispatch(location.hash);
	        }
	    },
	    core:{
	        route:function (path) {
	            this.path = path;
	            this.action = null;
	            this.do_enter = [];
	            this.do_exit = null;
	            this.params = {};
	            general.path.routes.defined[path] = this;
	        }
	    },
	    routes:{
	        'current': null,
	        'root': null,
	        'rescue': null,
	        'previous': null,
	        'defined': {}
	    }
	};
}());
general.path.core.route.prototype = {
    'to': function (fn) {
        this.action = fn;
        return this;
    },
    enter: function (fns) {
        if (fns instanceof Array) {
            this.do_enter = this.do_enter.concat(fns);
        } else {
            this.do_enter.push(fns);
        }
        return this;
    },
    exit: function (fn) {
        this.do_exit = fn;
        return this;
    },
    partition: function () {
        var parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
        while (text = re.exec(this.path)) {
            parts.push(text[1]);
        }
        options.push(this.path.split("(")[0]);
        for (i = 0; i < parts.length; i++) {
            options.push(options[options.length - 1] + parts[i]);
        }
        return options;
    },
    run: function () {
        var halt_execution = false, i, result, previous;

        if (general.path.routes.defined[this.path].hasOwnProperty("do_enter")) {
            if (general.path.routes.defined[this.path].do_enter.length > 0) {
                for (i = 0; i < general.path.routes.defined[this.path].do_enter.length; i++) {
                    result = general.path.routes.defined[this.path].do_enter[i].apply(this, null);
                    if (result === false) {
                        halt_execution = true;
                        break;
                    }
                }
            }
        }
        if (!halt_execution) {
            general.path.routes.defined[this.path].action();
        }
    }
};

general.md5=(function(){
	//Submodulo WebWorkers
	getdisctId=function(id){
          var cadena;
          var idreal;
          var objeto;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto=document.getElementById(idreal);
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              objeto = document.getElementsByClassName(idreal);
          }
          else{
              return -1;
          }
          return  objeto;
   };

   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z) { return (x & y) | ((~x) & z); }
   function G(x,y,z) { return (x & z) | (y & (~z)); }
   function H(x,y,z) { return (x ^ y ^ z); }
   function I(x,y,z) { return (y ^ (x | (~z))); }

   function FF(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function GG(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function HH(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function II(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };

   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";

           for (var n = 0; n < string.length; n++) {

                   var c = string.charCodeAt(n);

                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
                   else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }

           }

           return utftext;
   };
	return{
		//Write code below..
		calc:function(cadena){
		   var x=Array();
		   var k,AA,BB,CC,DD,a,b,c,d;
		   var S11=7, S12=12, S13=17, S14=22;
		   var S21=5, S22=9 , S23=14, S24=20;
		   var S31=4, S32=11, S33=16, S34=23;
		   var S41=6, S42=10, S43=15, S44=21;
		   string = Utf8Encode(cadena);
		   x = ConvertToWordArray(string);
		   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
		   for (k=0;k<x.length;k+=16) {
		           AA=a; BB=b; CC=c; DD=d;
		           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		           a=AddUnsigned(a,AA);
		           b=AddUnsigned(b,BB);
		           c=AddUnsigned(c,CC);
		           d=AddUnsigned(d,DD);
		   	}
			var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
			return temp.toLowerCase();
		}
	};
}());