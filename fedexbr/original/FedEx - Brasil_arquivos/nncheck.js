<!--
/*var x = "<link rel=\"stylesheet\" href=\"/css/fedexascend.css\" type=\"text/css\" />";
var y = "<link rel=\"stylesheet\" href=\"/css/fedexascendp.css\" type=\"text/css\" />";*/

var x = "<style>ul li { margin-left: -24px; }</style>";
var y = "<style>ul { margin-left: -24px; }</style>";

var nncheck = navigator.userAgent.indexOf("Mozilla")==0 && navigator.appName == "Netscape";

if(nncheck) {
		document.writeln(y);
	}
	else {
		document.writeln(x);
	}
//-->