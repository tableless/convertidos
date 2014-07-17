// DynClick - Check Flash
// Copyright 2002 AgênciaClick
// http://www.agenciaclick.com.br
// Versão 1.0 - 10/01/2002


var flash=false
var flashVersion=null
if(is.ie&&is.win){
	document.write(
		'<script language="VBScript">\n'+
		'function isDef(id)\n'+
			'on error resume next\n'+
			'isDef = false\n'+
			'isDef = IsObject(CreateObject(id))\n'+
		'end function\n'+
		'flash = isDef("ShockwaveFlash.ShockwaveFlash")\n'+
		'if flash = true then\n'+
			'flashVersion = 2\n'+
			'flashObject = true\n'+
			'do while flashObject = true\n'+
				'flashVersion = flashVersion+1\n'+
				'flashObject = isDef("ShockwaveFlash.ShockwaveFlash." & flashVersion)\n'+
			'loop\n'+
			'flashVersion = flashVersion-1\n'+
		'end if\n'+
		'</script>\n'
	)
}
else{
	flash=navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin
	if(flash){flashVersion=parseInt(flash.description.substring(flash.description.indexOf('.')-1,flash.description.indexOf('.')));flash=true}
}
