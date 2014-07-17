// DynLayer
// Copyright 1999 Dan Steinman
// http://www.dansteinman.com/dynapi/
// Versão 1.05 - 22/04/2002


// Slide

function DLslideTo(endx,endy,num,inc,speed,fn){
	if(endx==null)endx=this.l
	if(endy==null)endy=this.t
	var distx=endx-this.l
	var disty=endy-this.t
	this.slideStart(endx,endy,distx,disty,num,inc,speed,fn)
}

function DLslideBy(distx,disty,num,inc,speed,fn){
	var endx=this.l+distx
	var endy=this.t+disty
	this.slideStart(endx,endy,distx,disty,num,inc,speed,fn)
}

function DLslideStart(endx,endy,distx,disty,num,inc,speed,fn){
	if(this.slideActive)return
	inc=inc||10
	num=null||Math.sqrt(Math.pow(distx,2)+Math.pow(disty,2))/inc
	speed=speed||20
	if(num==0)return
	var dx=distx/num
	var dy=disty/num
	if(!fn)fn=null
	this.slideActive=true
	this.slide(dx,dy,endx,endy,num,1,speed,fn)
}

function DLslide(dx,dy,endx,endy,num,i,speed,fn){
	if(!this.slideActive)return
	if(i++<num){
		this.mBy(dx,dy)
		if(this.slideActive)setTimeout(this.obj+'.slide('+dx+','+dy+','+endx+','+endy+','+num+','+i+','+speed+',\''+fn+'\')',speed)
		else this.onSlideEnd()
	}
	else{
		this.mTo(endx,endy)
		if(fn!='undefined')eval(fn)
		this.slideActive=false
	}
}

DL.prototype.slideTo=DLslideTo
DL.prototype.slideBy=DLslideBy
DL.prototype.slideStart=DLslideStart
DL.prototype.slide=DLslide


// Clip

function DLclipTo(t,r,b,l){
	if(is.ns4){
		this.css.clip.top=t
		this.css.clip.right=r
		this.css.clip.bottom=b
		this.css.clip.left=l
	}
	else this.css.clip='rect('+t+'px '+r+'px '+b+'px '+l+'px)'
}

function DLclipBy(t,r,b,l){this.clipTo(this.clipValues('t')+t,this.clipValues('r')+r,this.clipValues('b')+b,this.clipValues('l')+l)}

function DLclipValues(which){
	if(!is.ns4){
		if(!this.css.clip)this.clipTo(0,this.w,this.h,0)
		var clipv=this.css.clip.split('rect(')[1].split(')')[0].split('px')
	}
	if(which=='t')return (is.ns4)?this.css.clip.top:Number(clipv[0])
	if(which=='r')return (is.ns4)?this.css.clip.right:Number(clipv[1])
	if(which=='b')return (is.ns4)?this.css.clip.bottom:Number(clipv[2])
	if(which=='l')return (is.ns4)?this.css.clip.left:Number(clipv[3])
}

DL.prototype.clipTo=DLclipTo
DL.prototype.clipBy=DLclipBy
DL.prototype.clipValues=DLclipValues


// Wipe

function DLwipeTo(endt,endr,endb,endl,num,inc,speed,fn){
	var distt=endt-this.clipValues('t')
	var distr=endr-this.clipValues('r')
	var distb=endb-this.clipValues('b')
	var distl=endl-this.clipValues('l')
	this.wipeStart(distt,distr,distb,distl,endt,endr,endb,endl,num,inc,speed,fn)
}

function DLwipeBy(distt,distr,distb,distl,num,inc,speed,fn){
	var endt=this.clipValues('t')+distt
	var endr=this.clipValues('r')+distr
	var endb=this.clipValues('b')+distb
	var endl=this.clipValues('l')+distl
	this.wipeStart(distt,distr,distb,distl,endt,endr,endb,endl,num,inc,speed,fn)
}

function DLwipeStart(distt,distr,distb,distl,endt,endr,endb,endl,num,inc,speed,fn){
	if(this.wipeActive)return
	inc=inc||10
	num=num||Math.sqrt(Math.pow(distl+distr,2)+Math.pow(distt+distb,2))/inc
	speed=speed||20
	if(num==0)return
	this.wipeActive=true
	this.wipe(distt/num,distr/num,distb/num,distl/num,endt,endr,endb,endl,this.clipValues('t'),this.clipValues('r'),this.clipValues('b'),this.clipValues('l'),num,1,speed,fn)
}

function DLwipe(dt,dr,db,dl,endt,endr,endb,endl,st,sr,sb,sl,num,i,speed,fn){
	if(!this.wipeActive)return
	if(i++<num){
		this.clipTo(st+i*dt,sr+i*dr,sb+i*db,sl+i*dl)
		setTimeout(this.obj+'.wipe('+dt+','+dr+','+db+','+dl+','+endt+','+endr+','+endb+','+endl+','+st+','+sr+','+sb+','+sl+','+num+','+i+','+speed+',\''+fn+'\')',speed)
	}
	else{
		this.clipTo(endt,endr,endb,endl)
		if(fn!='undefined')eval(fn)
		this.wipeActive=false
	}
}

DL.prototype.wipeTo=DLwipeTo
DL.prototype.wipeBy=DLwipeBy
DL.prototype.wipe=DLwipe
DL.prototype.wipeStart=DLwipeStart
