var message='Todos os direitos reservados';

function click(e) 
{
	if (document.all)
	{
		if (event.button == 2 || event.button == 3) {
			alert(message);
			return false;
		}
	}

	if (document.layers)
	{
		if (e.which == 3 || e.which == 2)
		{
			alert(message);return false;
		}
	}
}

function selecao()
{
	return(false);
}

function trataTecla()
{
	if((event.keyCode == 121)&&(event.shiftKey)) alert(message);
}

document.onselectstart=selecao;
document.ondragstart=selecao;
document.onmousedown=click;

/*function fun3(evnt)
{
	if ( (document.getSelection()!=null)&&(document.getSelection()!='') )
		alert('oi');
	return true;
}

document.onMouseUp = fun3;
document.onClick = fun3;*/


