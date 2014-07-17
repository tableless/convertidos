// DynClick - Form
// Copyright 2002 AgênciaClick
// http://www.agenciaclick.com.br
// Versão 0.93 - 19/06/2002


// Basics

function DFcheckForm(f,onlyObligatory,submitonce){
	clearClass(f)
	for(var i=0;i<f.length;i++){
		v=true
		if(f[i].type=='text'||f[i].type=='textarea'||f[i].type=='password')v=f[i].value
		else if(f[i].type=='select-one')v=f[i][f[i].selectedIndex].value
		else if(f[i].type=='radio'){v=false;for(var j=0;j<f[f[i].name].length;j++){if(f[f[i].name][j].checked)v=f[f[i].name][j].value}}
		else if(f[i].type=='hidden'){v=true;for(var j=0;j<f.length;j++){if(f[i].name==f[j].getAttribute('target')){if(!f[j].value)v=false}}}
		if(!v){
			obligatory=(d.layers)?null:f[i].getAttribute('obligatory')
			if(f[i].type!='hidden'&&(((!onlyObligatory&&obligatory!='no')||(onlyObligatory&&obligatory=='yes'))||d.layers)){DFcheckFormAlert(f[i]);return false}
		}
		else{
			if(f[i].type=='text'||f[i].type=='textarea'||f[i].type=='password'){
				if(!DFcheckMinLength(f[i]))return false
				if(!DFcheckFormPlus(f[i]))return false
			}
			else if(f[i].type=='hidden'&&!d.layers){
				for(var j=0;j<f.length;j++){if(f[i].name==f[j].getAttribute('target')){f[i].value='';break}}
				for(var j=0;j<f.length;j++){if(f[i].name==f[j].getAttribute('target'))f[i].value+=f[j].value+((f[j].getAttribute('separator'))?f[j].getAttribute('separator'):'')}
				for(var j=0;j<f.length;j++){if(f[i].name==f[j].getAttribute('target')){if(!DFcheckFormPlus(f[i]))return false}}
			}
		}
	}
	if(submitonce)DFsubmitonce(f)
	return true
}

function DFscrollTopPosition(){return (is.ie)?d.body.scrollTop:pageYOffset}


/*
Para os casos de multilingual devemos colocar esta funcao no proprio asp para pegas as traducoes do BD.
function DFcheckFormAlert(f,plus){
	var scrTop=DFscrollTopPosition()
	if(f.type=='select-one'||f.type=='radio')S='Você deve escolher '
	else if(plus)S='Valor inválido do campo '
	else S='Você deve preencher o campo '
	label=(d.layers)?f.name:f.getAttribute('label')
	label=(label)?label:f.name
	S+=label
	if(plus=='password')S=label+' e sua confirmação não possuem os mesmos valores'
	if(plus=='minlength')S='O campo '+label+' deve ter no mínimo '+f.getAttribute('minlength')+' caracteres'
	if(f.type!='hidden'){
		if(!d.layers){
			if(plus=='password'){for(var i=0;i<f.form.length;i++){if(f.form[i].getAttribute('xtype')=='password')f.form[i].className='DF-alert'}}
			else if(f.type=="radio"){for(var i=0;i<f.form[f.name].length;i++){f.form[f.name][i].className='DF-alert'}}
			else f.className='DF-alert'
		}
		f.focus()
	}
	else if(!d.layers){
		for(var i=0;i<f.form.length;i++){if(f.form[i].getAttribute('target')==f.name)f.form[i].className='DF-alert'}
		for(var i=0;i<f.form.length;i++){if(f.form[i].getAttribute('target')==f.name){f.form[i].focus();break}}
	}
	if(scrTop!=DFscrollTopPosition())scrollBy(null,scrTop>DFscrollTopPosition()?-20:80)
	alert(S)
}*/

function DFcheckMinLength(f){
	minLength=(d.layers)?null:f.getAttribute('minlength')
	if(minLength){if(f.value.length<minLength){DFcheckFormAlert(f,'minlength');return false}}
	return true
}

function DFcheckFormPlus(f){
	xtype=(d.layers)?null:f.getAttribute('xtype')
	if(xtype){
		S='DFcheck'+xtype.charAt(0).toUpperCase()+xtype.substring(1).toLowerCase()
		if(isDef(S)){if(!eval(S)((xtype=='password')?f:f.value)){DFcheckFormAlert(f,xtype);return false}}
	}
	return true
}


// Plus Checks

function DFcheckNumber(v){if(!isNaN(v))return true}

function DFcheckDate(v){
	if(v.length!=10)return false
	var date=v.split('/')
	var d=parseInt(date[0],10)
	var m=parseInt(date[1],10)
	var y=parseInt(date[2],10)
	if(!DFcheckDateDay(d))return false
	else if(!DFcheckDateMonth(m))return false
	else if(!DFcheckDateYear(y))return false
	else if( (m==4||m==6||m==9||m==11) && (d==31)) return false
	else if(m==2 && (d>29 || (d==29&&((y%4)!=0)))) return false
	return true
}

function DFcheckDateDay(v){if(v>=1&&v<=31)return true}
function DFcheckDateMonth(v){if(v>=1&&v<=12)return true}
function DFcheckDateYear(v){if(v>=1)return true}

