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
require("./requestAnimationFrame.js");
datab=require("./data-bind.lite.js");
var is=require("./is.js");
var TinyAnimate=require("./TinyAnimate.js");
var move=require("move-js");
var watchjs = require("./watch.js");
var watch = watchjs.watch;
var unwatch = watchjs.unwatch;
var callWatchers = watchjs.callWatchers;
var hex_chr;
var isreadybit=0;
var cadena;
var idreal;
var objeto;
var scopeg;
var numapps=0;
hex_chr="0123456789abcdef";
g=(function(){
	function easeInOutQuad(t, b, c, d){
	  t /= d / 2;
	  if (t < 1) return c / 2 * t * t + b;
	  t--;
	  return -c / 2 * (t * (t - 2) - 1) + b;
	};
	function wrap(el, wrapper) {
	    el.parentNode.insertBefore(wrapper, el);
	    wrapper.appendChild(el);
	};
	function createScope(){
		scopenom="generalapp";
		g.dom("html").addAttrb("id","appdata"+numapps);
		g.dom("html").addAttrb("name","appdata"+numapps);
		g.dom("html").addAttrb("data-scope",scopenom);
		var attrbdata=g.dom("html").getAttrb("data-scope");
		glog("SCOPE ATTRB ");
		glog(attrbdata[0]);
		var model = new datab.Model(scopenom);
		glog("databind******************");
		glog("nombre del scope******************");
		glog(model.scope + "********************");
		glog("nombre del scope******************");
		glog(model);
		numapps++;
	}
	function prop(element,proper){
		//busca dentro del objeto y devuelve solo la primera acepcion
		var obj;
		var val;
		obj=getelTag(element);
		if(is.isObject(obj)){
		  	result=obj[0].getAttribute(proper);
			return result;
		}
	}
	function propAll(proper){
		//busca dentro del objeto y devuelve solo la primera acepcion
		var val='';
		var array_tags=[];
		var array_final=[];
		var i=0;
		array_tags=getelTag(proper);
		if(array_tags.length>0){
			for(i=0;i<array_tags.length;i++){
				array_final[i]=array_tags[i];
			}
			return array_final;
		}
	}
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
	function glog(msg){
		console.log(msg);
	};
	function getdisctId(id){
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
			return objeto;
		}
	};
	function getobjtype(id){
		var cadena;
		var typestr;
		if(typeof id==='string'){
			cadena=id;
	      	if(cadena.search("#")==0){
	        	typestr="id";
	      	}
	      	else if(cadena.search(".")==0){
				typestr="class";
			}
			else{
				typestr="element";
			}
			return typestr;
		}
	};
	function getnameid(id){
		var cadena;
          var idreal;
          var filareal;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              filareal=idreal;
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              filareal=idreal;
          }
          else{
              return -1;
          }
          return  filareal;
	};
	function getelTag(tag){
		var arrtags=[];
		if(tag!=undefined){
			arrtags=document.querySelectorAll(tag);
			return arrtags;
		}
		else{
			return -1;
		}
	};
	function valobj(objval){
        var valor;
        var obj;
        var args;
        var tovalue;
        obj=getdisctId(objval);
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
   };
   function setval(objval,value){
        var valor;
        var obj;
        var args;
        var tovalue;
        obj=getdisctId(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			obj.value=value;
        }
        return 0;
   };
    function version(){
    	return "0.0.1";
    };
	function intfadeIn(elem,tiempo){
			var op = 0.1;  // initial opacity
		    var intervalo=tiempo/80;
		    var element;
		    element=elem;
		    glog(element);
		    element.style.display = 'block';
		    var timer = setInterval(function(){
	        if (op >= 1){
	            clearInterval(timer);
	        }
	        element.style.opacity = op;
	        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		        op += op * 0.1;
		    }, intervalo);
	  };
	  function intfadeOut(elem,tiempo){
	    var op = 1;  // initial opacity
		var intervalo=tiempo/80;
		var element;
		element=elem;
		var timer = setInterval(function(){
	    if (op <= 0.1){
	        clearInterval(timer);
	        element.style.display = 'none';
	    }
	    element.style.opacity = op;
	    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        op -= op * 0.1;
	    }, intervalo);
	 };
	return{
		//Describir funciones públicas
		init: function(){
			createScope();
		},
		getdisctId: function(id){
			var objeto;
			objeto=getdisctId(id);
			return objeto;
		},
		getnameid: function(id){
			var objeto;
			objeto=getnameid(id);
			return  objeto;
		},
		getelTag: function(id){
			var arrtags=[];
			arrtags=getelTag(id);
			return  arrtags;
		},
		log: function(msg){
			console.log(msg);
	    },
	    map: function(array,callbackmap){
	    	var val,index;
			if(array.isArray()){
				array.map(callbackmap);
			}
	    },
		propAll:function(prper){
	      	//busca dentro del objeto y devuelve solo la primera acepcion
			var obj;
			obj=propAll(prper);
			return obj;
		},
		create:function(domelement){
			document.createElement(domelement);
		},
	    slice: function(array,start,end,callbackslc){
			if(array.isArray()){
				callbackslc(array.slice(start, end));
			}
	    },
	    encb64: function(string){
			return atob(string)
	    },
	    decb64: function(string){
			return btoa(string);
	    },
		docready: function(fn){
			if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
				fn();
			}
			else{
		    	document.addEventListener('DOMContentLoaded', fn);
			}
		},
		each:function(objeto,callbackeach){
	      	var initial_array;
	      	var x,y,valor,indice;
	        if(is.isObject(objeto)){
	        	objeto.forEach(callbackeach);
	        }
	        else{
	        	glog("Is not an array!");
	        }
		},
		extend:function(out){
			out = out || {};
			for (var i = 1; i < arguments.length; i++) {
				if (!arguments[i]){
					continue;
				}
				for (var key in arguments[i]) {
					if (arguments[i].hasOwnProperty(key)){
						out[key] = arguments[i][key];
					}
				}
			}
			return out;
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
			    glog('"MS Internet Explorer ');
			    var position = navigator.userAgent.search("MSIE") + 5;
			    var end = navigator.userAgent.search("; Windows");
			    var version = navigator.userAgent.substring(position,end);
			    glog(version + '"');
			}
			else if (navigator.userAgent.search("Chrome") >= 0){
				glog('"Google Chrome ');// For some reason in the browser identification Chrome contains the word "Safari" so when detecting for Safari you need to include Not Chrome
			    var position = navigator.userAgent.search("Chrome") + 7;
			    var end = navigator.userAgent.search(" Safari");
			    var version = navigator.userAgent.substring(position,end);
			    glog(version + '"');
			}
			else if (navigator.userAgent.search("Firefox") >= 0){
			    glog('"Mozilla Firefox ');
			    var position = navigator.userAgent.search("Firefox") + 8;
			    var version = navigator.userAgent.substring(position);
			    glog(version + '"');
			}
			else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0){//<< Here
			    glog('"Apple Safari ');
			    var position = navigator.userAgent.search("Version") + 8;
			    var end = navigator.userAgent.search(" Safari");
			    var version = navigator.userAgent.substring(position,end);
			    glog(version + '"');
			}
			else if (navigator.userAgent.search("Opera") >= 0){
			    glog('"Opera ');
			    var position = navigator.userAgent.search("Version") + 8;
			    var version = navigator.userAgent.substring(position);
			    glog(version + '"');
			}
			else{
			    glog('"Other"');
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
		  parseHTML:function(str){
			  var tmp = document.implementation.createHTMLDocument();
			  tmp.body.innerHTML = str;
			  return tmp.body.children;
		  },
		  parseJSON:function(json){
			  return JSON.parse(json);
		  },
		dom: function(domel){
				return{
					hide: function(){
						var fila;
						if(!document.getElementById){
							return false;
						}
						fila=getdisctId(domel);
						fila.style.display="none";
					},
					show:function(){
						var domelement;
						if(!document.getElementById){
							return false;
						}
			          	domelement=getdisctId(domel);
						domelement.style.display="block";
					},
					css:function(estilo){
				        var domelement;
				          if(!document.getElementById){
				              return false;
				          }
				          if(estilo==''){
				              return false;
				          }
				          domelement=getdisctId(domel);
				          domelement.style=estilo;
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
							glog(found_elements);
							callbackfind(found_elements);
						}
				      },
				      each:function(callbackeach){
				      	var objeto;
				      	var x,y,valor,indice;
				      	objeto=getelTag(domel);
				        if(is.isObject(objeto)){
				        	objeto.forEach(callbackeach);
				        }
				        else{
				        	glog("Is not an object!");
				        }
				      },
				      empty:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
				        objeto.innerHTML='';
				      },
				      wrap:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
						wrap(objeto, g.create('div'));
				      },
				      prop:function(prper){
				      	//busca dentro del objeto y devuelve solo la primera acepcion
						var obj;
						obj=prop(domel,prper);
						if(is.isObject(obj)){
							return obj;
						}
				      },
				      unwrap:function(docunw){
				      	var objeto;
				      	objeto=getdisctId(docunw);
						// get the element's parent node
						var parent = objeto.parentNode;
						// move all children out of the element
						while (objeto.firstChild) parent.insertBefore(objeto.firstChild, objeto);
						// remove the empty element
						parent.removeChild(objeto);
				      },
				      html:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	const args = Array.from(arguments);
				      	if(args[0]!=undefined){
				      		string=args[0];
				      		objeto.innerHTML = string;
				      	}
				      	else{
				      		return objeto.innerHTML;
				      	}
				      },
				      text:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	const args = Array.from(arguments);
				      	if(args[0]!=undefined){
				      		string=args[0];
				      		objeto.textContent = string;
				      	}
				      	else{
				      		return objeto.textContent;
				      	}
				      },
				      hasClass:function(classElem){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	if(objeto.classList.contains(classElem)){
				      		return;
				      	}
				      	else{
				        	return -1;
				      	}
				      },
				      prev:function(){
				      	var objeto;
				      	var nextsib;
				      	objeto=getdisctId(domel);
				      	prevsib=objeto.previousElementSibling;
				      },
				      next:function(){
				      	var objeto;
				      	var nextsib;
				      	objeto=getdisctId(domel);
				      	nextsib=objeto.nextElementSibling;
				      },
				      remove:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	objeto.parentNode.removeChild(objeto);
				      },
				      replaceWith:function(string){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	objeto.outerHTML = string;
				      },
				      matches:function(selector){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	if(objeto.matches(selector)){
				      		return;
				      	}
				      	else{
				      		return -1;
				      	}
				      },
				      siblings:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	Array.prototype.filter.call(objeto.parentNode.children, function(child){
						  return child !== objeto;
						});
				      },
				      offset:function(){
				      	var objeto;
				      	var par;
				      	var rect;
				      	var result;
				      	objeto=getdisctId(domel);
				      	rect = objeto.getBoundingClientRect();
						result={
						  top: rect.top + document.body.scrollTop,
						  left: rect.left + document.body.scrollLeft
						}
						return{

						}
				      },
				      offsetParent:function(){
				      	var objeto;
				      	var par;
				      	var rect;
				      	var result;
				      	objeto=getdisctId(domel);
				      	result=objeto.offsetParent || objeto;
						return{

						}
				      },
				      parent:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
						return objeto.parentNode;
				      },
				      position:function(){
				      	var objeto;
				      	var result;
				      	objeto=getdisctId(domel);
				      	result={left: objeto.offsetLeft, top: objeto.offsetTop};
						return result;
				      },
				      outerHeight:function(){
				      	var objeto;
				      	var result;
				      	var objeto=getdisctId(domel);
						    var height=objeto.offsetHeight;
					    	var style=getComputedStyle(objeto);
				      	const args = Array.from(arguments);
				      	if(args[0]!=undefined){
				      		if(args[0]==true){
							  		height+=parseInt(style.marginTop) + parseInt(style.marginBottom);
							  		return height;
				      		}
				      		else{
				      			return objeto.offsetHeight;
				      		}
				      	}
				      	else{
				      		return objeto.offsetHeight;
				      	}
						return{

						}
				      },
					  outerWidth:function(){
				      	var objeto;
				      	var result;
				      	var objeto=getdisctId(domel);
					    var height=objeto.offsetWidth;
					    var style=getComputedStyle(objeto);
				      	const args = Array.from(arguments);
				      	if(args[0]!=undefined){
				      		if(args[0]==true){
							  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
							  return width;
				      		}
				      		else{
				      			return objeto.offsetWidth;
				      		}
				      	}
				      	else{
				      		return objeto.offsetHeight;
				      	}
						return{

						}
				      },
				      tanimate: function(from, to, duration, update, easing, done){
				      	var objeto=getdisctId(domel);
				      	TinyAnimate.animate(from, to, duration, update, easing, done);
				      },
				      tanimatecss: function(property, unit, from, to, duration, easing, done){
				      	var objeto=getdisctId(domel);
				      	TinyAnimate.animateCSS(objeto, property, unit, from, to, duration, easing, done);
				      },
				      animate: function(callbackanim){
						return {
							x:function(x,options){
								if(options.delay!=undefined){
									move(domel).delay(options.delay).x(x).end(callbackanim);
								}
								else{
									move(domel).x(x).end(callbackanim);
								}
								return{

								}
							},
							y:function(y){
								move(domel).y(y).end(callbackanim);
								return{

								}
							},
							add:function(attrib,value){
								move(domel).add(attrib,value).end(callbackanim);
								return{

								}
							},
							to:function(x,y){
								move(domel).to(x,y).end(callbackanim);
								return{

								}
							},
							rotate:function(deg){
								move(domel).rotate(deg).end(callbackanim);
								return{

								}
							},
							translate:function(x,y){
								move(domel).translate(x,y).end(callbackanim);
								return{

								}
							},
							scale:function(deg){
								move(domel).scale(deg).end(callbackanim);
								return{

								}
							},
							set:function(x,y){
								move(domel).set(x,y).end(callbackanim);
								return{

								}
							},
							duration:function(deg){
								move(domel).duration(deg).end(callbackanim);
								return{

								}
							},
							skew:function(x,y){
								move(domel).skew(x,y).end(callbackanim);
								return{

								}
							},
							then:function(){
								return{
									set:function(x,y){
										move(domel).then().set(x,y).end(callbackanim);
									},
									duration:function(deg){
										move(domel).then().duration(deg).end(callbackanim);
									},
									scale:function(deg){
										move(domel).then().scale(deg).end(callbackanim);
									},
									pop:function(){
										move(domel).then().pop().end(callbackanim);
									},
								}
							},
							end:function(callbackcall){
								move(target).end(callbackcall);
							}
						}
					  },
						cycle:function(options){
							var crusel;
					  	var optfinal;
					  	var findelem;
					  	var numelems=0;
					  	var elemindex=0;
					  	var domelems;
					  	var bitvisible=0;
					  	if(!options){
					  		glog("Faltan argumentos, no se puede iniciar cycle");
					  	}
					  	else{
					  		if(!options.search){
					  			glog("Faltan argumento 'Find', no se puede iniciar cycle");
					  		}
					  		else{
						      	optfinal={
								    elem: getnameid(domel),    // id of the carousel container
								    fx: options.fx,                  // starts the rotation automatically
								    search: options.search,      // enables the infinite mode
								    infinite: options.infinite || false,      // enables the infinite mode
								    interval: options.interval || 1000,      // interval between slide changes
						      	}
						      	glog("-- INIT --");
						      	findelem=domel + " > " + optfinal.search;
						      	glog("ELEMENTS INSIDE");
						      	children=g.dom(domel).children();
						      	numelems=children.length;
						      	glog("children**********************");
						      	for(i=0;i<numelems;i++){
						      		if(i>0){
						      			glog("hijo " + i);
										children[i].style.display="none";
										children[i].style.position="absolute";
										children[i].style.left="0";
										children[i].style.top="0";
						      		}
						      	}
						      	glog("---ELEMENTS INSIDE---");
						      	glog("---NUM ELEMENTS" + numelems);
						      	if(numelems>1){
						      		domelems=getelTag(findelem);
						      		domcycle=setInterval(fadingfunc,optfinal.interval);
						      		function fadingfunc(){
						      			intfadeOut(children[elemindex],optfinal.interval);
						      			if(elemindex==(numelems-1)){
						      				elemindex=0;
						      			}
						      			else{
						      				elemindex++;
						      			}
						      			intfadeIn(children[elemindex],optfinal.interval);
						      			glog("SLIDES");
						      			glog("**************************");
						      			glog("children " + elemindex);
						      			glog(children[elemindex]);
						      			glog(children);
						      			glog("**************************");
						      		}
						      	}
						      	else{
						      		glog("Número de slides insuficiente para crear slider.");
						      		glog("ABORTING...");
						      	}
						      	glog("---ELEMENTS INSIDE");
					  		}
					  	}
						return;
				      },
				      after:function(htmlstr){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
						obj.insertAdjacentHTML('afterend', htmlstr);
				      },
				      before:function(htmlstr){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
						obj.insertAdjacentHTML('beforebegin', htmlstr);
				      },
				      append:function(elem){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
						parent.insertBefore(elem, obj.firstChild);
				      },
				      prepend:function(html){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
						obj.insertAdjacentHTML('afterend', html);
				      },
				      clone:function(){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
				      	obj.cloneNode(true);
				      },
				      children:function(){
				      	//write code below...
				      	var obj;
				      	var childf;
				      	obj=getdisctId(domel);
						childf=obj.children;
						return childf;
				      },
				      addClass:function(classele){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
				      	obj.classList.add(classele);
				      },
				      removeClass:function(classele){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
				      	obj.classList.remove(classele);
				      },
				      addAttrb:function(attr,value){
				      	//write code below...
				      	var obj;
				      	var type;
				      	var i;
				      	type=getobjtype(domel);
				      	switch(type){
				      		case 'element':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				obj[i].setAttribute(attr,value);
				      			}
				      			break;
				      		case 'class':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				obj[i].setAttribute(attr,value);
				      			}
				      			break;
				      		case 'id':
								obj=getdisctId(domel);
								obj.setAttribute(attr,value);
								break;
				      	}
				      },
				      getAttrb:function(attr){
						//write code below...
				      	var obj;
				      	var type;
				      	var i;
				      	var result;
				      	result=Array;
				      	type=getobjtype(domel);
				      	switch(type){
				      		case 'element':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				result[i]=obj[i].getAttribute(attr);
				      			}
				      			return result;
				      			break;
				      		case 'class':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				result[i]=obj[i].getAttribute(attr);
				      			}
				      			return result;
				      			break;
				      		case 'id':
								obj=getdisctId(domel);
								result[i]=obj.getAttribute(attr);
								return result;
								break;
				      	}
				      },
				      rmAttrb:function(attr){
				      	//write code below...
				      	var obj;
				      	var type;
				      	var i;
				      	type=getobjtype(domel);
				      	switch(type){
				      		case 'element':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				obj[i].removeAttribute(attr);
				      			}
				      			break;
				      		case 'class':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				obj[i].removeAttribute(attr);
				      			}
				      			break;
				      		case 'id':
								obj=getdisctId(domel);
								obj.removeAttribute(attr);
								break;
				      	}
				      },
					  toggleClass:function(classele){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
				      	obj.classList.toggle(classele);
				      },
				      cursor:function(estilo){
				        var fila;
				      	switch(estilo){
				      		case 'auto':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'pointer':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'wait':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'text':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'initial':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'inherit':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'none':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
				      	}
				      },
				      toggleDisplay: function(){
				        var fila;
				            if (!document.getElementById){
				                return false;
				            }
				            fila=getdisctId(domel);
				            if(fila.style.display != "none"){
				              fila.style.display = "none";
				            }
				            else{
				              fila.style.display = "";
				            }
				        },
				        resetText: function(){
				          var textcontent;
				          textcontent=getdisctId(domel);
				          textcontent.value='';
				        },
			            val: function(){
			                var valor;
			                var args;
			                args=arguments;
			                if(args[0]==undefined){
				                valor=valobj(domel);
				                return valor;
			                }
			                else{
			                	setval(domel,args[0]);
			                }
			            },
			            version: function(){
			                glog(version());
			            },
				        intval: function(){
							var number;
							valor=valobj(domel);
							return parseInt(valor);
				        },
				        floatval: function(){
				        	var number;
							valor=valobj(domel);
							return parseFloat(valor);
				        },
						fadeIn:function(tiempo){
						    var op = 0.1;  // initial opacity
						    var intervalo=tiempo/80;
						    var element;
						    element=getdisctId(domel);
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
					    element=getdisctId(domel);
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
				        objeto=getdisctId(domel);
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
					        	fila=getdisctId(domel);
					        	fila.className="blink_div";
					        	break;
					        case 'off':
					        	fila=getdisctId(domel);
					        	fila.className="";
					        	break;

				        }
				    },
					submit:function(callbackfunc){
			        	var control;
			        	control=getdisctId(domel);
				        control.onsubmit=function(){
				        	callbackfunc();
				        }
			      	},
			        click:function(callbackfunc){
			        	var control;
			        	control=getdisctId(domel);
				        control.onclick=function(){
				        	callbackfunc();
				        }
			      	},
			      	change:function(callbackfunc){
				        var control;
			        	control=getdisctId(domel);
				        control.onchange=function(){
				        	callbackfunc();
				        }
			      	},
			      	blur:function(callbackfunc){
				        var control;
			        	control=getdisctId(domel);
				        control.onblur=function(){
				        	callbackfunc();
				        }
			      	},
			      	bindData:function(e){

			      	},
			        on:function(e){
						var control;
						var idcontrol;
						var event;
						var idcontrol;
						idcontrol=domel;
						event=arguments[0];
						callback=arguments[1];;
						control=getdisctId(idcontrol);
			        	switch(event){
			        		case 'error':
			        			control.addEventListener('error',callback);
			        			break;
			        		case 'load':
								control.addEventListener('load',callback);
			        			break;
			        		case 'submit':
								control.addEventListener('submit',callback);
			        			break;
			        		case 'click':
								control.addEventListener('click',callback);
			        			break;
			        		case 'dblclick':
								control.addEventListener('dblclick',callback);
			        			break;
							case 'mouseup':
								control.addEventListener('mouseup',callback);
			        			break;
			        		case 'mousedown':
								control.addEventListener('mousedown',callback);
			        			break;
			        		case 'mouseenter':
								control.addEventListener('mouseenter',callback);
			        			break;
			        		case 'mouseleave':
								control.addEventListener('mouseleave',callback);
			        			break;
			        		case 'mousemove':
								control.addEventListener('mousemove',callback);
			        			break;
			        		case 'mouseover':
								control.addEventListener('mouseover',callback);
			        			break;
			        		case 'mouseout':
								control.addEventListener('mouseout',callback);
			        			break;
			        		case 'blur':
								control.addEventListener('blur',callback);
			        			break;
			        		case 'change':
								control.addEventListener('change',callback);
						        break;
							case 'resize':
								control.addEventListener('resize',callback);
			        			break;
							case 'unload':
								control.addEventListener('unload',callback);
			        			break;
							case 'pageshow':
								control.addEventListener('pageshow',callback);
			        			break;
							case 'popstate':
								control.addEventListener('popstate',callback);
			        			break;
			        		case 'keyup':
								control.addEventListener('keyup',callback);
			        			break;
			        		case 'keydown':
								control.addEventListener('keyup',callback);
			        			break;
			        		case 'keypress':
								control.addEventListener('keypress',callback);
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
				        contentdiv=getdisctId(domel);
				        xmlhttp=g.getxhr();
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
								        	glog("No se puede ejecutar la llamada, no es tipo funcion");
								        }
					               }
					           }
					           else {
					               glog('Error');
					           }
					        }
					    }

					    xmlhttp.open("GET", modulourl, true);
					    xmlhttp.send();
				    },
				}
            },
            /**
             * Objeto class
             * Se encarga de registrar eventos
             *
             * */
            inArray: function(item, elem){
	          return elem.indexOf(item);
	        },
	        indexOf: function(item, elem){
	          return elem.indexOf(item);
	        },
	        getKey: function(e){
				var KeyCode;
				if(e){
					if(e.keyCode>0){
						KeyCode=e.keyCode;
					}
					else{
						KeyCode=e.charCode;
					}
				}
				return KeyCode;
	        },
	        getChar: function(event){
	        	var cadena;
						//bloquear teclado a solo numeros
						teclan=g.getKey(event);
						cadena=String.fromCharCode(teclan);
						return String.fromCharCode(cadena);
	        },
	        blockChar: function(e){
	          //bloquear teclado a solo letras
	          teclap=g.getKey(e);
	          teclan=String.fromCharCode(teclap);
	          if(IsNumeric(teclan)==true){
	            return "Solo está peritido escribir letras";
	          }
	        },
	        bloqNum: function(e){
	          teclap=g.getKey(e);
	          teclan=String.fromCharCode(teclap);
	          if(IsNumeric(teclan)==false){
	            return "Solo esta permitido escribir numeros";
	          }
	        },
			getTrim: function(cadena){
			    return cadena.trim();
			},
			setLocal: function(varname,valor){
			    //localstorage programming
				if (typeof(Storage) !== "undefined"){
					//Code for localStorage/sessionStorage
			        localStorage.setItem(varname,valor);
			    }
			},
			getLocal: function(varname){
			    if (typeof(Storage)!=="undefined"){
			        localStorage.getItem(varname);
			    }
			},
			type: function(objname){
				var obj;
			    obj=getdisctId(objname);
			    return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
			},
			/**
			 * Ajax Clase
			 * Funciones XHR para trabajar con AJAX
			 * */
		  getxhr:function(){
		  	var xhr;
			xhr=window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			return xhr;
	      },
	      upload: function(fileid,callbackup){
	      	var filectrl;
	      	var file;
	      	var reader;
	      	var finalfile;
	      	var fileapi;
	      	var formData;
	      	var objnombrefile;
	      	var resp;
	      	objnombrefile={};
	      	//Validación si hay los elementos para realizar la carga asíncrona de archivos
	      	if(window.File && window.FileList && window.Blob && window.FileReader && window.FormData){
			    reader=new FileReader();
				filectrl=getdisctId(fileid); //Files[0] = 1st file
				file=filectrl.files[0];
				reader.readAsBinaryString(file);
				reader.onload=function(event){
				    var result=event.target.result;
				    var fileName=filectrl.files[0].name;
				    var objres;
				    objres={};
					objres.__proto__={
						data:'',
						file:'',
						status:'',
						error:'',
					};
				    g.post(
						{
							data:btoa(result),
							name:fileName
						},
						"upload.php",
						function(data){
							resp=JSON.parse(data);
							objres.file=resp[0].file;
							objres.status="200 OK";
							objres.error="0";
							callbackup(objres);
						}
					);
				};
				reader.onerror=function(event){
					glog("Hubo un error de lectura de disco.");
				}
			}
			else{
			    // browser doesn't supports File API
			    glog("browser doesn't supports File API");
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
	      		glog("Faltan Argumentos " + arguments.length);
	      	}
	      	else{
	      		// Obtener objeto AJAX;
	      		sock=g.getxhr();
	      		sock.addEventListener("load", transferComplete);
				sock.addEventListener("error", transferFailed);
	      		// Obtener objeto de variables;
	      		variablesaux=JSON.stringify(arrayvar[0]);
	      		variablesobj=JSON.parse(variablesaux);
	      		glog(variablesobj);
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
						glog("El argumento Callback debe ser de tipo función");
					}
	      		}
	      		////////////////////////////////////////////////////
	      		// EJECUTAR FUNCION Y CALLBACK//////////////////////
		        sock.open(ajxProtocol,dirsocket,true);
				function transferComplete(event){
	                data=event.target.responseText;
	                glog("STATUS: " + event.target.readyState + " " + event.target.status + " " + event.target.statusText);
	                if(callback!=undefined){
	                	if(typeof callback==="function"){
							callback(data);
						}
						else{
							glog("El parámetro Callback no es función o no existe!");
						}
	                }
	                else{
						glog("El parámetro Callback no existe!");
					}
				}

				function transferFailed(event){
					glog(event.target.error);
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
	      		glog("Faltan Argumentos " + arguments.length);
	      	}
	      	else{
	      		// Obtener objeto AJAX;
	      		sock=g.getxhr();
	      		sock.addEventListener("load", transferComplete);
				sock.addEventListener("error", transferFailed);
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
						glog("El argumento Callback debe ser de tipo función");
					}
	      		}
	      		////////////////////////////////////////////////////
	      		// EJECUTAR FUNCION Y CALLBACK//////////////////////
		        sock.open(ajxProtocol,dirsocket,true);
		        function transferComplete(event){
	                data=event.target.responseText;
	                glog("STATUS: " + event.target.readyState + " " + event.target.status + " " + event.target.statusText);
	                if(callback!=undefined){
	                	if(typeof callback==="function"){
							callback(data);
						}
						else{
							glog("El parámetro Callback no es función o no existe!");
						}
	                }
	                else{
						glog("El parámetro Callback no existe!");
					}
				}

				function transferFailed(event){
					glog(event.target.error);
				}
				sock.send(null);
		        ////////////////////////////////////////////////////
			}
	      },
		webwork:function(nombre){
			//Submodulo WebWorkers
			return{
				get:function(){
			        var workerSck;
			        var workerName;
			        if(nombre!=''){
						workerName=getdisctId(nombre);
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
			}
		},
		watch:function(objeto,attrib,callback){
			//Función Watch
			watch(objeto,attrib,callback);
		},
		unwatch:function(objeto,name,callback){
		 	//Función Unwatch
			unwatch(objeto,name,callback);
		},
	}
}());
g.path=(function(){
	//Submodulo g.path / Rewrite g.pathJS
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

	        // The 'document.documentMode' checks below ensure that g.pathJS fires the right events
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
	}
}());
g.md5=(function(){
			//Submodulo MD5
		   function RotateLeft(lValue, iShiftBits){
		           return(lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
		   };
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
		   };
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
				   for(k=0;k<x.length;k+=16){
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
			}
}());
g.path.core.route.prototype = {
    'to': function (fn) {
        this.action = fn;
        return this;
    },
    'enter': function (fns) {
        if (fns instanceof Array) {
            this.do_enter = this.do_enter.concat(fns);
        } else {
            this.do_enter.push(fns);
        }
        return this;
    },
    'exit': function (fn) {
        this.do_exit = fn;
        return this;
    },
    'partition': function () {
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
    'run': function () {
        var halt_execution = false, i, result, previous;

        if (g.path.routes.defined[this.path].hasOwnProperty("do_enter")) {
            if (g.path.routes.defined[this.path].do_enter.length > 0) {
                for (i = 0; i < g.path.routes.defined[this.path].do_enter.length; i++) {
                    result = g.path.routes.defined[this.path].do_enter[i].apply(this, null);
                    if (result === false) {
                        halt_execution = true;
                        break;
                    }
                }
            }
        }
        if (!halt_execution) {
            g.path.routes.defined[this.path].action();
        }
    }
};

g.__proto__.ajax=function(){
	var sock;
	sock=g.getxhr();
	return sock;
};
g.__proto__.data=function(iddataset){
  	var obj;
  	var idfinal;
  	obj=g.getelTag(iddataset);
  	g.log(obj[0]);
  	return{
  		get:function(nomvar){
  			var result;
  			idfinal="data-" + nomvar;
				result=g.dom(iddataset).prop(idfinal);
				return result;
  		},
  		set:function(nomvar,val){
  			idfinal="data-" + nomvar;
  			g.dom(iddataset).addAttrb(idfinal,val);
  		},
  		remove:function(nomvar){
  			idfinal="data-" + nomvar;
  			g.dom(iddataset).rmAttrb(idfinal);
  		},
	}
}
g.__proto__.isReady=function(){
	if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		return 1;
	}
	else{
		return 0;
	}
}
g.init();
module.exports = g;
