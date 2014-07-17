var promoArray2a, promoArray2b;
function randomNumberForImage(num)
{	
	promoArray2a = new Array(num);
	promoArray2b = new Array(num);
	return Math.floor( Math.random() * num + 1);
}
function arrayOfBannerImage1(num,num1,num2)
{
	promoArray2a[num1] = num2;
	return promoArray2a[num];
}
function arrayOfBannerImage2(num, num1,num2)
{
	promoArray2b[num1] = num2;
	return promoArray2b[num];
}

// disable or enable checkbox if the particular checkbox is present in the form
function selected(form)
{
	for (var i = 0; i<form.length; i++)
	{
		var elementType = form.elements[i].type;
		if (elementType == 'checkbox')
		{
			elementType = form.elements[i].checked = true;
		}
	}
}

// left hand nav search input text for different browsers
function inputBoxBrowserSpecific(prodSearch)
{
	var sBrowser = navigator.appName +  navigator.appVersion;
	if ( sBrowser.indexOf( "Netscape4" ) > -1 ) {
		document.write( '<input type="text" name="prodSearch" size="7"/>' );
	}
	else
	{
		// 14 is the default size for IE
		document.write( '<input type="text" name="prodSearch" size="14"/>' );
	}

}

function isValidEmailAddress(sEmailAdd)
{
	var aEmailElements = sEmailAdd.split('@');
	var nTotalElements = aEmailElements.length;
	if (nTotalElements == 2)
	{
		var aSecondPart = aEmailElements[1].split('.');
		if (aSecondPart.length > 1)
		{
			return true;
		}
	}
	return false;
}

function isAlphanumeric (s){
	defaultEmptyOK = true;
	if (isEmpty(s))
	if (isAlphanumeric.arguments.length == 1)
		return defaultEmptyOK;
  	else
      return (isAlphanumeric.arguments[1] == true);

   for (var i = 0; i < s.length; i++)
   {
       var c = s.charAt(i);
       if (! (isLetter(c) || isDigit(c) ) )
    	    return false;
   }
   return true;
}

function isEmpty(s)
{
	return ((s == null) || (s.length == 0))
}

