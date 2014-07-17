/***************************************************************
* Browser Detection / Client Sniffing Library - v1.0.0
* author: Christian Bonham (cbonham@cisco.com)
* (c) Cisco Systems, All Rights Reserved.
*
* Public Function API Definition:
* function								params 		return values
* ---------------------------------------------------------------
*
* The following functions will return the true 
* categorization of the client.
* ---------------------------------------------------------------

* sniffIsIE() 							none		true | false
* sniffIsNS70()  						none		true | false
* sniffIsMozilla() 						none		true | false
* sniffIsUnix()  						none		true | false
* sniffIsUnixMozilla()					none		true | false
* sniffIsUnix70()  						none		true | false
* sniffIsWin()  						none		true | false
* sniffIsMac()  						none		true | false
*
* The following functions will return the nature
* of the browser categorization with respect to 
* the Cisco browser support model.
* There are two primary considerations: 
* formatting, and functionality.
* For example:
* IE = fully functional, reference formatting
* IE (no-script) = reference degrade => (default no-script behavior, ie only css)
* NS70 = degrade functional, NS70 degrade formatting
* NS70 (no-script) = reference degrade
* Mozilla = fully functional, Mozilla degrade formatting
* Mozilla (no-script) = reference degrade
* NS6 = degrade functional, degrade formatting if script, reference degrade if not script
* Safari = degrade functional, degrade formatting if script, reference degrade if not script (same as Mozilla)
* ---------------------------------------------------------------
* To determine the functionality model for the client.
* ----------------------
* sniffIsFunctFull() 					none		true | false
* sniffIsFunctDegrade() 				none		true | false
* 
* To determine the formatting model for the client.
* ----------------------
* sniffIsFormatDefault() 				none		true | false
* sniffIsFormatMozilla() 				none		true | false
* sniffIsFormatNS70() 					none		true | false
* sniffIsFormatUnix() 					none		true | false
* sniffIsFormatUnix70() 				none		true | false
* sniffIsFormatUnixMozilla() 			none		true | false
*
* The following function will include (by <link...> 
* a passed in CSS URL as it applies to the Cisco 
* browser support model
* ---------------------------------------------------------------
* sniffIncCSSForNS70(sURL) 				(URL-path)	true | false
* sniffIncCSSForMozilla(sURL) 			(URL-path)	true | false
* sniffIncCSSForUnix(sURL) 				(URL-path)	true | false
* sniffIncCSSForDefault(sURL)			(URL-path)	true | false
****************************************************************/

/* Debugging functions, setting bDebug to true will spawn an alert
 * with debugging info. */
function debug(debugStr, str) {
	debugStr = debugStr + str + '\n';
	return debugStr;
}
function sniffDebugClear(debugStr) {
	debugStr = '';
}
function sniffDebugAlert(str, bDebug) {
	if (bDebug) {
		alert(str);
	}
} 
var sniffDebugFlag = false;
var sniffDebugStr = '';
function sniffToAlert() {
	sniffDebugStr = debug(sniffDebugStr, 'Object Browser:');
	sniffDebugStr = debug(sniffDebugStr, 'Browser.name: ' + Browser.name );
	sniffDebugStr = debug(sniffDebugStr, 'Browser.version: ' + Browser.version );
	sniffDebugStr = debug(sniffDebugStr, 'Browser.os: ' + Browser.os );
	sniffDebugStr = debug(sniffDebugStr, 'Browser.useragent: ' + Browser.useragent );
	sniffDebugStr = debug(sniffDebugStr, '----------------------');
	sniffDebugStr = debug(sniffDebugStr, 'Browser.isIE: ' + Browser.isIE );
	sniffDebugStr = debug(sniffDebugStr, 'Browser.isMozilla: ' + Browser.isMozilla );
	sniffDebugStr = debug(sniffDebugStr, 'Browser.isNS70: ' + Browser.isNS70 );
	sniffDebugStr = debug(sniffDebugStr, 'Browser.isNS6: ' + Browser.isNS6 );
	sniffDebugStr = debug(sniffDebugStr, 'Browser.isNSOld: ' + Browser.isNSOld );
	sniffDebugStr = debug(sniffDebugStr, 'Browser.isSafari: ' + Browser.isSafari );
	sniffDebugStr = debug(sniffDebugStr, 'Browser.isUnix: ' + Browser.isUnix);
	sniffDebugStr = debug(sniffDebugStr, 'Browser.isWin: ' + Browser.isWin);
	sniffDebugStr = debug(sniffDebugStr, 'Browser.isMac: ' + Browser.isMac);
	sniffDebugStr = debug(sniffDebugStr, '----------------------');
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsIE(): ' + sniffIsIE());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsMozilla(): ' + sniffIsMozilla());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsNS70(): ' + sniffIsNS70());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsSafari(): ' + sniffIsSafari());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsUnix(): ' + sniffIsUnix());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsUnixMozilla(): ' + sniffIsUnixMozilla());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsUnix70(): ' + sniffIsUnix70());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsWin(): ' + sniffIsWin());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsMac(): ' + sniffIsMac());
	sniffDebugStr = debug(sniffDebugStr, '----------------------');
	sniffDebugStr = debug(sniffDebugStr, 'Functional model');
	sniffDebugStr = debug(sniffDebugStr, '----------------------');
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsFunctFull(): ' + sniffIsFunctFull());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsFunctDegrade(): ' + sniffIsFunctDegrade());
	sniffDebugStr = debug(sniffDebugStr, '----------------------');
	sniffDebugStr = debug(sniffDebugStr, 'Format model');
	sniffDebugStr = debug(sniffDebugStr, '----------------------');
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsFormatDefault(): ' + sniffIsFormatDefault());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsFormatMozilla(): ' + sniffIsFormatMozilla());
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsFormatNS70(): ' + sniffIsFormatNS70());	
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsFormatUnix(): ' + sniffIsFormatUnix());	
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsFormatUnix70(): ' + sniffIsFormatUnix70());	
	sniffDebugStr = debug(sniffDebugStr, 'sniffIsFormatUnixMozilla(): ' + sniffIsFormatUnixMozilla());	
	sniffDebugAlert(sniffDebugStr, sniffDebugFlag);
	sniffDebugClear(sniffDebugStr);
}
	
