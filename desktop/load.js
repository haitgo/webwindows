 /**
  *说名：当需要你的HTML页面能和桌面交互，请包含该文档
  *常用函数：
  1、关闭窗体 		unload(窗体Aid);
  2、创建窗口 		createWind(Aid,Atitle,Aimg,Aurl,Abut,Aw,Ah);
  3、消息提示 		createNotice(msg,t,_timeout);
  4、对话框   		msgBox(Emsg,width,height,type,callBack);
  5、图标数量提示 	icoNotice(Iid,shu);
  */
var winTop=window.top;
var meName=window.name;
var meId=window.name.replace('iframe','');
var cal=window.top.window.frames[meName];
var url=window.location.href;
var rightKey=true;
var rightMenu=null;//可以自动增加鼠标右键
var	windClone=meId+"_Clone"
var	windCon=meId+"_Con"
function $(obj){return document.getElementById(obj);}
function page(type){
	switch(type){
		case "width":
			return document.body.clientWidth;
		break;
		case "height":
			return document.body.clientHeight;
		break;
		case "clentwidth":
			return window.top.document.body.clientWidth;
		break;
		case "clentheight":
			return window.top.document.body.clientHeight;
		break;
	}
}
/** 
 *窗口交互调用
 *@winName 窗体的名称 也就是创建窗体的Aid
 */
function winCal(winName){
	winFrameId="New"+winName+'iframe';
	if(window.top.$(winFrameId)){
		return 	window.top.window.frames[winFrameId];
	}
}
//卸载当前窗体
function unload(unloadId,closeType){
	unloadId=unloadId=="me"?meId:'New'+unloadId;
 	winTop.desktop.wind.unload(unloadId,closeType);
}
//当窗体关闭的时候调用的函数,可以重载
function unloadFunc(){
		 
}
//改变监听状态
function trueListen(id){
	window.top.listen[id]=true;	
}
//加工后的监听
function listening(id){
	setInterval(function(){listen(id)},1000);
}
//监听
function listen(id){
	if(window.top.listen[id]==true){
		reloading("");
		window.top.listen[id]=false;	
	}
}
//
function gotoUrl(urla){
	window.location=urla	
}
//判断浏览器类型
function IsIE(){
 	return window.ActiveXObject?true:false;
}
/**
 *页面点击事件
 */
document.onmousedown=function(){
	try{
		winTop.desktop.wind.topOn(meId);//点击页面的时候让窗体置顶
	}catch(err){
		
	}
}
//鼠标弹起事件
document.onmouseup=function(e){
	winTop.desktop.mouseup();
	rightMenu=null
}
 //右键菜单
document.oncontextmenu=function(e){
	var event=e||window.event;
 	if(IsIE()){
			var YY=event.clientY;
			var XX=event.clientX;
		}else{
			var YY=e.clientY;
			var XX=e.clientX;
	}
 	if(rightKey==true){//如果右键开启的
		var cop=getSelect();
		DefaultRightMenu={//右键菜单
 			M1:{name:"刷新",
				call:function(){reloading()},
				use:false
				},			  
			M2:{name:"复制",
				call:function(){copy_clip(cop);},
				use:false
				},			 
			M3:{name:"页面属性",
				call:function(){msgBox(url,500,200,'wen','',false);},
				use:false
				},	
 			M4:{name:"关于系统",
				call:"",
				use:false
				},
			M5:{name:"关闭当前窗口",
				call:function(){msgBox('确定要关闭当前窗口吗?',300,100,'wen',function(){unload("me")})},
				use:false
				}
   		}
 		rightMenu=!rightMenu?DefaultRightMenu:rightMenu;//如果没有自定义右键，则使用默认右键
   		winTop.desktop.rightKey(e,{Wid:meId,XX:XX,YY:YY},rightMenu);
	}
	return false;
}
//window.alert(window.name+tid);
document.onkeydown=function(){//键盘按下事件	
 	var ev = window.event || e;
	var code = ev.keyCode || ev.which;
	if(window.top.$(meId)){
		if( code==27){//如果按下esc键就退出当前页面
  				unload("me")
			}
		if( code==116){//如果按下f5就刷新当前页面
				ev.keyCode ? ev.keyCode = 0 : ev.which = 0;
   				window.location.reload();
  				return false;
			}
		}
	}
//自定义加载完成函数
function onloadOver(){
		var icoDiv=document.createElement("input");
		icoDiv.type="text";
		icoDiv.id="focusChoose";
		icoDiv.value="focusChoose";
		icoDiv.style.position="fixed";
		icoDiv.style.top="-1000px";
		document.body.appendChild(icoDiv);
		setTimeout(function(){$('focusChoose').focus()},500);
}
 //刷新页面
