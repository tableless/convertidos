//<script>
// DynClick
// Copyright 2002 AgênciaClick
// http://www.agenciaclick.com.br
// Versão 1.07 - 28/05/2002


d=document


// Basics

function isDef(S){
	return(eval('typeof('+S+')')!='undefined'&&eval('typeof('+S+')')!='unknown')}

function getElm(id){return (is.ie4)?d.all[id]:d.getElementById(id)}

function toId(S){
	var S=S.toLowerCase()
	S=S.replace(/[áàãâä]/g,'a')
	S=S.replace(/[éèêë&]/g,'e')
	S=S.replace(/[íìîï]/g,'i')
	S=S.replace(/[óòõôö]/g,'o')
	S=S.replace(/[úùûü]/g,'u')
	S=S.replace(/[ç]/g,'c')
	for(var i=0;i<S.length;i++){if(' _0123456789abcdefghijklmnopqrstuvwxyz'.indexOf(S.charAt(i))==-1)S=S.replace(S.charAt(i),' ')}
	S=S.replace(/[ ]/g,'')
	S=S.replace(/[.]/g,'')
	return S
}

function openPopup(url,n,w,h,other,c, r){
	l=18;t=18
	if(c){l=(screen.availWidth-w)/2;t=(screen.availHeight-h)/2}
	url=url.replace(/[ ]/g,'%20')
	popup=window.open(url,'pop_'+n,'left='+l+',top='+t+',width='+w+',height='+h+',scrollbars=1'+((other)?','+other:''))
	other=other||''
	if(is.ie&&other.indexOf('fullscreen')!=-1){popup.moveTo(0,0);popup.resizeTo(screen.width,screen.height)}
	popup.focus()
	if (r) return popup;
}

function openBlank(url){window.open(url)}

function checkBrowser(){
	T=this
	b=navigator.appName
	v=navigator.appVersion
	u=navigator.userAgent
	if(b=='Netscape')T.b='ns'
	else if(b=='Microsoft Internet Explorer')T.b='ie'
	else T.b=b
	T.v=parseInt(v)
	T.ns=(T.b=='ns'&&T.v>=4)
	T.ns4=(T.b=='ns'&&T.v==4)
	T.ns5=(T.b=='ns'&&T.v==5)
	T.ns6=(T.b=='ns'&&T.v==5)
	T.ie=(T.b=='ie'&&T.v>=4)
	T.ie4=(u.indexOf('MSIE 4')>0)
	T.ie5=(u.indexOf('MSIE 5.0')>0)
	T.ie55=(u.indexOf('MSIE 5.5')>0)
	T.ie6=(u.indexOf('MSIE 6.0')>0)
	if(T.ie5)T.v=5
	if(T.ie55)T.v=5.5
	if(T.ie6)T.v=6
	T.min=(T.ns||T.ie)
	T.dom=(T.v>=5)
	T.win=(u.indexOf('Win')>0)
	T.mac=(u.indexOf('Mac')>0)
}
is=new checkBrowser()


// Page Dimensions

function docW(){return(is.ie?(d.body.scrollWidth):(d.width))}
function docH(){return(is.ie?(d.body.scrollHeight):(d.height))}
function winW(){return(is.ie?(d.body.clientWidth):(window.innerWidth))}
function winH(){return(is.ie?(d.body.clientHeight):(window.innerHeight))}

// Images

function pI(src, objNum){
	obj=src.substring(src.lastIndexOf('/')+1,src.lastIndexOf('.'))
	if (objNum != null){
		eval('i'+objNum+'=new Image()')
		eval('i'+objNum+'.src="'+src+'"')
	}else{
		eval('i'+obj+'=new Image()')
		eval('i'+obj+'.src="'+src+'"')
	}
}

function cI(id,obj,lyr){
	id=(is.ns4&&lyr)?'d.layers.'+lyr+'.document.images.'+id:'d.images[\''+id+'\']'
	if(isDef(id)&&isDef('i'+obj)){
		eval(id).src=eval('i'+obj).src
	}
}


// Layers

