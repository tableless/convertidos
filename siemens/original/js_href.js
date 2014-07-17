/** References like "<A href='javascript:jsFunction(...)'>" should be defined in this file
    to work properly in Preview mode
 */

// For High-resolution PRESS-Pics: open a image in a new window with a specified width and height
function shootPressUp (theUrl) {
  window.open(theUrl,'PreviewWindow','width=300,height=400,dependent=no,scrollbars=yes,location=no,toolbar=no,menubar=no,resizable=yes');
}		