function isLetter (c)
{   	
	return ( ((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")) )
}

function isDigit (c)
{
	return ((c >= "0") && (c <= "9"))
}

function isInteger(s){
	var i, c;
   for (i = 0; i < s.length; i++){
       c = s.charAt(i);
       if (((c < "0") || (c > "9"))) return false;
   }
   return true;
}

/* stripCharsInBag()
 * searches through string's characters.
 * If character is not in bag, append to returnString..
 */
function stripCharsInBag(s, bag){
	var i, c;
  	var returnString = "";
   // Search through string's characters one by one.
   // If character is not in bag, append to returnString.
   for (i = 0; i < s.length; i++){
       c = s.charAt(i);
       if (bag.indexOf(c) == -1) returnString += c;
   }
   return returnString;
}

function isDate(dtStr){
	var dtCh= "/";
	var minYear=1900;
	var maxYear=2100;
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh)
	var pos2=dtStr.indexOf(dtCh,pos1+1)
	var strMonth=dtStr.substring(0,pos1)
	var strDay=dtStr.substring(pos1+1,pos2)
	var strYear=dtStr.substring(pos2+1)
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
	if (pos1==-1 || pos2==-1){
		return false
	}
	if (strMonth.length<1 || month<1 || month>12){
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		return false
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		return false
	}
	return true
}

// This and the following 2 functions are for building standard buttons
function buildButton(sURL,sCaption,eButtonColor,eButtonType,sFormName,
   sButtonName, bHiddenAfterClick)
{
   var sURLToUse;
   switch (eButtonType) {
   case 0: // close
   	sURLToUse = "javascript:window.close();";
   	break;
   case 2: // print
   	sURLToUse = "javascript:window.print();";
   	break;
   case 3: // reset
            sURLToUse = "javascript:buttonResetFn(\"" + sFormName + "\", \"" + sButtonName + "\");";
   	break;
   case 4: // submit
            sURLToUse = "javascript:buttonSubmitFn(\"" + sFormName + "\", \"" + sButtonName + "\");";
   	break;
   case 1: // link
   default:
   	var sURLToUse = sURL;
   	break;
   }

   switch (eButtonColor) {
   case 1: // grey button
   	sHoldColor1 = "#c3c3c3";
   	sHoldColor2 = "#686868";
   	break;
   case 0: // red button
   default:
   	sHoldColor1 = "#FF0000";
   	sHoldColor2 = "#990000";
   	break;
   }

   document.write ("<TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0'>");
   document.write("<TR><TD BGCOLOR='#000000' ALIGN='center' COLSPAN='3'>");
   document.write("<IMG SRC='/images/world/s/spacer.gif' ALT='' BORDER='0'/></TD></TR>");
   document.write("<TR><TD BGCOLOR='#000000' ALIGN='center' WIDTH='1'>");
   document.write("<IMG SRC='/images/world/s/spacer.gif' WIDTH='1' ALT='' BORDER='0'/></TD>");
   document.write("<TD BGCOLOR='#686868' ALIGN='center'>");
   document.write("<TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0'>");
   document.write("<TR><TD BGCOLOR='#686868' ALIGN='center'>");
   document.write("<TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0'>");
   document.write("<TR><TD BGCOLOR='"+sHoldColor1+"' ALIGN='center' COLSPAN='3'>");
   document.write("<IMG SRC='/images/world/s/spacer.gif' ALT='' BORDER='0' />");
   document.write("</TD></TR>");
   document.write("<TR><TD BGCOLOR='"+sHoldColor1+"' ALIGN='center' WIDTH='1'>");
   document.write("<IMG SRC='/images/world/s/spacer.gif' WIDTH='1' ALT='' BORDER='0'/></TD>");
   document.write ("<TD BGCOLOR='#686868' ALIGN='center'>");
   document.write ("<TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0'>");
   if (bHiddenAfterClick==1)
   {
      document.write ("<TR><TD BGCOLOR='"+sHoldColor2);
      document.write("' ALIGN='center'  ", " onClick=this.style.visibility='hidden'; >");
   }
   else
   {
      document.write ("<TR><TD BGCOLOR='"+sHoldColor2+"' ALIGN='center'>");
   }

   document.write ("<B>&nbsp;&nbsp;<A HREF='"+sURLToUse+"' CLASS='button'>");
   document.write("<FONT FACE='Verdana, Arial, Helvetica, Sans-Serif' COLOR='#FFFFFF' SIZE='-1'>");
   document.write("<SPAN CLASS='buttonhover'>");
   document.write(sCaption+"</SPAN></FONT></A>&nbsp;&nbsp;</B>");
   document.write ("</TD></TR></TABLE></TD>");
   document.write ("<TD BGCOLOR='#000000' ALIGN='center' WIDTH='1'>");
   document.write("<IMG SRC='/images/world/s/spacer.gif' WIDTH='1' ALT='' BORDER='0'/></TD></TR>");
   document.write ("<TR><TD BGCOLOR='", sHoldColor1, "' ALIGN='center' WIDTH='1'>");
   document.write("<IMG SRC='/images/world/s/spacer.gif' ALT='' BORDER='0'/></TD>");
   document.write ("<TD BGCOLOR='#000000' ALIGN='center' COLSPAN='2'>");
   document.write("<IMG SRC='/images/world/s/spacer.gif' ALT='' BORDER='0' />");
   document.write("</TD></TR></TABLE> </TD></TR></TABLE></TD>");
   document.write ("<TD BGCOLOR='#000000' ALIGN='center' WIDTH='1'>");
   document.write("<IMG SRC='/images/world/s/spacer.gif' WIDTH='1' ALT='' BORDER='0'/>");
   document.write("</TD></TR><TR>");
   document.write ("<TD BGCOLOR='#000000' ALIGN='center' COLSPAN='3'>");
   document.write("<IMG SRC='/images/world/s/spacer.gif' ALT='' BORDER='0'/>");
   document.write("</TD></TR></TABLE>");

   document.write ("<INPUT type='hidden' value='0' name='");
   document.write(sButtonName);
   document.write("'>");
}

function buttonSubmitFn(sForm, sButton)
{
   eval("document."+sForm+"."+sButton+".value = 1;");
   eval("document."+sForm+".submit();");
}

function buttonResetFn(sForm, sButton)
{
   eval("document."+sForm+"."+sButton+".value = 1;");
   eval("document."+sForm+".reset();");
}


// Event handler logic to allow multiple functions to execute on a single
// event without changing the event handler itself.
var oEventStarts = new Object();

function eventStart(sEvent)
{
   if (eval("typeof(oEventStarts.a" + sEvent+")") == "undefined")
   {
      eval("oEventStarts.a" + sEvent + " = new Array();");
   }

	var iLen = eval ("oEventStarts.a" + sEvent + ".length");
	if (iLen > 0)
	{
		for (var i=0; i<iLen; i++)
		{
			eval ("oEventStarts.a" + sEvent + '[' + i + "]();");
		}
 	}
}

function addEventFunction(sEvent,sFunction)
{
   if (eval("typeof(oEventStarts.a" + sEvent+")") == "undefined")
   {
      eval("oEventStarts.a" + sEvent + " = new Array();");
   }
   eval ("oEventStarts.a" + sEvent + "[oEventStarts.a" + sEvent + ".length] = " + sFunction + ";");
}

// Get a particular cookie's value
function getCookie(sCookieName)
{
   var sResult = "";
   var sCookies = document.cookie;
   var iStart = sCookies.indexOf(sCookieName);
   if (iStart == -1)
   {
      return sResult;
   }
   var iEnd = sCookies.indexOf(";",iStart);
   if (iEnd == -1)
   {
      iEnd = sCookies.length;
   }
   sResult = sCookies.substring(iStart+sCookieName.length+1,iEnd);
   return sResult;
}

function WindowPopup(Name, Parameters){
	window.open( (Name), "popup", (Parameters) );
}

function GlobalSubmit(){
	if (document.GlobalNav.GlobalNavMenu.selectedIndex > 0) {
		document.GlobalNav.submit();
	}
}

function go_country_menu(menu) {
	var choice = menu.selectedIndex;
	var new_url = menu.options[choice].value;
	if (new_url != "")
		window.location.href = new_url;
}

// Used to generate a popUp message notifying the user if they are
// going to a section of the site that only has U.S. English content.
//
function englishPopup( sPopupURL ) {
	var allCookies = document.cookie;
	var isSet = allCookies.indexOf("langWarningChecked");
	if( isSet == '-1' ){
		WindowPopup(sPopupURL + "template/017.jsp?view=Lang_Warning",'width=500,height=350,top=0,left=0,scrollbars=yes,resizable=yes,toolbar=no,status=yes,menubar=no');
	}
}

function swap(name, offimage)  {
   newimage = new Image();
   newimage.src = offimage;
   document[name].src = newimage.src;
}

function thePopupImg( sIMG ){
	WindowPopup( sIMG, 'toolbar=no,resizable=yes,scrollbars=yes,width=350,height=350');
}
		
var g_bFlashDetected = false;
if( navigator.mimeTypes && 
    navigator.mimeTypes['application/x-shockwave-flash'] && 
    navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin )
{
    if( navigator.plugins && 
	    navigator.plugins['Shockwave Flash'] )
	{
        g_bFlashDetected = true;
	}
}
else if( navigator.userAgent && 
         navigator.userAgent.indexOf('MSIE') >= 0 && 
		 (navigator.userAgent.indexOf('Windows 95') >= 0 || 
		  navigator.userAgent.indexOf('Windows 98') >= 0 || 
		  navigator.userAgent.indexOf('Windows NT') >= 0) )
{
    document.writeln('<SCRIPT LANGUAGE=VBScript\> ');
    document.writeln('on error resume next ');
    document.writeln('g_bFlashDetected = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.3")))');
    document.writeln('if ( g_bFlashDetected <= 0 ) then g_bFlashDetected = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4")))');
    document.writeln('if ( g_bFlashDetected <= 0 ) then g_bFlashDetected = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5")))');
    document.writeln('</SCRIPT>');
}