function reloading(windIdname){
	if(windIdname && window.top.$("New"+windIdname)){
		winCal(windIdname).reloading();
	}else{
		window.location.reload();
 		/*
		window.top.$(windClone).innerHTML=window.top.$(windCon).innerHTML;
		window.top.$(windClone).style.display="";
        setTimeout(function(){window.top.$(windCon).style.display="none";window.location.reload();	},8000)
		*/
	}
}
/**
 *创建新窗体
 *@Aid  	string  窗体编号，必须唯一
 *@Atitle	string	窗体标题
 *@Aimg		strimg	窗体图标
 *@Aurl		url		iframe的url路径
 *@Abut		enum	big打开最大且允许拖动|yes允许拖动|no不允许拖动
 *@Aw		int		窗体宽度
 *@Ah		int		窗体高度  
 */
function createWind(Aid,Atitle,Aimg,Aurl,Abut,Aw,Ah){
	winTop.desktop.wind.create(Aid,Atitle,Aimg,Aurl,Abut,Aw,Ah);
}
/**
 *创建自消失提示框
 *@msg  	string 消息内容
 *@t		enum   提示图标  0注意 1成功 2 错误
 *@_timeout int	   显示时间，可以为空
 */
function createNotice(msg,t,_timeout){
	winTop.createNotice(msg,t,_timeout);	
}
/**
 Emsg.消息内容
		 width：消息框宽
		 height:消息框高
		 type：gou|cha|tan|wen|iframe的时Emsg为url路径
		 yesCallback:回调函数
		 lei:true显示取消按钮|false不显示取消按钮
  */
function msgBox(Emsg,width,height,type,yesCallBack,lei){
	winTop.desktop.msgBox(Emsg,width,height,type,yesCallBack,lei);	
}
/**
 *给ico创建提示图标
 *@Iid  string ico的编号，doone_icon.js 图标数组第一个元素就是编号
 *@shu	int 数量，为空就自动隐藏
 */
function icoNotice(Iid,shu){
	winTop.desktop.icon.notice(Iid,shu);	
}
/**
 *img  string 背景图片路径
 *lei  enum	  可填（拉伸）或（平铺）
 */
function background(img,lei){
	winTop.desktop.background(img,lei);
}
//获取选中文字
function getSelect(){
		return   window.getSelection ? window.getSelection().toString() : document.selection.createRange().text;  
 }
//让值为vaue，id为sid的下拉框选中
function mySelected(sid,value){
 	$(sid).value=value;
	try{
		$(sid).onchange();
	}catch(er){
		
	}
 }
//
function funcNull(){
	
}
//拷贝内容到剪贴板
function copy_clip(copy){
	if (window.clipboardData){
	window.clipboardData.setData("Text", copy);}
	else if (window.netscape){
	netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
	var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
	if (!clip) return;
	var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
	if (!trans) return;
	trans.addDataFlavor('text/unicode');
	var str = new Object();
	var len = new Object();
	var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
	var copytext=copy;
	str.data=copytext;
	trans.setTransferData("text/unicode",str,copytext.length*2);
	var clipid=Components.interfaces.nsIClipboard;
	if (!clip) return false;
	clip.setData(trans,null,clipid.kGlobalClipboard);}
	return false;
}
/**
 *dis留住并显示
 *@tabClass  tab的class，般指的是tab按钮的父元素的class
 *@tabOnClass tab的class 鼠标点击后的class
 *@disClass  tab的相对应的隐藏域的框架,可以为空，为空则不管div对应隐藏
 *@onIndex	 让那个元素显示，从1开始
 */
function crateTab(tabClass,tabOnClass,tabNoClass,disClass,onIndex){
 	jq('.'+tabClass+' li').click(function(){
		liId=jq(this).index();
		if(disClass){
			jq('.'+disClass).stop().fadeOut(winTop.f(300));
			jq('.'+disClass).eq(liId).stop().fadeIn(winTop.f(300));
		}	
		jq('.'+tabClass+' li').removeClass(tabOnClass);
		jq('.'+tabClass+' li').addClass(tabNoClass);
		jq(this).addClass(tabOnClass);	
 	});
	if(onIndex!=null){
		onIndex=onIndex-1;
		jq('.'+tabClass+' li').eq(onIndex).addClass(tabOnClass);
		jq('.'+tabClass+' li').addClass(tabNoClass);
		if(disClass){
			jq('.'+disClass).css({display:'none'});	
			jq('.'+disClass).eq(onIndex).css({display:''});
		}
 	}
}
/**创建鼠标经过，鼠标离开元素特效
 *cid  		元素id
 *movejson	鼠标经过时的css
 *outjson	鼠标离开时的cs
 *atime		时间
 */
