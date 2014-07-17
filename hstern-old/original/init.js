function initDefault(){

	if (window.opener) {
		//PopUp
	} else {
		checkSize(820, 620);
	}

	if(isDef('init'))init()
	if(isDef('scrollClipDL')){
		//DMreposMenu()
		//onresize=DMreposMenu
	}
	preloadImages()
}
onload=initDefault
