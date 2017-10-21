(function(){
		var cadenamd5;
		var h={};
		var contdivs;
		var bitvisible;
		h=[
			{'nombre':'arturo'},
			{'nombre':'pedro'},
			{'nombre':'antonio'},
			{'nombre':'oscar'},
			{'nombre':'nepo'},
			];
		/*
		 * slideshow carousel.js
		 * */
		nav=g.browser();
		g.log("**********NAV**************");
		g.log(nav);
		g.log("**********NAV**************");
		cadenamd5=g.md5.calc("Arat5uro");
		g.log("MD5***************" + cadenamd5);
		contdivs=0;
		bitvisible=0;
		//INIT SLIDESHOW////////////////////////
		//#slideshow se puede sustituir por el id que el programador escriba
		//y quedaria tal que #nombre o .nombre + div por ejemplo
		g.dom("#carouselslide").getslides({
			    // id of the carousel container is obtained from the other parameter
			    autoplay: true,       // starts the rotation automatically
			    infinite: true,       // enables infinite mode
			    interval: 5000,       // interval between slide changes
			    initial: 0,           // slide to start with
			    dots: false,          // show navigation dots
			    arrows: false,        // show navigation arrows
			    buttons: false,       // hide <play>/<stop> buttons,
			    btnStopText: 'Pause'  // <stop> button text
		});
		///////////////////////////////////////
		g.dom("#btnmover").click(function(){
			g.dom("#div_A").animate(function(){
				g.log("listo el posho");
			}).x(150,{
				delay:1000
			});
		});
		///////////////////////////////////////
		g.log("Son " + contdivs + " Slides");
		g.log("CLAVE MD5: " + cadenamd5);
		g.log("Path JS Version: " + g.path.getVersion());
		g.dom("#cargadiv").addAttribute("gn-repeat");
		g.dom("div").addAttribute("gn-repeat","none");
		g.dom("#cargadiv").load("README.md",function(){
			g.log("Módulo cargado.");
		});
		g.path.listen();
		g.dom("#holap").cursor('pointer');
		g.dom("#holap").fadeIn(5000);
		g.dom("#holap").click(function(){
			g.dom("#holap").smooth("#adiosp",{
				duration:'10000',
				offset: 0,
				callback: function(){
					g.log("Scroll finalizado");
				}
			});
		});
		g.dom("#adiosp").click(function(){
			g.dom("#holap").smooth("#adiosp",{
				duration:'10000',
				offset: 0,
				callback: function(){
					g.log("Scroll finalizado");
				}
			});
		});
		g.dom("#btnfile").click(function(){
			var archivo;
			//holaf=id del control file
			//function(data)=callback con return de la data obtenida
			g.upload("#holaf",function(data){
				//tratar variable para convertir string en JSON
				//Imprimir variable///////////////////////////////
				g.log("*******************data.file*******************");
				g.log(data);
				g.log(data.file);
				g.log(data.status);
				g.log("*******************data.file*******************");
				//////////////////////////////////////////////////
			});
		});
		g.post(
			{
				varu:"arturo",
				vard:"vasquez"
			},
			"socket.php",
			function(data){
				g.log("data devuelta: ");
				g.log(data);
			}
		);
	}());