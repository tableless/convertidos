tagSite="http://ts1.lexmark.com/";

var FormID;

function GetCookie (name) {  
	var arg = name + "=";  
	var alen = arg.length;  
	var clen = document.cookie.length;  
	var i=0;  
	while (i < clen) {    
	var j = i + alen;    
	if (document.cookie.substring(i, j) == arg)      
		return getCookieVal (j);    
		i = document.cookie.indexOf(" ", i) + 1;    
		if (i == 0) break;   
	}  
	return null;
}
function SetCookie (name, value) {  
	var argv = SetCookie.arguments;  
	var argc = SetCookie.arguments.length;  
	var expires = (argc > 2) ? argv[2] : null;  
	var path = "";  
	var domain = (argc > 4) ? argv[4] : null;  
	var secure = (argc > 5) ? argv[5] : false;  
	document.ignore = name + "=" + escape (value) + 
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + 
	((path == null) ? "" : ("; path=" + path)) +  
	((domain == null) ? "" : ("; domain=" + domain)) +    
	((secure == true) ? "; secure" : "");
}
function getCookieVal(offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}
function core(query,type)
{
if (query.search('RN')==-1)
{
query=query+'&RN='+document.title;
}
var now = new Date();
var datMonth=String(now.getMonth()+1);
var datDay=String(now.getDate());
if (datMonth.length==1) {datMonth='0'+datMonth};
if (datDay.length==1) {datDay='0'+datDay};
var datNow= datMonth+'/'+datDay+'/'+now.getFullYear();
var millis = now.getTime();
var hrNow = now.getHours();
var transID = ""+millis;
//FormID copies the value of transID
FormID = transID;
var ACT = '';
var ACT = GetCookie('ACT');
	if(ACT == null) {
		SetCookie('ACT','Y')
		ACT = GetCookie('ACT');
	}
tagServerURL=tagSite+type+'?ACT='+ACT+'&RAND='+transID+'&DT='+datNow+'&HR='+hrNow+'&'+escape(query)+'&REFERER='+escape("Hidden-Referrer");
return(tagServerURL);
}
function tag(queryString)
{
tagURL=core(queryString,'tag.gif');
tag = new Image();
tag.src=tagURL;
}
function cid(queryString)
{
tagURL=core(queryString,'tag.gif');
tag = new Image();
tag.src=tagURL;
}
function redirect(queryString)
{
tagURL=core(queryString,'tag.gif');
tag = new Image();
tag.src=tagURL;
for(i=0;i<50000;i++){
}
}

function fid(name){
	document.write("");
}
				
