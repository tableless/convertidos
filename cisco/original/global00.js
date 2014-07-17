/**
 *  Writes and supports global javascript functions
 *  global.js
 *  $Revision: 1.15 $
 */

// refresh the page on resize in netscape

function handleResize() {
  if (window.innerWidth != origWidth || window.innerHeight != origHeight) {
    location.href = location.href;
    return false;
  }
}

if ( document.layers ) {
  origWidth = window.innerWidth;
  origHeight = window.innerHeight;
  window.captureEvents(Event.RESIZE);
  window.onresize = handleResize;
}

// Dynamically register functions to be called on page loads

var onloadFA = new Array();

function registerOnloadFunction( func ) {
  onloadFA[ onloadFA.length ] = func;
}
function onloadFunctions() {
  for(var i = 0; i < onloadFA.length; i++ ) {
    onloadFA[i]();
  }
}

// Window Opening / Closing Funcitons 

function openChildWindow( appurl, windowname ) {
  var appwindow = window.open( appurl , windowname, "toolbar=yes,status=yes,top=25,left=0,outerWidth=798,outerHeight=547,width=798,height=547,scrollbars=yes,resizable=yes,menubar=yes,locationbar=no,");
  appwindow.focus();
}

function openLargePopup( url, windowname ) {
  var popup = window.open( url , windowname, "toolbar=yes,status=yes,scrollbars=yes,menubar=yes,locationbar=no,top=50,left=70,outerWidth=643,outerHeight=468,width=643,height=468,resizable=yes");
  popup.focus();
}

function openMediumPopup( url, windowname ) {
  var popup = window.open( url , windowname, "toolbar=no,status=yes,scrollbars=yes,menubar=no,locationbar=no,top=90,left=170,outerWidth=445,outerHeight=390,width=445,height=390,resizable=yes");
  popup.focus();
}

function openSmallPopup( url, windowname ) {
  var popup = window.open( url , windowname, "toolbar=no,status=yes,scrollbars=yes,menubar=no,locationbar=no,top=90,left=290,outerWidth=220,outerHeight=390,width=220,height=390,resizable=yes");
  popup.focus();
}

function closeWindow() {
  self.close();
}

function changeParentUrl( newurl ) {
  var openerClosed = false;
  if( document.all && !document.getElementById() ) {
    // opener.closed always returns false in IE ... makes sense, right?
    // let's roll our own function in VB, where we can trap errors...
    openerClosed = isOpenerClosed();
  } else {
    if( top.opener ) {
      openerClosed = top.opener.closed;
    } else {
      openerClosed = true;
    }
  }
  if( openerClosed ) {
    var newwin = window.open( newurl);
    newwin.focus();
  } else {
    top.opener.location.href = newurl;
    top.opener.focus(); 
  }
}

// Creates a browser-generated alert or message box
// note:
// this was abstracted just in case we ever want to do anything
// with the string or send to non-pcs devices
function openMessage(str) {
  alert(str);
}

// Grabs a parameter from the URL.  Returns an empty
// string if parameter does not exist.
function getParameter(param) {

        var val = "";
        var qs = window.location.search;
        var start = qs.indexOf(param);

        if (start != -1) {
                start += param.length + 1;
                var end = qs.indexOf("&", start);
                if (end == -1) {
                        end = qs.length
                }
                val = qs.substring(start,end);
        }
        return val;
}

// Get the BaseTag, if specified in the current page
function get_baseTag() {
	var baseTag = "";
	if ( document.all ) {	
		var baseTagsCol = document.all.tags("BASE");
		if (baseTagsCol.length!=0){
			baseTag = baseTagsCol[0].href;
		}
	} else if (window.opera) {
		var baseTag
		if (document.getElementById('basehref')){
			baseTag = document.getElementById('basehref').href;
			baseTag = baseTag.substring(0, baseTag.length-1);
		}
	}
	return baseTag;
}

// Drop-down location.href redirection
function dropdown_redirect(select_name,reset) {
	if (reset == null) { reset = true };
	var theselect=eval(select_name);
	var tmp=theselect.selectedIndex;
	if (reset) { theselect.options[0].selected=true; }
	if(theselect.options[tmp].value != "") {
		location.href=get_baseTag()+theselect.options[tmp].value;
	}
}

