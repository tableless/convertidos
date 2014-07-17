//
// home.js
//

// -------------------------------------------------------------
// cross-browser helper functions
// -------------------------------------------------------------

// Global variables
var isCSS 			= false;
var isW3C 			= false;
var isIE4 			= false;
var isNN4 			= false;
var isIE6 			= false;
var isGecko 		= false;
var isOpera 		= false;
var isDHTML 		= false;
var suppressMenus	= false;
var legacyMode		= false;
var timerID			= null;
var subtimerID		= null;

// initialize upon load to let all browsers establish content objects
function autoconfig()
{
    if(document && document.images)
    {
        isCSS		= (document.body && document.body.style) ? true : false;
        isW3C		= (isCSS && document.getElementById) ? true : false;
        isIE4		= (isCSS && document.all && readIEVer() >= 4.0) ? true : false;
        isNN4		= (document.layers) ? true : false;
        isGecko		= (isCSS && navigator && navigator.product && navigator.product == "Gecko");
        isOpera		= (isCSS && navigator.userAgent.indexOf( "Opera") != -1 );
		isIE6CSS	= (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) ? true : false;
		isIE6		= ( isIE6CSS && readIEVer() >= 6.0 );
        isDHTML		= isCSS && ( isIE4 || isGecko || isOpera );
        
        if( suppressMenus || ( isOpera && readOperaVer() < 7 ) || ( isGecko && navigator.productSub <= 20011022 ) || ( isGecko && navigator.productSub == 20030107 ) )
        {
			// Opera 6.x doesn't seem to like the DHTML...
			// Netscape 6.2 puts the menus in the wrong place...
			// Safari, the menus don't go away... problem in ResetMenu
			isDHTML	= false;
        }
        
    }
    
    
}


function readIEVer()
{
	var agent	= navigator.userAgent;
	var offset	= agent.indexOf( "MSIE" );
	if( offset < 0 )
	{
		return 0;
	}
	return parseFloat( agent.substring( offset + 5, agent.indexOf( ";", offset ) ) );
}

function readOperaVer()
{
	var agent	= navigator.userAgent;
	var offset	= agent.indexOf( "Opera" );
	if( offset < 0 )
	{
		return 0;
	}
	return parseFloat( agent.substring( offset + 6 ) );
}

// -------------------------------------------------------------
// client-side masthead
// -------------------------------------------------------------

var m_pnlinks;
var m_crumbs;
var m_mhFixed		= false;
var m_isHome		= false;
var m_isSegHome		= false;
var m_mda			= null;
var m_printLink		= null;
var m_emailLink		= false;
var m_production	= true;
var m_menudef		= "/content/public/menu.aspx";

function mhFixupLink( href, extra )
{
	if( typeof(extra) == "undefined" )
	{
		extra = "&~ck=mn";
	}
	
	if( href )
	{
		var anchor		= null;
		var anchorix	= href.indexOf( "#" );
		
		if( anchorix != -1 )
		{
			anchor		= href.substr( anchorix );
			href		= href.substr( 0, anchorix );
		}
		
		if( href.indexOf( "?" ) == -1 )
		{
			extra = "?" + extra.substr( 1 );
		}

		if( href.toLowerCase().indexOf( "javascript:" ) == -1 )
		{
			href += extra;
		}
		else
		{
			start = href.indexOf( "?" );
			
			if( start != -1 )
			{
				ix = href.indexOf( "\'", start );
				
				if( ix == -1 )
				{
					ix = href.indexOf( "\\", start );

					if( ix == -1 )
					{
						ix = href.indexOf( "\"", start );
					}
				}
				
				if( ix != -1 )
				{
					href = href.substr( 0, ix ) + extra + href.substr( ix );
				}
			}
		}
		
		if( anchor )
		{
			href += anchor;
		}
	}
	
	return href;
}

function menuItem( text, href )
{
	this.Text			= text;
	this.Href			= mhFixupLink( href, "&~ck=mn" );
	this.IsSeparator	= false;
	this.IsCaption		= false;
	this.MenuItems		= null;
}

