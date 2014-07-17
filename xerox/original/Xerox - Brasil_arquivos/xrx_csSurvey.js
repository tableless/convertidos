<!-- FILE: xrx_csSurveys.js -->
// This file contains code to activate surveys on a web page.

var survey_inviteURL = "";
var survey_xeroxDomain = ".xerox.com";

// Invite a user to take a survey
function survey_inviteUser(sUrl)
{
  if (sUrl != "")
  {
    window.open ( sUrl, "", "toolbar=no,toolbar=0,location=no,location=0,status=no,status=0,menubar=no,menubar=0,scrollbars=yes,scrollbars=1,resizable=yes,resizable=1,width=1,height=1,top=3000,left=3000,alwaysRaised=1" ); 
  }
}

// Create the survey image to ensure that informative is up
var survey_inviteImage;
function survey_createImage(urlImage)
{
   survey_inviteImage = new Image();
   survey_inviteImage.src = urlImage;
}

// Check to see if the image is loaded
function survey_checkImage()
{
  if (survey_inviteImage.complete &&
      (survey_inviteURL != null))  
  {
    survey_inviteUser(survey_inviteURL);
  }
}

function survey_pageEntry(urlSurvey, urlImage, domain) 
{
   if( domain != null && domain != "" ){
      survey_xeroxDomain = domain;
   }

   if (document.images) 
   {
      survey_createImage(urlImage);
      survey_inviteURL = urlSurvey;
      if (survey_inviteImage.complete)
      {
         survey_inviteUser(urlSurvey);
      }
      else
      {
         setTimeout('survey_checkImage()',1000);
      }
   }
}

function survey_pageExitPreload(urlImage, domain) 
{
   if (document.images) 
   {
      if ( domain != null && domain != "" )
      {
         survey_xeroxDomain = domain;
      }

      survey_createImage(urlImage);
	}
}

function survey_pageExit(urlSurvey) 
{
	if (survey_inviteImage != null && survey_inviteImage.complete)
   {
      survey_inviteUser(urlSurvey);
   }
}

// Global survey object. Contains all survey related data.
var survey_oSurveys = new Object();
survey_oSurveys.aActiveSurveys = new Array();

// Get the parameters of a given URL.
function survey_getParams(sSearchURL)
{
	var oResult = new Object();
	if (sSearchURL[0] == "?")
	{
		sSearchURL = sSearchURL.substring(1);
	}
	
	var aNameValueList = sSearchURL.split("&");
	for (var iCount=0; iCount < aNameValueList.length;iCount++)
	{
		if ((aNameValueList[iCount].length > 0) 
			&& (typeof(aNameValueList[iCount]) != "undefined")
			&& (aNameValueList[iCount].length > 0))
		{
			var aNameValue = aNameValueList[iCount].split("=");
			eval("oResult." + aNameValue[0] + " = aNameValue[1];");		
	  	}
	}

	return oResult;
}

// Check to see if the URL parameters match a rules parameters.
function survey_checkParamRule(oURLParams,oRuleParams)
{
	var bResult = true;
	for (var sProp in oRuleParams)
	{
		if ((oRuleParams[sProp] != "*")
			&& ((typeof(oURLParams[sProp]) == "undefined")
				|| (oRuleParams[sProp].indexOf("|" +  oURLParams[sProp] + "|") < 0)))
		{
			bResult = false;
		}
	}
	return bResult;
}

// Check to see if a survey is active for the current page. If it is,
// add it to the list of active surveys.
function survey_check()
{
	var sURL = window.location.href;
	var aLocation = sURL.split("?");
	var aResult = survey_oSurveys[aLocation[0]];
   var sNewSiteExits = "";
   var bHasCookie = false;
	if (typeof(aResult) != "undefined")
	{
		var sSearch = "";
		if (aLocation.length == 2)
		{
			var aSearch = aLocation[1].split("#");
			sSearch = aSearch[0];
		}
		var oURLParams = survey_getParams(sSearch);
		for (var iIndex = 0; iIndex < aResult.length; iIndex ++)
		{
			var oRuleParams = survey_getParams(aResult[iIndex].sParams);
			if (survey_checkParamRule(oURLParams,oRuleParams) == true)
			{
            // Found a survey for this page
				survey_oSurveys.aActiveSurveys[survey_oSurveys.aActiveSurveys.length] = aResult[iIndex].sId;
            if (aResult[iIndex].sEventType == "Site Exit")
            {
               bHasCookie = true;
               sNewSiteExits += aResult[iIndex].sId + "@";
            }
				break;
			}
		}
	}

   // Check the cookie.
   var sSiteExitCookie = unescape(getCookie("SiteExitCookie"));
   var aValues = sSiteExitCookie.split("@");
   for (var iIndex=0; iIndex< aValues.length; iIndex++)
   {
      if (aValues[iIndex] == "")
      {
         continue;
      }
      if (sNewSiteExits.indexOf(aValues[iIndex] + "@") < 0)
      {
         // Found a site exit survey in the cookie
         bHasCookie = true;
         sNewSiteExits += aValues[iIndex] + "@";
         survey_oSurveys.aActiveSurveys[survey_oSurveys.aActiveSurveys.length] = aValues[iIndex];
      }
   }

   // If there are any site exits, update the cookie
   if (bHasCookie == true)
   {
      // Remove the old cookie
      document.cookie = "SiteExitCookie=; expires=Fri, 02-Jan-1970 00:00:00 GMT; path=/";

      // Set the new cookie
      document.cookie = "SiteExitCookie=" + escape(sNewSiteExits) + "; path=/; domain=" + survey_xeroxDomain;
   }
}

