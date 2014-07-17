/********************************************************************/
/* <!-- SiteCatalyst code version: G.0.-w/devsite filtering         */
/* Copyright 1997-2003 Omniture, Inc. More info available at        */
/* http://www.omniture.com -->                                      */
/*																	*/
/************************* VARIABLE SECTION *************************/

/* Regionally assigned variables. */
/* var s_prop1="" */
/* var s_prop2="" */
/* var s_prop3="" */
/* var s_prop4="" */
/* var s_prop5="" */
/* var s_server="" */
/* var s_pageType="" */

/* */
/* HP Corporate Standard Variables - can be coded into page or passed to this tag */
/* s_pageName - default is url, see implementation guide for more detailed options. */
/* s_prop6 Search */ 
/* s_prop7 Country */
/* s_prop8 Language */ 
/* s_prop9 Market Segment */
/* s_prop10 Concatenation of country + language + market segment */
/* s_prop13 Accounts being populated by the tag.*/

/* var s_pageName="" */
/* var s_prop6="" */
var s_prop7="br"
var s_prop8="por"
/* var s_prop9="" */
/* var s_prop10="" */
var s_prop13="hphqglobal,hphqLA,hphqLAbr"

/* */
/* E-commerce Variables. Further instructions regarding E-commerce to be delivered later. */
/* var s_campaign=""  */
/* var s_state="" */
/* var s_zip="" */
/* var s_events="" */
/* var s_products="" */
/* var s_purchaseID="" */
/* var s_eVar1="" */

/************************ ADDITIONAL FEATURES ************************
     Plugins
*/
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here.                       */
/* var s_charSet="" */
// Netscape 4.X on Unix uses EUC-JP instead of SHIFT-JIS
if ((navigator.appName.indexOf('Netscape')>=0)&&
    (parseInt(navigator.appVersion)<=4)&&
    (navigator.userAgent.toLowerCase().indexOf('win')<0)&&
    (navigator.userAgent.toLowerCase().indexOf('mac')<0)) {
	s_charSet="EUC-JP"
}

/* Specify the Report Suite ID(s) to track here. Be sure to include aggregation accounts.*/
var s_account="hphqglobal,hphqLA,hphqLAbr"

/* Dynamic Report Suite ID Selection Config */
var s_dynamicAccountSelection = false
var s_dynamicAccountList = "hphqtest1=itg.hp.com"

/* E-commerce Config */
/* var s_eVarCFG="" */
/* Link Tracking Config */
var s_trackDownloadLinks=true
var s_trackExternalLinks=true
var s_trackInlineStats=true
var s_linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,doc,pdf,xls,cgi,dot,pot,ppt,wmv,asx"
var s_linkInternalFilters="hp,compaq,javascript:"
var s_linkLeaveQueryString=true

/* Plugin Config */
var s_usePlugins=true
function s_doPlugins() {
/*****eMarketing Plug-in*****/
s_vp_getCGI('t_variable1','jumpid');
s_eVar20=s_vp_getValue("t_variable1");

if (s_eVar20.indexOf('ex_') > -1){   
     s_eVar15 = s_eVar20;
}else if (s_eVar20.indexOf('in_') > -1){
     s_eVar16 = s_eVar20;
}else if (s_eVar20.indexOf('em_') > -1){
     s_eVar17 = s_eVar20;
}else if (s_eVar20.indexOf('re_') > -1){
     s_eVar18 = s_eVar20;
}else{
     s_eVar19 = s_eVar20;
} 
}

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/*Plugin: Get Plugin Modified Value*/
function s_vp_getValue(vs)
 {var k=vs.substring(0,2)=='s_'?vs.substring(2):vs;return s_wd[
 's_vpm_'+k]?s_wd['s_vpv_'+k]:s_gg(k)}
 
/*
 * Plugin: Get Query String CGI Variable Value
 */
function s_vp_getCGI(vs,k)
	{var v='';if(k&&s_wd.location.search){var q=s_wd.location.search,
	qq=q.indexOf('?');q=qq<0?q:q.substring(qq+1);v=s_pt(q,'&',s_cgif,
	k)}s_vpr(vs,v)}function s_cgif(t,k){if(t){var te=t.indexOf('='),
	sk=te<0?t:t.substring(0,te),sv=te<0?'True':t.substring(te+1);if(
	sk==k)return s_epa(sv)}return ''}
