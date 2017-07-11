<?php 
	//ARTWORK FREE LIBRARIES 1.0
	include("artxml.class.php");
	include("op_mysql.class.php");
?>
<!DOCTYPE html>
<HTML>
	<HEAD>
		<TITLE>Prueba Mini FrameWork Arturo</TITLE>
		<?php 
			$xmlab= new artxml();
			$msql= new op_mysql();
		?>
	</HEAD>
	
	<BODY>
		<DIV style="position:relative;width:800px;height:50px;">
			<?php 
				if($xmlab->setNameXML('basedatos.xml')==0){
					$xmlab->setNameMenuFile('menus_padre.xml');
					$xmlab->setParentMenu('Archivo','0');
					$xmlab->MenuAppendChild('Archivo','Entrar','entrarapp');
					$xmlab->MenuAppendChild('Archivo','Salir','salirapp');
					$xmlab->setParentMenu('Sistema','0');
					$xmlab->MenuAppendChild('Sistema','Terminal','terminalweb');
					$xmlab->MenuAppendChild('Sistema','Adicional','Adicional');
					$xmlab->setParentMenu('Adicional','0');
					$xmlab->MenuAppendChild('Adicional','Terminales','Terminal_ROOTes');
					$xmlab->MenuAppendChild('Adicional','Tecladoes','teclado_usues');
					$xmlab->MenuAppendChild('Adicional','Aparienciaes','Temases');
					$xmlab->setParentMenu('Aplicaciones','0');
					$xmlab->MenuAppendChild('Aplicaciones','Preferencias','Preferencias');
					$xmlab->MenuAppendChild('Aplicaciones','Administracion','Administracion');
					$xmlab->MenuAppendChild('Aplicaciones','Agregar App','agregar_quitar');
					$xmlab->MenuAppendChild('Aplicaciones','Agregar Calc','agregar_calcu');
					$xmlab->MenuAppendChild('Aplicaciones','Agregar Nota','agregar_notica');
					$xmlab->MenuAppendChild('Aplicaciones','Agregar Natas','agregar_noticas');
					$xmlab->setParentMenu('Preferencias','0');
					$xmlab->MenuAppendChild('Preferencias','Terminal','Terminal_ROOT');
					$xmlab->MenuAppendChild('Preferencias','Teclado','teclado_usu');
					$xmlab->MenuAppendChild('Preferencias','Apariencia','Temas');
					$xmlab->setParentMenu('Administracion','0');
					$xmlab->MenuAppendChild('Administracion','Administrador_paquete','Package Manager');
					//formato: nombremenu-enlacemenu
					$xmlab->MenuAppendChild('Administracion','MySQL','basedatos');
					$xmlab->setParentMenu('Utilidad','0');
					$xmlab->MenuAppendChild('Utilidad','Agregar_Programas','Package Manager');
					$xmlab->setColorMenu('ccc','link_cabecera');
					$xmlab->setColorMenu('6599FF','hover_cabecera');
					$xmlab->setColorMenu('FEFFEF','hover_menu');
					$xmlab->setColorMenu('AAAAAA','link_menu');
					$xmlab->setColorMenu('000','fore_cabecera');
					$xmlab->setColorMenu('FEFFEF','fore_menu');
					$xmlab->RenderMenu();
					/* FORMATO:Aplicaciones_MenuChild_Preferencias
					 * Nombre del menu_MenuChild_Valor del enlace :) */
				}
				else{
					echo("El archivo no existe");	
				}
				$msql->ConectarBD("root","aratsuro","localhost","oiris");
				if($msql->QuerySQL("SELECT * FROM inventario")){
					if($msql->getFilas()>0){
						/* setDataColector busca la ultima sentencia SQL la ejecuta
						 * y almacena los datos pertinentes en un Array,
						 * luego los almacena en el colector de datos para su posterior operación 
						 */
						$msql->setDataColector('identi');
						$hola=$msql->getDataColector('identi');
						//...WHERE MARCA='KODE'
						$msql->showDataInColector('identi','marca','descripcion','KODE');
						//....SELECT * FROM inventario 
						//mostrar campo Marca
						$msql->showDataInColector('identi','marca');
					}
				}
			?>
		</DIV>
	</BODY>
</HTML>