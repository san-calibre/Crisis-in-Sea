(function(e){var a={touchStartPools:[{display:true,children:[]}],touchMovePools:[{display:true,children:[]}],touchEndPools:[{display:true,children:[]}],touchStartCurrent:null,touchMoveCurrent:null,touchEndCurrent:null,touchScrollPanel:null,displayPools:[{display:true,children:[]}],refreshPools:[{ui:null,steps:[]}],touchNullObject:null,cachePools:[],callBacks:[],clickCallBack:[],dragCallBack:null,dragUi:null,startUi:null,endUi:undefined,clientX:-1,clientY:-1,binded:false,cacheDom:null,cacheDomId:"jsGameUICache",
cacheContext:null,context:null,contextWidth:0,contextHeight:0,isBlocked:false,isLocked:false,isClear:false,checkPoint:function(b,c,d){for(var f=a.getPool(b),h,g,n=e.commandFuns,l=uiCoreArgs.enums.shapeType,o=false,j,i,m=f.length-1;m>=0;m--)if(f[m].display){h=f[m].children;for(var p=h.length-1;p>=0;p--){g=h[p];i=g.ui;if(!i.hided){j=i.parent;if(!(j&&(j.hided||!n.collisionCheck(c,d,1,1,j.x,j.y,j.width,j.height)))){var k=i.zoom?i.zoom:1;j=parseInt(i.width*k);var q=parseInt(i.height*k);k=i.x+parseInt(i.width-
j>>1);var r=i.y+parseInt(i.height-q>>1);if(l[i.shape]==l.rect){if(n.collisionCheck(c,d,1,1,k,r,j,q))o=true}else if(l[i.shape]==l.circle){i=parseInt(j>>1);if(n.circleCollisionCheck(c,d,1,k+i,r+i,i))o=true}if(o)return g}}}}if(a.touchNullObject==null)a.touchNullObject={type:b,x:c,y:d};return _collisionCheck=null},getPool:function(b){return a[b+"Pools"]},createPool:function(b,c){return{display:b,children:[c]}},createChild:function(b,c){return{ui:b,callBack:c}},getOffset:function(b){var c=b.offsetX,d=
b.offsetY;if(!c){d=e.getDom("jsGameScreen");c=b.clientX-d.offsetLeft;d=b.clientY-d.offsetTop}return{x:c,y:d}},checkAddRefresh:function(b){if(!b)return false;b.clicked=false;if(b.parent){if(b.parent.rendered){b.clicked=true;if(b.type!="panel"&&a.refreshPools.length!=0)a.refreshPools=[];b.parent.rendered=false;a.addRefresh(b.parent)}}else if(b.rendered){b.clicked=true;b.rendered=false;a.addRefresh(b)}},catchScrollUi:function(b,c,d){if(b&&(b.type=="panel"||b.type=="selectBox")){b.scrollPath=[];a.touchScrollPanel=
{ui:b,sx:c,sy:d}}},makePanelScroll:function(b,c){if(a.touchScrollPanel){var d=a.touchScrollPanel.ui;if(d.type=="panel"&&d.items.length>0&&d.contextHeight>d.height||d.type=="selectBox"&&d.options.length>0){var f=c-a.touchScrollPanel.sy,h=d.scrollPath;if(h.length>0&&f*h[0].dy<=0)h=[];f=Math.abs(f)>5?parseInt(Math.abs(f+0.1)/(f+0.1))*30:f;h.push({dx:0,dy:f});a.touchScrollPanel.sx=b;a.touchScrollPanel.sy=c;a.addRefresh(d)}}},eventHandler:function(b,c,d){if(a.isLocked)return false;var f=a.checkPoint(b,
c,d),h=true;if(f){var g=f.ui;if(g!=null){if(g.disabled){if(b=="touchStart")g.parent&&a.catchScrollUi(g.parent,c,d);else b=="touchMove"&&g.parent&&a.makePanelScroll(c,d);return false}a[b+"Current"]=g;switch(g.type){case "button":if(b=="touchStart"){g.touch();a.checkAddRefresh(g);a.startUi=g;g.parent&&a.catchScrollUi(g.parent,c,d)}else if(b=="touchEnd"){if(a.touchStartCurrent!=g){h=false;g=a.touchStartCurrent}g.show();a.checkAddRefresh(g);a.endUi=g}else if(b=="touchMove")if(g.parent){if(g.parent.type==
"panel"||g.parent.type=="selectBox")g.show();a.makePanelScroll(c,d)}break;case "checkBox":if(b=="touchStart")g.parent&&a.catchScrollUi(g.parent,c,d);else if(b=="touchEnd"){if(g.checked){g.show();g.checked=false}else{g.touch();g.checked=true}a.checkAddRefresh(g)}else b=="touchMove"&&g.parent&&a.makePanelScroll(c,d);break;case "panel":case "selectBox":if(b=="touchStart")a.catchScrollUi(g,c,d);else b=="touchMove"&&a.makePanelScroll(c,d)}if(b=="touchStart")if(g.drag){a.dragCallBack=g.drag;a.dragUi=g;
if(a.dragUi.dragStart){a.dragUi.dragStart({x:c,y:d,type:"dragStart",target:a.dragUi});a.checkAddRefresh(a.dragUi)}}h&&a.callBacks.push({e:{x:c,y:d,type:b,target:g},child:f})}}if(b=="touchMove"){if(a.dragCallBack!=null){a.dragCallBack({x:c,y:d,type:"drag",target:a.dragUi});a.checkAddRefresh(a.dragUi)}}else if(b=="touchEnd"){if(a.dragCallBack!=null){a.dragCallBack=null;a.dragUi.show();if(a.dragUi.dragEnd){a.dragUi.dragEnd({x:c,y:d,type:"dragEnd",target:a.dragUi});a.checkAddRefresh(a.dragUi)}a.dragUi=
null}a.touchScrollPanel=null;if(a.startUi!=null&&a.startUi!=a.endUi){a.startUi.show();a.checkAddRefresh(a.startUi)}a.startUi=null;a.endUi=undefined}if(a.touchNullObject!=null){if(e.events.touchNull!=null){b=a.touchNullObject;e.events.touchNull(b.type,b.x,b.y)}a.touchNullObject=null}},addRefresh:function(b){for(var c=a.refreshPools,d=true,f=c.length-1;f>=0;f--)if(c[f].ui==b){d=false;c[f].steps.push(0);break}d&&c.push({ui:b,steps:[0]})}};e.events.bind=function(b,c,d){if(b.type=="label")return e.events;
e.events.unbind(b,c);c=a.getPool(c);var f=b.zindex?Math.abs(b.zindex):0;if(c)f>c.length-1?c.push(a.createPool(true,a.createChild(b,d))):c[f].children.push(a.createChild(b,d));return e.events};e.events.unbind=function(b,c){var d=a.getPool(c),f;if(d)for(var h=d.length-1;h>=0;h--){f=d[h].children;for(var g=f.length-1;g>=0;g--)if(f[g].ui==b){f.splice(g,1);break}f.length==0&&d.splice(h,1)}return e.events};e.events.listener=function(){if(a.callBacks.length>0){for(var b=a.callBacks,c=b.length,d,f,h=0;h<
c;h++){d=b[h].e;b[h].child.callBack(d);f=b[h].child.ui.click;if(d.type=="touchEnd"&&d.target.clicked&&a.startUi==a.endUi&&f)d.target._clickAtOnce?f(d):a.clickCallBack.push({click:f,e:d})}a.callBacks=[]}return e.events};e.events.cacheBefore=null;e.events.cacheAfter=null;e.events.touchNull=null;e.events.cache=function(){e.events.cacheBefore!=null&&e.events.cacheBefore();e.ui.context.clearRect(0,0,a.contextWidth,a.contextHeight);for(var b=a.displayPools,c=b.length,d,f,h=0;h<c;h++){f=b[h].children;d=
f.length;for(var g=0;g<d;g++)f[g].render()}e.events.cacheAfter!=null&&e.events.cacheAfter()};e.events.render=function(){if(a.binded){if(a.cachePools.length>0){a.cachePools.shift();e.events.cache()}for(var b=a.refreshPools,c,d=b.length,f=0;f<d;f++)if(c=b[f])if(c.steps.length>0){a.isClear&&e.ui.context.clearRect(c.ui.x,c.ui.y,c.ui.width,c.ui.height);c.ui.render();c.ui.rendered=true;c.steps.shift()}else{b.splice(f,1);f--}a.context.drawImage(a.cacheDom,0,0,a.contextWidth,a.contextHeight,0,0,a.contextWidth,
a.contextHeight);if(a.clickCallBack.length>0){b=a.clickCallBack;c=b.length;for(d=0;d<c;d++)b[d].click&&b[d].click(b[d].e);a.clickCallBack=[]}}return e.events};e.events.open=function(){if(!a.binded){a.cacheDom=document.createElement("canvas");a.cacheDom.id=a.cacheDomId;a.contextWidth=e.canvas.screen.getWidth();a.contextHeight=e.canvas.screen.getHeight();a.cacheDom.width=a.contextWidth;a.cacheDom.height=a.contextHeight;a.cacheDom.style.width=a.contextWidth+"px";a.cacheDom.style.height=a.contextHeight+
"px";a.cacheDom.style.display="none";a.cacheContext=a.cacheDom.getContext("2d");e.ui.context=a.cacheContext;a.context=e.canvas.getContext();a.isBlocked=false;e.canvas.screen.getTouch()?e.events.touchStart(function(b){a.clientX=b.touches[0].clientX;a.clientY=b.touches[0].clientY;a.eventHandler("touchStart",b.touches[0].clientX,b.touches[0].clientY)}).touchMove(function(b){a.clientX=b.touches[0].clientX;a.clientY=b.touches[0].clientY;a.eventHandler("touchMove",b.touches[0].clientX,b.touches[0].clientY)}).touchEnd(function(){if(a.clientX>=
0||a.clientY>=0){a.eventHandler("touchEnd",a.clientX,a.clientY);a.clientX=-1;a.clientY=-1}}):e.events.mouseDown(function(b){b=a.getOffset(b);a.eventHandler("touchStart",b.x,b.y)}).mouseMove(function(b){b=a.getOffset(b);a.eventHandler("touchMove",b.x,b.y)}).mouseUp(function(b){b=a.getOffset(b);a.eventHandler("touchEnd",b.x,b.y)});a.binded=true}return e.events};e.events.addChild=function(b){if(b.type=="tab"||b.type=="label")return e.events;e.events.removeChild(b);var c=a.displayPools,d=b.zindex?Math.abs(b.zindex):
0;if(c){if(d>c.length-1){c.push(a.createPool(true,b));b.zindex=c.length-1}else c[d].children.push(b);if(c.length>0)for(_di=c.length-1;_di>=0;_di--)c[_di].children.length==0&&c.splice(_di,1)}e.events.bind(b,"touchStart",function(){});e.events.bind(b,"touchEnd",function(){});e.events.bind(b,"touchMove",function(){});c=d=null;if(b.items){c=b.items;d=c.length;for(var f,h=0;h<d;h++){f=c[h];f.zindex=b.zindex;e.events.removeChild(f);e.events.bind(f,"touchStart",function(){});e.events.bind(f,"touchEnd",function(){});
e.events.bind(f,"touchMove",function(){})}c=d=f=null}return e.events};e.events.removeChild=function(b){if(b.type=="tab"){b.disposed();return e.events}var c=a.displayPools,d;if(c){var f,h;for(f=c.length-1;f>=0;f--){d=c[f].children;for(h=d.length-1;h>=0;h--)if(d[h]==b){d[h].disposed();d.splice(h,1);f=h=0}}}e.events.unbind(b,"touchStart");e.events.unbind(b,"touchMove");e.events.unbind(b,"touchEnd");return e.events};e.events.blocked=function(){return a.isBlocked};e.events.setBlock=function(b){a.isBlocked=
b};e.events.locked=function(){return a.isLocked};e.events.setLock=function(b){a.isLocked=b};e.events.addRefresh=a.addRefresh;e.events.resetCache=function(){a.cachePools.push(0)};e.events.setClear=function(b){a.isClear=b}})(jsGame);