function DFcheckBirthday(v){
	if(!DFcheckDate(v))return false
	var date=v.split('/')
	var d=date[0]
	var m=date[1]
	var y=date[2]
	date=parseInt(date[2]+date[1]+date[0],10)
	if(date<19000101||date>((isDef('DFdate'))?DFdate:20020101))return false
	return true
}

function DFcheckEmail(v){
	var a=0
	var p=0
	for(var i=1;i<v.length;i++){
		if(!v.charAt(i))return false
		else if(v.charAt(i)=='@'){a++;if(v.charAt(i+1)=='')return false}
		else if(v.charAt(i)=='.'){p++;if(v.charAt(i+1)==''||v.charAt(i+1)=='@'||v.charAt(i-1)=='@')return false}
	}
	if(a==1&&p)return true
}

function DFcheckCpf(v){
	var s=null
	var r=null
	if(v.length!=11||
		v=='00000000000'||v=='11111111111'||v=='22222222222'||v=='33333333333'||v=='44444444444'||
		v=='55555555555'||v=='66666666666'||v=='77777777777'||v=='88888888888'||v=='99999999999')return false
	s=0
	for(var i=0;i<9;i++)s+=parseInt(v.charAt(i))*(10-i)
	r=11-(s%11)
	if(r==10||r==11)r=0
	if(r!=parseInt(v.charAt(9)))return false
	s=0
	for(var i=0;i<10;i++)s+=parseInt(v.charAt(i))*(11-i)
	r=11-(s%11)
	if(r==10||r==11)r=0
	if(r!=parseInt(v.charAt(10)))return false
	return true
}

function DFcheckPassword(f){
	for(var i=0;i<f.form.length;i++){
		if(f.form[i].getAttribute('xtype')=='password'&&f.form[i]!=f){
			if(f.form[i].value&&f.value!=f.form[i].value)return false
		}
	}
	return true
}

function DFcheckName(v){
	reg1=/[^ A-Záàãâäéèêëíìîïóòõôöúùûüç.´]/i
	reg2=/[ ]{2}/
	if(v.substr(0,1)==' ')return false
	else if((v.search(reg1)!=-1)||(v.search(reg2)!=-1))return false
	else if(v.substr(v.lastIndexOf(' '))==' ')return false
	else return true
}

function DFcheckFullname(v){
	if(!DFcheckName(v))return false
	if(v.indexOf(' ')==-1)return false
	else return true
}

function DFcheckCep(v){
	if(v.length!=9)return false
	reg=/[^0-9-]/
	if(v.search(reg)!=-1)return false
	var codp=v.split('-')
	var cod1=parseInt(codp[0],10)
	var cod2=parseInt(codp[1],10)
	return true
}


// Tools

function DFselectRadio(radio,i){eval(radio)[parseInt(i)].checked='true'}

function DFtextareaMaxLength(f,length,e){
	if(is.ns){if(e.which==0||e.which==8)return true}
	if(f.value.length>=length)return false
}

function DFtextareaCheckLength(f,len){
	if(f.value.length>len){
		label=(d.layers)?f.name:f.getAttribute('label')
		label=(label)?label:f.name
		alert('O campo '+label+' deve ter no mámixo '+len+' caracteres.')
		f.value=f.value.substr(0,len);
	}
}

function DFtextareaCounter(f,counter){eval('f.form.'+counter).value=f.value.length}

function DFchangeField(f){
	if(f.value.length==f.maxLength){
  	for(var i=0;i<f.form.length;i++){
    	if(f.form[i]==f&&f.form[i+1]){f.form[i+1].focus();break}
		}
	}
}

function DFonlyThisChars(numbers,letters,others,e){
	if(window.event)key=window.event.keyCode
	else if(e)key=e.which
	else return true
	S=(others)?others:''
	if(numbers)S+='0123456789'
	if(letters)S+='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	if(key==null||key==0||key==8||key==9||key==13||key==27)return true
	else if(S.indexOf(String.fromCharCode(key))!=-1)return true
	else return false
}

function DFnotOnlyThisChars(S,e){
	if(window.event)key=window.event.keyCode
	else if(e)key=e.which
	else return true
	if(!S)return false
	else if(key==null||key==0||key==8||key==9||key==13||key==27)return true
	else if(S.indexOf(String.fromCharCode(key))!=-1)return false
	else return true
}

function DFsubmitonce(f){
	if(!d.layers){
		for(var i=0;i<f.length;i++){
			if(f[i].type=='submit'||f[i].type=='reset'||f[i].type=='image')f[i].disabled=true
		}
	}
}

function DFchangeClassFocus(a,c){
	alert(a)
	clearClass(c.form)
	if(!d.layers){
		if(c.type=="radio"){for(var i=0;i<c.form[c.name].length;i++){c.form[c.name][i].className='DF-alert'}}
		else c.className='DF-alert'
	}
	c.focus()
	return false;
}

function clearClass(f){
	for(var i=0;i<f.length;i++){
		if(!d.layers){
			if(!f[i].classNameOld)f[i].classNameOld=f[i].className||'df-null'
			else f[i].className=f[i].classNameOld
		}
	}
}

// Retorna o indice ou o valor de um campo
var retValue=false
function valSel(c,retValue){
	if(retValue) return c[c.selectedIndex].value
	else return c.selectedIndex
}