// Set up some definitions.
// The following are the arrays that are compared against the appName.
var Wins = 	new Array("Win32");
var Unixes = new Array("SunOS", "HP", "Linux"); 
var Macs = 	new Array("MacPPC");
var Geckos = new Array("Netscape");

/* arrays used for gleening the netscape version
 * from the user-agent http field based on the
 * gecko codebase version. 
 *
 * Currently, Array: NS71s is not being used, but has been left 
 * for future use, and enumeration here.
 * Functionality for NS71 detection now relies on parsing
 * the gecko revision out of the user-agent, and comparing
 * against what we consider to be the baseline 7.1 revision.
 * This is currently defined as Mozilla 1.3 on Sun, which is the
 * first browser I have found to support what we need it to. 
 * This type of implementation will allow future versions of 
 * Netscape/Mozilla to be assumed to function full featured. */
var MozillaBaseGecko = 20030329;
var MozillaBaseSafari = 85;
var Mozillas = new Array(	"Gecko/20031007",  	// Mozilla 1.5
							"Gecko/20040113",  	// Mozilla 1.6
							"Gecko/20030329", 	// Mozilla 1.3 (Sun)
							"Gecko/20030624"); 	// Netscape 7.1
var NS70s = new Array(	"Gecko/20020823", 	// Netscape 7.0		
						"Gecko/20030208", 	// Netscape 7.0.2 
						"Gecko/20020921",	// Netscape 7.0 (Sun)
						"Gecko/20020920");	// Netscape 7.0 (Sun)
var NS6s = new Array(	"Gecko/20020508", 	// Netscape 6.2.3
						"Gecko/20020314",	// Netscpae 6.2.2
						"Gecko/20011128", 	// Netscape 6.2.1
						"Gecko/20010726" );	// Netscape 6.1
var Safaris = new Array("Safari/85",
						"Safari/100");		// Safari 1.0
var IEs = new Array("Microsoft Internet Explorer");

var Browser = new Object;
// Set up some fundamentals.
Browser.name = navigator.appName;
Browser.version = navigator.appVersion;
Browser.os = navigator.platform;
Browser.useragent = navigator.userAgent;
// platform browser bools
Browser.isIE = false;
Browser.isNS70 = false;
Browser.isMozilla = false;
Browser.isNS6 = false;
Browser.isNSOld = false;
Browser.isSafari = false;

// platform bools
Browser.isUnix = false;
Browser.isWin = false;
Browser.isMac = false;
	
/******************************************************************************
 * Private API functions
 *****************************************************************************/
