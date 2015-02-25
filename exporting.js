/*
 Highcharts JS v4.1.0 (2015-02-16)
 Exporting module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(f){var A=f.Chart,t=f.addEvent,B=f.removeEvent,C=HighchartsAdapter.fireEvent,l=f.createElement,o=f.discardElement,v=f.css,k=f.merge,r=f.each,p=f.extend,E=Math.max,j=document,D=window,F=f.isTouchDevice,G=f.Renderer.prototype.symbols,s=f.getOptions(),y;p(s.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});s.navigation={menuStyle:{border:"1px solid #A0A0A0",
background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:F?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};s.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{menuClassName:"highcharts-contextmenu",
symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};f.post=function(a,b,d){var c,a=l("form",k({method:"post",
action:a,enctype:"multipart/form-data"},d),{display:"none"},j.body);for(c in b)l("input",{type:"hidden",name:c,value:b[c]},null,a);a.submit();o(a)};p(A.prototype,{getSVG:function(a){var b=this,d,c,z,h,g=k(b.options,a);if(!j.createElementNS)j.createElementNS=function(b,a){return j.createElement(a)};a=l("div",null,{position:"absolute",top:"-9999em",width:b.chartWidth+"px",height:b.chartHeight+"px"},j.body);c=b.renderTo.style.width;h=b.renderTo.style.height;c=g.exporting.sourceWidth||g.chart.width||
/px$/.test(c)&&parseInt(c,10)||600;h=g.exporting.sourceHeight||g.chart.height||/px$/.test(h)&&parseInt(h,10)||400;p(g.chart,{animation:!1,renderTo:a,forExport:!0,width:c,height:h});g.exporting.enabled=!1;delete g.data;g.series=[];r(b.series,function(a){z=k(a.options,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});z.isInternal||g.series.push(z)});d=new f.Chart(g,b.callback);r(["xAxis","yAxis"],function(a){r(b[a],function(b,c){var g=d[a][c],f=b.getExtremes(),h=f.userMin,f=f.userMax;
g&&(h!==void 0||f!==void 0)&&g.setExtremes(h,f,!0,!1)})});c=d.container.innerHTML;g=null;d.destroy();o(a);c=c.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1="rgb($2)" $1-opacity="$3"').replace(/(text-shadow:[ 0-9a-z]+),[^"]+([;"])/g,
"$1$2").replace(/&nbsp;/g,"� ").replace(/&shy;/g,"­").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()});return c=c.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},exportChart:function(a,
b){var a=a||{},d=this.options.exporting,d=this.getSVG(k({chart:{borderRadius:0}},d.chartOptions,b,{exporting:{sourceWidth:a.sourceWidth||d.sourceWidth,sourceHeight:a.sourceHeight||d.sourceHeight}})),a=k(this.options.exporting,a);f.post(a.url,{filename:a.filename||"chart",type:a.type,width:a.width||0,scale:a.scale||2,svg:d},a.formAttributes)},print:function(){var a=this,b=a.container,d=[],c=b.parentNode,f=j.body,h=f.childNodes;if(!a.isPrinting)a.isPrinting=!0,C(a,"beforePrint"),r(h,function(a,b){if(a.nodeType===
1)d[b]=a.style.display,a.style.display="none"}),f.appendChild(b),D.focus(),D.print(),setTimeout(function(){c.appendChild(b);r(h,function(a,b){if(a.nodeType===1)a.style.display=d[b]});a.isPrinting=!1;C(a,"afterPrint")},1E3)},contextMenu:function(a,b,d,c,f,h,g){var e=this,k=e.options.navigation,q=k.menuItemStyle,m=e.chartWidth,n=e.chartHeight,j="cache-"+a,i=e[j],u=E(f,h),w,x,o,s=function(b){e.pointer.inClass(b.target,a)||x()};if(!i)e[j]=i=l("div",{className:a},{position:"absolute",zIndex:1E3,padding:u+
"px"},e.container),w=l("div",null,p({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},k.menuStyle),i),x=function(){v(i,{display:"none"});g&&g.setState(0);e.openMenu=!1},t(i,"mouseleave",function(){o=setTimeout(x,500)}),t(i,"mouseenter",function(){clearTimeout(o)}),t(document,"mouseup",s),t(e,"destroy",function(){B(document,"mouseup",s)}),r(b,function(a){if(a){var b=a.separator?l("hr",null,null,w):l("div",{onmouseover:function(){v(this,k.menuItemHoverStyle)},
onmouseout:function(){v(this,q)},onclick:function(){x();a.onclick&&a.onclick.apply(e,arguments)},innerHTML:a.text||e.options.lang[a.textKey]},p({cursor:"pointer"},q),w);e.exportDivElements.push(b)}}),e.exportDivElements.push(w,i),e.exportMenuWidth=i.offsetWidth,e.exportMenuHeight=i.offsetHeight;b={display:"block"};d+e.exportMenuWidth>m?b.right=m-d-f-u+"px":b.left=d-u+"px";c+h+e.exportMenuHeight>n&&g.alignOptions.verticalAlign!=="top"?b.bottom=n-c-u+"px":b.top=c+h-u+"px";v(i,b);e.openMenu=!0},addButton:function(a){var b=
this,d=b.renderer,c=k(b.options.navigation.buttonOptions,a),j=c.onclick,h=c.menuItems,g,e,l={stroke:c.symbolStroke,fill:c.symbolFill},q=c.symbolSize||12;if(!b.btnCount)b.btnCount=0;if(!b.exportDivElements)b.exportDivElements=[],b.exportSVGElements=[];if(c.enabled!==!1){var m=c.theme,n=m.states,o=n&&n.hover,n=n&&n.select,i;delete m.states;j?i=function(){j.apply(b,arguments)}:h&&(i=function(){b.contextMenu(e.menuClassName,h,e.translateX,e.translateY,e.width,e.height,e);e.setState(2)});c.text&&c.symbol?
m.paddingLeft=f.pick(m.paddingLeft,25):c.text||p(m,{width:c.width,height:c.height,padding:0});e=d.button(c.text,0,0,i,m,o,n).attr({title:b.options.lang[c._titleKey],"stroke-linecap":"round"});e.menuClassName=a.menuClassName||"highcharts-menu-"+b.btnCount++;c.symbol&&(g=d.symbol(c.symbol,c.symbolX-q/2,c.symbolY-q/2,q,q).attr(p(l,{"stroke-width":c.symbolStrokeWidth||1,zIndex:1})).add(e));e.add().align(p(c,{width:e.width,x:f.pick(c.x,y)}),!0,"spacingBox");y+=(e.width+c.buttonSpacing)*(c.align==="right"?
-1:1);b.exportSVGElements.push(e,g)}},destroyExport:function(a){var a=a.target,b,d;for(b=0;b<a.exportSVGElements.length;b++)if(d=a.exportSVGElements[b])d.onclick=d.ontouchstart=null,a.exportSVGElements[b]=d.destroy();for(b=0;b<a.exportDivElements.length;b++)d=a.exportDivElements[b],B(d,"mouseleave"),a.exportDivElements[b]=d.onmouseout=d.onmouseover=d.ontouchstart=d.onclick=null,o(d)}});G.menu=function(a,b,d,c){return["M",a,b+2.5,"L",a+d,b+2.5,"M",a,b+c/2+0.5,"L",a+d,b+c/2+0.5,"M",a,b+c-1.5,"L",a+
d,b+c-1.5]};A.prototype.callbacks.push(function(a){var b,d=a.options.exporting,c=d.buttons;y=0;if(d.enabled!==!1){for(b in c)a.addButton(c[b]);t(a,"destroy",a.destroyExport)}})})(Highcharts);