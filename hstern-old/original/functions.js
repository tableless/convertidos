// Copyright 2002 AgênciaClick


// Basics
// Abrir revista
function linkRevista(url, nome) {
	posLeft = (screen.width / 2) - 390;
	posTop =  60;
	if (!url) url = '/site/revista_h_stern/';
	nome = nome ? ('revista_' + nome) : nome;
	var pop = openPopup('about:blank', nome, 390, 430, 'left=390,top='+posTop+',scrollbars=0','true', true);
	pop.resizeTo(399, 459);
	pop.moveTo(390, posTop);
	pop.location.replace(url);
	//	430 abre com 459 externo
}

// Abrir revista 2
function linkRevista2(url, nome) {
	posLeft = (screen.width / 2) - 390;
	posTop =  60;
	if (!url) url = '/site/revista_h_stern/';
	nome = nome ? ('revista_' + nome) : nome;
	var pop = openPopup('about:blank', nome, 390, 430, 'left=390,top='+posTop+',scrollbars=0','true', true);
	pop.resizeTo(798, 459);
	pop.moveTo(390, posTop);
	pop.location.replace(url);
	//	430 abre com 459 externo
}



//http://www.hstern.local/site/index.asp?url=/site/revista_h_stern/revista_50_9.asp
function gotoRevista(url) {
	posTop=60
	if (is.ie) {
		openPopup(url,'revista',780,430,'left=0,top=60,scrollbars=0','true');
	}
	else{
		openPopup(url,'revista',800,430,'left=0,top=60,scrollbars=0','true');
	}	
}

function abreRevista(url) {
	posX = self.screenLeft;
	posY = self.screenTop - 22;
	winH = 459;
	if (is.ie) {
		
	for(i=390; i<= 780; i += 10) {
		window.resizeTo(i+1, winH);
		window.moveTo(posX,posY);
		posX -= 10;
	}
	}
	else{
		
	for(i=390; i<= 800; i += 10) {
		window.resizeTo(i+1, winH);
		window.moveTo(posX,posY);
		posX -= 10;
	}
	}
	
	window.location.replace(url);
}

function fechaRevista(url) {
	posX = self.screenLeft;
	posY = self.screenTop - 22;
	winH = 459;
	for(i = 780; i >= 398; i-= 10) {
		window.resizeTo(i+1, winH);
		window.moveTo(posX, posY);
		posX += 10;
	}
	window.location.replace(url);
}

// Post para Popup
function postToPopup(f,n,w,h,c){
	openPopup('about:blank',n,w,h,null,c)
	if(!is.ns4)popup.document.bgColor='#E4E4E4'
	f.target='pop_'+n
	f.submit()
}

function trocarIdioma(objForm, strSigla)
{
		objForm.method = "POST"
		objForm.idioma.value = strSigla;
		objForm.submit();
}
/*function vaiPraUrl(strDestino,strParams, strURL)
{
	if (strDestino != "") {
		if (strDestino == "colecao"){
			if (strParams) && (strParams != "") {
				
			}	
			window.location.replace(url)
		}
	}
}*/

function doLogin(objForm)
{
	objForm.method = "post";
	objForm.acao.value = "Login";
	objForm.submit();
}

//Funcao que testa quando uma variavel eh false ou true retornando imprimindo uma string pra sucesso ou fracasso. Certo Manu?
function temIsso(bVar, strSim, strNao){
	if (bVar!=null && bVar) {
		document.write(strSim);
	}
	else{
		document.write(strNao);
	}
}

function enviarBuscaProduto(obj){
	if (obj.produto_cod.selectedIndex != 0){
		obj.submit();
	}
}

function limpa(obj)
{
	obj.value = '';
}

 	
function checkSize(w, h, bResize) {
    if (screen.width > w){
		   if (bResize){
		   			resizeWindowTo(w, h);		   	  
		   }
		    return (false);
    } 

    if (screen.height > h){
		   if (bResize){
		   			resizeWindowTo(w, h);		   	  
		   }
		    return (false);
    }
	return (true);
}

function resizeWindowTo(w, h){
			 top.window.moveTo(0,0);
			 if (document.all) {
			 	top.window.resizeTo(w,h);
			}else if (document.layers||document.getElementById) {
				  if (top.window.outerHeight<screen.availHeight||top.window.outerWidth<screen.availWidth){
				  	 top.window.outerHeight = h;
					 top.window.outerWidth = w;
				  }
			}
}

function resolution(){ 
   s='' 
   s+='screen.availWidth = '+screen.availWidth+'\n' 
   s+='screen.availHeight = '+screen.availHeight+'\n' 
   s+='screen.width = '+screen.width+'\n' 
   s+='screen.height = '+screen.height+'\n' 
  alert(s) 
 }
 
var da = (document.all) ? 1 : 0;
var pr = (window.print) ? 1 : 0;
var mac = (navigator.userAgent.indexOf("Mac") != -1); 

function printPage() {
  if (pr) // NS4+, IE5+
    window.print()
  else if (da && !mac) // Internet Explorer 4 plataforma Windows
    vbPrintPage()
  else // outros browsers
    
  return false;
}

if (da && !pr && !mac) with (document) {
  writeln('<OBJECT ID="WB" WIDTH="0" HEIGHT="0" CLASSID="clsid:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>');
  writeln('<' + 'SCRIPT LANGUAGE="VBScript">');
  writeln('Sub window_onunload');
  writeln('  On Error Resume Next');
  writeln('  Set WB = nothing');
  writeln('End Sub');
  writeln('Sub vbPrintPage');
  writeln('  OLECMDID_PRINT = 6');
  writeln('  OLECMDEXECOPT_DONTPROMPTUSER = 2');
  writeln('  OLECMDEXECOPT_PROMPTUSER = 1');
  writeln('  On Error Resume Next');
  writeln('  WB.ExecWB OLECMDID_PRINT, OLECMDEXECOPT_PROMPTUSER');
  writeln('End Sub');
  writeln('<' + '/SCRIPT>');
}