// Area drop-down redirection
var areanav_current = 0;
function set_areanav_current( index ) {
	// xsl position starts at 1, array index starts at 0
	areanav_current = index-1;
}
function areanav_redirect(select_name) {	
  var theselect=eval(select_name);
  var tmp=theselect.selectedIndex;
  if(theselect.options[tmp].value != "") {
	 theselect.options[areanav_current].selected=true;
	 location.href=get_baseTag()+theselect.options[tmp].value;
  }
}


// functions used to register functions that execute on the global onClick event
var globalBodyOnClickList = new Array();

//function called to add a handler to the event
function addToBodyOnClick(funct){
    //assign the wrapper function to the event
    //this blows away any traditionally assigned handlers
    document.onclick = bodyOnClick;

    //add the function to the array
    globalBodyOnClickList[globalBodyOnClickList.length] = funct;
}

//function that gets called by the body's onClick event
function bodyOnClick(){
    for (var i=0;i<globalBodyOnClickList.length;i++){
        //do each of the functions in the array
        globalBodyOnClickList[i]();
    }
}

// functions used to register functions that execute on the global onLoad event
var globalWindowOnLoadList = new Array();

//function called to add a handler to the event
function addToWindowOnLoad(funct){
    //assign the wrapper function to the event
    //this blows away any traditionally assigned handlers
    window.onload = windowOnLoad;

    //add the function to the array
    globalWindowOnLoadList[globalWindowOnLoadList.length] = funct;
}

//function that gets called by the window's onClick event
function windowOnLoad(){
    for (var i=0;i<globalWindowOnLoadList.length;i++){
        //do each of the functions in the array
        globalWindowOnLoadList[i]();
    }
}

/* ---------------------------------------------------------------
   Cookie functions - 
   global_setCookie and global_getCookie match the ones in 
     collapsing_list.js for tdts-books. The rest are new.
   ---------------------------------------------------------------- */

//function returns the date that is 'days' days from now. 
// (in milliseconds since 1/1/70 of course)

function global_daysFutureToTimeMS (days) {
  var mydate = new Date();
  var ms;
  mydate.setTime(mydate.getTime()+((days)*24*60*60*1000));
  ms = Date.parse(mydate);
  return ms;
}

function global_setCookie(name, value, days) {
  if (days) {
    var dateobj = new Date(global_daysFutureToTimeMS (days));
    var expdate = dateobj.toGMTString();
    var expires = "; expires="+expdate;
  } else {
    var expires = "";
  }
  //alert("expires="+expires);
  document.cookie = name+"="+value+expires+"; path=/";
}

function global_getCookie(name) {
 var CValue = new String();
  CValue = document.cookie;
  var exp = new RegExp("^.*" + name + "=" );
  if (CValue.match(exp)){
    CValue = CValue.replace(exp,'');
    CValue = CValue.replace(/;.*/,'');
    //alert(name +" is currently set to "+CValue);
    return CValue;
  }
  //alert(name+" has no value yet");
  return ""; 
}
 
function global_extractCookieChip(cookiename,parmname) {
  //alert("extracting "+parmname+" from "+cookiename);
  var CValue = unescape(global_getCookie(cookiename));
  var PValue = new String();
  var namestr = "&"+parmname+"=";
  var start = CValue.indexOf(namestr);
  if (start > -1) {
    start += namestr.length;
    PValue = CValue.substring(start,CValue.length);
    //alert(PValue+"=PValue");
    if (PValue.indexOf("&") > -1) {
      PValue = PValue.substring(0,PValue.indexOf("&"));
    }
    return PValue;
  }
  return "";
}

function global_crumbleCookieChip(cookiename, parmname) {
  /* get cookie values in array */
  var CValue = unescape(global_getCookie(cookiename));
  if ( CValue.indexOf ("&", CValue) > -1) {
    var chips = CValue.split("&");
    var newchips = new String();

    /* reassemble without parm and rewrite */
    for ( var i=0; i < chips.length; i++) {
      if ( chips[i].indexOf(parmname) != 0 ) {
        if ( newchips == "") { chips[i] = "&"+chips[i]; }
        newchips += chips[i];
      }
    } /* end stepping through array */
    global_setCookie(cookiename, newchips, 366);
  } /* if there was no '&' we did nothing */
}

