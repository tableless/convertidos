// create a clickable image button with 2 pictures: up and down
function createImageButton(action, form, btname, imgup, imgdown) {
	document.write("<IMG SRC='" + imgup + "' BORDER='0' ALT='' NAME='" + btname + "'"
				 + " onmousedown='document." + form + "." + btname + ".src=\"" + imgdown + "\"'"
  	  	 + " onmouseout='document." + form + "." + btname + ".src=\"" + imgup + "\"'"
				 + " onmouseup='document." + form + "." + btname + ".src=\"" + imgup + "\"'"
				 + " onclick='" + action + "'"
				 + ">");
}

// =================================================================================================
function CreatePopupWindow(windowname, url, width, height)
{
  // tests for the existence of the window.focus method. window.focus is how we bring the popup to the front every time, even though it was already open. Some older browsers do not have window.focus -- those browsers degrade gracefully by failing out of the function and going to the popup's URL in the current window. Note that there are no parentheses after window.focus because we are testing for the existence of the function, not running it.
  if (! window.focus)
    return true;
  // Line 6 declares the href variable, which holds the URL to which the popup should navigate. Lines 7 to 10 figure out what that URL is. In 7 we test if mylink is a string. If it is a string, in line 8 we assign to href the value of the string. If mylink is not a string then we assume it is an <A ...> or <AREA ...> object and in line 10 assign to href the value of the objects href property (which was set in the HREF attribute of the <A ...> or <AREA ...> tag). 
  var href, left, top; 
  // center popup window 
  left = (screen.width - width) / 2
  top = (screen.height - height) / 2
  if (typeof(url) == 'string')
     href=url;
  else
     href=url.href;
  window.open(url, windowname, 'width='+width+',left='+left+',top='+top+',height='+height+',resizable=yes,scrollbars=yes');
  //return false to cancel the click on the link. If we don't return false the link will navigate the current window to the URL of the popup
  //return false;
}

// =================================================================================================
function CreateRefPopupWindow(windowname, url, width, height, addressLine, browserMenu, browserStatus,
                              closeWithCallingWindow, allowKeyboardCommand, resize, toolBar, scrollBars,
                              popupExtRefObjektId)
{
  var href, left, top;
  var params = "";

  if (width > screen.width)
     width = screen.width;
  if (height > screen.height)
     height = screen.height;
   
  // center popup window 
  left = (screen.width - width) / 2;
  top = (screen.height - height) / 2;
  
  if (typeof(url) == 'string')
     href=url;
  else
     href=url.href;

         
  if (width > 0)
  {
    left = (screen.width - width) / 2;  	
    params += "width=" + width + ", left=" + left + ", ";    
  }
  if (height > 0)
  {
    top = (screen.height - height) / 2;  	
    params += "height=" + height + ", top=" + top + ", ";
  } 
  if (addressLine)
    params += "location=yes" + ", ";
  else
    params += "location=no" + ", ";  	     	
  if (browserMenu)
    params += "menubar=yes" + ", ";
  else
    params += "menubar=no" + ", ";       	
  if (browserStatus)
    params += "status=yes" + ", "; 
  else
    params += "status=no" + ", ";       	
  if (closeWithCallingWindow)	// geht nicht
    params += "dependent=yes" + ", "; 
  else
    params += "dependent=no" + ", ";  	     	
  if (allowKeyboardCommand)	// geht nicht
    params += "hotkeys=yes" + ", "; 
  else
    params += "hotkeys=no" + ", ";       	
  if (resize)
    params += "resizable=yes" + ", ";
  else
    params += "resizable=no" + ", ";     
  if (toolBar)
    params += "toolbar=yes" + ", ";
  else
    params += "toolbar=no" + ", ";     
  if (scrollBars)
    params += "scrollbars=yes" + ", ";
  else
    params += "scrollbars=no" + ", ";       

  if (params.length > 0)
      params = params.substring(0, params.length - 2);                  
  // alert(params);  
  
  // alert(url);  
  if (url.indexOf("http://") == -1)
  {
    if (url.indexOf("http:\\") != -1)
    {
      // for the case of EXTREFERENZ.FILEPATH = for example 'http:\\www.kleine.at'      	
      url = url.replace("http:\\", "http://");    
    }
    else
    {	
      if (url.indexOf("http:") != -1)
      {
        // for the case of EXTREFERENZ.FILEPATH = for example 'http:\www.kleine.at'    
        url = url.replace("http:", "http://");
      }
    }
  }  
  // alert(url);

  var winName = windowname + "_" +
                width + height + addressLine + browserMenu + browserStatus +
                closeWithCallingWindow + allowKeyboardCommand + resize + toolBar + scrollBars +
                "_" + popupExtRefObjektId;
  // alert(winName);
  var popup = window.open(url, winName, params);
  popup.focus();

}

// =================================================================================================
function CloseMeAndRefreshParent()
{
    opener.location.reload(true);
    self.close();
}

// =================================================================================================
// function bringtofront()
// -----------------------
// this code needs to be included in the popup window because popups have the disturbing behaviour to stay
// in the background. if you call bringtofront() in the popup then the popup gets the focus and comes into
// the front.
function BringToFront()
{
  window.focus();
}

// =================================================================================================
/* function validDate( strValue, strLanguage) 
 * ----------------------------------------------
 * DESCRIPTION: 
 *   checks if strValue is a valid date depending on the language in strLanguage
 * INPUT PARAMETERS:
 *   strValue: date in string format
 *   strLanguage == "1": valid date format is MM/DD/YYYY (english)
 *               <> "1": valid date format is DD.MM.YYYY
 * OUTPUT PARAMETERS:
 *   returns true, if the date is valid, otherwise false
 */
