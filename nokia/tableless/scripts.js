function random_banner(){
  var i=0;
  var swf0 = "imagens/destaque_home_lojanokia.swf";
  var swf1 = "imagens/destaque_platinum_home_cores.swf";
  banners = new Array();
  banners[0] = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' id='hd_home' width='534' height='150' align=''><param name=movie value='" + swf0 + "'><param name=quality value=best><param name=bgcolor ><embed src='" + swf0 + "' quality=best swliveconnect=false width='534' height='150' name='hd_home' align='' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed></object>";
  banners[1] = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' id='hd_home' width='534' height='150' align=''><param name=movie value='" + swf1 + "'><param name=quality value=best><param name=bgcolor ><embed src='" + swf1 + "' quality=best swliveconnect=false width='534' height='150' name='hd_home' align='' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed></object>";
  today = new Date();
  i=today.getSeconds();
  n=banners.length;
  return banners[i-Math.round((i-1)/n)*n];
}

var i=0;
var qtde_chamadas = 2;
var today = new Date();
var i=today.getSeconds();
var aleatorio = (i-Math.round((i-1)/qtde_chamadas)*qtde_chamadas);

function random_tit_chamada_A (){
  tit_chamada = new Array();
  tit_chamada[0] = "<h2>Não perca os últimos dias da Nokia no Castelo de Caras.</h2>";
  tit_chamada[1] = "<h2>Não perca os últimos dias da Nokia no Castelo de Caras.</h2>";
  return tit_chamada[aleatorio];
}

function random_txt_chamada_A () {
  txt_chamada = new Array();
  txt_chamada[0] = "<a href='http://www.nokia.com.br/castelodecaras'> " +
						 "<img src='imagens/castelo2.gif' alt='Castelo Caras' width='126' height='126' border='0'></a><br> " +
		           	 "<p> " +
				   			"Duas estrelas da Nokia estão marcando presença no Castelo de Caras e registrando momentos incríveis: " +
								"o Nokia 7200 e o Nokia 7610. Veja o que as celebridades andam fazendo por lá com nossos aparelhos. <a href='http://www.nokia.com.br/castelodecaras'>>></a>" +
		   			 "</p> ";
  txt_chamada[1] = "<a href='http://www.nokia.com.br/castelodecaras'> " +
						 "<img src='imagens/castelo2.gif' alt='Castelo Caras' width='126' height='126' border='0'></a><br> " +
		             "<p> " +
				   			"Duas estrelas da Nokia estão marcando presença no Castelo de Caras e registrando momentos incríveis: " +
								"o Nokia 7200 e o Nokia 7610. Veja o que as celebridades andam fazendo por lá com nossos aparelhos. <a href='http://www.nokia.com.br/castelodecaras'>>></a>" +
				   	 "</p>";
  return txt_chamada[aleatorio];
}

function random_tit_chamada_B (){
  tit_chamada = new Array();
  tit_chamada[0] = "<h2><br />O clássico que nunca sai de moda.</h2>";
  tit_chamada[1] = "<h2><br />Uma história para ouvir e dançar.</h2>";
  return tit_chamada[aleatorio];
}

function random_txt_chamada_B () {
  txt_chamada = new Array();
  txt_chamada[0] = "<a href='/cda1?id=66731'>" +
				   	 "<img src='imagens/ap_3120.gif' alt='' width='126' height='126' border='0'></a>" +
			          "<p> " +
				   		"O design do Nokia 3120 tem muita classe e adapta-se confortavelmente à sua mão, para facilitar " +
							"o uso de recursos como troca de mensagens multimídia, viva-voz e <a href='/cda1?id=66731'>muito mais. >></a>" +
				   	 "</p>";
  txt_chamada[1] = "<a href='http://www.nokiatrends.com.br/4_2.asp'>" +
				   	 "<img src='imagens/nokiatrends.gif' alt='' width='126' height='126' border='0'></a> " +
		           	 "<p> " +
				   		"Origem e evolução são conceitos que se misturam na história da música eletrônica. Fique ligado " +
							"nos ritmos e beats que criaram não só um tipo de som, mas um estilo de comportamento. Saiba mais " +
							"no site do <a href='http://www.nokiatrends.com.br/4_2.asp'>Nokia Trends. >></a>" +
				   	 "</p>";
  return txt_chamada[aleatorio];
}

function random_tit_chamada_C (){
  tit_chamada = new Array();
  tit_chamada[0] = "<h2><br /><br />Suporte on-line</h2>";
  tit_chamada[1] = "<h2><br /><br />Suporte on-line</h2>";

  return tit_chamada[aleatorio];
}

function random_txt_chamada_C () {
  txt_chamada = new Array();
  txt_chamada[0] = "<a href='/cda1?id=56742'>" +
						 "<img src='imagens/suporte.gif' alt='' width='126' height='126' border='0'></a>" +
		             "<p> " +
							"Aqui você tem soluções on-line para suas dúvidas, downloads de manuais, PC Suite e serviços para " +
							"assegurar o melhor aproveitamento do seu celular Nokia.<br /><a href='/cda1?id=56742'>Saiba mais >></a>" +
				   	 "</p";
  txt_chamada[1] = "<a href='/cda1?id=56742'>" +
						 "<img src='imagens/suporte.gif' alt='' width='126' height='126' border='0'></a> " +
		           	 "<p> " +
							"Aqui você tem soluções on-line para suas dúvidas, downloads de manuais, PC Suite e serviços para " +
							"assegurar o melhor aproveitamento do seu celular Nokia.<br /><a href='/cda1?id=56742'>Saiba mais >></a>" +
				   	 "</p>";
  return txt_chamada[aleatorio];
}