function sniffCatchUnix() {
   var unixAppNameFlag = false;
   var unixPlatformFlag = false;
   for (var i=0; i < Unixes.length; i++) {
    	if (Browser.version.indexOf(Unixes[i]) != -1) {
		    unixAppNameflag=true;
		    break;
    	}
    } 
    for (var i=0; i < Unixes.length; i++) {
    	if (Browser.os.indexOf(Unixes[i]) != -1) {
		    unixPlatformFlag=true;
		    break;
    	}
    }
    return (unixPlatformFlag || unixAppNameFlag);
}

function sniffCatchWin() {
	var flag = false;
	for (var i=0; i < Wins.length; i++) {
    	if (Browser.os.indexOf(Wins[i]) != -1) {
		    flag=true;
		    break;
    	}
    } 
    return (flag);
}

function sniffCatchMac() {
	var flag = false;
	for (var i=0; i < Macs.length; i++) {
    	if (Browser.os.indexOf(Macs[i]) != -1) {
		    flag=true;
		    break;
    	}
    } 
    return (flag);
}

function sniffCatchGecko() {
	var nsFlag = false;
	for (var i=0; i < Geckos.length; i++) {
    	if (Browser.name.indexOf(Geckos[i]) != -1) {
		    nsFlag=true;
		    break;
    	}
    } 
    return (nsFlag);
}

function sniffCatchNS70() {
	var flag = false;
	for (var i=0; i < NS70s.length; i++) {
		if (Browser.useragent.indexOf(NS70s[i]) != -1) {
		    flag=true;
		    break;
		}
	}
    return (flag);
}

function sniffCatchMozilla() {
	var rev = -1;
	var flag = false;
	
	rev = sniffParseGeckoRev();
	if (rev > 0) {
		sniffDebugStr = debug(sniffDebugStr, '-> Gecko Rev = ' + rev);
		sniffDebugStr = debug(sniffDebugStr, '-> Base Mozilla Rev: ' + MozillaBaseGecko);
		if (rev >= MozillaBaseGecko) {
			flag = true;
		}
	}
    return (flag);
}

function sniffCatchSafari() {
	var rev = -1;
	var flag = false;
	
	rev = sniffParseSafariRev();
	if (rev > 0) {
		sniffDebugStr = debug(sniffDebugStr, '-> Safari Rev = ' + rev);
		sniffDebugStr = debug(sniffDebugStr, '-> Base Mozilla Rev: ' + MozillaBaseSafari);
		if (rev >= MozillaBaseSafari) {
			flag = true;
		}
	}
    return (flag);
}

function sniffCatchNS6() {
	var flag = false;
	for (var i=0; i < NS6s.length; i++) {
		if (Browser.useragent.indexOf(NS6s[i]) != -1) {
		    flag=true;
		    break;
		}
	}
    return (flag);
}

function sniffParseGeckoRev() {
	var sGecko = new String('Gecko/');
	var rev = -1;
	var pos = 0;
	
	pos = Browser.useragent.indexOf(sGecko) 
	if (pos != -1) {
		rev = Browser.useragent.substr( (pos + sGecko.length), (Browser.useragent.length - pos) );
		rev = parseInt(rev);
	} 
	return rev;
}

function sniffParseSafariRev() {
	var sSafari = new String('Safari/');
	var rev = -1;
	var pos = 0;
	
	pos = Browser.useragent.indexOf(sSafari) 
	if (pos != -1) {
		rev = Browser.useragent.substr( (pos + sSafari.length), (Browser.useragent.length - pos) );
		rev = parseInt(rev);
	} 
	return rev;
}

function sniffCatchIE() {
	var ieFlag = false;
	for (var i=0; i < IEs.length; i++) {
    	if (Browser.name.indexOf(IEs[i]) != -1) {
		    ieFlag=true;
		    break;
    	}
    } 
    return (ieFlag);
}

function sniffOS() {
	// Try and determine OS
	Browser.isUnix = false;
	Browser.isWin = false;
	Browser.isMac = false;
	
	if (sniffCatchUnix()) {
		Browser.isUnix = true;
	} else if (sniffCatchWin()) {
		Browser.isWin = true;
	} else if (sniffCatchMac()) {
		Browser.isMac = true;
	}	
	return true;
}