function global_addCookieChip(cookiename, newname, newvalue ) {
  var CValue = global_getCookie(cookiename);
  CValue += escape("&"+newname+"="+ newvalue);
  global_setCookie (cookiename, CValue, 366);
}

/*---------------------------------------------------------
  Intercept popup window decision process functions
------------------------------------------------------------ */

/* ------------------------------------------------------------------
  Use timedPop() to popup an intercept window only if they've been 
  on-site for a while.

  They will NEVER get this window on the first page they come to, 
  even if minutes=0. Use randomPop() instead if you need that

   minutes: how long they need to be onsite before getting popup
   frequency: how often to ask people - random number between 1 & frequency generated
   url: url of window to pop open
   stopcookie: name of cookie that lets you know they've been asked already
   expires: number of days to keep the stopcookie active
   windowsize: small, medium, large - defaults to large -- sizes defined in window opening functions
---------------------------------------------------------------------*/

function timedPop(minutes, frequency, url, stopcookie, expires, windowsize ) {
  myDomain = window.location.host; 

  if ( myDomain == "cisco.com" || myDomain == "www.cisco.com" || myDomain == "elovejoy-lnx" || myDomain == "maunaloa" || myDomain == "maunaloa.cisco.com" ) { /* don't let this interfere w/ apps */

    timeCookie= "CDCsitetimer";

    /* check for time cookie */
    now = new Date();
    nowMinutes = now.getTime()/60000; 

    if ( cookietime = global_getCookie(timeCookie)) {
      // alert("long enough? cookietime="+cookietime +" & now is " 	+nowMinutes);

      if ( cookietime != "Done" && (nowMinutes - cookietime) >= minutes )   {
        // alert("time to pop");
        randomPop(frequency,  url, stopcookie, expires, windowsize);
        global_setCookie(timeCookie,"Done", 0);
      } 

    } else {
      /* if they don't have a timer make one */
      global_setCookie(timeCookie,nowMinutes, 0);
   }
   //} else { alert("we don't pop on your domain");

  } /* end domain check */
}

/* -------------------------------------------------------------------
 randomPop() will popup an intercept window if the randomly generated number = 1
 If frequency=1 this will always get called.
 This _can_ happen on the first page someone lands on.
 
   frequency: odds of getting popup = 1/frequency times
   url: url of the content for popup window
   stopcookie: name of cookie that keeps them from getting popup again
   expiredays: number of days to keep the stopcookie active
   windowsize: small, medium, large - defaults to large 
   -- these sizes are defined in the window opening functions
  ------------------------------------------------------------------- */
 
function randomPop (frequency, url, stopcookie, expiredays, windowsize){
  var cookiename = 'IntSurP';
  var validDate;
  var random_num;

  frequency <= 1 ? random_num = 1: random_num = Math.ceil( frequency * Math.random()) ;

  if ((random_num == 1) ) {
   validDate = global_extractCookieChip(cookiename,stopcookie);

   if ( validDate && validDate < Date.parse(Date()) ) {
      /* they had the cookie, but it's too old to matter */
      global_crumbleCookieChip(cookiename, stopcookie);
      validDate = "";
   }

   if (!validDate ) {
      /* they don't have a cookie telling us to stop */

      expiredays = global_daysFutureToTimeMS(expiredays);
      global_addCookieChip(cookiename, stopcookie,expiredays);

      if ( windowsize=="medium" ) {
        openMediumPopup(url,"popWin");
      } else if ( windowsize=="small") {
	  openSmallPopup(url,"popWin");
      } else {
        openLargePopup(url,"popWin");
      }

   //} else { 
    //alert("You've got the Cookie! " + stopcookie); 

  }  /* ends if (!validDate) */
  //} else { 
     /* it was a different random number */
    // alert("random_num was "+random_num)  // for debugging purposes only
  } /* ends if (random_num ==1) */
} // end randomPop() 


/* ------------------------------------------------------------
   function call to initiate timed survey
   ------------------------------------------------------------ */
// Test example of how to use timedPop
// timedPop(1, 2, "http://www.cisco.com/survey/intercept.html", "timesurvey", 182, "medium" ); 