/*
 * Plugin Utilities v2.0 (Required For All Plugins)
 */
function s_vpr(vs,v){if(s_wd[vs])s_wd[vs]=s_wd[vs];else s_wd[vs]=''
if(vs.substring(0,2) == 's_')vs=vs.substring(2);s_wd['s_vpv_'+vs]=v
s_wd['s_vpm_'+vs]=1}function s_dt(tz,t){var d=new Date;if(t)d.setTime(
t);d=new Date(d.getTime()+(d.getTimezoneOffset()*60*1000))
return new Date(Math.floor(d.getTime()+(tz*60*60*1000)))}
function s_vh_gt(k,v){var vh='|'+s_c_r('s_vh_'+k),vi=vh.indexOf('|'+v
+'='),ti=vi<0?vi:vi+2+v.length,pi=vh.indexOf('|',ti),t=ti<0?'':
vh.substring(ti,pi<0?vh.length:pi);return t}function s_vh_gl(k){var
vh=s_c_r('s_vh_'+k),e=vh?vh.indexOf('='):0;return vh?(vh.substring(0,
e?e:vh.length)):''}function s_vh_s(k,v){if(k&&v){var e=new Date,st=
e.getTime(),y=e.getYear(),c='s_vh_'+k,vh='|'+s_c_r(c)+'|',t=s_vh_gt(k,
v);e.setYear((y<1900?y+1900:y)+5);if(t)vh=s_rep(vh,'|'+v+'='+t+'|','|'
);if(vh.substring(0,1)=='|')vh=vh.substring(1);if(vh.substring(
vh.length-1,vh.length)=='|')vh=vh.substring(0,vh.length-1);vh=v
+'=[PCC]'+(vh?'|'+vh:'');s_c_w(c,vh,e);if(s_vh_gt(k,v)!='[PCC]')
return 0;vh=s_rep(vh,'[PCC]',st);s_c_w(c,vh,e)}return 1}

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_un,s_ios=0,s_csss=0,s_q='',s_code='',code='',s_bcr=0,s_lnk='',
s_eo='',s_vb,s_tfs=0,s_etfs=0,s_wd=window,s_ssl=(
s_wd.location.protocol.toLowerCase().indexOf('https')>=0),s_d=
s_wd.document,s_n=navigator,s_u=s_n.userAgent,s_apn=s_n.appName,s_v=
s_n.appVersion,s_apv,s_i,s_ie=s_v.indexOf('MSIE '),s_ns6=s_u.indexOf(
'Netscape6/');if(s_v.indexOf('Opera')>=0||s_u.indexOf('Opera')>=0)
s_apn='Opera';var s_isie=(s_apn=='Microsoft Internet Explorer'),
s_isns=(s_apn=='Netscape'),s_isopera=(s_apn=='Opera'),s_ismac=(
s_u.indexOf('Mac')>=0);if(s_ie>0){s_apv=parseInt(s_i=s_v.substring(
s_ie+5));if(s_apv>3)s_apv=parseFloat(s_i)}else if(s_ns6>0)s_apv=
parseFloat(s_u.substring(s_ns6+10));else s_apv=parseFloat(s_v)
function s_co(o){if(!o) return o;var n=new Object;for(x in o)n[x]=o[x]
return n}function s_num(x){var s=x.toString(),g='0123456789',p,d
for(p=0;p<s.length;p++){d=s.substring(p,p+1);if(g.indexOf(d)<0)
return 0}return 1}function s_rep(s,o,n){var c=s.indexOf(o);while(s&&
c>=0){s=s.substring(0,c)+n+s.substring(c+o.length,s.length);c=
s.indexOf(o)}return s}function s_ape(s){return s_rep(escape(s),'+',
'%2B')}function s_epa(s){return unescape(s_rep(s,'+',' '))}
function s_pt(s,d,f,a){var t=s,x=0,y,r;while(t){y=t.indexOf(d);y=y<0?
t.length:y;t=t.substring(0,y);r=f(t,a);if(r)return r;x+=y+d.length;t=
s.substring(x,s.length);t=x<s.length?t:''}return ''}function s_fl(s,l)
{return (s+'').substring(0,l)}var s_c_d='';function s_c_gdf(t,a){if(
!s_num(t))return 1;return 0}function s_c_gd(){var d=
s_wd.location.hostname,p;if(d&&!s_c_d){p=d.indexOf('.');while(p>=0&&
d.substring(p+1).indexOf('.')>=0){d=d.substring(p+1);p=d.indexOf('.')}
s_c_d=d.indexOf('.')>=0&&s_pt(d,'.',s_c_gdf,0)?'.'+d:''}return s_c_d}
function s_c_r(k){k=s_ape(k);var c=' '+s_d.cookie,s=c.indexOf(' '+k
+'='),e=s<0?s:c.indexOf(';',s),v=s<0?'':s_epa(c.substring(s+2
+k.length,e<0?c.length:e));return v}function s_c_w(k,v,e){var d=
s_c_gd();if(k)s_d.cookie=k+'='+s_ape(v)+'; path=/;'+(e?' expires='
+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s_c_r(k)==v}
function s_cet(f,a,et,oe,fb){var r,d=0
/*@cc_on@if(@_jscript_version>=5){try{return f(a)}catch(e){return et(e)}d=1}@end@*/
if(!d){if(s_ismac&&s_u.indexOf('MSIE 4')>=0)return fb(a);else{
s_wd.s_oe=s_wd.onerror;s_wd.onerror=oe;r=f(a);s_wd.onerror=s_wd.s_oe
return r}}}function s_gtfset(e){return s_tfs}function s_gtfsoe(e){
s_wd.onerror=s_wd.s_oe;s_etfs=1;var code=s_gs(s_un);if(code)s_d.write(
code);s_etfs=0;return true}function s_gtfsfb(a){return s_wd}
function s_gtfsf(w){var p=w.parent,l=w.location;s_tfs=w;if(p&&
p.location!=l&&p.location.host==l.host){s_tfs=p;return s_gtfsf(s_tfs)}
return s_tfs}function s_gtfs(){if(!s_tfs){s_tfs=s_wd;if(!s_etfs)s_tfs=
s_cet(s_gtfsf,s_tfs,s_gtfset,s_gtfsoe,s_gtfsfb)}return s_tfs}
function s_ca(un){un=un.toLowerCase()
var ci=un.indexOf(','),fun=ci<0?un:un.substring(0,ci),imn='s_i_'+fun
if(!s_ios&&s_d.images&&s_apv>=3&&!s_isopera&&(s_ns6<0||s_apv>=6.1))
s_ios=1;if(!s_csss&&s_ios&&!s_d.images[imn]){s_d.write('<im'
+'g name="'+imn+'" height=1 width=1 border=0>');if(!s_d.images[imn])
s_ios=0}}function s_it(un){s_ca(un)}function s_mr(un,sess,q){un=
un.toLowerCase();var ci=un.indexOf(','),fun=ci<0?un:un.substring(0,ci
),imn='s_i_'+fun,unc=s_rep(fun,'_','-'),rs='http'+(s_ssl?'s':'')
+'://'+(s_ssl?'102':unc)+'.112.2O7.net/b/ss/'+un+'/'+(s_csss?0:1)+'/G.0-xP-R/'
+sess+'?'+'[AQB]&ndh=1'+(q?q:'')+(s_q?s_q:'')+'&[AQE]'
if(s_ios)s_d.images[imn].src=rs;if(s_csss||s_ios){if(rs.indexOf('&pe='
)>=0){var b=new Date,e=new Date;while(e.getTime()-b.getTime()<500)e=
new Date}return ''}return '<im'+'g sr'+'c="'+rs
+'" width=1 height=1 border=0>'}function s_gg(v){return s_wd['s_'+v]}
var s_qav='';function s_havf(t,a){var
b=t.substring(0,4),s=t.substring(4),n=parseInt(s),k='s_g_'+t,m=
's_vpm_'+t,q=t;if(!s_wd['s_'+t])s_wd['s_'+t]='';s_wd[k]=s_wd[m]?s_wd[
's_vpv_'+t]:s_gg(t);s_wd[m]=0;if(t=='charSet')q='ce';else if(t==
'cookieDomainPeriods')q='cdp';else if(t=='channel')q='ch';else if(t==
'campaign')q='v0';else if(s_num(s)){if(b=='prop')q='c'+n;else if(b==
'eVar')q='v'+n}if(s_wd[k]&&t!='linkName'&&t!='linkType')s_qav+='&'+q
+'='+s_ape(s_wd[k]);return ''}function s_hav(){var n,av='charSet,cook'
+'ieDomainPeriods,pageName,channel,server,pageType,campaign,state,zip'
+',events,products,purchaseID,eVarCFG,linkName,linkType'
for(n=1;n<26;n++)av+=',prop'+n+',eVar'+n;s_qav='';s_pt(av,',',s_havf,0
);return s_qav}function s_lnf(t,h){t=t?t.toLowerCase():'';h=h?
h.toLowerCase():'';var te=t.indexOf('=');if(t&&te>0&&h.indexOf(
t.substring(te+1))>=0)return t.substring(0,te);return ''}
function s_ln(h){if(s_gg('linkNames'))return s_pt(s_gg('linkNames'),
',',s_lnf,h);return ''}function s_ltdf(t,h){t=t?t.toLowerCase():'';h=
h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h
if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0}
function s_ltef(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(
t&&h.indexOf(t)>=0)return 1;return 0}function s_lt(h){var lft=s_gg(
'linkDownloadFileTypes'),lif=s_gg('linkInternalFilters')?s_gg(
'linkInternalFilters'):s_wd.location.hostname;h=h.toLowerCase();if(
s_gg('trackDownloadLinks')&&lft&&s_pt(lft,',',s_ltdf,h))return 'd';if(
s_gg('trackExternalLinks')&&lif&&!s_pt(lif.toLowerCase(),',',s_ltef,h)
)return 'e';return ''}function s_lc(e){s_lnk=s_co(this);s_gs('')
s_lnk='';if(this.s_oc)return this.s_oc(e);return true}function s_ls(){
var l,ln,oc;for(ln=0;ln<s_d.links.length;ln++){l=s_d.links[ln];oc=
l.onclick?l.onclick.toString():'';if(oc.indexOf("s_gs(")<0&&
oc.indexOf("s_lc(")<0){l.s_oc=l.onclick;l.onclick=s_lc}}}
function s_bc(e){s_eo=e.srcElement?e.srcElement:e.target;s_gs('')
s_eo=''}function s_ot(o){var x=o.type,y=o.tagName;return (x&&
x.toUpperCase?x:y&&y.toUpperCase?y:o.href?'A':'').toUpperCase()}
function s_oid(o){var t=s_ot(o),p=
o.protocol,c=o.onclick,n='',x=0;if(!o.s_oid){if(o.href&&(t=='A'||t==
'AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=o.href
else if(c){n=s_rep(s_rep(s_rep(s_rep(c.toString(),"\r",''),"\n",''),
"\t",''),' ','');x=2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=
o.value;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s_fl(n,
100);o.s_oidt=x}}return o.s_oid}
function s_rqf(t,un){var e=t.indexOf('='),u=e>=0?','
+t.substring(0,e)+',':'';return u&&u.indexOf(','+un+',')>=0?s_epa(
t.substring(e+1)):''}function s_rq(un){var c=un.indexOf(','),v=s_c_r(
's_sq'),q='';if(c<0)return s_pt(v,'&',s_rqf,un);return s_pt(un,',',
s_rq,0)}var s_sqq,s_squ;function s_sqp(t,a){var e=t.indexOf('='),q=e<
0?'':s_epa(t.substring(e+1));s_sqq[q]='';if(e>=0)s_pt(t.substring(0,e
),',',s_sqs,q);return 0}function s_sqs(un,q){s_squ[un]=q;return 0}
function s_sq(un,q){s_sqq=new Object;s_squ=new Object;s_sqq[q]='';var
k='s_sq',v=s_c_r(k),x,c=0;s_pt(v,'&',s_sqp,0);s_pt(un,',',s_sqs,q);v=
'';for(x in s_squ)s_sqq[s_squ[x]]+=(s_sqq[s_squ[x]]?',':'')+x
for(x in s_sqq)if(x&&s_sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s_sqq[x]+'='
+s_ape(x);c++}return s_c_w(k,v,0)}function s_wdl(e){s_wd.s_wd_l=1;var
r=true;if(s_wd.s_ol)r=s_wd.s_ol(e);if(s_wd.s_ls)s_wd.s_ls();return r}
function s_wds(un){un=un.toLowerCase();s_wd.s_wd_l=1;if(s_apv>3&&(
!s_isie||!s_ismac||s_apv>=5)){s_wd.s_wd_l=0;if(!s_wd.s_unl)s_wd.s_unl=
new Array;s_wd.s_unl[s_wd.s_unl.length]=un;if(s_d.body&&
s_d.body.attachEvent){if(!s_wd.s_bcr&&s_d.body.attachEvent('onclick',
s_bc))s_wd.s_bcr=1}else if(s_d.body&&s_d.body.addEventListener){if(
!s_wd.s_bcr&&s_d.body.addEventListener('click',s_bc,false))s_wd.s_bcr=
1}else{var ol=s_wd.onload?s_wd.onload.toString():'';if(ol.indexOf(
"s_wdl(")<0){s_wd.s_ol=s_wd.onload;s_wd.onload=s_wdl}}}}function s_vs(
un,x){var s=s_gg('visitorSampling'),g=s_gg('visitorSamplingGroup'),k=
's_vsn_'+un+(g?'_'+g:''),n=s_c_r(k),e=new Date,y=e.getYear()
e.setYear(y+10+(y<1900?1900:0));if(s){s*=100;if(!n){if(!s_c_w(k,x,e))
return 0;n=x}if(n%10000>s)return 0}return 1}
function s_dyasmf(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0}
function s_dyasf(t,m){var i=t?t.indexOf('='):-1,un,s;if(i>=0&&m){var
un=t.substring(0,i),s=t.substring(i+1);if(s_pt(s,',',s_dyasmf,m))
return un}return 0}function s_dyas(un,l,m){if(!m)m=s_wd.location.host
if(!m.toLowerCase)m=m.toString();l=l.toLowerCase();m=m.toLowerCase()
var nun=s_pt(l,';',s_dyasf,m);if(nun)return nun;return un}
function s_gs(un){un=un.toLowerCase();
var dyas=s_gg('dynamicAccountSelection'),dyal=s_gg(
'dynamicAccountList'),dyam=s_gg('dynamicAccountMatch');if(dyas&&dyal)
un=s_dyas(un,dyal,dyam);
s_un=un;var trk=1,tm=new Date,sed=Math&&Math.random?
Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'
+Math.floor(tm.getTime()/10800000)%10+sed,yr=tm.getYear(),t,q='',qs=''
yr=yr<1900?yr+1900:yr;t=tm.getDate()+'/'+tm.getMonth()+'/'+yr+' '
+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()
+' '+tm.getTimezoneOffset();if(!s_q){s_d.cookie='s_cc=true; path=/'
var tfs=s_gtfs(),tl=tfs.location,r=tfs.document.referrer,s='',c='',v=
'',p='',bw='',bh='',j='1.0',vb=s_vb?s_vb:'',g=s_wd.location,k=
s_d.cookie.indexOf('s_cc=')>=0?'Y':'N',hp='',ct='';if(s_apv>=4)s=
screen.width+'x'+screen.height;if(s_isns||s_isopera){if(s_apv>=3){j=
'1.1';var i1=0,i2=0,sta;while(i2<30&&i1<navigator.plugins.length){sta=
navigator.plugins[i1].name;if(sta.length>100)sta=sta.substring(0,100)
sta+=';';if(p.indexOf(sta)<0)p+=sta;i1++;i2++}v=navigator.javaEnabled(
)?'Y':'N'}if(s_apv>=4){j='1.2';c=screen.pixelDepth;bw=s_wd.innerWidth
bh=s_wd.innerHeight}if(s_apv>=4.06)j='1.3'}else if(s_isie){if(s_apv<4)
r='';if(s_apv>=4){v=navigator.javaEnabled()?'Y':'N';j='1.2';c=
screen.colorDepth}if(s_apv>=5){bw=s_d.documentElement.offsetWidth;bh=
s_d.documentElement.offsetHeight;j='1.3';if(!s_ismac&&s_d.body){
s_d.body.addBehavior("#default#homePage");hp=s_d.body.isHomePage(tl)?
"Y":"N";s_d.body.addBehavior("#default#clientCaps");ct=
s_d.body.connectionType}}}s_q=(g?'&g='+s_ape(s_fl(g,255)):'')+(r?'&r='
+s_ape(s_fl(r,255)):'')+(s?'&s='+s_ape(s):'')+(c?'&c='+s_ape(c):'')+(
j?'&j='+j:'')+(v?'&v='+v:'')+(k?'&k='+k:'')+(bw?'&bw='+bw:'')+(bh?
'&bh='+bh:'')+(vb?'&vb='+vb:'')+(ct?'&ct='+s_ape(ct):'')+(hp?'&hp='
+hp:'')+(p?'&p='+s_ape(p):'')}if(s_gg('usePlugins'))s_wd.s_doPlugins()
q+=(t?'&t='+s_ape(t):'')+s_hav();if(s_lnk||s_eo){var o=(s_eo?s_eo:
s_lnk),p=s_wd.s_g_pageName,w=1,t=s_ot(o),n=s_oid(o),x=o.s_oidt,h,l,i,
oc;if(s_eo&&o==s_eo){while(o&&!n&&t!='BODY'){o=o.parentElement?
o.parentElement:o.parentNode;t=s_ot(o);n=s_oid(o);x=o.s_oidt}oc=
o.onclick?o.onclick.toString():'';if(oc.indexOf("s_gs(")>=0)return ''}
h=o.href?o.href:'';i=h.indexOf('?');h=s_gg('linkLeaveQueryString')||i<
0?h:h.substring(0,i);l=s_gg('linkName')?s_gg('linkName'):s_ln(h);t=
s_gg('linkType')?s_gg('linkType').toLowerCase():s_lt(h);if(t&&(h||l))
q+='&pe=lnk_'+(t=='d'||t=='e'?s_ape(t):'o')+(h?'&pev1='+s_ape(h):'')+(
l?'&pev2='+s_ape(l):'');else trk=0;if(s_gg('trackInlineStats')){if(!p)
{p=s_wd.location.href;w=0}p=p?s_fl(p,255):'';if(s_gg('objectID')){n=
s_gg('objectID');x=1}t=s_ot(o);i=o.sourceIndex;if(p&&n&&t)qs='&pid='
+s_ape(p)+(w?'&pidt='+w:'')+'&oid='+s_ape(n)+(x?'&oidt='+x:'')+'&ot='
+s_ape(t)+(i?'&oi='+i:'')}s_wd.linkName=s_wd.s_linkName=s_wd.linkType=
s_wd.s_linkType=s_wd.objectID=s_wd.s_objectID=s_lnk=s_eo=''}if(!trk&&
!qs)return '';var code='';if(un){if(trk&&s_vs(un,sed))code+=s_mr(un,
sess,q+(qs?qs:s_rq(un)));s_sq(un,trk?'':qs)}else if(s_wd.s_unl)
for(var unn=0;unn<s_wd.s_unl.length;unn++){un=s_wd.s_unl[unn];if(trk&&
s_vs(un,sed))code+=s_mr(un,sess,q+(qs?qs:s_rq(un)));s_sq(un,trk?'':qs)
}return code}function s_dc(un){un=un.toLowerCase();
var dyas=s_gg('dynamicAccountSelection'),dyal=s_gg(
'dynamicAccountList'),dyam=s_gg('dynamicAccountMatch');if(dyas&&dyal)
un=s_dyas(un,dyal,dyam);
s_wds(un);s_ca(un);return s_gs(un)}
s_code=s_dc(s_account);if(s_code)s_d.write(s_code)
