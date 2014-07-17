// Funções específicas do site Bradesco Institucional

function OpenWindow(sPagina, w, h, s) 
{
    window.open(sPagina, '', 'width=' + w + ',height=' + h + ',top=0,left=0,scrollbars=' + s + ',menubar=0,toolbar=0,statusbar=0,status=0,resizable=0');
    return false;
}

function chama_url(target,selObj,restore)
{

    x=selObj.selectedIndex;
    if (x!=0)
        {
           eval(target+".location='"+selObj.options[selObj.selectedIndex].value+"'");
           if (restore) selObj.selectedIndex=0;
        }

}

function frmcomb()
{
		var URL = document.chama.institucional.options[document.chama.institucional.selectedIndex].value;
		x=document.chama.institucional.selectedIndex

		//if ((x==4))
		//{
		//    window.open (URL,"_blank")
		//}
		//else
		//{
		    window.open (URL,"_self")
		//}
}