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
var cadena;
var idreal;
var objeto;
hex_chr="0123456789abcdef";
IDClass=0;
g=(function(){
    //aqui se escriben las funciones privadas
    // Private variables / properties
	// var p1,p2;
	// Private methods
	// Write code below...
	function easeInOutQuad(t, b, c, d){
	  t /= d / 2;
	  if (t < 1) return c / 2 * t * t + b;
	  t--;
	  return -c / 2 * (t * (t - 2) - 1) + b;
	};
	function getScreenCordinates(obj) {
        var p = {};
        p.x = obj.offsetLeft;
        p.y = obj.offsetTop;
        while (obj.offsetParent) {
            p.x = p.x + obj.offsetParent.offsetLeft;
            p.y = p.y + obj.offsetParent.offsetTop;
            if (obj == document.getElementsByTagName("body")[0]) {
                break;
            }
            else {
                obj = obj.offsetParent;
            }
        }
        return p;
	};
	return{
			//Describir funciones públicas
			getdisctId: function(id){
				var cadena;
				if(typeof id==='string'){
					cadena=id;
			      	if(cadena.search("#")==0){
			        	objeto=document.querySelector(id);
			      	}
			      	else if(cadena.search(".")==0){
						objeto=document.querySelector(id);
					}
					else{
						return -1;
					}
					g.log(objeto);
					return objeto;
				}
			},
			getelTag: function(tag){
				var arrtags=[];
				if(tag!=undefined){
					arrtags=document.querySelectorAll(tag);
					return arrtags;
				}
				else{
					return -1;
				}
			},
			log: function(msg){
				console.log(msg);
            },
			each:function(objeto,callbackeach){
		      	var initial_array;
		      	var x,y,valor,indice;
		        if(objeto.length!=undefined){
		        	objeto.forEach(callbackeach);
		        }
		        else if(typeof objeto==='object'){
		        	for(prop in objeto){
		        		callbackeach(prop,objeto);
		        	}
		        }
		        else{
		        	g.log("Is not an array!");
		        }
		      },
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
            browser: function(){
				//Detect browser and write the corresponding name
				if (navigator.userAgent.search("MSIE") >= 0){
				    g.log('"MS Internet Explorer ');
				    var position = navigator.userAgent.search("MSIE") + 5;
				    var end = navigator.userAgent.search("; Windows");
				    var version = navigator.userAgent.substring(position,end);
				    g.log(version + '"');
				}
				else if (navigator.userAgent.search("Chrome") >= 0){
					g.log('"Google Chrome ');// For some reason in the browser identification Chrome contains the word "Safari" so when detecting for Safari you need to include Not Chrome
				    var position = navigator.userAgent.search("Chrome") + 7;
				    var end = navigator.userAgent.search(" Safari");
				    var version = navigator.userAgent.substring(position,end);
				    g.log(version + '"');
				}
				else if (navigator.userAgent.search("Firefox") >= 0){
				    g.log('"Mozilla Firefox ');
				    var position = navigator.userAgent.search("Firefox") + 8;
				    var version = navigator.userAgent.substring(position);
				    g.log(version + '"');
				}
				else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0){//<< Here
				    g.log('"Apple Safari ');
				    var position = navigator.userAgent.search("Version") + 8;
				    var end = navigator.userAgent.search(" Safari");
				    var version = navigator.userAgent.substring(position,end);
				    g.log(version + '"');
				}
				else if (navigator.userAgent.search("Opera") >= 0){
				    g.log('"Opera ');
				    var position = navigator.userAgent.search("Version") + 8;
				    var version = navigator.userAgent.substring(position);
				    g.log(version + '"');
				}
				else{
				    g.log('"Other"');
				}
				return navigator.userAgent;
            },
            rReplace: function(direccion,variable,valor){
                location.replace([direccion]+"?"+[variable]+"="+[valor]);
            },
            rHref: function(direccion,variable,valor){
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
            utf8_encode: function(argString){
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

              if (argString === null || typeof argString === 'undefined'){
                return '';
              }

              var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
              var utftext = '',
                start, end, stringl = 0;

              start = end = 0;
              stringl = string.length;
              for (var n = 0; n < stringl; n++){
                var c1 = string.charCodeAt(n);
                var enc = null;

                if (c1 < 128){
                  end++;
                } else if (c1 > 127 && c1 < 2048){
                  enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                  );
                } else if ((c1 & 0xF800) != 0xD800){
                  enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                  );
                } else { // surrogate pairs
                  if ((c1 & 0xFC00) != 0xD800){
                    throw new RangeError('Unmatched trail surrogate at ' + n);
                  }
                  var c2 = string.charCodeAt(++n);
                  if ((c2 & 0xFC00) != 0xDC00){
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
                  }
                  c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
                  enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                  );
                }
                if (enc !== null){
                  if (end > start){
                    utftext += string.slice(start, end);
                  }
                  utftext += enc;
                  start = end = n + 1;
                }
              }

              if (end > start){
                utftext += string.slice(start, stringl);
              }

              return utftext;
            },
            utf8_decode: function(str_data){
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

              while (i < str_data.length){
                c1 = str_data.charCodeAt(i);
                if (c1 <= 191){
                  tmp_arr[ac++] = String.fromCharCode(c1);
                  i++;
                } else if (c1 <= 223){
                  c2 = str_data.charCodeAt(i + 1);
                  tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
                  i += 2;
                } else if (c1 <= 239){
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
            gotolocal: function(valselect){
              var URL;
              URL=valselect;
              location.href=URL;
            },
            gotoremote: function(valselect){
              var URL;
              URL="http://"+valselect;
              location.href=URL;
            },
            ajax: function(){
            	var sock;
				sock=g.ajax.getxhr();
				return sock;
            },
			getslides:function(opciones){
				//write code below...
				//helpers to public functions
				/*
				 Private functions
				 * */
				function initSlider(){
					
				}
				
				return{
					//write code below...
					/* Public functions
					 */
					run:function(){
						//write code below...
						//instantiate slideshow and return ...
					}	
				}
			},
			accordeon:function(elemento,opciones){
				//write code below...
				/*
				 Private functions
				 * */
				return{
					//write code below...
					/*
					 Public functions
					 * */	
				}
			},
            dom: function(domel){
				return{
					hide: function(){
						var fila;
						if(!document.getElementById){
							return false;
						}
						fila=g.getdisctId(domel);
						fila.style.display="none";
					},
					show:function(){
				        var fila;
				          if(!document.getElementById){
				              return false;
				          }
				          fila=g.getdisctId(domel);
				          fila.style.display="block"; 
				      },
				      css:function(estilo){
				        var fila;
				          if(!document.getElementById){
				              return false;
				          }
				          if(estilo==''){
				              return false;
				          }
				          fila=g.getdisctId(domel);
				          fila.style=estilo;
				      },
				      find:function(selector,callbackfind){
						// Final found elements
						var found_elements = [];
						var i;
						// Find all the outer matched elements
						var outers = document.querySelectorAll(domel);
						for(i=0;i<outers.length;i++){
							var elements_in_outer=outers[i].querySelectorAll(selector);
							// document.querySelectorAll() returns an "array-like" collection of elements
							// convert this "array-like" collection to an array
							elements_in_outer=Array.prototype.slice.call(elements_in_outer);
							found_elements=found_elements.concat(elements_in_outer);
						}
						// The final 4 elements
						if(found_elements.length>0){
							g.log(found_elements);
							callbackfind(found_elements);
						}
				      },
				      each:function(callbackeach){
				      	var objeto;
				      	var initial_array;
				      	var x,y,valor,indice;
				      	objeto=g.getelTag(domel);
				        if(objeto[0].id!=undefined){
				        	objeto.forEach(callbackeach);
				        }
				        else{
				        	g.log("Is not an Object!");
				        }
				      },
				      animate: function(target){
						return {
							to:function(x,y){
								move(target).to(x,y);
							},
							rotate:function(deg){
								move(target).rotate(deg);
							},
							scale:function(deg){
								move(target).scale(deg);
							},
							set:function(x,y){
								move(target).set(x,y);
							},
							duration:function(deg){
								move(target).duration(deg);
							},
							skew:function(x,y){
								move(target).skew(x,y);
							},
							then:function(){
								return{
									set:function(x,y){
										move(target).then().set(x,y);
									},
									duration:function(deg){
										move(target).then().duration(deg);
									},
									scale:function(deg){
										move(target).then().scale(deg);
									},
									pop:function(){
										move(target).then().pop();
									},
								}
							},
							end:function(){
								move(target).end();
							}
						}
					  },
				      addClass:function(classele){
				      	//write code below...
				      	var obj;
				      	obj=g.getdisctId(domel);
				      	obj.classList.add(classele);
				      },
				      removeClass:function(classele){
				      	//write code below...
				      	var obj;
				      	obj=g.getdisctId(domel);
				      	obj.classList.remove(classele);
				      },
					  toggleClass:function(classele){
				      	//write code below...
				      	var obj;
				      	obj=g.getdisctId(domel);
				      	obj.classList.toggle(classele);
				      },
				      cursor:function(estilo){
				        var fila;
				      	switch(estilo){
				      		case 'auto':
								fila=g.getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'pointer':
								fila=g.getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'wait':
								fila=g.getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'text':
								fila=g.getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'initial':
								fila=g.getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'inherit':
								fila=g.getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'none':
								fila=g.getdisctId(domel);
								fila.style.cursor=estilo;
								break;
				      	}
				      },
				      toggleDisplay: function(){
				        var fila;
				            if (!document.getElementById){
				                return false;
				            }
				            fila=g.getdisctId(domel);
				            if(fila.style.display != "none"){
				              fila.style.display = "none";
				            }
				            else{
				              fila.style.display = "";
				            }
				        },
				        resetText: function(){
				          var textcontent;
				          textcontent=g.getdisctId(domel);
				          textcontent.value='';
				        },
			            val: function(){
			                var valor;
			                var obj;
			                obj=g.getdisctId(domel);
			                if(obj.type!='select-one' && obj.type!="file"){
								valor=obj.value;
			                }
			                else{
			                	if(obj.type=="file"){
			                		valor=obj.files[0];
			                	}
			                	else{
			                		valor=obj.options[obj.selectedIndex].value;
			                	}
			                }
			                return valor;
			            },
						fadeIn:function(tiempo){
						    var op = 0.1;  // initial opacity
						    var intervalo=tiempo/80;
						    var element;
						    element=g.getdisctId(domel);
						    element.style.display = 'block';
						    var timer = setInterval(function(){
						        if (op >= 1){
						            clearInterval(timer);
						        }
						        element.style.opacity = op;
						        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
						        op += op * 0.1;
						    }, intervalo);
				      },
				      fadeOut:function(tiempo){
					    var op = 1;  // initial opacity
					    var intervalo=tiempo/80;
					    var element;
					    element=g.getdisctId(domel);
					    var timer = setInterval(function(){
					        if (op <= 0.1){
					            clearInterval(timer);
					            element.style.display = 'none';
					        }
					        element.style.opacity = op;
					        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
					        op -= op * 0.1;
					    }, intervalo);
				      },
				    gotodiv: function(){
				        var objeto;
				        objeto=g.getdisctId(domel);
				        objeto.scrollIntoView();
				    },
					smooth: function(target, options){
					    var start = window.pageYOffset,
					        opt = {
					            duration: options.duration,
					            offset: options.offset || 0,
					            callback: options.callback,
					            easing: easeInOutQuad
					        },
					        distance = typeof target === 'string'
					            ? opt.offset + document.querySelector(target).getBoundingClientRect().top
					            : target,
					        duration = typeof opt.duration === 'function'
					            ? opt.duration(distance)
					            : opt.duration,
					        timeStart, timeElapsed;
					    requestAnimationFrame(function(time){ timeStart = time; loop(time); });
					    function loop(time){
					        timeElapsed = time - timeStart;
					        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
					        if (timeElapsed < duration){
					        	requestAnimationFrame(loop)
					        }
					        else{
					        	end();
					        }
					    }
					    function end(){
					        window.scrollTo(0, start + distance);
					
					        if (typeof opt.callback==='function'){
					        	opt.callback();
					        }
					    }
					    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
					    function easeInOutQuad(t, b, c, d)  {
					        t /= d / 2
					        if(t < 1) return c / 2 * t * t + b
					        t--
					        return -c / 2 * (t * (t - 2) - 1) + b
					    }
					},
				    blink: function(status){
				        var fila;
				        switch(status){
				        	case 'on':
					        	fila=g.getdisctId(domel);
					        	fila.className="blink_div";
					        	break;
					        case 'off':
					        	fila=g.getdisctId(domel);
					        	fila.className="";
					        	break;
				        	
				        }
				    },
					submit:function(callbackfunc){
			        	var control;
			        	control=g.getdisctId(domel);
				        control.onsubmit=function(){
				        	callbackfunc();
				        }
			      	},
				        click:function(callbackfunc){
				        	var control;
				        	control=g.getdisctId(domel);
					        control.onclick=function(){
					        	callbackfunc();
					        }
				      	},
				      	change:function(callbackfunc){
					        var control;
				        	control=g.getdisctId(domel);
					        control.onchange=function(){
					        	callbackfunc();
					        }
				      	},
				      	blur:function(callbackfunc){
					        var control;
				        	control=g.getdisctId(domel);
					        control.onblur=function(){
					        	callbackfunc();
					        }
				      	},
				        on:function(){
							var control;
							var idcontrol;
							var event;
							var callback;
							idcontrol=domel;
							event=arguments[1];
							callback=arguments[2];;
							control=g.getdisctId(idcontrol);
							g.log(control);
				        	switch(event){
				        		case 'error':
									control.onerror=function(){
							        	callback();
							        }
				        			break;
				        		case 'load':
									control.onload=function(){
							        	callback();
							        }
				        			break;
				        		case 'submit':
									control.onsubmit=function(){
							        	callback();
							        }
				        			break;
				        		case 'click':
									control.onclick=function(){
							        	callback();
							        }
				        			break;
				        		case 'blur':
									control.onblur=function(){
							        	callback();
							        }
				        			break;
				        		case 'change':
									control.onchange=function(){
							        	callback();
							        }
							        break;
								case 'resize':
									control.onresize=function(){
							        	callback();
							        }
				        			break;
								case 'unload':
									control.onunload=function(){
							        	callback();
							        }
				        			break;
								case 'pageshow':
									control.onpageshow=function(){
							        	callback();
							        }
				        			break;
								case 'popstate':
									control.onpopstate=function(){
							        	callback();
							        }
				        			break;
				        	}
				    },
					load:function(modulourl){
				        var xmlhttp=false;
				        var filecont;
				        var contentdiv;
				        var n;
				        var allScripts;
				        var callback;
				        callback=arguments[1];
				        contentdiv=g.getdisctId(domel);
				        xmlhttp=g.ajax.getxhr();
				        if (typeof callback==='function'){
							callback();
				        }
					    xmlhttp.onreadystatechange = function(){
					        if(xmlhttp.readyState==XMLHttpRequest.DONE){
					           if(xmlhttp.status == 200){
					               contentdiv.innerHTML = xmlhttp.responseText;
					               allScripts=contentdiv.getElementsByTagName('script');
					               for (n=0;n<allScripts.length;n++){
										//run script inside rendered div
										eval(allScripts[n].innerHTML);
					               }
					               if(callback!=undefined){
								        if(typeof callback==='function'){
											callback();
								        }
								        else{
								        	g.log("No se puede ejecutar la llamada, no es tipo funcion");
								        }
					               }
					           }
					           else {
					               g.log('Error');
					           }
					        }
					    }
			
					    xmlhttp.open("GET", modulourl, true);
					    xmlhttp.send();
				    },
				}
            },
    };
}());