var bSiteExit = true;
// This is a simple function that wrapps any existing 
// function
function survey_onClick(fn)
{
	var oResult = true;
	bSiteExit=false;
	if (fn != null)
	{
		oResult = fn();
	}
	return oResult;
}

// This function adds a function to be called for 
// every link and form on the page. This function will
// Tell the system that the user is not exiting the 
// site.
var oSiteExitOnClickFns = new Array();
var bAssigned = false;
function survey_siteExitAssignOnClick()
{
   // Make sure we don't execute this twice
   if (bAssigned == true)
   {
      return;
   }

   bAssigned = true;

	// Set up links
	var iFnIndex = 0;
	for (i=0; i< document.links.length; i++)
	{
		oSiteExitOnClickFns[iFnIndex] = document.links[i].onclick;
		document.links[i].onclick = new Function("","return survey_onClick(oSiteExitOnClickFns[" + iFnIndex + "]);");
		iFnIndex++;
	}
	
	// Set up forms
	for (i=0; i< document.forms.length; i++)
	{
		oSiteExitOnClickFns[iFnIndex] = document.forms[i].onsubmit;
		document.forms[i].onsubmit = new Function("","return survey_onClick(oSiteExitOnClickFns[" + iFnIndex + "]);");
		iFnIndex++;
	}
}

// preload site exit survey data
function survey_siteExitPreload(urlImage, domain) 
{
   if (document.images) 
   {
      if ( domain != null && domain != "" )
      {
         survey_xeroxDomain = domain;
      }

      survey_createImage(urlImage);
      survey_siteExitAssignOnClick();
	}
}

// start the site exit survey
function survey_siteExit(urlSurvey) 
{
	if (bSiteExit == true && survey_inviteImage != null && survey_inviteImage.complete)
   {
      survey_inviteUser(urlSurvey);
   }
}

// For active surveys, perform the onLoad actions
function survey_onLoad()
{
	for (var iIndex = 0; iIndex < survey_oSurveys.aActiveSurveys.length; iIndex++)
	{
		var oEntry = survey_oSurveys[survey_oSurveys.aActiveSurveys[iIndex]];

      // Make sure the entry is valid
      if (typeof(oEntry) != "object")
      {
         continue;
      }

		if (oEntry.sEventType == "Page Entry")
		{
			survey_pageEntry(oEntry.sSurveyURL,survey_oSurveys.sImageURL,survey_oSurveys.sCookieDomain);
		}
		else if (oEntry.sEventType == "Page Exit")
		{
			survey_pageExitPreload(survey_oSurveys.sImageURL,survey_oSurveys.sCookieDomain);
		}
		else if (oEntry.sEventType == "Site Exit")
		{
         survey_siteExitPreload(survey_oSurveys.sImageURL,survey_oSurveys.sCookieDomain);
		}
	}
}

// for active surveys, perform the onUnload actions
function survey_onUnload()
{
	for (var iIndex = 0; iIndex < survey_oSurveys.aActiveSurveys.length; iIndex++)
	{
		var oEntry = survey_oSurveys[survey_oSurveys.aActiveSurveys[iIndex]];

      // Make sure the entry is valid
      if (typeof(oEntry) != "object")
      {
         continue;
      }

		if (oEntry.sEventType == "Page Exit")
		{
			survey_pageExit(oEntry.sSurveyURL);
		}
		else if (oEntry.sEventType == "Site Exit")
		{
         survey_siteExit(oEntry.sSurveyURL);
		}
	}
}

// Add a survey page to the list of those active
function survey_addPage(sId,sURL,sParams,sEventType,sSurveyURL,sArea,sSiteURLs)
{
   // Process the url properly: full urls are not changed, urls starting with
   // a slash are assumed to be relative to the current hostname and port, and
   // the rest are assumed to be relative to the bv application.
   if (sURL.charAt(0) == "/")
   {
      sURL = baseURL + sURL;
   }
   else if (sURL.substring(0,4) != "http")
   {
      sURL = bvBaseURL + sURL;
   }
   
	if (typeof(survey_oSurveys[sURL]) == "undefined")
	{
		survey_oSurveys[sURL] = new Array();
	}
	var iIndex = survey_oSurveys[sURL].length;
	survey_oSurveys[sURL][iIndex] = new Object();
	survey_oSurveys[sURL][iIndex].sParams = sParams;
	survey_oSurveys[sURL][iIndex].sId = sId;
	survey_oSurveys[sURL][iIndex].sEventType = sEventType;
	survey_oSurveys[sURL][iIndex].sSurveyURL = sSurveyURL;
	survey_oSurveys[sURL][iIndex].sArea = sArea;
	survey_oSurveys[sURL][iIndex].sSiteURLs = sSiteURLs;
   survey_oSurveys[sId] = survey_oSurveys[sURL][iIndex];
}

// Set basic survey information
function survey_setInfo(sImageURL, sCookieDomain)
{
	survey_oSurveys.sImageURL = sImageURL;
   survey_oSurveys.sCookieDomain = sCookieDomain
}

// Get several parts of the current URL so that they
// can be used later.
var sFullURL = window.location.href.split("?")[0];
var iBase = sFullURL.indexOf("/");
iBase = sFullURL.indexOf("/",iBase+1);
iBase = sFullURL.indexOf("/",iBase+1);
var baseURL= sFullURL.substring(0,iBase);
// Get the bv base
iBase = sFullURL.indexOf("/",iBase+1);
iBase = sFullURL.indexOf("/",iBase+1);
var bvBaseURL = sFullURL.substring(0,iBase+1);

// Set up the standard event functionality for surveys
addEventFunction("bodyOnLoad","survey_check");
addEventFunction("bodyOnLoad","survey_onLoad");
addEventFunction("bodyOnUnload","survey_onUnload");
