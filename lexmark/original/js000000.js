
NS_ActualWrite=document.write;
// Popup Blocker -->
RanPostamble=0;
NS_ActualOpen=window.open;
orig_setTimeout = window.setTimeout;
function NS_NullWindow(){this.window;}
function NS_NewOpen(url,nam,atr){
	obj=new NS_NullWindow();
	obj.focus = NS_NullWindow;
	obj.opener = this.window;
	return(obj);
}
function NS_NullWindow2(){this.window;}
function NS_NewOpen2(url,nam,atr){return(new NS_NullWindow2());}
function op_stop() { NS_ActualOpen2=window.open; window.open=NS_NewOpen2; }
function op_start() { window.open=NS_ActualOpen2; }
function noopen_ST(one,two) { return(orig_setTimeout("op_stop();"+one+";;op_start();",two)); }
function noopen_load() { 
    op_stop(); if(orig_onload) orig_onload(); op_start();
}
function noopen_unload() { op_stop(); if(orig_onunload) orig_onunload(); op_start(); }
function postamble() {

  if(!RanPostamble) {
    RanPostamble=1;
	orig_onload = window.onload;
	orig_onunload = window.onunload;
	window.onunload = noopen_unload;
	window.onload = noopen_load;
	window.open=NS_ActualOpen;
  }
}
window.setTimeout = noopen_ST;
window.open=NS_NewOpen;
document.ignore = new Object();
