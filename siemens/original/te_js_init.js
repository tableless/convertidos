 //constants and global variables:
 var urlPrefix="http://ute.siemens.com:80/tracking_engine/StatServ?"; // is overwritten by configuration property tracking.imageURLBase !!!!!
 var te_img=new Image();

 // initializes assoziative array (i.e. an object)
 var te={IEVE_WEB_ID:"", IEVE_WEB_LOAD:"", IEVE_WEB_RESP:"", IEVE_WEB_TRANS:"", IEVE_CLI_TIME:"", IEVE_USER_ID:"", IEVE_CLI_SESSION:"", IEVE_CLI_REFERRER:"", IEVE_CLI_BROW:"", IEVE_CLI_BROW_VER:"", IEVE_CLI_BROW_LANG:"", IEVE_CLI_SYS:"", IEVE_CLI_SYS_LANG:"", IEVE_CLI_RES:"", IEVE_CLI_COL:"", IEVE_CLI_COOKIE:"", IEVE_CLI_JSCR:"", IEVE_NAV_ZONE:"", IEVE_NAV_OBJ:"", IEVE_CHANNEL:"", IEVE_COUNTRY_ID:"", IEVE_UNIT_ID:"", IEVE_MARKETPLACE_ID:"", IEVE_LANG_ID:"", IEVE_DIVISION_ID:"", IEVE_PRI_N_NAV_BAR_ID:"", IEVE_SECTION_ID:"", IEVE_SEC_NAV_ID:"", IEVE_THI_NAV_ID:"", IEVE_NAV_PATH:"", IEVE_CONT_ID:"", IEVE_CONT_TYPE_ID:"", IEVE_MOD_FLAG_ID:"", IEVE_CONT_CATEGORY_ID:"", IEVE_APPLICATION:"", IEVE_ACTION:"", IEVE_ARG1:"", IEVE_ARG2:"", IEVE_ARG3:"", IEVE_ARG4:"", IEVE_TE_LINK_ID:"", IEVE_TE_ZONE_ID:""};
 var atr={IEVE_WEB_ID:"wid", IEVE_WEB_LOAD:"wld", IEVE_WEB_RESP:"wrt", IEVE_WEB_TRANS:"wtr", IEVE_CLI_TIME:"cti", IEVE_USER_ID:"uid", IEVE_CLI_SESSION:"css", IEVE_CLI_REFERRER:"crf", IEVE_CLI_BROW:"cbr", IEVE_CLI_BROW_VER:"cbv", IEVE_CLI_BROW_LANG:"cbl", IEVE_CLI_SYS:"csy", IEVE_CLI_SYS_LANG:"csl", IEVE_CLI_RES:"crs", IEVE_CLI_COL:"ccl", IEVE_CLI_COOKIE:"cco", IEVE_CLI_JSCR:"cjs", IEVE_NAV_ZONE:"naz", IEVE_NAV_OBJ:"nao", IEVE_CHANNEL:"cha", IEVE_COUNTRY_ID:"cou", IEVE_UNIT_ID:"unt", IEVE_MARKETPLACE_ID:"mpl", IEVE_LANG_ID:"lan", IEVE_DIVISION_ID:"div", IEVE_PRI_N_NAV_BAR_ID:"pnv", IEVE_SECTION_ID:"sec", IEVE_SEC_NAV_ID:"sna", IEVE_THI_NAV_ID:"tna", IEVE_NAV_PATH:"nvp", IEVE_CONT_ID:"cid", IEVE_CONT_TYPE_ID:"cty", IEVE_MOD_FLAG_ID:"mfl", IEVE_CONT_CATEGORY_ID:"cca", IEVE_APPLICATION:"app", IEVE_ACTION:"act", IEVE_ARG1:"ag1", IEVE_ARG2:"ag2", IEVE_ARG3:"ag3", IEVE_ARG4:"ag4", IEVE_TE_LINK_ID:"clk", IEVE_TE_ZONE_ID:"clz"};

 //***
 var agt=navigator.userAgent.toLowerCase();
 var is_ie= ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
 var now=(new Date()).getTime();
 te["IEVE_CLI_TIME"]=now;
 te["IEVE_CLI_REFERRER"]=window.document.referrer;
 te["IEVE_CLI_BROW_LANG"]=is_ie ? navigator.userLanguage : navigator.language;
 te["IEVE_CLI_SYS_LANG"]=navigator.systemLanguage!=null ? navigator.systemLanguage : "";
 te["IEVE_CLI_JSCR"]="1";
 if (typeof(screen)=="object") {
 		te["IEVE_CLI_RES"]= screen.width +"x" +screen.height;
 		te["IEVE_CLI_COL"]= screen.colorDepth;
 }
 te["IEVE_CLI_BROW"] = navigator.appName;
 te["IEVE_CLI_BROW_VER"]=parseFloat(navigator.appVersion);
 te["IEVE_CLI_SYS"]=navigator.platform;

 if (navigator.cookieEnabled) {
 	 te["IEVE_CLI_COOKIE"]=1;
 } else { //check manually:
	 var oml = new Date(now.valueOf()+(60000));  // --> 1 minute later
	 var cookiestr="RLC="+Math.random()+" ; expires="+oml;
	 document.cookie=cookiestr;
	 te["IEVE_CLI_COOKIE"]= (!document.cookie || document.cookie.length == 0 ) ? "0" : "1"; // IE 5: always "0", even if cookies are allowed!!
 }

 function saveEvent() {
  var myURL=urlPrefix;
  for (var each in te) {
    myURL+=atr[each]+"="+escape(te[each])+"&";
//    alert(each+':'+atr[each]+':'+te[each]+':'); 
  }
  myURL+="nc="+Math.round(Math.random()*100000); //no cache please!
  te_img.src=myURL; //...load image
 }