function  createMoveStyle(cid,movejson,outjson,atime){
	 jq("#"+cid).mouseenter(//鼠标经过
            function() {
                jq(this).stop().animate(movejson,winTop.f(atime));
             }
        );
      jq("#"+cid).mouseleave(//鼠标离开
            function() {
                jq(this).stop().animate(outjson,winTop.f(atime));
             }
       );
}
/**文本框显示默认内容，鼠标点击消失
 *cid  		元素id
 *value		要提示的内容
 */
var inputNotice={};//这里记录所有有提示的数据，方便提交的时候判断清空
function createInputNotice(cid,value){
	inputNotice[cid]=value;
	if(!$(cid) || $(cid).value!="")return false;
 	$(cid).onmousedown=function(){
		if($(cid).value==value){
			$(cid).value="";
			$(cid).style.color="";
		}
 	}
	$(cid).onblur=function(){
		if($(cid).value==""){
			$(cid).value=value;
			$(cid).style.color="#AAA";
		}
 	}
	$(cid).value=value;
	$(cid).style.color="#AAA";
 }
//清除所有输入框提示的数据,用于form提交的时候清空
function clearInputNotice(){
	for(key in inputNotice){
		value=inputNotice[key];
		if( $(key) && $(key).value==value){
			$(key).value="";
		}	
	}
}
//输入内容验证
/**
 *json={id:{title:用户名,check="phone",leng:'>1|<1|==2'}}
 */

function askInput(json){
  	for(objId in json){
			tjson=json[objId];
  			if(!$(objId))continue ;//如果该id不存在就返回
			va=$(objId).value.replace(/(^\s*)|(\s*$)/g, "");
			if(va==''){
				$(objId).focus();
 				createNotice(tjson.tit+'不能为空','cha');
				return false;
			}
			lengCheck=true;
			checkIsok=true;
			if(va && tjson.ck){//如果指定格式验证
   				switch(tjson.ck){
					case "phone":checkIsok=isPhone(va);break;
					case "date":checkIsok=isDate(va);break;  
					case "key":checkIsok=isKey(va);break;
					case "number":checkIsok=isNum(va);break;
					default:checkIsok=tjson.ck.test(va);break;
				}
			}
  			if(va  && tjson.leng ){
 				string="lengCheck="+va.length+""+tjson.leng
				eval(string)
 			}
			if(checkIsok==false || lengCheck==false){
				$(objId).focus();
				createNotice(tjson.tit+'输入有误','cha');	
				return false;
			}
 
		}
	return true;
	}
//判断两次输入是否一致
function difid(id1,id2,title){
 	if($(id1).value!=$(id2).value){
		$(id2).value="";
		createNotice(title,'cha');	
		return false	
	}else{
		return true;
	}
}

