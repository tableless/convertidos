/**
 *  Sitewide Tools Rollover Functions  
 *  sitewide_tools.js
 *
 */
 
// Window opening script for Sitewide Toolkit only
function sitewide_toolkit_window(url,winName) {
	if(!winName) { winName = "swtwin"; }
//commented as specification has been changed for the window size
//	var swtwin = window.open(url, winName, 'width=614,height=400,top=50,left=50,resizable=1,scrollbars=1,toolbar=0,menubar=1,status=1');
        var swtwin = window.open(url, winName, 'width=643,height=492,outerWidth=643,outerHeight=492,top=50,left=70,resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,status=yes,locationbar=no');

	swtwin.focus();
	}

var Imgs = new Array();
var imgPath = "/swa/i/";

function precache_imgs( theimgs, lang, country ) {
        //added for  globalization.
        if( (lang!=null && country != null) && !(lang.toLowerCase()=="en" && country.toUpperCase()=="US") ) { 
            imgPath = "/swa" + "/" + lang + "/" + country + "/i/";
        }
	for(var i=0; i<theimgs.length; i++) {
		var j = Imgs.length;
		var tmp = { id: theimgs[i], on:null,off:null,text:null }
		tmp.on = new Image(); tmp.on.src = "/swa/i/sitewide_"+theimgs[i]+"_on.gif";
		tmp.off = new Image(); tmp.off.src = "/swa/i/sitewide_"+theimgs[i]+"_off.gif";
		tmp.text = new Image(); tmp.text.src = imgPath+"sitewide_"+theimgs[i]+"_text.gif";
		Imgs[j] = tmp;
	}
}

// called on mouseover, swaps icon and site_wide_text.gif images 
function img_over( name ) {
	var img = null;
	for(var i=0; i<Imgs.length; i++) {
		if( Imgs[i].id == name ) {
			img = Imgs[i]
		}
	}
	if( img != null ) {
		document.images[ name+"img" ].src = img.on.src;
		document.images[ "sitewide_text" ].src = img.text.src;
	}
}

// called on mouseout, Replaces icon and site_wide_text.gif images 
function img_out( name ) {
	var img = null;
	for(var i=0; i<Imgs.length; i++) {
		if( Imgs[i].id == name ) {
			img = Imgs[i]
		}
	}
	if( img != null ) {
		document.images[ name+"img" ].src = img.off.src;
		document.images[ "sitewide_text" ].src = imgPath+"sitewide_text_start.gif"; 
	}
}

// Print Function
function printit(){  
if (window.print) {
    window.print() ;  
} else {
    var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
    document.body.insertAdjacentHTML('beforeEnd', WebBrowser);
    WebBrowser1.ExecWB(6, 2);
// Use a 1 vs. a 2 for a prompting dialog box    WebBrowser1.outerHTML = "";  
}
}

// POP UP A PREFORMATTED EMAIL MESSAGE WINDOW
function sitewide_email_this_page() {
  // SET MESSAGE VALUES
  var to = "";
//  var cc = "";
//  var bcc = "";
//  var subject = "";
  var body = document.location.href
  // BUILD MAIL MESSAGE COMPONENTS 
  var doc = "mailto:" + to + "?" +
 //     "cc=" + cc + "&" +
 //     "bcc=" + bcc + "&" +
 //     "subject=" + escape(subject) + "&" +
      "body=" + escape(body); 
  // POP UP EMAIL MESSAGE WINDOW
  window.location.href = doc;
}