g.objeto=(function(){
  //Submodulo Objeto
  return{
        getKey: function(e){
          if(window.event)keyCode=window.event.keyCode;
          else if(e) keyCode=e.which;
          return keyCode;
        },
        blockNumber: function(e){
          //bloquear teclado a solo numeros
          teclap=g.objeto.getTecla(e);
          teclan=chr(teclap);
          if(IsNumeric(teclan)==false){
            return "Solo está peritido escribir numeros";
          }
        },
        blockChar: function(e){
          //bloquear teclado a solo letras
          teclap=g.objeto.getTecla(e);
          teclan=chr(teclap);
          if(IsNumeric(teclan)==true){
            return "Solo está peritido escribir letras";
          }
        },
        intval: function(number){
          return parseInt(number);
        },
        floatval: function(number){
          return parseFloat(number);
        },
        bloqNum: function(e){
          teclap=g.objeto.getTecla(e);
          teclan=chr(teclap);
          if(IsNumeric(teclan)==false){
            return "Solo esta permitido escribir numeros";
          }
        },
  };
}());
g.ajax=(function(){
  //Submodulo Ajax
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
	      setLocal: function(varname,valor){
	        //localstorage programming
	        if (typeof(Storage) !== "undefined"){
	            // Code for localStorage/sessionStorage
	            localStorage.setItem(varname,valor);
	        }
	      },
	      getLocal: function(varname){
	        if (typeof(Storage)!=="undefined"){
	            localStorage.getItem(varname); 
	        }
	      },
	      upload: function(fileid,callbackup){
	      	var filectrl;
	      	var file;
	      	var reader;
	      	var finalfile;
	      	var fileapi;
	      	var formData;
	      	var objnombrefile;
	      	objnombrefile={};
	      	//Validación si hay los elementos para realizar la carga asíncrona de archivos
	      	if(window.File && window.FileList && window.Blob && window.FileReader && window.FormData){
			    reader=new FileReader();
				filectrl=g.getdisctId(fileid); //Files[0] = 1st file
				file=filectrl.files[0];
				reader.readAsBinaryString(file);
				reader.onload=function(event){
				    var result=event.target.result;
				    var fileName=filectrl.files[0].name;
				    g.ajax.post(
						{
							data:btoa(result),
							name:fileName
						},
						"upload.php",
						function(data){
							g.log("data devuelta: ");
							g.log(data);
							callbackup(JSON.parse(data));
						}
					);
				};
				reader.onerror=function(event){
					g.log("Hubo un error de lectura de disco.");
				}
			}
			else{
			    // browser doesn't supports File API
			    g.log("browser doesn't supports File API");
			}
	      },
	      post: function(){
	      	/*
	      	 * Parámetros:
	      	 * 0 objvariables
	      	 * 1 dirsocket
	      	 * 2 [callback] optional
	      	 */
	      	var i;
	        var arrayvar;
	        var ajxProtocol;
	        var dirsocket;
	        var variablesobj;
	        var variablesaux;
	        var sock;
	        var callback;
	        var data;
	        var responset;
	        var contenedor;
	        var headers;
	        arrayvar=new Array();
	        variablesobj={};
	        variablesaux={};
	        //almacenar argumentos en el array 'arrayvar'
	        for(i=0;i<arguments.length;i++){ 
	          arrayvar[i]=arguments[i];
	        }
			if(arguments.length<2){
	      		g.log("Faltan Argumentos " + arguments.length);
	      	}
	      	else{
	      		// Obtener objeto AJAX;
	      		sock=g.ajax.getxhr();
	      		// Obtener objeto de variables;
	      		variablesaux=JSON.stringify(arrayvar[0]);
	      		variablesobj=JSON.parse(variablesaux);
	      		g.log(variablesobj);
	      		// Obtener string de protocolo
	      		ajxProtocol="POST";
	      		// Obtener string de dir archivo socket
	      		dirsocket=arrayvar[1];
	      		// Obtener string de enctype
	      		headers="application/x-www-form-urlencoded";
	      		// VALIDACIONES
	      		if(arguments[2]!=undefined){
		      		if(typeof arguments[2]==="function"){
						callback=arguments[2];
					}
					else{
						g.log("El argumento Callback debe ser de tipo función");
					}
	      		}
	      		////////////////////////////////////////////////////
	      		// EJECUTAR FUNCION Y CALLBACK//////////////////////
		        sock.open(ajxProtocol,dirsocket,true);
				sock.onreadystatechange=function(){
					if(sock.readyState==4 && sock.status==200){
		                data=sock.responseText;
		                g.log("STATUS: " + sock.readyState + " " + sock.status + " " + sock.statusText);
		                if(callback!=undefined){
		                	if(typeof callback==="function"){
								callback(data);
							}
							else{
								g.log("El parámetro Callback no es función o no existe!");
							}
		                }
		                else{
							g.log("El parámetro Callback no existe!");
						}
				 	}
				}
	      		sock.setRequestHeader("Content-Type",headers);
				sock.send(JSON.stringify(variablesobj));
		        //////////////////////////////////////////////////// 
			}
	      },
		  get: function(){
	      	/*
	      	 * Parámetros:
	      	 * 0 objvariables
	      	 * 1 dirsocket
	      	 * 2 [callback] optional
	      	 */
	      	var i;
	        var arrayvar;
	        var ajxProtocol;
	        var dirsocket;
	        var variablesobj;
	        var variablesaux;
	        var sock;
	        var callback;
	        var data;
	        var responset;
	        var enctype;
	        var contenedor;
	        arrayvar=new Array();
	        variablesobj={};
	        variablesaux={};
	        //almacenar argumentos en el array 'arrayvar'
	        for(i=0;i<arguments.length;i++){ 
	          arrayvar[i]=arguments[i];
	        }
			if(arguments.length<2){
	      		g.log("Faltan Argumentos " + arguments.length);
	      	}
	      	else{
	      		// Obtener objeto AJAX;
	      		sock=g.ajax.getxhr();
	      		// Obtener string de protocolo
	      		ajxProtocol="GET";
	      		// Obtener string de dir archivo socket
	      		dirsocket=arrayvar[1];
	      		// VALIDACIONES
	      		if(arguments[2]!=undefined){
		      		if(typeof arguments[2]==="function"){
						callback=arguments[2];
					}
					else{
						g.log("El argumento Callback debe ser de tipo función");
					}
	      		}
	      		////////////////////////////////////////////////////
	      		// EJECUTAR FUNCION Y CALLBACK//////////////////////
		        sock.open(ajxProtocol,dirsocket,true);
				sock.onreadystatechange=function(){
					if(sock.readyState==4 && sock.status==200){
		                data=sock.responseText;
		                g.log("STATUS: " + sock.readyState + " " + sock.status + " " + sock.statusText);
		                if(callback!=undefined){
		                	if(typeof callback==="function"){
								callback(data);
							}
							else{
								g.log("El parámetro Callback no es función o no existe!");
							}
		                }
		                else{
							g.log("El parámetro Callback no existe!");
						}
				 	}
				}
				sock.send(null);
		        //////////////////////////////////////////////////// 
			}
	      },
	};
}());
g.webwork=(function(){
	//Submodulo WebWorkers
  return{
      getWebWork: function(archivo){
        var workerSck;
        var workerName;
        if(archivo!=''){
          workerName=g.getdisctId(archivo);
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
g.watch=(function(){
	//Submodulo WebWorkers
  return{
	  obj: function(archivo){
		if(!Object.prototype.watch){
			Object.defineProperty(Object.prototype, "watch", {
				  enumerable: false
				, configurable: true
				, writable: false
				, value: function(prop, handler){
					var
					  oldval = this[prop]
					, newval = oldval
					, getter = function(){
						return newval;
					}
					, setter = function(val){
						oldval = newval;
						return newval = handler.call(this, prop, oldval, val);
					}
					;
					
					if (delete this[prop]){ // can't watch constants
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

g.unwatch=(function(){
	//Submodulo WebWorkers
  return{
  	obj: function(){
		if(!Object.prototype.unwatch){
			Object.defineProperty(Object.prototype, "unwatch", {
				  enumerable: false
				, configurable: true
				, writable: false
				, value: function(prop){
					var val = this[prop];
					delete this[prop]; // remove accessors
					this[prop] = val;
				}
			});
		}
  	}
  };
}());
//Rutas personalizadas con argumentos PHP como slash y hashes para los nombres de las páginas a visitar
g.path=(function(){
	//Submodulo Path / Rewrite PathJS
	function version(){
		return "0.8.4"; 
	};
	return{
		//Write code below..
		getVersion:function(){
	        return version();
	    },
	    map:function(path){
	        if(g.path.routes.defined.hasOwnProperty(path)){
	            return g.path.routes.defined[path];
	        }
	        else{
				return new g.path.core.route(path);
	        }
	    },
	    root: function(path){
	        g.path.routes.root = path;
	    },
	    rescue: function(fn){
	        g.path.routes.rescue = fn;
	    },
	    history: {
	        initial:{}, // Empty container for "Initial Popstate" checking variables.
	        pushState: function(state, title, path){
	            if(g.path.history.supported){
	                if(g.path.dispatch(path)){
	                    history.pushState(state, title, path);
	                }
	            } else {
	                if(g.path.history.fallback){
	                    window.location.hash = "#" + path;
	                }
	            }
	        },
	        popState: function(event){
	            var initialPop = !g.path.history.initial.popped && location.href == g.path.history.initial.URL;
	            g.path.history.initial.popped = true;
	            if(initialPop) return;
	            g.path.dispatch(document.location.pathname);
	        },
	        listen: function(fallback){
	            g.path.history.supported = !!(window.history && window.history.pushState);
	            g.path.history.fallback  = fallback;
	
	            if(g.path.history.supported){
	                g.path.history.initial.popped = ('state' in window.history), g.path.history.initial.URL = location.href;
	                window.onpopstate = g.path.history.popState;
	            }
	            else{
	                if(g.path.history.fallback){
	                    for(route in g.path.routes.defined){
	                        if(route.charAt(0) != "#"){
	                          g.path.routes.defined["#"+route] = g.path.routes.defined[route];
	                          g.path.routes.defined["#"+route].path = "#"+route;
	                        }
	                    }
	                    g.path.listen();
	                }
	            }
	        }
	    },
	    match:function(path, parameterize){
	        var params = {}, route = null, possible_routes, slice, i, j, compare;
	        for (route in g.path.routes.defined){
	            if (route !== null && route !== undefined){
	                route = g.path.routes.defined[route];
	                possible_routes = route.partition();
	                for (j = 0; j < possible_routes.length; j++){
	                    slice = possible_routes[j];
	                    compare = path;
	                    if (slice.search(/:/) > 0){
	                        for (i = 0; i < slice.split("/").length; i++){
	                            if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")){
	                                params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
	                                compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
	                            }
	                        }
	                    }
	                    if (slice === compare){
	                        if (parameterize){
	                            route.params = params;
	                        }
	                        return route;
	                    }
	                }
	            }
	        }
	        return null;
	    },
	    dispatch:function(passed_route){
	        var previous_route, matched_route;
	        if (g.path.routes.current !== passed_route){
	            g.path.routes.previous = g.path.routes.current;
	            g.path.routes.current = passed_route;
	            matched_route = g.path.match(passed_route, true);
	
	            if (g.path.routes.previous){
	                previous_route = g.path.match(g.path.routes.previous);
	                if (previous_route !== null && previous_route.do_exit !== null){
	                    previous_route.do_exit();
	                }
	            }
	
	            if (matched_route !== null){
	                matched_route.run();
	                return true;
	            } else {
	                if (g.path.routes.rescue !== null){
	                    g.path.routes.rescue();
	                }
	            }
	        }
	    },
	    listen:function(){
	        var fn = function(){ g.path.dispatch(location.hash); }
	
	        if (location.hash === ""){
	            if (g.path.routes.root !== null){
	                location.hash = g.path.routes.root;
	            }
	        }
	
	        // The 'document.documentMode' checks below ensure that PathJS fires the right events
	        // even in IE "Quirks Mode".
	        if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)){
	            window.onhashchange = fn;
	        } else {
	            setInterval(fn, 50);
	        }
	
	        if(location.hash !== ""){
	            g.path.dispatch(location.hash);
	        }
	    },
	    core:{
	        route:function(path){
	            this.path = path;
	            this.action = null;
	            this.do_enter = [];
	            this.do_exit = null;
	            this.params = {};
	            g.path.routes.defined[path] = this;
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
g.path.core.route.prototype = {
    'to': function(fn){
        this.action = fn;
        return this;
    },
    enter: function(fns){
        if (fns instanceof Array){
            this.do_enter = this.do_enter.concat(fns);
        } else {
            this.do_enter.push(fns);
        }
        return this;
    },
    exit: function(fn){
        this.do_exit = fn;
        return this;
    },
    partition: function(){
        var parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
        while (text = re.exec(this.path)){
            parts.push(text[1]);
        }
        options.push(this.path.split("(")[0]);
        for (i = 0; i < parts.length; i++){
            options.push(options[options.length - 1] + parts[i]);
        }
        return options;
    },
    run: function(){
        var halt_execution = false, i, result, previous;

        if (g.path.routes.defined[this.path].hasOwnProperty("do_enter")){
            if (g.path.routes.defined[this.path].do_enter.length > 0){
                for (i = 0; i < g.path.routes.defined[this.path].do_enter.length; i++){
                    result = g.path.routes.defined[this.path].do_enter[i].apply(this, null);
                    if (result === false){
                        halt_execution = true;
                        break;
                    }
                }
            }
        }
        if (!halt_execution){
            g.path.routes.defined[this.path].action();
        }
    }
};

g.md5=(function(){
	//Submodulo WebWorkers
   function RotateLeft(lValue, iShiftBits){
           return(lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY){
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4){
                   return(lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4){
                   if (lResult & 0x40000000){
                           return(lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return(lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return(lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z){ return(x & y) | ((~x) & z); }
   function G(x,y,z){ return(x & z) | (y & (~z)); }
   function H(x,y,z){ return(x ^ y ^ z); }
   function I(x,y,z){ return(y ^ (x | (~z))); }

   function FF(a,b,c,d,x,s,ac){
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function GG(a,b,c,d,x,s,ac){
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };
   function HH(a,b,c,d,x,s,ac){
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };
   function II(a,b,c,d,x,s,ac){
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };
   function ConvertToWordArray(string){
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ){
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
   function WordToHex(lValue){
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++){
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string){
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";

           for (var n = 0; n < string.length; n++){

                   var c = string.charCodeAt(n);

                   if (c < 128){
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)){
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
		   for (k=0;k<x.length;k+=16){
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
/**
 * Libreria de movimientos de elementos del DOM
 * */
;(function(){

/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Meta info, accessible in the global scope unless you use AMD option.
 */

require.loader = 'component';

/**
 * Internal helper object, contains a sorting function for semantiv versioning
 */
require.helper = {};
require.helper.semVerSort = function(a, b) {
  var aArray = a.version.split('.');
  var bArray = b.version.split('.');
  for (var i=0; i<aArray.length; ++i) {
    var aInt = parseInt(aArray[i], 10);
    var bInt = parseInt(bArray[i], 10);
    if (aInt === bInt) {
      var aLex = aArray[i].substr((""+aInt).length);
      var bLex = bArray[i].substr((""+bInt).length);
      if (aLex === '' && bLex !== '') return 1;
      if (aLex !== '' && bLex === '') return -1;
      if (aLex !== '' && bLex !== '') return aLex > bLex ? 1 : -1;
      continue;
    } else if (aInt > bInt) {
      return 1;
    } else {
      return -1;
    }
  }
  return 0;
}

/**
 * Find and require a module which name starts with the provided name.
 * If multiple modules exists, the highest semver is used. 
 * This function can only be used for remote dependencies.
 * @param {String} name - module name: `user~repo`
 * @param {Boolean} returnPath - returns the canonical require path if true, 
 *                               otherwise it returns the epxorted module
 */
require.latest = function (name, returnPath) {
  function showError(name) {
    throw new Error('failed to find latest module of "' + name + '"');
  }
  // only remotes with semvers, ignore local files conataining a '/'
  var versionRegexp = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;
  var remoteRegexp = /(.*)~(.*)/;
  if (!remoteRegexp.test(name)) showError(name);
  var moduleNames = Object.keys(require.modules);
  var semVerCandidates = [];
  var otherCandidates = []; // for instance: name of the git branch
  for (var i=0; i<moduleNames.length; i++) {
    var moduleName = moduleNames[i];
    if (new RegExp(name + '@').test(moduleName)) {
        var version = moduleName.substr(name.length+1);
        var semVerMatch = versionRegexp.exec(moduleName);
        if (semVerMatch != null) {
          semVerCandidates.push({version: version, name: moduleName});
        } else {
          otherCandidates.push({version: version, name: moduleName});
        } 
    }
  }
  if (semVerCandidates.concat(otherCandidates).length === 0) {
    showError(name);
  }
  if (semVerCandidates.length > 0) {
    var module = semVerCandidates.sort(require.helper.semVerSort).pop().name;
    if (returnPath === true) {
      return module;
    }
    return require(module);
  }
  // if the build contains more than one branch of the same module
  // you should not use this funciton
  var module = otherCandidates.sort(function(a, b) {return a.name > b.name})[0].name;
  if (returnPath === true) {
    return module;
  }
  return require(module);
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("component~transform-property@0.0.1", function (exports, module) {

var styles = [
  'webkitTransform',
  'MozTransform',
  'msTransform',
  'OTransform',
  'transform'
];

var el = document.createElement('p');
var style;

for (var i = 0; i < styles.length; i++) {
  style = styles[i];
  if (null != el.style[style]) {
    module.exports = style;
    break;
  }
}

});

require.register("component~has-translate3d@0.0.3", function (exports, module) {

var prop = require('component~transform-property@0.0.1');

// IE <=8 doesn't have `getComputedStyle`
if (!prop || !window.getComputedStyle) {
  module.exports = false;

} else {
  var map = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform'
  };

  // from: https://gist.github.com/lorenzopolidori/3794226
  var el = document.createElement('div');
  el.style[prop] = 'translate3d(1px,1px,1px)';
  document.body.insertBefore(el, null);
  var val = getComputedStyle(el).getPropertyValue(map[prop]);
  document.body.removeChild(el);
  module.exports = null != val && val.length && 'none' != val;
}

});

require.register("yields~has-transitions@1.0.0", function (exports, module) {
/**
 * Check if `el` or browser supports transitions.
 *
 * @param {Element} el
 * @return {Boolean}
 * @api public
 */

exports = module.exports = function(el){
  switch (arguments.length) {
    case 0: return bool;
    case 1: return bool
      ? transitions(el)
      : bool;
  }
};

/**
 * Check if the given `el` has transitions.
 *
 * @param {Element} el
 * @return {Boolean}
 * @api private
 */

function transitions(el, styl){
  if (el.transition) return true;
  styl = window.getComputedStyle(el);
  return !! parseFloat(styl.transitionDuration, 10);
}

/**
 * Style.
 */

var styl = document.body.style;

/**
 * Export support.
 */

var bool = 'transition' in styl
  || 'webkitTransition' in styl
  || 'MozTransition' in styl
  || 'msTransition' in styl;

});

require.register("component~event@0.1.4", function (exports, module) {
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
});

require.register("ecarter~css-emitter@0.0.1", function (exports, module) {
/**
 * Module Dependencies
 */

var events = require('component~event@0.1.4');

// CSS events

var watch = [
  'transitionend'
, 'webkitTransitionEnd'
, 'oTransitionEnd'
, 'MSTransitionEnd'
, 'animationend'
, 'webkitAnimationEnd'
, 'oAnimationEnd'
, 'MSAnimationEnd'
];

/**
 * Expose `CSSnext`
 */

module.exports = CssEmitter;

/**
 * Initialize a new `CssEmitter`
 *
 */

function CssEmitter(element){
  if (!(this instanceof CssEmitter)) return new CssEmitter(element);
  this.el = element;
}

/**
 * Bind CSS events.
 *
 * @api public
 */

CssEmitter.prototype.bind = function(fn){
  for (var i=0; i < watch.length; i++) {
    events.bind(this.el, watch[i], fn);
  }
  return this;
};

/**
 * Unbind CSS events
 * 
 * @api public
 */

CssEmitter.prototype.unbind = function(fn){
  for (var i=0; i < watch.length; i++) {
    events.unbind(this.el, watch[i], fn);
  }
  return this;
};

/**
 * Fire callback only once
 * 
 * @api public
 */

CssEmitter.prototype.once = function(fn){
  var self = this;
  function on(){
    self.unbind(on);
    fn.apply(self.el, arguments);
  }
  self.bind(on);
  return this;
};


});

require.register("component~once@0.0.1", function (exports, module) {

/**
 * Identifier.
 */

var n = 0;

/**
 * Global.
 */

var global = (function(){ return this })();

/**
 * Make `fn` callable only once.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

module.exports = function(fn) {
  var id = n++;

  function once(){
    // no receiver
    if (this == global) {
      if (once.called) return;
      once.called = true;
      return fn.apply(this, arguments);
    }

    // receiver
    var key = '__called_' + id + '__';
    if (this[key]) return;
    this[key] = true;
    return fn.apply(this, arguments);
  }

  return once;
};

});

require.register("yields~after-transition@0.0.1", function (exports, module) {

/**
 * dependencies
 */

var has = require('yields~has-transitions@1.0.0')
  , emitter = require('ecarter~css-emitter@0.0.1')
  , once = require('component~once@0.0.1');

/**
 * Transition support.
 */

var supported = has();

/**
 * Export `after`
 */

module.exports = after;

/**
 * Invoke the given `fn` after transitions
 *
 * It will be invoked only if the browser
 * supports transitions __and__
 * the element has transitions
 * set in `.style` or css.
 *
 * @param {Element} el
 * @param {Function} fn
 * @return {Function} fn
 * @api public
 */

function after(el, fn){
  if (!supported || !has(el)) return fn();
  emitter(el).bind(fn);
  return fn;
};

/**
 * Same as `after()` only the function is invoked once.
 *
 * @param {Element} el
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

after.once = function(el, fn){
  var callback = once(fn);
  after(el, fn = function(){
    emitter(el).unbind(fn);
    callback();
  });
};

});

require.register("component~emitter@1.2.0", function (exports, module) {

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

});

require.register("yields~css-ease@0.0.1", function (exports, module) {

/**
 * CSS Easing functions
 */

module.exports = {
    'in':                'ease-in'
  , 'out':               'ease-out'
  , 'in-out':            'ease-in-out'
  , 'snap':              'cubic-bezier(0,1,.5,1)'
  , 'linear':            'cubic-bezier(0.250, 0.250, 0.750, 0.750)'
  , 'ease-in-quad':      'cubic-bezier(0.550, 0.085, 0.680, 0.530)'
  , 'ease-in-cubic':     'cubic-bezier(0.550, 0.055, 0.675, 0.190)'
  , 'ease-in-quart':     'cubic-bezier(0.895, 0.030, 0.685, 0.220)'
  , 'ease-in-quint':     'cubic-bezier(0.755, 0.050, 0.855, 0.060)'
  , 'ease-in-sine':      'cubic-bezier(0.470, 0.000, 0.745, 0.715)'
  , 'ease-in-expo':      'cubic-bezier(0.950, 0.050, 0.795, 0.035)'
  , 'ease-in-circ':      'cubic-bezier(0.600, 0.040, 0.980, 0.335)'
  , 'ease-in-back':      'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
  , 'ease-out-quad':     'cubic-bezier(0.250, 0.460, 0.450, 0.940)'
  , 'ease-out-cubic':    'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
  , 'ease-out-quart':    'cubic-bezier(0.165, 0.840, 0.440, 1.000)'
  , 'ease-out-quint':    'cubic-bezier(0.230, 1.000, 0.320, 1.000)'
  , 'ease-out-sine':     'cubic-bezier(0.390, 0.575, 0.565, 1.000)'
  , 'ease-out-expo':     'cubic-bezier(0.190, 1.000, 0.220, 1.000)'
  , 'ease-out-circ':     'cubic-bezier(0.075, 0.820, 0.165, 1.000)'
  , 'ease-out-back':     'cubic-bezier(0.175, 0.885, 0.320, 1.275)'
  , 'ease-out-quad':     'cubic-bezier(0.455, 0.030, 0.515, 0.955)'
  , 'ease-out-cubic':    'cubic-bezier(0.645, 0.045, 0.355, 1.000)'
  , 'ease-in-out-quart': 'cubic-bezier(0.770, 0.000, 0.175, 1.000)'
  , 'ease-in-out-quint': 'cubic-bezier(0.860, 0.000, 0.070, 1.000)'
  , 'ease-in-out-sine':  'cubic-bezier(0.445, 0.050, 0.550, 0.950)'
  , 'ease-in-out-expo':  'cubic-bezier(1.000, 0.000, 0.000, 1.000)'
  , 'ease-in-out-circ':  'cubic-bezier(0.785, 0.135, 0.150, 0.860)'
  , 'ease-in-out-back':  'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
};

});

require.register("component~query@0.0.3", function (exports, module) {
function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function(selector, el){
  el = el || document;
  return one(selector, el);
};

exports.all = function(selector, el){
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function(obj){
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};

});

require.register("move", function (exports, module) {
/**
 * Module Dependencies.
 */

var Emitter = require('component~emitter@1.2.0');
var query = require('component~query@0.0.3');
var after = require('yields~after-transition@0.0.1');
var has3d = require('component~has-translate3d@0.0.3');
var ease = require('yields~css-ease@0.0.1');

/**
 * CSS Translate
 */

var translate = has3d
  ? ['translate3d(', ', 0)']
  : ['translate(', ')'];

/**
 * Export `Move`
 */

module.exports = Move;

/**
 * Get computed style.
 */

var style = window.getComputedStyle
  || window.currentStyle;

/**
 * Library version.
 */

Move.version = '0.5.0';

/**
 * Export `ease`
 */

Move.ease = ease;

/**
 * Defaults.
 *
 *   `duration` - default duration of 500ms
 *
 */

Move.defaults = {
  duration: 500
};

/**
 * Default element selection utilized by `move(selector)`.
 *
 * Override to implement your own selection, for example
 * with jQuery one might write:
 *
 *     move.select = function(selector) {
 *       return jQuery(selector).get(0);
 *     };
 *
 * @param {Object|String} selector
 * @return {Element}
 * @api public
 */

Move.select = function(selector){
  if ('string' != typeof selector) return selector;
  return query(selector);
};

/**
 * Initialize a new `Move` with the given `el`.
 *
 * @param {Element} el
 * @api public
 */

function Move(el) {
  if (!(this instanceof Move)) return new Move(el);
  if ('string' == typeof el) el = query(el);
  if (!el) throw new TypeError('Move must be initialized with element or selector');
  this.el = el;
  this._props = {};
  this._rotate = 0;
  this._transitionProps = [];
  this._transforms = [];
  this.duration(Move.defaults.duration)
};


/**
 * Inherit from `EventEmitter.prototype`.
 */

Emitter(Move.prototype);

/**
 * Buffer `transform`.
 *
 * @param {String} transform
 * @return {Move} for chaining
 * @api private
 */

Move.prototype.transform = function(transform){
  this._transforms.push(transform);
  return this;
};

/**
 * Skew `x` and `y`.
 *
 * @param {Number} x
 * @param {Number} y
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.skew = function(x, y){
  return this.transform('skew('
    + x + 'deg, '
    + (y || 0)
    + 'deg)');
};

/**
 * Skew x by `n`.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.skewX = function(n){
  return this.transform('skewX(' + n + 'deg)');
};

/**
 * Skew y by `n`.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.skewY = function(n){
  return this.transform('skewY(' + n + 'deg)');
};

/**
 * Translate `x` and `y` axis.
 *
 * @param {Number} x
 * @param {Number} y
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.translate =
Move.prototype.to = function(x, y){
  return this.transform(translate.join(''
    + x +'px, '
    + (y || 0)
    + 'px'));
};

/**
 * Translate on the x axis to `n`.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.translateX =
Move.prototype.x = function(n){
  return this.transform('translateX(' + n + 'px)');
};

/**
 * Translate on the y axis to `n`.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.translateY =
Move.prototype.y = function(n){
  return this.transform('translateY(' + n + 'px)');
};

/**
 * Scale the x and y axis by `x`, or
 * individually scale `x` and `y`.
 *
 * @param {Number} x
 * @param {Number} y
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.scale = function(x, y){
  return this.transform('scale('
    + x + ', '
    + (y || x)
    + ')');
};

/**
 * Scale x axis by `n`.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.scaleX = function(n){
  return this.transform('scaleX(' + n + ')')
};

/**
 * Apply a matrix transformation
 *
 * @param {Number} m11 A matrix coefficient
 * @param {Number} m12 A matrix coefficient
 * @param {Number} m21 A matrix coefficient
 * @param {Number} m22 A matrix coefficient
 * @param {Number} m31 A matrix coefficient
 * @param {Number} m32 A matrix coefficient
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.matrix = function(m11, m12, m21, m22, m31, m32){
  return this.transform('matrix(' + [m11,m12,m21,m22,m31,m32].join(',') + ')');
};

/**
 * Scale y axis by `n`.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.scaleY = function(n){
  return this.transform('scaleY(' + n + ')')
};

/**
 * Rotate `n` degrees.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.rotate = function(n){
  return this.transform('rotate(' + n + 'deg)');
};

/**
 * Set transition easing function to to `fn` string.
 *
 * When:
 *
 *   - null "ease" is used
 *   - "in" "ease-in" is used
 *   - "out" "ease-out" is used
 *   - "in-out" "ease-in-out" is used
 *
 * @param {String} fn
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.ease = function(fn){
  fn = ease[fn] || fn || 'ease';
  return this.setVendorProperty('transition-timing-function', fn);
};

/**
 * Set animation properties
 *
 * @param {String} name
 * @param {Object} props
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.animate = function(name, props){
  for (var i in props){
    if (props.hasOwnProperty(i)){
      this.setVendorProperty('animation-' + i, props[i])
    }
  }
  return this.setVendorProperty('animation-name', name);
}

/**
 * Set duration to `n`.
 *
 * @param {Number|String} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.duration = function(n){
  n = this._duration = 'string' == typeof n
    ? parseFloat(n) * 1000
    : n;
  return this.setVendorProperty('transition-duration', n + 'ms');
};

/**
 * Delay the animation by `n`.
 *
 * @param {Number|String} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.delay = function(n){
  n = 'string' == typeof n
    ? parseFloat(n) * 1000
    : n;
  return this.setVendorProperty('transition-delay', n + 'ms');
};

/**
 * Set `prop` to `val`, deferred until `.end()` is invoked.
 *
 * @param {String} prop
 * @param {String} val
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.setProperty = function(prop, val){
  this._props[prop] = val;
  return this;
};

/**
 * Set a vendor prefixed `prop` with the given `val`.
 *
 * @param {String} prop
 * @param {String} val
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.setVendorProperty = function(prop, val){
  this.setProperty('-webkit-' + prop, val);
  this.setProperty('-moz-' + prop, val);
  this.setProperty('-ms-' + prop, val);
  this.setProperty('-o-' + prop, val);
  return this;
};

/**
 * Set `prop` to `value`, deferred until `.end()` is invoked
 * and adds the property to the list of transition props.
 *
 * @param {String} prop
 * @param {String} val
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.set = function(prop, val){
  if (typeof prop == "object") {
    for (var key in prop) {
      if (prop.hasOwnProperty(key)) {
        this.transition(key);
        this._props[key] = prop[key];
      }
    }
  } else {
    this.transition(prop);
    this._props[prop] = val;  
  } 
  return this;
};

/**
 * Increment `prop` by `val`, deferred until `.end()` is invoked
 * and adds the property to the list of transition props.
 *
 * @param {String} prop
 * @param {Number} val
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.add = function(prop, val){
  if (!style) return;
  var self = this;
  return this.on('start', function(){
    var curr = parseInt(self.current(prop), 10);
    self.set(prop, curr + val + 'px');
  });
};

/**
 * Decrement `prop` by `val`, deferred until `.end()` is invoked
 * and adds the property to the list of transition props.
 *
 * @param {String} prop
 * @param {Number} val
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.sub = function(prop, val){
  if (!style) return;
  var self = this;
  return this.on('start', function(){
    var curr = parseInt(self.current(prop), 10);
    self.set(prop, curr - val + 'px');
  });
};

/**
 * Get computed or "current" value of `prop`.
 *
 * @param {String} prop
 * @return {String}
 * @api public
 */

Move.prototype.current = function(prop){
  return style(this.el).getPropertyValue(prop);
};

/**
 * Add `prop` to the list of internal transition properties.
 *
 * @param {String} prop
 * @return {Move} for chaining
 * @api private
 */

Move.prototype.transition = function(prop){
  if (!this._transitionProps.indexOf(prop)) return this;
  this._transitionProps.push(prop);
  return this;
};

/**
 * Commit style properties, aka apply them to `el.style`.
 *
 * @return {Move} for chaining
 * @see Move#end()
 * @api private
 */

Move.prototype.applyProperties = function(){
  for (var prop in this._props) {
    this.el.style.setProperty(prop, this._props[prop], '');
  }
  return this;
};

/**
 * Re-select element via `selector`, replacing
 * the current element.
 *
 * @param {String} selector
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.move =
Move.prototype.select = function(selector){
  this.el = Move.select(selector);
  return this;
};

/**
 * Defer the given `fn` until the animation
 * is complete. `fn` may be one of the following:
 *
 *   - a function to invoke
 *   - an instanceof `Move` to call `.end()`
 *   - nothing, to return a clone of this `Move` instance for chaining
 *
 * @param {Function|Move} fn
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.then = function(fn){
  // invoke .end()
  if (fn instanceof Move) {
    this.on('end', function(){
      fn.end();
    });
  // callback
  } else if ('function' == typeof fn) {
    this.on('end', fn);
  // chain
  } else {
    var clone = new Move(this.el);
    clone._transforms = this._transforms.slice(0);
    this.then(clone);
    clone.parent = this;
    return clone;
  }

  return this;
};

/**
 * Pop the move context.
 *
 * @return {Move} parent Move
 * @api public
 */

Move.prototype.pop = function(){
  return this.parent;
};

/**
 * Reset duration.
 *
 * @return {Move}
 * @api public
 */

Move.prototype.reset = function(){
  this.el.style.webkitTransitionDuration =
  this.el.style.mozTransitionDuration =
  this.el.style.msTransitionDuration =
  this.el.style.oTransitionDuration = '';
  return this;
};

/**
 * Start animation, optionally calling `fn` when complete.
 *
 * @param {Function} fn
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.end = function(fn){
  var self = this;

  // emit "start" event
  this.emit('start');

  // transforms
  if (this._transforms.length) {
    this.setVendorProperty('transform', this._transforms.join(' '));
  }

  // transition properties
  this.setVendorProperty('transition-properties', this._transitionProps.join(', '));
  this.applyProperties();

  // callback given
  if (fn) this.then(fn);

  // emit "end" when complete
  after.once(this.el, function(){
    self.reset();
    self.emit('end');
  });

  return this;
};

});

if (typeof exports == "object") {
  module.exports = require("move");
} else if (typeof define == "function" && define.amd) {
  define("move", [], function(){ return require("move"); });
} else {
  (this || window)["move"] = require("move");
}
})()