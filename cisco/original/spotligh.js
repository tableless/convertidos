// Spotlight Rotation Script - v2.2
// author: Christian Bonham (cbonham@cisco.com)
// (c) Cisco Systems, All Rights Reserved.

function Render1up(panel) {
	DebugWriteln('Render1up<br>');
	document.write('<table width="465" height="230" border="0" cellpadding="0" cellspacing="0"><tr>');
    document.write('<td>');
    spotlightRenderAnchor(panel, 1);
   	document.write('<img src="' + panel.ImgSrc1 + '" width="' + panel.ImgWidth1 + '" height="' + panel.ImgHeight1 + '" alt="' + panel.ImgAlt1 + '" border="0">');
   	document.write('</a></td></tr>');
   	document.write('</table>');
}

function Render2up(panel) {
	DebugWriteln('Render2up<br>');
	document.write('<table width="465" height="230" border="0" cellpadding="0" cellspacing="0"><tr>');
   	
   	document.write('<td width="274" height="230">');
   	spotlightRenderAnchor(panel, 1);
   	document.write('<img src="' + panel.ImgSrc1 + '" width="' + panel.ImgWidth1 + '" height="' + panel.ImgHeight1 + '" alt="' + panel.ImgAlt1 + '" border="0">');
   	document.write('</a></td>');
   	
    document.write('<td width="191" height="230">');
    spotlightRenderAnchor(panel, 2);
    document.write('<img src="' + panel.ImgSrc2 + '" width="' + panel.ImgWidth2 + '" height="' + panel.ImgHeight2 + '" alt="' + panel.ImgAlt2 + '" border="0">');
    document.write('</a></td>');
    
    document.write('</tr></table>');
}

function Render3up(panel) {
	DebugWriteln('Render3up<br>');
	document.write('<table width="465" height="230" border="0" cellpadding="0" cellspacing="0">');
	document.write('<tr>');
	document.write('<td width="274" height="230" rowspan="2">');
	spotlightRenderAnchor(panel, 1);
	document.write('<img src="' + panel.ImgSrc1 + '" width="' + panel.ImgWidth1 + '" height="' + panel.ImgHeight1 + '" alt="' + panel.ImgAlt1 + '" border="0"/>');
	document.write('</a></td>');
    
    document.write('<td width="191" height="115">')
    spotlightRenderAnchor(panel, 2);
    document.write('<img src="' + panel.ImgSrc2 + '" width="' + panel.ImgWidth2 + '" height="' + panel.ImgHeight2 + '" alt="' + panel.ImgAlt2 + '" border="0"/>');
    document.write('</a></td>');
    document.write('</tr><tr>');
    document.write('<td width="191" height="115">');
    
    spotlightRenderAnchor(panel, 3);
    document.write('<img src="' + panel.ImgSrc3 + '" width="' + panel.ImgWidth3 + '" height="' + panel.ImgHeight3 + '" alt="' + panel.ImgAlt3 + '" border="0"/>');
    document.write('</a></td>');
    document.write('</tr>');
    document.write('</table>'); 
}

function spotlightRenderAnchor(panel, imgIndex) {
	aAnchorDef = new Object();
	
	aAnchorDef.LinkTargetURL = eval('panel.LinkTargetURL' + imgIndex);
	aAnchorDef.LinkTargetWin = eval('panel.LinkTargetWin' + imgIndex);
	aAnchorDef.LinkAlt = eval('panel.LinkAlt' + imgIndex);
	aAnchorDef.HbxName = eval('panel.HbxName' + imgIndex);
	aAnchorDef.HbxPosname = eval('panel.HbxPosname' + imgIndex);
	
	document.write('<a href="' + aAnchorDef.LinkTargetURL + '" target="' + aAnchorDef.LinkTargetWin + '" alt="' + aAnchorDef.LinkAlt + '" name="&lid=' + aAnchorDef.HbxName + '&lpos=' + aAnchorDef.HbxPosname + '">');
}

function spotlightRenderCSS() {
	document.writeln('<style type="text/css">');
	document.writeln('.spotlightTableDiv {');
	document.writeln('	margin-bottom:2px;');
	document.writeln('}') 
	document.writeln('</style>');
}

function RenderPanel(panel) {
	var panel_type = panel.PanelType.toLowerCase();
	DebugWriteln(panel_type + '<br>');
	spotlightRenderCSS();
	document.writeln('<div class="spotlightTableDiv">');
	eval('Render' + panel_type + '(panel)');
	document.writeln('</div>');
}	

function DebugWriteln(str) {
	if (Debug) {
		document.writeln(str);
	}
}

function RenderSpotlight(aPanels) {
	var expDays = 30;
	var exp = new Date(); 
	exp.setTime(exp.getTime() + (expDays*24*60*60*1000));

	sCookie = GetCookie('LastSpotlight');
	if (!sCookie) {
		rnd = Math.random();
		whichSpotlight = Math.floor(rnd * aPanels.length);
		DebugWriteln('cookies disabled; randomized to: ' + rnd + ' / ' + aPanels.length + ' : ' + whichSpotlight + '</br>');
	} else {
		LastSpotlight = new Number(sCookie);
		whichSpotlight = LastSpotlight + 1;
		if (whichSpotlight > (aPanels.length - 1)) {
			whichSpotlight = 0;
		}
		DebugWriteln('cookies enabled: last panel: ' + LastSpotlight + ' current panel: ' + whichSpotlight + '</br>');
	}
	SetCookie('LastSpotlight', whichSpotlight, exp);
	RenderPanel(aPanels[whichSpotlight]);	
}