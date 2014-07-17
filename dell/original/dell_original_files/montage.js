//
// montage.js
//

var monBlock	= null;
var monImg		= null;
var monIdx		= 0;
var monContainer= null;
var monTimeout	= 7000;

function montage( href, src, caption, width, animate )
{
	// this is the case for browsers that don't support filters...
	var cycle	= Math.floor( Math.random() * href.length );

	// switch off animation if we're not on broadband
	var m_montage	= ( typeof(animate) != "undefined" ? animate : hasBroadband() );
	
	if( m_montage == false || src.length <= 1 || !( isIE4 || isW3C ) )
	{
		montagePicker( href, src, caption, cycle );
		return;
	}
	
	// go build all of the nested DIVs out
	monIdx		= cycle;

	document.writeln( "<div id=\"container\" style=\"width:" + width +"px;height:149px\">" );

	for( i = 0; i < src.length; i++ )
	{
		// set up a placeholder
		document.writeln( "\t<div id=\"montage" + i + "\" style=\"display:none\">" );
		
		montagePicker( href, src, caption, i );

		document.writeln( "\t</div>" );
	}

	document.writeln( "</div>" );

	// pull the images out
	monBlock	= new Array( src.length );
	monImg		= new Array( src.length );

	for( i = 0; i < src.length; i++ )
	{
		monBlock[i]	= document.getElementById( "montage" + i ).style;
		monImg[i]	= document.getElementById( "monimg" + i );
		
		if( monImg[i] == null )
		{
			montagePicker( href, src, caption, i );
			return;
		}
	//	alert( "foo" );
	}

	monContainer = document.getElementById("container");
	
	montageEffects();
}

function montageEffects()
{
	var nextImage	= (monIdx + 1) % monImg.length;
	
	// run the transition
	if( readIEVer() >= 4.0 )
	{
		monContainer.style.filter = "blendTrans(duration=1.5) revealTrans(duration=1.0,transition=7)";
	
		monContainer.filters(0).apply();
		monContainer.filters(1).apply();
		
 		montageSelect( nextImage );
		
		monContainer.filters(0).play();
		monContainer.filters(1).play();
	}
	else
	{
		montageSelect( nextImage );
	}

	// asked to be called again a little later
	setTimeout( "montageSwap()", monTimeout );
}

function montageSelect( nextImage )
{
	//alert( monImg[monIdx].style.visibility );
	monBlock[monIdx].display = "none";
	monIdx = nextImage;
	monBlock[monIdx].display = "block";
}		

function montageSwap()
{
	if( monImg[monIdx].complete )
	{
		// move the image index along
		montageEffects();
	}
	else
	{
		// check again 3 seconds later
		setTimeout( "montageSwap()", 3000 );
	}
}

function montagePicker( href, src, caption, cycle )
{
	if( href[cycle] != null ) 
	{
		document.writeln( "\t\t<A HREF=\"" + href[cycle] + "\"><IMG SRC=\"" + src[cycle] + "\" alt=\"" + caption[cycle] + "\" BORDER=\"0\" ID=\"monimg" + cycle + "\"></a>" );
	}
	else
	{
		document.writeln( "\t\t<IMG SRC=\"" + src[cycle] + "\" ID=\"monimg" + cycle + "\">" );
	}
}

function hasBroadband()
{
	if( readIEVer() < 5.0 )
	{
		return false;
	}
	
	try
	{
		document.body.addBehavior ("#default#clientCaps");
	
		return ( typeof(document.body.connectionType) != "undefined" && document.body.connectionType == "lan" );
	}
	catch( e )
	{
		return false;
	}
}

// -------------------------------------------------------------
// end of montage.js
// -------------------------------------------------------------