function validDate( strValue, strLanguage) 
{
  var objRegExp = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/
  var valid = false;

  if(!objRegExp.test(strValue))
  {
    return false;
  }
  else
  {
    //set date separator according to the language
    var strSeparator; 
  	if (strLanguage == "1")
	  	strSeparator = "/";
	  else
		  strSeparator = ".";
  
	  //split date into (day/month), (month/day), (year) and initialize variables
    var arrayDate = strValue.split(strSeparator); 

	  // get Day and Month according to language
    var intDay;
    var intMonth;
    // decimal numbers must not be prefixed with a zero or they will be treated as Octal numbers
    // so we have to use the base 10 in parseInt
	  if( strLanguage == "1")
	  { 
      intDay   = parseInt(arrayDate[1], 10);
		  intMonth = parseInt(arrayDate[0], 10);
		  
	  }		
	  else
	  {
		  intDay   = parseInt(arrayDate[0], 10); 
		  intMonth = parseInt(arrayDate[1], 10);  
	  }		

	  // check the year
	  var intYear = parseInt(arrayDate[2], 10); 
	  if( intYear >=1900 && intYear <= 2400)
		  valid = true;

    //create a lookup for months not equal to Feb.
    var arrayLookup = { '1' : 31,'3' : 31, '4' : 30,'5' : 31,'6' : 30,'7' : 31, '8' : 31,'9' : 30,'10' : 31,'11' : 30,'12' : 31}

    //check if month value and day value are valid (except February)
    if( valid && intMonth != 2) 
    {
	    if( arrayLookup[intMonth] != null)
	    {
        if( ! (intDay >= 0 && intDay <= arrayLookup[intMonth]))
          valid = false; // invalid day
      }		
	    else
	  	  valid = false; // invalid month
	  }

    //check February
  	if( valid && intMonth == 2)
	  {
      if( ! (((intYear % 4 == 0 && intDay <= 29) || (intYear % 4 != 0 && intDay <=28)) && intDay !=0))
 	    {
		    valid = false;
	    }
	  }  
  } 

  return valid; 
}

// =================================================================================================
/* function elem_char_count(value, maxlen, counter )
 * ----------------------------------------------
 * DESCRIPTION: 
 *   checks length of input element and displays free characters in counter element
 * INPUT PARAMETERS:
 *   value: value of element whose characters are counted
 *   maxlen: maximum permitted length of value
 * OUTPUT PARAMETERS:
 *   counter: counter element for display
 */
function elem_char_count(value, maxlen, counter )
{   
  var input = value.length;
  if (input > maxlen) 
  {
    value = value.substring(0,maxlen);
    input = maxlen;
  }
  counter.firstChild.data = maxlen-input;
}

// =================================================================================================
/* function validEmail(addr) 
 * ----------------------------------------------
 * DESCRIPTION: 
 *   checks is addr a valid email address
 * INPUT PARAMETERS:
 *   addr: email address in string format
 * OUTPUT PARAMETERS:
 *   returns true, if the email address is valid, otherwise false
 */
function validEmail( addr) 
{
 var a = false;
 var res = false;
 // is Regexp supported
 if(typeof(RegExp) == 'function')
 {
   var b = new RegExp('abc');
   if (b.test('abc') == true) {a = true;}
 }

 if(a == true)
 {
  reg = new RegExp('^([a-zA-Z0-9\\-\\.\\_]+)'+
                   '(\\@)([a-zA-Z0-9\\-\\.]+)'+
                   '(\\.)([a-zA-Z]{2,4})$');
  res = (reg.test(addr));
 }
 else
 {
  res = (addr.search('@') >= 1 &&
         addr.lastIndexOf('.') > s.search('@') &&
         addr.lastIndexOf('.') >= s.length-5)
 }
 return res;
}

// =================================================================================================
/* function getFormValues( myForm)
 * ----------------------------------------------
 * DESCRIPTION: 
 * Takes a given Form and returns all parameters in url-format.
 * @myForm: a form name of a given document, e. g. document.forms[0]
 */
function getFormValues( myForm)
{
	var str="";
	var elem;

    for (var i=0;i<myForm.elements.length;i++) 
     {
	     elem = myForm.elements[i];
		 		
         if(elem.type=="checkbox")
         {
              if(elem.checked==true)
              {
                 str +=  "&" + elem.name + "=" + elem.value;  
               }
         }

         if(elem.type=="hidden")
         {
              str +=  "&" + elem.name + "=" + elem.value;  
         }

         if(elem.type=="text")
         {
		 	if( elem.value != "")
              str +=  "&" + elem.name + "=" + elem.value;  
         }
		 
         if(elem.type=="select-multiple")
         {
		 	for (var k=0;k < elem.length; k++) 
			{
				if( elem.options[k].selected == true)
				{
  	            	str +=  "&" + elem.name + "=" + elem.options[k].value;  
				}
			}
		 }
    }

	return str;
}

function ZoomImagePopup(imgtag, title ,height, width) {
  var left, top;
  left = (screen.width - width) / 2;
  top = (screen.height - height) / 2;
//  alert("window.open('', 'zoomWindow', left=" + left + ", top=" + top + ",height=" + height + ",width=" + width+ ");");
  edit  = window.open('', 'zoomWindow', "left=" + left + ", top=" + top + ",height=" + height + ",width=" + width);
  edit.document.open();
  edit.document.write("<html><head><title>" + title+ "</title></head><body style='margin:0; padding:0'>" + imgtag + "</body></html>");
  edit.document.close();
  edit.focus();
}


function deleteCookie (name) 
{
     var expDate  = new Date();
     expDate.setTime (expDate.getTime() - 1);  
     document.cookie = name + "=''" + "; expires=" + expDate.toGMTString();
}
