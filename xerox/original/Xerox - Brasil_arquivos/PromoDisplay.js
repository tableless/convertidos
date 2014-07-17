/**
  * This file contains functionality for displaying promos on the homepage 
  *
  * @author Brian Ziegler
  * @version 06/22/2004 Initial version.
  */

/**
  * Randomly select and display the product promos from the passed in promo 
  * buckets.
  *
  * @param aPromoA The array of promo Objects for bucket A
  * @param aPromoB The array of promo Objects for bucket B
  * @param aPromoC The array of promo Objects for bucket C
  * @param aPromoD The array of promo Objects for bucket D
  * @return The HTML for displaying the product promos
  */
function displayThreeSlotPromos( aPromoA, aPromoB, aPromoC, aPromoD )
{
    // These need to match the values in:
	// com.xerox.xdotcom.display.HomePageDisplay.PromoType
	var SINGLE = "single";
	var DOUBLE = "double";
	var TRIPLE = "triple";

	// If there are no promos in the promo A area something is wrong, so just 
	// return an empty string
	if( aPromoA.length == 0 ){
	    return "";
	}
	
	var sRet = "";
	
	oPromoA = aPromoA[rand(aPromoA.length)];
	if( oPromoA.promotype == SINGLE && aPromoB.length > 0 ){
    	oPromoB = aPromoB[rand(aPromoB.length)];
		if( oPromoB.promotype == SINGLE && aPromoC.length > 0 ){
	    	oPromoC = aPromoC[rand(aPromoC.length)];
		    sRet = "<td>" + formatPromo( oPromoA ) + "</td>\n" +
		           "<td align='center' width='100%'>" + 
				   formatPromo( oPromoB ) + "</td>\n" +
		           "<td align='right'>" + formatPromo( oPromoC ) + "</td>\n";
		}
		else{
		    sRet = "<td>" + formatPromo( oPromoA ) + "</td>\n" +
		           "<td align='right'>" + formatPromo( oPromoB ) + "</td>\n";
		}
	}
	else if( oPromoA.promotype == DOUBLE && aPromoD.length > 0 ){
    	oPromoD = aPromoD[rand(aPromoD.length)];
	    sRet = "<td>" + formatPromo( oPromoA ) + "</td>\n";
	    sRet += "<td align='right'>" + formatPromo( oPromoD ) + "</td>\n";
	}
	else{
	    sRet = "<td>" + formatPromo( oPromoA ) + "</td>\n";
	}
	
    return sRet;
}

/**
  * Randomly select a promo from the array of promos, then format the promo and
  * return it.
  *
  * @param aPromos The array of promo Objects
  * @return The formated random promo
  */
function displayPromo( aPromos )
{
    // If the array is empty we can't select anything, so return
	if( aPromos.length <= 0 ){
	    return "";
	}
	
	// Select a random promo
	var i = rand( aPromos.length );
	
	// Format and return the promo
    return formatPromo( aPromos[i] );
}

/**
  * Format a promo Object so that it may be displayed on the screen.
  *
  * @param oPromo The promo Object
  * @return The formated promo
  */
function formatPromo( oPromo )
{
	var sRet = "";
	if( oPromo.flash == null || !g_bFlashDetected ){
	    sRet = oPromo.image;
	}
	else{
	    sRet = oPromo.flash;
		logFlashObservationSees( sRet, oPromo.image )
	}
	return sRet;
}

function logFlashObservationSees( sFlash, sImg )
{
	var iPos = 0;
	var sStr = sFlash.toLowerCase();
	
	var sURL = sImg;
	iPos = sURL.indexOf( "loadObservation" );
	sURL = sURL.substring( iPos );
	iPos = sURL.indexOf( "\'" );
	sURL = sURL.substring( iPos + 1 );
	iPos = sURL.indexOf( "\'" );
	sURL = sURL.substring( 0, iPos );
	
	var sLang = sFlash;
	iPos = sLang.indexOf( "Xlang%3d" ) + 8;
	sLang = sLang.substring( iPos, iPos + 5 );
	
	iPos = sStr.indexOf( "<embed " );
	sStr = sStr.substring( iPos );
	iPos = sStr.indexOf( ">" );
	sStr = sStr.substring( 0, iPos );
	
	iPos = sStr.indexOf( "obs_oid%3d" );
	while( iPos >= 0 )
	{
	    sStr = sStr.substring( iPos + 10 );
	    var sOID = "";
		var sChar = sStr.charAt( 0 );
		var iChar = parseFloat( sChar );
		
	    while( iChar.toString() != "NaN" )
		{
		    sOID = sOID + sChar;
			sStr = sStr.substring( 1 );
			sChar = sStr.charAt( 0 );
			iChar = parseFloat( sChar );
		}
		
		if( sOID != "" ){
		    var loadObs = "loadObservation( '" + sURL + "', '105', '103', '" + sOID + "', '1011', '" + sLang + "' )";
			setTimeout( loadObs, 0 );
		}
		
		iPos = sStr.indexOf( "obs_oid%3d" );
	}
}

/**
  * Generate a random number >= 0 and < the passed integer.
  *
  * @param iNum The integer that the random number must be less than.
  * @return The random integer
  */
function rand( iNum ){
	return Math.floor((Math.random() * iNum));
};


