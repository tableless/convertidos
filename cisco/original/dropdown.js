/***************************************************************
* DirectAccess Pulldown Library - v0.9.9
* author: Christian Bonham
* 
* (c) Cisco Systems, All Rights Reserved.
****************************************************************/
var currDropdowns = new Array();
var currId =0;
var autoOpenDropTimer=0;
var closeDropTimer=0; 		//currently not using any timed auto-closing

var dropdownDontClose = false; 	//use for handling events from the document.onclick
addToBodyOnClick(dropdownDocOnClick);
addToFlyoutToggle(dropdownCloseAll);

/* Debugging functions, setting bDebug to true will spawn an alert
 * with debugging info. */
var dropdownDebugStr = '';
/* Debugging functions, setting bDebug to true will spawn an alert
 * with debugging info. */
function debug(debugStr, str) {
	debugStr = debugStr + str + '\n';
	return debugStr;
}
function debugClear(debugStr) {
	debugStr = '';
}
function debugAlert(str, bDebug) {
	if (bDebug) {
		alert(str);
	}
} 
function EventDebug(e) {
	dropdownDebugStr = debug (dropdownDebugStr, 'Event Info:');
	dropdownDebugStr = debug (dropdownDebugStr, 'clientX: ' + e.clientX);
	dropdownDebugStr = debug (dropdownDebugStr, 'clientY: ' + e.clientY);
	dropdownDebugStr = debug (dropdownDebugStr, 'layerX: ' + e.layerX);
	dropdownDebugStr = debug (dropdownDebugStr, 'layerY: ' + e.layerY);
	dropdownDebugStr = debug (dropdownDebugStr, 'pageX: ' + e.pageX);
	dropdownDebugStr = debug (dropdownDebugStr, 'pageY: ' + e.pageY);
	dropdownDebugStr = debug (dropdownDebugStr, 'screenX: ' + e.screenX);
	dropdownDebugStr = debug (dropdownDebugStr, 'screenY: ' + e.screenY);
	dropdownDebugStr = debug (dropdownDebugStr, 'offsetX: ' + e.offsetX);
	dropdownDebugStr = debug (dropdownDebugStr, 'offsetY: ' + e.offsetY);
	dropdownDebugStr = debug (dropdownDebugStr, 'x: ' + e.x);
	dropdownDebugStr = debug (dropdownDebugStr, 'y: ' + e.y);
}

/* switches between showing & hiding */
function dropdownToggle(dropdown,id,event){
	
	clearTimeout(autoOpenDropTimer);
	dropdownCloseAllOther(id);
	
	//prompEle = the <a> tag
	promptEle = dropdown;
	//
	dropdown = dropdown.parentNode;
	
	// Get IDs
	parentID = dropdown.id;
	childID = dropdown.id + '-list';
	arrowID = dropdown.id + '-arrow';
	dropdownDebugStr = debug(dropdownDebugStr, 'parentID: ' + parentID + ', childID:' + childID);
		
	// set up pointers.
	if (document.all) {
		ele = document.all[parentID];
		pd = document.all[childID];
		arrow = document.all[arrowID];
		// Get the window height
		winWidth = document.body.clientWidth;
		winHeight = document.body.clientHeight;
		// must reconstruct aboslute page location based 
		// on mouse click abs position, and relative to layer
		eleTop = event.clientY - event.offsetY;

	} else if (document.getElementById) {
		ele = document.getElementById(parentID);
		pd = document.getElementById(childID);
		arrow = document.getElementById(arrowID);
		// Get the window height
		winWidth = window.innerWidth;
		winHeight = window.innerHeight; 
		// must reconstruct aboslute page location based 
		// on mouse click abs position, and relative to layer
		eleTop = event.pageY - event.layerY;
	}
	
	dropdownDebugStr = debug(dropdownDebugStr, 'Window Width: ' + winWidth + ',' + 'Window Height: ' + winHeight);
	dropdownDebugStr = debug(dropdownDebugStr, 'Element Top: ' + eleTop);
	
	// change the visibility of the layer.
	if (ele.className == 'collapsed'){
		ele.className = 'shown';
		currDropdowns[id] = ele;
		promptEle.className = 'dropdownInstructionOpen';
		/* HAAAACK to Fix NS 7.0 first time click bug. */
		pd.style.display = 'block';
		// hide the arrow.
		arrow.className = 'dropdownArrowHidden';
		dropdownDontClose = true;
	} else {
		ele.className = 'collapsed';
		pd.style.top = '0px';
		/* HAAAACK to Fix NS 7.0 first time click bug. */
		pd.style.display = 'none';
		currDropdowns[id] = null;
		promptEle.className = 'dropdownInstruction';
		// show the arrow.
		arrow.className = 'dropdownArrow';
		dropdownDontClose = false;
	}

	// determine if we have enough space to render down.
	needHeight = (eleTop + pd.offsetHeight + ele.offsetHeight);	
	dropdownDebugStr = debug(dropdownDebugStr, 'Height Req: ' + needHeight);
	if (needHeight > winHeight) {
		dropdownDebugStr = debug(dropdownDebugStr, '***Render UP***');
		// shift the layer up by it's height, plus the prompt height
		newPosX = pd.offsetTop - (pd.offsetHeight + ele.offsetHeight);
		pd.style.top = newPosX + 'px';
	} else {
		dropdownDebugStr = debug(dropdownDebugStr, '***Render DOWN***');
	}
	
    dropdownDebugStr = debug(dropdownDebugStr, 'parent width = ' + ele.offsetWidth + ' height = ' +  ele.offsetHeight);
    dropdownDebugStr = debug(dropdownDebugStr, 'parent pos: ' + ele.offsetLeft + ':' + ele.offsetTop);
    dropdownDebugStr = debug(dropdownDebugStr, 'parent-parent top: ' + ele.offsetParent.offsetTop);
	dropdownDebugStr = debug(dropdownDebugStr, 'flyout dim: ' + pd.offsetWidth + ':' + pd.offsetHeight);
	dropdownDebugStr = debug(dropdownDebugStr, 'flyout pos: ' + pd.offsetLeft + ":" + pd.offsetTop);
	dropdownDebugStr = debug(dropdownDebugStr, '---');
	EventDebug(event);
	debugAlert(dropdownDebugStr, false);
}