function writeMH( phoneTitle, phoneMsg, phoneTariff, segmentTitle, hasLocale, logoLink, pnmsg )
{
	autoconfig();

	if( !m_production && typeof(m_menuBar) == "undefined" )
	{
		document.write( "<div class=\"para\" style=\"color:red; font-weight:bold\">There is a problem with the menu definition. " );
		document.write( "<a href=\"" + m_menudef + "\">Click here to view</a></div>" );
		
		return;
	}
	
	m_mhFixed	= true;

	document.writeln( "<a name=\"mastheadtop\"></a>" );
	
	if( m_search )
	{
		document.writeln( "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"728\"><tr><td>"  + m_localeSelector +  m_topLinks + "</td></tr></table>");
	}
	else
	{
		document.writeln( m_localeSelector );
	}
	
	// phone strip
	document.write( "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"728\" height=\"19\" bgcolor=\"#8C8C8C\"><tr><td background=\"" + m_imgPfx + "/images/global/brand/ui/bg_phonestrip.gif\" align=\"right\" valign=\"middle\">" );

	if( phoneTitle || phoneMsg )
	{
		document.write( "<span class=\"mhTextEmph\">" );
		
		if( phoneTitle )
		{
			document.write( phoneTitle );
			document.write( " " );
		}

		if( phoneMsg )
		{
			document.write( phoneMsg );
		}
			
		document.write( "</span>" );
	}
	
	if( phoneTariff )
	{
		document.write( "<span class=\"mhTextTrf\"> " + phoneTariff + "</span>" );
	}	
	
	document.writeln( "<img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" width=\"20\" height=\"1\" alt=\"\" /></td></tr></table>" );

	// main section
	document.write( "<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"728\" bgcolor=\"#0066CC\">" );
	document.write( "<tr><td width=\"155\" height=\"44\" valign=\"middle\">" );
	document.write( "<img src=\"" + m_homelogo + "\" align=\"absmiddle\" border=\"0\" alt=\"\" />" );
	document.write( "</td><td valign=\"bottom\" nowrap=\"1\">");
	document.write( "<img src=\"" + m_ctryImg + "\" alt=\"" + m_ctryShort + "\" vspace=\"4\">" );

	if ( flag )
	{
		document.write( "&nbsp;<img src=\"" + m_imgPfx + "/images/global/masthead/smlflags/" + flag  + ".gif\" alt=\"" + m_ctryShort + "\" border=\"0\" vspace=\"9\" />");
	}

	document.write( "</td><td align=\"right\" valign=\"middle\" nowrap=\"1\">");
	
	if( m_search )
	{
		document.write( m_search );
	}
	else
	{
		renderSearchLinks();
	}
	
	document.write( "</tr>" );
	document.write( "<tr><td colspan=\"3\" bgcolor=\"#004E98\" ><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\"  height=\"1\" width=\"1\" /></td></tr>" );
	
	document.write( "</table>" );

	// pn strip
	document.writeln( "<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"728\" bgcolor=\"#e1e1e1\">" );
	document.write( "<tr><td background=\"" + m_imgPfx + "/images/global/brand/ui/pn_shader.gif\" nowrap=\"1\" height=\"21\">&nbsp;" );

	if( pnmsg )
	{
	//	document.write( "<span class=\"mhTextPnMsg\">&nbsp;&nbsp;&nbsp;&nbsp;" + pnmsg + "</span>" );
	}
	
	if( m_pnlinks )
	{
		document.write( "</td><td align=\"right\" background=\"" + m_imgPfx + "/images/global/brand/ui/pn_shader.gif\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" height=\"21\"><tr>" );
		
		for( var n = 0; n < m_pnlinks.length; n++ )
		{
			if( n > 0 )
			{
				document.write( "<td><img src=\"" + m_imgPfx + "/images/global/masthead/secondary_sep.gif\" alt=\"\"></td>" );
			}

			var href = m_pnlinks[n].Href;
			var icon = m_pnlinks[n].Icon;
			
			if( icon )
			{
				document.write( "<td valign=\"middle\"><a href=\"" + href + "\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/" + icon + ".gif\" border=\"0\"  alt=\"\"></a></td>" );
			}
			
			document.write( "<td align=\"left\" valign=\"middle\" nowrap=\"true\"><a class=\"lnk_iconic\" href=\"" + href + "\">" + m_pnlinks[n].Text + "</a></td>" );
		}

		document.write( "<td>&nbsp;</td></tr></table>" );
	}
	
	document.write( "</td></tr></table>" );
	
	document.writeln( "<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"728\" bgcolor=\"#e1e1e1\">" );
	document.writeln( "<tr><td bgcolor=\"#666666\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" height=\"1\" width=\"1\"/></td></tr>" );

	// mda
	if( m_mda )
	{
		document.writeln( "<tr><td bgcolor=\"#e1e1e1\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"728\">");
		document.write( "<tr><td bgcolor=\"#f5f5f5\" valign=\"middle\" height=\"28\" style=\"font-size:10pt;font-weight:bold\" style=\"padding-bottom:0px; padding-top:3px; padding-right:10px\">&nbsp;&nbsp;&nbsp;" + m_mda + "</td>" );
		document.writeln( "<tr><td bgcolor=\"#999999\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\"  height=\"1\" width=\"1\"/></td></tr>" );
		document.writeln( "</table></td></tr>" );
	}
		
	document.write( "</table>" );
}

function renderSearchLinks()
{
	if( m_searchLinks )
	{
		document.write( "<table cellspacing=\"0\" cellpadding=\"3\" border=\"0\"><tr>" );
		
		for( var n = 0; n < m_searchLinks.length; n++ )
		{
			if( n > 0 )
			{
				document.write( "<td valign=\"middle\"><img src=\"" + m_imgPfx + "/images/global/brand/ui/mhlnksep.gif\" width=\"2\" height=\"24\" alt=\"\"></td>" );
			}
			
			var href = m_searchLinks[n].Href;
			var text = m_searchLinks[n].Text;

			document.write( "<td valign=\"middle\"><a href=\"" + href + "\"><img src=\"" + m_imgPfx + "/images/global/brand/ui/secondary.gif\" width=\"4\" height=\"17\" border=\"0\" alt=\"\"></a></td>" );
			document.write( "<td valign=\"middle\"><a href=\"" + href + "\" nowrap=\"1\" class=\"lnk_main_masthead\">" + text + "</a></td>" );
		}

		document.write( "<td><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" width=\"10\" height=\"1\" width=\"1\"/></td></tr></table>" );
	}
	else
	{
		document.write( "&nbsp;" );
	}
}

