<!--
//  All rights reserved:  Copyright owned by SurveySite (c)
//  Unauthorized use prohibited:  Do not copy under penalty of law
var FREQ        = .004;
var SURVEY_URL   = "http://www2.survey-poll.com/redirect/mshome/mshome.html";
var CANCEL_URL   = "http://www2.survey-poll.com/redirect/mshome/close.html";

var QUESTION    = "Microsoft is conducting an online survey.\n Your opinion counts! \n \n Would you like to participate?  \n \n";
var COOKIE_FLAG     = true;           
var COOKIE_NAME     = 'msresearch'; //please use the appropriate cookie name
var COOKIE_PATH     = '/';
var COOKIE_DOMAIN   = '.microsoft.com'; //Please use the appropriate domain name
var COOKIE_DURATION = "2160"; 
var NEW_WIN  = true;   
var DELAY   = 500;

if (SURVEY_URL.indexOf("?") == -1) { SURVEY_URL += "?"; }
if (CANCEL_URL.indexOf("?") == -1) { CANCEL_URL += "?"; }

if( document.location ) {
  SURVEY_URL += "&location=" + escape( document.location )
}
if( document.referrer ) {
  SURVEY_URL += "&referrer=" + escape( document.referrer )
}
if( document.location ) {
  CANCEL_URL += "&location=" + escape( document.location )
}
if( document.referrer ) {
  CANCEL_URL  += "&referrer=" + escape( document.referrer )
}
var DOPOPUP      = true      
var CANPOPUP     = false         
function browserData(browser,version,platform) {
  this.browser = browser;
  this.version = version;
  this.platform = platform;
}
function popupPrompt () {
  var isNS2 = ( navigator.appName == "Netscape" && parseInt(navigator.appVersion) < 3);
  if (!isNS2) {
      CANPOPUP = true
  }
}
function QuickPopup() {
    if( confirm(QUESTION)) {
        SURVEY_URL = SURVEY_URL+"&cfreq="+FREQ;
        var survey_win = window.open( SURVEY_URL,'survey_win','toolbar=1,location=1,status=1,menubar=1,scrollbars=yes,resizable=1,width=650,height=320');
    } else {
       CANCEL_URL  =CANCEL_URL+"&cfreq="+FREQ;
       var cancel_win = window.open( CANCEL_URL,'cancel_win', 'toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=90,height=20,alwaysLowered=1,screenX=2000,screenY=2000');
    }
}
function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}
function FixCookieDate (date) {
  var base = new Date(0);
  var skew = base.getTime(); 
  if (skew > 0)  
    date.setTime (date.getTime() - skew);
}
function GetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break; 
  }
  return null;
}
function SetCookie (name,value,expires,path,domain,secure) {
  var mycookie = name + "=" + escape( value ) +
  ((expires) ? "; expires=" + expires : "") +
  ((path) ? "; path=" + path : "") +
  ((domain) ? "; domain=" + domain : "") +
  ((secure) ? "; secure" : "");
  document.cookie = mycookie;
}
function getRandom () {
  if((navigator.appName == "Netscape") && 
   ((navigator.appVersion.indexOf("2.0") >= 0) || 
   (navigator.appVersion.indexOf("Win3") >= 0))) {
   now = new Date();
   return (now.getTime() % 1000000) / 1000000;
  } else {
    return Math.random();
  }
}
function putSurvCookie () {
        var expdate = new Date ();
        FixCookieDate (expdate);
        if( COOKIE_DURATION.indexOf( "," ) != -1 ) {
          expires = COOKIE_DURATION ;
        } else {
          expdate.setTime (expdate.getTime() + (COOKIE_DURATION * 60 * 60 * 1000)); 
          expires = expdate.toGMTString(); 
        }
        SetCookie(COOKIE_NAME, 1, expires, COOKIE_PATH, COOKIE_DOMAIN); 
}
function runPopup() {
  if ((navigator.userAgent.indexOf("Mozilla/2.0") >= 0) ) {
    popupPrompt();
  } else
    window.setTimeout("popupPrompt()", DELAY);
}
function initPopup() {
  var rand = getRandom();
  if (FREQ >= rand ) {
    bData = new browserData(0,null,0);
    var tail = navigator.appVersion.indexOf(' ');
    bData.version = parseFloat(navigator.appVersion.substring(0,tail));
    if ( ( (navigator.appName.indexOf("Netscape") >= 0) || 
           (navigator.appName.indexOf("Navigator") >= 0) ) && 
         (bData.version < 3) && 
         (navigator.userAgent.indexOf("16") >=0 ) && 
         (navigator.userAgent.indexOf("Win") >=0) )
      COOKIE_FLAG = 0;
    if (COOKIE_FLAG) {
      bData = new browserData(0,null,0);
      if (!GetCookie(COOKIE_NAME)) {
        CANPOPUP = true   
        putSurvCookie();
        if ( GetCookie(COOKIE_NAME)) {
          runPopup();
        }
      } 
      else {CANPOPUP = false;  }
    } else {
      runPopup();
    }
  }
}
function exitPopup () {
  if ( DOPOPUP && CANPOPUP ) {
    QuickPopup()
  }
}

window.onload = initPopup;

window.onunload=exitPopup;

//-->