function sniffBrowser() {
	// Try and determine client/browser
	Browser.isNS70 = false;
	Browser.isNS71 = false;
	Browser.isNS6 = false;
	Browser.isNSOld = false;
	Browser.isSafari = false;
	Browser.isIE = false;
	if (sniffCatchGecko()) {
		sniffDebugStr = debug(sniffDebugStr, 'Caught Netscape');
		if (sniffCatchMozilla()) {
			Browser.isMozilla = true;
			sniffDebugStr = debug(sniffDebugStr, '-> Caught Mozilla');
		} else if (sniffCatchNS70()) {
			Browser.isNS70 = true;
			sniffDebugStr = debug(sniffDebugStr, '-> Caught 7.0');
		} else if (sniffCatchNS6()) {
			Browser.isNS6 = true;
			sniffDebugStr = debug(sniffDebugStr, '-> Caught 6');
		} else if (sniffCatchSafari()) {
			Browser.isSafari = true;
			sniffDebugStr = debug(sniffDebugStr, '-> Caught Safari');
		} else {
			Browser.isNSOld = true;
		} 
	} else if (sniffCatchIE()) {
		Browser.isIE = true;
	} 
	return true;
}

function Sniff() {
	if (sniffOS()) {
		sniffDebugStr = debug(sniffDebugStr, 'Caught platform/OS');
	} else {
		sniffDebugStr = debug(sniffDebugStr, 'Failed to detect platform/OS');
	}
	
	if (sniffBrowser()) {
		sniffDebugStr = debug(sniffDebugStr, 'Caught client/browser');
	} else {
		sniffDebugStr = debug(sniffDebugStr, 'Failed to detect client/browser');
	}
}

/*****************************************************************************
* Public API calls
******************************************************************************
*
* These are to determine the real 
* properties of the client. */
function sniffIsIE() {
	return Browser.isIE;
}

function sniffIsNS6() {
	return Browser.isNS6;
}

function sniffIsNS70() {
	return Browser.isNS70;
}

function sniffIsMozilla() {
	return Browser.isMozilla;
}

function sniffIsUnix() {
	return Browser.isUnix;
}

function sniffIsUnixMozilla() {
	return (sniffIsMozilla() && sniffIsUnix());
}

function sniffIsUnix70() {
	return (sniffIsNS70() && sniffIsUnix());
}

function sniffIsWin() {
	return Browser.isWin;
}

function sniffIsMac() {
	return Browser.isMac;
}

function sniffIsSafari() {
	return Browser.isSafari;
}

/******************************************************************************
 * The following API functions translate browser info 
 * into support model CSS && Functionality Reqs
 *****************************************************************************/
// To determine the functionality model for the client.
function sniffIsFunctFull() {
	return ( sniffIsIE() || sniffIsMozilla() );
} 

function sniffIsFunctDegrade() {
	return ( !sniffIsFunctFull() );
}
 
// To determine the formatting model for the client.
function sniffIsFormatDefault() {
	return sniffIsIE();
}

function sniffIsFormatNS70() {
	if ( sniffIsNS70() && !sniffIsUnix() ) {
		return true;
	}
	return false;
}

function sniffIsFormatMozilla() {
	if (sniffIsMozilla() && !sniffIsUnix() ) {
		return true;
	}
	return false;
}

function sniffIsFormatUnix() {
	return sniffIsUnix(); 
}

function sniffIsFormatUnix70() {
	return sniffIsUnix70();
}

function sniffIsFormatUnixMozilla() {
	return sniffIsUnixMozilla();
}

// To include css files based on the formatting/degrade model.
function sniffIncCSSForNS70(sURL) {
	debug(sniffDebugStr, 'NS Url: ' + sURL);
	if (sURL) {
		// only include if it's not a unix platform.
		if (sniffIsFormatNS70()) {
			document.write ('<link rel="Stylesheet" href="' + sURL + '" type="text/css">');
			return (true);
		} 
	}
	return (false);
}

// To include css files based on the support model.
function sniffIncCSSForMozilla(sURL) {
	debug(sniffDebugStr, 'NS Url: ' + sURL);
	if (sURL) {
		// only include if it's not a unix platform.
		if (sniffIsFormatMozilla()) {
			document.write ('<link rel="Stylesheet" href="' + sURL + '" type="text/css">');
			return (true);
		} 
	}
	return (false);
}

function sniffIncCSSForUnix(sURL) {
	debug(sniffDebugStr, 'Unix Url: ' + sURL);
	if (sURL) {
		if (sniffIsFormatUnix()) {
			document.write ('<link rel="Stylesheet" href="' + sURL + '" type="text/css">');
			return (true);
		}
	}
	return (false);
}

function sniffIncCSSForDefault(sURL) {
	debug(sniffDebugStr, 'Default Url: ' + sURL);
	if (sURL) {
		document.write ('<link rel="Stylesheet" href="' + sURL + '" type="text/css">');
		return (true);
	}
	return (false);
}

Sniff();
sniffToAlert();