/* automatically opens after 1 sec (1000msec) hover */
/* function autoOpenDropdown(dropdown,id) {
	currDropdowns[id] = dropdown;
	currId = id;
	autoOpenDropTimer = setTimeout("toggleDropdownWrap()",1000);
}
function toggleDropdownWrap() {
	dropdownToggle(currDropdowns[id],id);
} */
/* automatically closes after 1 sec (100msec) mouseout */

function autoCloseDropdown() {
	clearTimeout(autoOpenDropTimer);
	closeDropTimer = setTimeout("dropdownTimesOut()",1000);
	currDropdown = null;
}

function dropdownTimesOut() {
	if (currDropdown != null) {	
		currDropdown.className = 'collapsed';
	}
	else {
		//close all dhtml dropdowns
	}
}

function dropdownCloseAllOther(id) {
	for (var i=1;i<currDropdowns.length;i++) {
		if (i!=id) {
			dropdownClose(currDropdowns[i]);
			currDropdowns[i]=null;
		}	
	}
}

function dropdownClose(drop) {
	if (drop != null) {
		// change the visibility
		drop.className = 'collapsed';
		dropdownDontClose = false;

		// Get IDs
		childID = drop.id + '-list';
		arrowID = drop.id + '-arrow';
		promptID = drop.id + '-prompt';
	
		// set up pointers.
		if (document.all) {
			pd = document.all[childID];
			drop.firstChild.className = 'dropdownInstruction'; 
		} else if (document.getElementById) {
			pd = document.getElementById(childID);
			prompt = document.getElementById(promptID);
			prompt.className = 'dropdownInstruction';
		}
		// reset the layer position to relative zero.
		dropdownDebugStr = debug(dropdownDebugStr, 'AutocloseID: ' + drop.id + ', childID:' + childID);
		pd.style.top = '0px';
		/* HAAAACK to Fix NS 7.0 first time click bug. */
		pd.style.display = 'none';
		arrow.className = 'dropdownArrow';
	}
	debugAlert(dropdownDebugStr, false);
}

function dropdownCancelBubble() {
	// 	This function essentially replicates the 
	// 	cancel bubble functionality by preventing
	//  parent element onClicks from closing the 
	//  pulldown.
	dropdownDontClose = true;
}

function dropdownDocOnClick() {
	//  If someone has set the don't close me
	//  flag, just clear the flag, otherwise
	//  close the whole shibang.
	if (dropdownDontClose) {
		dropdownDontClose = false;
	} else {
		dropdownCloseAll();
	}
}

function dropdownCloseAll() {
	for (var i=1;i<currDropdowns.length;i++) {
		dropdownClose(currDropdowns[i]);
		currDropdowns[i]=null;	
	}
	dropdownDontClose = false;
}