//判断是否为日期
function isDate(RQ) {
       var date = RQ;
      var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	     if (result == null)
          return false;
      var d = new Date(result[1], result[3] - 1, result[4]);
           return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);
}
/*判断是否为Email*/
function isEmail(o){
	var reg=/^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i;
	return reg.test(o);
}
/*判断是否为英文和数字*/
function isKey(o){
	var reg=/^[a-zA-Z0-9]+$/i;
	return reg.test(o);
}
/*判断url是否正确*/
function isUrl(o){
	var reg=/^(http\:\/\/)?(\w+\.)+\w{2,3}((\/\w+)+(\w+\.\w+)?)?$/;
	return reg.test(o);
}
/*判断是否为电话号码 可以是手机或 固定电话*/
function isPhone(v){
	var reg=/^1[0-9]{10}$/i;
	return reg.test(v) 
}
function isNum(o){
	var reg=/[^\d]+/;
	return reg.test(o)?false:true;
}
function isChinese(o){
	var reg=/^[\u4E00-\u9FA5]+$/;
	return reg.test(o);
}
/*去除空白字符*/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
//提交并执行返回的参数
function evalSubmit(postName,url,json){
	if(!askInput(json))return false;
 	ajksPost({name:postName,url:url,ready:function(re){
			ajksResponseCheck(re,function(){eval(re)});//判断是否为错误参数
 		}
	})	
}
//ajks提交多个  {url,ready,err,name}
function ajksPost(json){
	names=json.name;
 	ids="";
	nameList=document.getElementsByName(names);
	leng=nameList.length;
	for(i=0;i<leng;i++){
		ids+=nameList[i].id+",";	
	}
	json['ids']=ids;
	ajks(json);
} 
//判断是否是错误提示信息
function ajksResponseCheck(re,callBack){
	try{
 		re=eval("("+re+")");
 		if(re.msg){
			msg=re.msg
			createNotice(msg.title,msg.type);
 			if(msg.reback && document.getElementById(msg.reback)){
				document.getElementById(msg.reback).focus();
			}
		}else{
			callBack();	
		}
	}catch(err){
		callBack();	
	}
}
/*
ajax 函数
ajks(url,function(value){value就是返回的值，可以进行处理};,ids);
*/
function ajks(json){//需要 {url,ready,err,value,ids}
 	//1、过滤提交的post
 	var sendId='';
	if(json.value){//如果为自定义发送
		sendId=json.value;
	}else if(json.ids){//否则调用id
 		allid=json.ids.split(",");
		for(i=0;i<allid.length;i++){
			tid=allid[i];
			if(tid && $(tid)){
				sendId+=tid+"="+document.getElementById(tid).value+"&";
			}
		}//end for
	}
	//2、发送
	try{
		if(window.ActiveXObject){//如果为IE浏览器
			NewAjax=new ActiveXObject("Microsoft.XMLHTTP");
		}else{//或为其它遵循w3c的浏览器
			NewAjax=new XMLHttpRequest();
		}
		NewAjax.open("post",json.url,true);//
		NewAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		NewAjax.send(sendId);	
		NewAjax.onreadystatechange=function e(){
			if(NewAjax.readyState==4){
				if(NewAjax.status==200){
					writes=NewAjax.responseText;
					if(json.ready){//如果存在回调函数，就调用回调
						try{
							json.ready(writes);//将回调函数放到try模块，避免出错
						}catch(err){
							
						}
					}
				}else if(json.err){
					   json.err();
				}
			}	
		}//end onrdystatechange callback
	}catch(aerr){//抛出异常
		if(json.err){
			json.err();	
		}
	}
}//end func

//改变innerHTML内容
function changeTit(obj,tit1,tit2){
	obj.innerHTML=tit1
	obj.onmouseout=function(){
		obj.innerHTML=tit2;	
	}	
}
function upload(upname){
	window.frames[upname].document.getElementById('upclick').click()	
}
//创建一个自定义select
//objid,元素id  dataid,键的保存数据 csData初始数据,jsoni选择内容
function createSelect(objid,dataid,csData,jsoni){
	$(objid).value=jsoni[csData]?jsoni[csData]:jsoni.first;
	$(dataid).value=csData;
	$(objid).onclick=function(){
		if($('myselect'))return;
		var oDiv=document.createElement("div");
			oDiv.id="myselect";
			oDiv.className="myselect";
			Inner=""
			for(key in jsoni){
				value=jsoni[key];
				if($(dataid).value==key){
					classname="myselectcheck"	
				}else{
					classname=""	
				}
				if(key=="first"){
					key=""	
				}
				Inner+="<li class=\""+classname+"\" onclick=\"document.getElementById('"+objid+"').value='"+value+"';"+
						"document.getElementById('"+dataid+"').value='"+key+"';"+
						"document.body.removeChild(document.getElementById('myselect'))\"><a>"+value+"</a></li>";
			}
		oDiv.innerHTML=Inner;
		document.body.appendChild(oDiv);
		$('myselect').style.left=getLeft($(objid))+"px";
		$('myselect').style.top=($(objid).offsetTop+$(objid).offsetHeight+2)*1+"px";
		$('myselect').style.width=$(objid).offsetWidth+"px";
	 }
}
//获取元素x坐标
function getTop(e){ 
	var offset=e.offsetTop; 
	if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
	return offset; 
} 
//获取元素的横坐标 
function getLeft(e){ 
	var offset=e.offsetLeft; 
	if(e.offsetParent!=null) offset+=getLeft(e.offsetParent); 
	return offset; 
} 
//创建一个...
function createDDD(cid,num){
	if(document.getElementById(cid)){
		if(!num || num>3)num=0;
 		num++;
		inner=""
		for(i=0;i<4;i++){
			if(i<num){
				inner+=".";
			}else{
				inner+="&nbsp;";
			}
		}
		document.getElementById(cid).innerHTML=inner
		setTimeout(function(){
				createDDD(cid,num)
		},500);
	}
}

// 让右侧的列表框固定大小
 //让导航栏悬浮
function makeTopBar(){
	$('midTable').style.width=(page("clentwidth")-227)+"px";
	document.body.onresize=function(){ makeTopBar() }
}
//判断是否是正常加载
isSafe();
function isSafe(){
	if(!window.top.desktop){
		window.location="404";
	}
}

