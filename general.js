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
            salirSistema: function(e,variable){
                if(confirm(e)){
					location.replace("index.php?" + variable + "=true");
                }
            },

            limpiarInput: function(mod){
                texto=fila=getdisctId(mod);
                texto.value='';
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
            getValControl: function(id){
                var valor;
                valor=document.getElementById(id).value;
                return valor;
            },
            getlistval: function(id){
                var e;
                var strUser;
                e = document.getElementById(id);
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
            getURLVal: function(name){
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
            goToURLonChange: function(valselect){
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
      cambiarDisplay: function(id){
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
          teclap=this.getTecla(e);
          teclan=chr(teclap);
          if(IsNumeric(teclan)==false){
            return "Solo está peritido escribir numeros";
          }
        },
        blockToChar: function(e){
          //bloquear teclado a solo letras
          teclap=this.getTecla(e);
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
          teclap=this.getTecla(e);
          teclan=chr(teclap);
          if(IsNumeric(teclan)==false){
            return "Solo esta permitido escribir numeros";
          }
        }
  };
}());

general.efectos=(function(){
  //Submodulo Objeto
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
                  oncompletefi();
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
    slideDown: function(elem) {
      fila=this.IdClassDis(elem);
      fila.style.maxHeight = '1000px';
      // We're using a timer to set opacity = 0 because setting max-height = 0 doesn't (completely) hide the element.
      fila.style.opacity = '1';
    },
    slideUp: function(elem) {
      fila=getdisctId(elem);
      fila.style.maxHeight = '0';
      this.once(1,function(){
        fila.style.opacity = '0';
      });
    },
    toTop:function(id){
        var fila;
        fila=getdisctId(id);
        fila.scrollTop = 0
    },
    scrollDivDown: function(id){
        var fila;
        fila=getdisctId(id);
        fila.scrollTop += step;
        timerDown = setTimeout("scrollDivDown('" + id + "')", 10);
    },
    scrollDivUp: function(id){
        var fila;
        fila=getdisctId(id);
        fila.scrollTop -= step;
        timerUp = setTimeout("scrollDivUp('" + id + "')", 10);
    },
    toBottom: function(id) {
        var fila;
        fila=getdisctId(id);
        fila.scrollTop=fila.scrollHeight
    },
    toPoint: function(id,point_var){
        var fila;
        fila=getdisctId(id);
        fila.scrollTop = point_var;
    },
    scroll: function(id){
        var fila;
        fila=getdisctId(id);
        fila.scrollTop = fila.offsetTop
    },
    blink: function(id){
        var fila;
        fila=getdisctId(id);
        fila.className="blink_div";
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
      distIdAjax: function(id){
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
      },
      getURLPar: function(name){
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
      ajaxSck:function(){
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
      ajaxSck5:function(){
        var xmlhttp=false;
        if (!xmlhttp && typeof XMLHttpRequest!='undefined'){
          xmlhttp = new XMLHttpRequest();
        }
        else{
          xmlhttp=undefined;
        }
        return xmlhttp;
      },
      getTrim: function(cadena){
        return cadena.replace(/^\s+/g,'').replace(/\s+$/g,'');
      },
      setIDreturnToZero: function(){
        IDClass=0;
      },
      setID: function(){
        IDClass++;
      },
      getID: function(){
        return IDClass;
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
            formfinal=this.distIdAjax(arrayajax[4]);
            formid=formfinal.id;
            //contenedorw=distIdAjax(arrayajax[3]);
            formobj=formfinal;
            //obtener el id del form al que pertenece el boton
            sock=this.ajaxSck();
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
            //alert(ajxProtocol);
            ajxFileS=arrayajax[1];
            //alert(ajxFileS); Variable de Control
            cadenaArgs=arrayajax[2] + "=true";      
            //alert(cadenaArgs);
            contenedorw=this.distIdAjax(arrayajax[3]);
            //alert(contenedorw.id);
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
              //alert(cadenaArgs);
            }
            if(flags=="VARURL"){
              //para cuando los argumentos son variables pasadas por url
              for(i=6;i<arrayajax.length; i++){
                cadenaArgs=cadenaArgs + "&" + arrayajax[i] + "=" + this.getURLPar(arrayajax[i]);
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
                ajxSocket=new XMLHttpRequest();
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
                ajxSocket=new XMLHttpRequest();
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
                ajxSocket=this.ajaxSck();
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
                ajxSocket=this.ajaxSck();
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
          workerName=this.distIdWebWork(archivo);
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