function newLyr(id,l,t,w,h,ct,z,v,bg,n,makeDL){
	if(is.ns4){
		if(n)var lyr=eval('d.layers.'+n+'.document.layers.'+id+'=new Layer('+w+',d.layers.'+n+')')
		else var lyr=d.layers[id]=new Layer(w)
		lyr.name=id
		lyr.left=l
		lyr.top=t
		if(h)lyr.clip.height=h
		if(ct){lyr.document.open();lyr.document.write(ct);lyr.document.close()}
		if(z)lyr.zIndex=z
		lyr.visibility=(v=='hidden')?'hide':'show'
		if(bg)lyr.bgColor=bg
	}
	else{
		if(n){
			index=n.lastIndexOf(".")
			var nestlyr=(index!=-1)?n.substr(index+1):n
		}
		if(is.dom){
			lyr=d.createElement('DIV')
			lyrS=lyr.style
			lyrS.position='absolute'
			lyrS.left=l+'px'
			lyrS.top=t+'px'
			if(w)lyrS.width=w+'px'
			if(h)lyrS.height=h+'px'
			else if(is.ie&&is.mac)lyrS.height='none'
			if(z)lyrS.zIndex=z
			if(v)lyrS.visibility=v
			if(bg)lyrS.backgroundColor=bg
			if(ct)lyr.innerHTML=ct+((is.ie&&is.mac)?'<span></span>':'')
			lyr.id=id
			if(n)d.getElementById(nestlyr).appendChild(lyr)
			else d.body.appendChild(lyr)
		}
		else{
			var S='\n<DIV id='+id+' style="position:absolute;left:'+l+';top:'+t
			if(w)S+=';width:'+w
			else S+=';width:1'
			if(h!=null)S+=';height:'+h
			if(z!=null)S+=';z-index:'+z
			if(v)S+=';visibility:'+v
			if(bg!=null)S+=';background:'+bg
			S+='">'+((ct)?ct:'')+'</DIV>'
			if(n)d.all[nestlyr].insertAdjacentHTML("BeforeEnd",S)
			else d.body.insertAdjacentHTML("BeforeEnd",S)
		}
	}
	if(makeDL){eval(((id.lastIndexOf('Div'))?id.substring(0,id.lastIndexOf('Div')):id)+'DL=new DL(\''+id+'\''+((n)?',\''+n+'\'':'')+')')}
}


// Reloads the window if Nav4 resized

function BUG_ns4_reloadOnResize(){
	if(!d.pgW){d.pgW=innerWidth;d.pgH=innerHeight;onresize=BUG_ns4_reloadOnResize}
	else if(innerWidth!=d.pgW||innerHeight!=d.pgH)location.reload()
}
if(d.layers)BUG_ns4_reloadOnResize()


// Objects Constructor

var DOA=new Array()
function DO(parent){this.arguments=DO.caller.arguments;this.newDO=newDO;this.parent=parent;this.itens=new Array()}
function newDO(){return (this.itens)?this.itens[this.itens.length]=new DO(this):DOA[DOA.length]=new DO()}


// DynLayer
// Copyright 1999 Dan Steinman
// http://www.dansteinman.com/dynapi/

function DL(id,n1,n2){
	var T=this
	if(is.ns4){
		if(n1){
			if(n2)T.elm=d.layers[n2].document.layers[n1].document.layers[id]
			else T.elm=d.layers[n1].document.layers[id]
		}
		else T.elm=d.layers[id]
		T.css=T.elm
		T.doc=T.elm.document
		T.l=T.css.left
		T.t=T.css.top
		T.w=T.css.clip.width
		T.h=T.css.clip.height
	}
	else{
		T.elm=T.event=(is.ie4)?d.all[id]:d.getElementById(id)
		T.css=T.elm.style
		T.doc=document
		T.l=T.elm.offsetLeft
		T.t=T.elm.offsetTop
		T.w=T.elm.offsetWidth
		T.h=T.elm.offsetHeight
		if(!T.w)T.w=T.css.pixelWidth
		if(!T.h)T.h=T.css.pixelHeight
	}
	T.obj=((id.lastIndexOf('Div'))?id.substring(0,id.lastIndexOf('Div')):id)+'DL'
	T.sh=DLsh
	T.hd=DLhd
	T.mTo=DLmTo
	T.mBy=DLmBy
	T.rTo=DLrTo
	T.rBy=DLrBy
	T.write=DLwrite
}

function DLsh(){this.css.visibility=(is.ns4)?'show':'visible'}
function DLhd(){this.css.visibility=(is.ns4)?'hide':'hidden'}

function DLmTo(l,t){
	if(l!=null){
		this.l=l
		if(!is.ie)this.css.left=this.l
		else this.css.pixelLeft=this.l
	}
	if(t!=null){
		this.t=t
		if(!is.ie)this.css.top=this.t
		else this.css.pixelTop=this.t
	}
}
function DLmBy(l,t){this.mTo(this.l+l,this.t+t)}

function DLrTo(w,h){
	if(w!=null){
		this.w=w
		if(is.ns4)this.css.clip.width=this.w
		else this.css.width=this.w
	}
	if(h!=null){
		this.h=h
		if(is.ns4)this.css.clip.height=this.h
		else this.css.height=this.h
	}
}
function DLrBy(w,h){this.rTo(this.w+w,this.h+h)}

function DLwrite(S){
	if(is.ns4){this.doc.close();this.doc.open();this.doc.write(S);this.doc.close()}
	else this.elm.innerHTML=S
}


/*function DMreposMenu(){
	var posY = 235
	if(is.ns4) var scrollHor = 300
	else var scrollHor = 310
	if (winW()<796) posX = 312
	else posX = (((winW()-780)/2)+scrollHor)
	scrollClipDL.mTo(posX,posY)
	scrollClipDL.sh()
}*/


//</script>