function mhLink( text, href, icon, extra )
{
	href = mhFixupLink( href, extra );

	this.Text			= text;
	this.Href			= href;
	this.Icon			= icon;
}

function addPnLink( text, href, icon )
{
	if( !m_pnlinks )
	{
		m_pnlinks = new Array();
	}
	
	m_pnlinks[m_pnlinks.length] = new mhLink( text, href, icon );
}

function addCrumb( text, href )
{
	if( !m_crumbs )
	{
		m_crumbs = new Array();
	}
	
	m_crumbs[m_crumbs.length] = new mhLink( text, href, null );
}

// -------------------------------------------------------------
// client-side footer
// -------------------------------------------------------------

function writeFooterLine( color )
{
	document.writeln( "<tr><td bgcolor=\"" + color + "\" ><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" width=\"1\" height=\"1\" /></td></tr>" );
}

function writeFooterStart()
{
	var width = ( m_mhFixed ? "728" : "100%" );
	document.write( "<table width=\"" + width + "\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" bgcolor=\"#ededed\">" );
	document.write( "<tr><td bgcolor=\"white\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" height=\"8\" width=\"1\" alt=\"\" /></td></tr>" );

	document.write( "</table>" );
}

function writeFooterMid()
{
	var width	= ( m_mhFixed ? "728" : "100%" );
	var sepCol	= "#cccccc";
	
	document.write( "<table width=\"" + width + "\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" bgcolor=\"#ededed\">" );
	document.write( "<tr><td colspan=\"2\" bgcolor=\"" + sepCol + "\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" height=\"1\" width=\"1\" alt=\"\" /></td></tr>" );
	document.write( "<tr><td colspan=\"2\" ><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" height=\"5\" width=\"1\" alt=\"\" /></td></tr><tr><td width=\"" + width + "\" align=\"center\" valign=\"top\">" );
}

function writeFooterBegin()
{
	writeFooterStart();
	writeFooterMid();
}

function writeFooterClose()
{
	document.write( "</td><td><table><tr><td valign=\"middle\"><img src=\"" + m_imgPfx + "/images/global/brand/ui/arrow_top.gif\" width=\"7\" height=\"4\" alt=\"\" border=\"0\"></td><td valign=\"middle\"><a href=\"#mastheadtop\"><span class=\"para\">" + m_gototop + "</span></a>&nbsp;&nbsp;</td></tr></table></td></tr><TR><td colspan=\"2\" ><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" height=\"5\" width=\"1\" /></td></tr><TR><td colspan=\"2\" bgcolor=\"#cdcdcd\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" height=\"1\" width=\"1\" /></td></tr></table>" );
}

function writeFooterEnd()
{
	var width	= ( m_mhFixed ? "728" : "100%" );
	var sepCol	= "#cccccc";
	
	document.write( "<table width=\"" + width + "\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" bgcolor=\"#ededed\">" );
	document.write( "<tr><td colspan=\"2\" bgcolor=\"" + sepCol + "\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" height=\"1\" width=\"1\" alt=\"\" /></td></tr>" );
	document.write( "<tr><td colspan=\"2\" ><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" height=\"5\" width=\"1\" alt=\"\" /></td></tr><tr><td width=\"" + width + "\" align=\"center\" valign=\"top\">" );
	document.write( m_birdseed );
	document.write( "</td><td><table><tr><td valign=\"middle\"><img src=\"" + m_imgPfx + "/images/global/brand/ui/arrow_top.gif\" width=\"7\" height=\"4\" alt=\"\" border=\"0\"></td><td valign=\"middle\"><a href=\"#mastheadtop\"><span class=\"para\">" + m_gototop + "</span></a>&nbsp;&nbsp;</td></tr></table></td></tr><TR><td colspan=\"2\" ><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" height=\"5\" width=\"1\" /></td></tr><TR><td colspan=\"2\" bgcolor=\"#cdcdcd\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" height=\"1\" width=\"1\" /></td></tr></table>" );
}

function writeFooter()
{
	writeFooterStart();
	writeFooterEnd();
}


function Bandwidth()
{
	if( readIEVer() < 5.0 || isOpera || navigator.appVersion.toLowerCase().indexOf("win") == -1 )
	{
		return "NA";
	}
	
	document.body.addBehavior ("#default#clientCaps");
	
	if ( typeof( document.body.connectionType) != "undefined"  ) 
	{
		if ( document.body.connectionType == "modem" )
		{
			return "Modem";
		}
		return "Lan";
	}

}


// -------------------------------------------------------------
// end of home.js
// -------------------------------------------------------------
