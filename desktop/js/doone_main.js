 //-----------函数
 /*
说明：该页函数为应用函数
*/
function $(obj){return document.getElementById(obj)}
function isset(variable){
    return typeof(variable)=='undefined' ? true : false;
}
//px替换
function replacePx(input){
	input=input+"";
 	ishave=input.match(/(px)$/);
	if(ishave){
		 input=input.replace(/[^0-9]/ig,"")*1; 
		}
	return input;
}
//数组的键是否存在
function keyExists(arr,key)
{
	for(k in arr)
	 {
		if(k==key)return arr[k];
	 }
	return false;
}
//获取元素的id
function downId(e)
{	
 	 ele=e?event.target:event.srcElement;
	 return  ele.id;
}
//时间戳
function timestamp(){
		return  new Date().getTime();
	}
//针对css的dis属性快速处理
function dis(did,lei)
{
	if(!$(did))return;
	if(lei)
	{
		if(lei=="block")lei="";
		$(did).style.display=lei;	
	}else{
		return 	$(did).style.display;
	}
}
/*判断为空*/
function isEmpty(o){
	return o==""?true:false;
}
/*去除空白字符*/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 *输出json数据
 *arr 数组
 */
function json_encode(arr){
	type=typeof(arr);
    if(type!="arr" && type!="object")return "{}";
	ret="{";
	var i=0;
 	for(key in arr){
 		typeFor=typeof(arr[key]);
 		if(typeFor=="arr" || typeFor=="object"){
			ret+=key+':'+json_encode(arr[key])+',';
		}else if(typeFor=="string"){
			ret+=key+':"'+arr[key]+'",';
		}else{
			ret+=key+':'+arr[key]+',';
		}
		i++;
	}
	if(i==0){
		return "{}";
	}else{
 	 	return ret.substring(0,ret.length-1)+"}";
	}
} 

//鼠标点击后背景停留
function stayHere(idtit,idlen,yesClass,noClass,did)
{
 	for(i=1;i<idlen+1;i++)
	{
		$(idtit+i).className=noClass;
 	}
	$(idtit+did).className=yesClass;
}
//鼠标点击后display
function disOn(idtit,idlen,did)
{
	for(i=1;i<idlen+1;i++)
		{
			$(idtit+i).style.display="none";
		}
	$(idtit+did).style.display="";
 }
/*
ajax 函数
ajks(url,function(value){value就是返回的值，可以进行处理};,ids);
*/
function ajks(json){
 	//1、过滤提交的post
	var sendId='';
	if(json.value){//如果为自定义发送
		sendId=json.value;
	}else if(json.ids){//否则调用id
 		allid=json.ids.split(",");
		for(i=0;i<allid.length;i++){
			tid=allid[i];
			sendId+=tid+"="+document.getElementById(tid).value+"&";
		}//end for
	}
	//2、发送
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
					json.ready(writes);
				}
			}else if(json.err){
				   json.err();
			}
		}	
	}//end onrdystatechange callback
}//end func
function S(Divid,Ty){if(!$(Divid))return;$(Divid).scrollTop=Ty}
function C(Divid,classname){if(!$(Divid))return;$(Divid).className=classname}//改变classname
//判断浏览器类型
function IsIE(){
 	return window.ActiveXObject?true:false;
}
//是否开启特效
function f(number){
	if(win_ini.styleOpen==true && desktop.loadStartus==true)return number;else return 0;
}
var CWlistTimer;
function ChangeWList(Ctype){
if(Ctype==""){
	var N=$("Win_WinList").childNodes.length;
	$("Win_WinList").style.width=153*N+"px";
	$("Win_WinFinfo").scrollLeft=$("Win_WinFinfo").scrollWidth;
	if($("Win_WinFinfo").clientWidth<$("Win_WinFinfo").scrollWidth){$("Win_FScro").style.display=""}else{$("Win_FScro").style.display="none"}
	}
if(Ctype=="left"){
	$("Win_WinFinfo").scrollLeft=$("Win_WinFinfo").scrollLeft-5;
	CWlistTimer=window.setTimeout("ChangeWList('left')",10);
	}
if(Ctype=="right"){
	$("Win_WinFinfo").scrollLeft=$("Win_WinFinfo").scrollLeft+5;
	CWlistTimer=window.setTimeout("ChangeWList('right')",10)
	}
if(Ctype=="out"){clearTimeout(CWlistTimer)}
}
//改变width,和height
function css_wh(cssid,width,height){
	if(height=="n"){$(cssid).style.width=width+"px";}
	if(width=="n"){$(cssid).style.height=height+"px";}
	if(width!=="n" && height!=="n"){
		$(cssid).style.width=width+"px";
		$(cssid).style.height=height+"px";
	}
}
//时间日期
function InfoTime()
{
	var MyDate=new Date();
	var Text=MyDate.getMonth()+"月"+MyDate.getDate()+"日 "+MyDate.toLocaleTimeString()
	$('Win_Time').innerHTML=Text;
}
//鼠标动作提示层
function mouseTis(inner){
	if(inner!='none'){
 		 $('Win_tis').innerHTML=inner;
		 jq("#Win_tis").stop().fadeIn(f(500));
	}else{
		jq("#Win_tis").stop().fadeOut(f(100));
	  } 
}
function ascii(str){
 return str.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"\&#x$2;")});
}
//字符转换为unicode
function unicode(str){
 return str.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"\\u$2")});
}
//unicode转换为字符
function reconvert(str){
 str = str.replace(/(\\u)(\w{4})/gi,function($0){
            return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{4})/g,"$2")),16)));
            });
            
 str = str.replace(/(&#x)(\w{4});/gi,function($0){
            return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{4})(%3B)/g,"$2"),16));
            });            
 return str;
}
//创建提示框CreateNotice('sdf',1,300);
function createNotice(msg,t,_timeout,_fn){
	var msgbox = new Object();
	msgbox.count = 0;
	msgbox.index=0;
	//msgbox.isloaded = false;//是否已经加载过了
	msgbox.id_pre = "div_tip_";
	msgbox.hide = function (id,d){ 
		var dom_obj = document.getElementById(id);
		var d = d || false;
		if(dom_obj){
			if(d == true){
				dom_obj.style.display = "none";
			}else{
				dom_obj.parentNode.removeChild(dom_obj);
			} 
		}
	}
	msgbox.$ = function(id){ return document.getElementById(id); }
	msgbox.getid = function(i){
	    if(i<10){
	        return msgbox.id_pre + "00" + i;
	    }else if(i< 100){
	        return msgbox.id_pre + "0" + i;
	    }else{
	        return msgbox.id_pre + i;
	    }
	}
	msgbox.newid = function (){
	    var id_temp = "";
	    for (var i=0; i<msgbox.count; i++){
	        id_temp = msgbox.getid(i); 
	        if(msgbox.$(id_temp)){
	            continue;
	        } 
	        msgbox.index = i;
	        return id_temp;
	    } 
	    id_temp = msgbox.getid(msgbox.count);
	    msgbox.index = msgbox.count;
	    msgbox.count = msgbox.count + 1;
	    return id_temp;
	}
	show(msg,t,_timeout,_fn);//构造函数
	//t:默认为0-提示,1-成功消息,2-错误消息
	function show(msg,t,_timeout,_fn){ 
		var type = t || 0;
	 	if(type > 2) type = 0;
	 	
	 	var timeout = _timeout || 2000;
	 	var nullFn = function (){};
	 	var fn = _fn || nullFn;
	 	
		var type_classes = new Array();
		type_classes[0] = "gtl_ico_hits";
		type_classes[1] = "gtl_ico_succ";
		type_classes[2] = "gtl_ico_fail";
		
		var newlayer_id =  msgbox.newid(); 
		
	 	var newlayer = document.createElement("div");
	 	newlayer.id = newlayer_id;
	 	newlayer.className = "gb_tip_layer";  
	 	newlayer.style.marginTop = (50 * parseInt(msgbox.index )-50) + "px";
		 	var tip_b = document.createElement("span");
	 	tip_b.className = type_classes[type];
	 	newlayer.appendChild(tip_b);
	 	
	 	var tip_c = document.createElement("span"); 
	 	tip_c.innerHTML = msg;
	 	newlayer.appendChild(tip_c);
	 	
	 	var tip_e = document.createElement("span");
	 	tip_e.className = "gtl_end";
	 	newlayer.appendChild(tip_e);
	 	document.body.appendChild(newlayer);
	 	
		dis(newlayer_id,"none");
		jq("#"+newlayer_id).fadeIn(300);
	 
	 	if(timeout > 0){
	 	    setTimeout(function()
						{ 
							jq("#"+newlayer_id).fadeOut(500,function(){
										newlayer.parentNode.removeChild(newlayer);
									});
							fn(); 
						}, timeout);
	 	}
	 	  newlayer.style.left=(desktop.width-newlayer.scrollWidth)/2+"px";
        return newlayer;
	}
	
	this.remove = function(obj){
	    obj.parentNode.removeChild(obj);
	}
}
 

 //----------事件
 //按键事件
document.onkeydown=function(e){
	var e=window.event?window.event:e;
	var srcEle=e.srcElement?e.srcElement:e.target;
	var Key=e.keyCode;
}
//窗口改变
window.onresize=function(e){
 	desktop.resize_();
	desktop.footMenuWidth();
	desktop.refresh_();
  	desktop.icon.create(desktop.pageOn);
}
//网页加载事件
window.onload = function(e){
  	desktop.loading();
 	//if(IsIE())alert('建议使用chrome浏览器，体验效果更好！');
}
//禁止选择
document.onselectstart=function(e){
	return false
}
//右键菜单
document.oncontextmenu=function(e){
	if(dis("Win_Msg")!='none')return false;
 	desktop.rightKey(e);
	return false;
}
//鼠标弹起事件
document.onmouseup=function(e){
	desktop.mouseup();
	desktop.icon.hiddenLongText();//隐藏展开的文本很多的图标
 	desktop.icon.iconOnAsk();
 //$("Win_Time").innerHTML=Wid
}
//----------------------桌面
 //拖动处理函数
 var DRAG={
 	startX:null,//拖动开始，鼠标的左距
	startY:null,//拖动开始，鼠标的顶距
	origX :null,//拖动开始，元素的左距
	origY :null,//拖动开始，元素的顶距
	deltaX:null,//鼠标距离元素最左侧的距离
	deltaY:null,//鼠标距离元素最顶部的距离
	MoveObj:null,//拖动元素ID
	moveCallBack:null,//拖动时的回调函数
	upCallBack:null,//拖动结束的回调函数
	moveType:null,//是否允许拖动
 	start:function(MoveObj,event,moveCallBack,upCallBack,moveType){
			this.MoveObj=MoveObj;
			this.moveCallBack=moveCallBack;
			this.upCallBack=upCallBack;
			this.moveType=moveType;
 			this.startX=event.clientX;
			this.startY=event.clientY;
			this.origX=parseInt($(MoveObj).offsetLeft);
			this.origY=parseInt($(MoveObj).offsetTop);
			this.deltaX=this.startX-this.origX;
			this.deltaY=this.startY-this.origY;
			if(document.addEventListener){
					document.addEventListener("mousemove",this.moveHandler,true);
					document.addEventListener("mouseup",this.upHandler,true);
			}else{
					$(MoveObj).setCapture();
					$(MoveObj).attachEvent("onmousemove",this.moveHandler);
					$(MoveObj).attachEvent("onmouseup",this.upHandler);
					$(MoveObj).attachEvent("onlosecapture",this.upHandler);
			}//end if
			if(event.stopPropagation){
					event.stopPropagation();
			}else{
					event.cancelBubble=true;
			}//end if
			if(event.preventDefault){
					event.preventDefault();
			}else{
					event.returnValue=false;
			}
	},
	moveHandler:function(e){
			desktop.icon.hiddenLongText();//拖动的时候隐藏长字符的
 			dis('Move_bg',"block");		 //鼠标按下时打开遮罩
 			d=DRAG.dragPosition(e);
 			if(DRAG.moveType==true){//如果是拖动（改变窗体大小的时候会用到）
				if(d.Y<desktop.smallTop)d.Y=desktop.smallTop;	//顶部不能越界
				if(d.Y>desktop.height-desktop.smallFoot)d.Y=desktop.height-desktop.smallFoot; //下部不能越界
				$(DRAG.MoveObj).style.left=d.X+"px";
				$(DRAG.MoveObj).style.top=d.Y+"px"; 
			}
			DRAG.moveCallBack({e:e,obj:DRAG.MoveObj,X:d.X,Y:d.Y,bX:d.bX,bY:d.bY,origX:DRAG.origX,origY:DRAG.origY});//调用移动回调
  			DRAG.propagation(e);
 	},
	upHandler:function(e){
			d=DRAG.dragPosition(e);
			DRAG.upCallBack({e:e,obj:DRAG.MoveObj,X:d.X,Y:d.Y,bX:d.bX,bY:d.bY,origX:DRAG.origX,origY:DRAG.origY});//调用结束回调
  			if(document.removeEventListener){
					document.removeEventListener("mouseup",DRAG.upHandler,true);
					document.removeEventListener("mousemove",DRAG.moveHandler,true);			
			}else{
					$(DRAG.MoveObj).detachEvent("onlosecapture",DRAG.upHandler);
					$(DRAG.MoveObj).detachEvent("onmouseup",DRAG.upHandler);
					$(DRAG.MoveObj).detachEvent("onmousemove",DRAG.moveHandler);
					$(DRAG.MoveObj).releaseCapture();			
			}
		    desktop.mouseup();//调用桌面鼠标弹起事件
			if(d.canSave){//如果元素移动位置大于设置的数据
				desktop.saveConfig();//保存桌面数据
			}
	},
 	propagation:function(e){
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble=true;
		}
	},
	dragPosition:function(e){
		 	if(!e) e=window.event;
		    DRAG.propagation(e);
			bX=e.clientX; 
			bY=e.clientY; 
 		 	X=e.clientX-DRAG.deltaX; //当前窗体left坐标
		 	Y=e.clientY-DRAG.deltaY; //当前窗体top坐标
			moveXS=20;//最小移动像素
			can1=bX-DRAG.startX>moveXS?true:false;
			can2=bY-DRAG.startY>moveXS?true:false;
			can3=0-(bX-DRAG.startX)>moveXS?true:false;
			can4=0-(bY-DRAG.startY)>moveXS?true:false;
			if(can1 || can2  ||  can3 || can4){canSave=true;}else{canSave=false;}
			return {bX:bX,bY:bY,X:X,Y:Y,canSave:canSave};
	}
  }//end cmove
/*-------------------------------------分割线-------------------------------------*/
//图标
var ICON={
 	IcoIndex	:new Array(),//图标index
	OnIco_Id	:null,//当前正使用的图标
  	create		:function(page,lei,callBack){//创建图标
			if(desktop.pageOn==page && !lei && lei!="ref" )return;//如果为当前页面或是刷新的情况就直接返回，不用创建图标
 			desktop.pageOn=page;//记录当前桌面编号
			$("Win_WinIco").style.display="none";//异常桌面图标
			$("Win_WinIco").innerHTML="";//桌面图标制空
			var thisIco=deskTopData[page].icos;//从配置文件读取当前桌面的图标
 			if(!keyExists(config.IcoStartus,page)){//如果配置文件中没有保存图标数据
				config.IcoStartus[page]={};
 				for(key in deskTopData[page].icos){
					config.IcoStartus[page][key]={};
				}
			} 
			var IcoList="";
			var ListNum=Math.floor((desktop.height-desktop.smallTop-desktop.smallFoot)/115);//计算一列最多有多少个图标
			var iNum=1,iList=1;
 			var i=0;
			for(key in config.IcoStartus[page] ){
					//if(key==null)return;
					if(iNum>ListNum){iNum=1;iList++}
					var IconTop =desktop.smallTop+30+115*(iNum-1);//图标Y轴
					var IconLeft=100*iList-80	;				   //图标X轴
					iNum++;
					var Iid="Ico"+key;
					var onIcon=thisIco[key];
					thisNotice=this.isHaveNotice(key);//判断否有提示数据数据
					if(desktop.icon.returnAutoIco()==false && config.IcoStartus[page][key].left ){// 如果为任意拖动
 						IconLeft=config.IcoStartus[page][key].left;
						IconTop =config.IcoStartus[page][key].top;
					}else{
						config.IcoStartus[page][key]['left']=IconLeft;
						config.IcoStartus[page][key]['top']=IconTop ;//将图标的数据保存下来
					}
 					var icoDiv=document.createElement("div");
					icoDiv.id=Iid;
					icoDiv.className="Ico";
					icoDiv.style.left=IconLeft+"px";
					icoDiv.style.top =IconTop+"px";
					icoDiv.onmouseover=function(){desktop.icon.OnIco(this.id,'on')}
					icoDiv.onmouseout= function(){desktop.icon.OnIco(this.id,'out')}
					icoDiv.onmousedown=function(e){
						var event=e||window.event;
 						desktop.icon.OnIco(this.id,'down');
						desktop.drag.start(this.id,event,function(json){desktop.icon.dragMove(json);},function(json){desktop.icon.dragOver(json);},true)
					}
					icoDiv.onmouseup  =function(){desktop.icon.OnIco(this.id,'up')}
					if(onIcon.type=="func"){//如果type为func即回调函数
						icoDiv.ondblclick =function(){
							dblIconId=this.id.replace("Ico","");
							dblIcon=deskTopData[desktop.pageOn].icos[dblIconId];	
							dblIcon.call();
						}
					}else{//否则就创建图标
						icoDiv.ondblclick =function(){
							dblIconId=this.id.replace("Ico","");
							dblIcon=deskTopData[desktop.pageOn].icos[dblIconId];
							desktop.wind.create(dblIconId,dblIcon.title,dblIcon.img,dblIcon.url,dblIcon.type,dblIcon.width,dblIcon.height);
						}
					}
					impTop=0-onIcon.img*50+50;
 					icoDiv.innerHTML="<div class='IcoImg'  ><div  class=\"IcoImg_img\" id='"+Iid+"pic' style=\"background:url(/desktop/css/ico.png) 0px "+impTop+"px \" ></div></div>"+
									 "<div class='IcoText' id=\""+Iid+"text\"><span>"+onIcon.title+"</span></div>"+
									 "<div class=\"IcoNotice\" id=\""+Iid+"Notice\" style=\""+thisNotice.display+"\" >"+thisNotice.inner+"</div>"+
									 "<div class=\"IcoBg\" id=\""+Iid+"_bg\" ></div>";
					this.IcoIndex[page]=i;//当前桌面最大index
					$("Win_WinIco").appendChild(icoDiv); 
				 	i++;
				}
 				jq("#Win_WinIco").fadeIn(158);
				desktop.saveConfig();//保存桌面数据
 	},
	typeChange:function(){//图标类型转换（自动排序和非）
 		config.autoIco[desktop.pageOn]={use:!config.autoIco[desktop.pageOn].use};
		desktop.refresh_();
 	},
	returnAutoIco:function(){//ico排序方式
			isExists=keyExists(config.autoIco,desktop.pageOn);
			if(!isExists || config.autoIco[desktop.pageOn].use==true){//如果配置桌面的文件不存在或者桌面图标排列为自动排序
				config.autoIco[desktop.pageOn]={use:true};
				return true;
			}else if(config.autoIco[desktop.pageOn].use==false){//
				return false;	
			}  
	},
	//通知
	notice:function(IcoId,shu){
			IcoIdc="Ico"+IcoId+"Notice";
			if($(IcoIdc) && shu){
				shu=shu>99?'99+':shu;
				$(IcoIdc).style.display="";
				$(IcoIdc).innerHTML=shu;		
			}else if($(IcoIdc)){
				$(IcoIdc).innerHTML='';	
				$(IcoIdc).style.display="none";
			}
 			config.IcoStartus[desktop.pageOn][IcoId]['notice']=shu;
			desktop.saveConfig();//保存桌面数据
	},
	//是否存在右上角提示数字
	isHaveNotice:function(cIcoId){
		if(config.IcoStartus[desktop.pageOn][cIcoId].notice){//是否有图标右侧的数字提示
 			return {inner:config.IcoStartus[desktop.pageOn][cIcoId].notice,display:''}
		}else{
			return {inner:'',display:'display:none'}	 
 		}
	},
	//图标拖动排序
	dragMove:function(json){
 		if(this.returnAutoIco()==true){//如果为拖动图标
 			this.disMoveIco(json.e,json.obj);
 		}
 	},
	//图标拖动结束
	dragOver:function(json){
 		if(this.returnAutoIco()==true){//图标拖动结束,如果为自动排列图标
			this.changeIcoPlace(json.e,json.obj);
		}else {//否则记录图标位置
			this.savePosition(json.obj);
		}
	},
	savePosition:function(objId){//记录图标位置(用于非自动排序的情况下使用)
		IcoKey=objId.replace("Ico","");
		if(!config.IcoStartus[desktop.pageOn][IcoKey]){
			config.IcoStartus[desktop.pageOn][IcoKey]={}	
		}
		config.IcoStartus[desktop.pageOn][IcoKey]['left']=$(objId).style.left.replace("px","");
		config.IcoStartus[desktop.pageOn][IcoKey]['top'] =$(objId).style.top.replace("px","");
	},
	disMoveIco:function(e,ObjId){
 		X=e.clientX;
		Y=e.clientY;
		isInIco=false;
		var eva=new Array();//要返回的数据
		var DeskIco=new Array();
		var i=0;b=DeskIco.length;
		DeskIco=config.IcoStartus[desktop.pageOn];
		for(IcoKey in DeskIco){
			 i++;
			 IcoId="Ico"+IcoKey;
			 L1=DeskIco[IcoKey].left;
			 T1=DeskIco[IcoKey].top;
			 L2=L1+100;
			 T2=T1+100;
			 if((X>L1 && X<L2 && Y>T1 && Y<T2 ) || (b==i && ( X>L2 || (X>L1 && Y>T2))) ){
					 if(IcoId==ObjId)break;
					 if(Y>T1 && Y<T1+40 ){//前
						 $('Win_WinIcoTis').style.left=L1-10+"px";
						 $('Win_WinIcoTis').style.top=T1-10+"px";
						 eva['lei']="up";
					 } 
					 if(Y<T2 && Y>T1+40 || b==i){//后
						 $('Win_WinIcoTis').style.left=L1-10+"px";
						 $('Win_WinIcoTis').style.top=T2+5+"px";
						 eva['lei']="down";
					 } 
					 eva['OnIco']=IcoId;
					 isInIco=true;
					 break;
				 } 
		}
		isInIco?display="block":display="none";
		dis('Win_WinIcoTis',display); 	
		return eva;
	},
	//改变图标位置
	changeIcoPlace:function (e,ObjId){
		X=e.clientX;
		Y=e.clientY;
		icolists="";
		var i=0;
		var icoArr1=new Array();
		var icoArr2=new Array();
		for(IcoId in config.IcoStartus[desktop.pageOn]){
			icolists+=IcoId+"|";
			icoArr1[i]=config.IcoStartus[desktop.pageOn][IcoId];
			i++;
		}
		eva=this.disMoveIco(e,ObjId);
		if(keyExists(eva,"OnIco")){
			onIcoid=eva['OnIco'].replace("Ico","");
			IcoKey=ObjId.replace("Ico","");
			if(eva['lei']=="up"){
				icolists=icolists.replace(IcoKey+"|","").replace(onIcoid+"|",IcoKey+"|"+onIcoid+"|");
			}else{
				icolists=icolists.replace(IcoKey+"|","").replace(onIcoid+"|",onIcoid+"|"+IcoKey+"|");
			}
		}
		//$('sdf').value+="当前："+ObjId+"?拖动到："+onIcoid+"?"+icolists+"\n\r";
  		icoArr2=icolists.split("|");
		IcoLeng=icoArr2.length;
		icoArr3=config.IcoStartus[desktop.pageOn];
 		config.IcoStartus[desktop.pageOn]={}
		for(i=0;i<IcoLeng-1;i++){
			icoId="Ico"+icoArr2[i];
			icoOn=icoArr1[i];
			jq("#"+icoId).animate({left:icoOn.left,top:icoOn.top},f(200));	
			if(icoArr3[icoArr2[i]].notice){
				notice=icoArr3[icoArr2[i]].notice;
			}else{
				notice="";	
			}
			config.IcoStartus[desktop.pageOn][icoArr2[i]]={
				left:icoArr1[i]['left'],
				top:icoArr1[i]['top'],
				notice:notice
			};
 		}
 	},
	//图标事件
	OnIco:function(OnId,OnType){
		switch (OnType){
			case "on":
				if(OnId==this.OnIco_Id)return;
				C(OnId,"IcoOn");
			break;
			case "out":
				if(OnId==this.OnIco_Id)return;
				C(OnId,"Ico");
			break;
			case "up":
				if(OnId==this.OnIco_Id)return;
				C(OnId,"IcoOn");
				C(OnId+"text",'IcoText');
			break;
			case "down":
				this.hiddenLongText();//隐藏展开的文本很多的图标
				if($(this.OnIco_Id))C(this.OnIco_Id,"Ico");
				this.OnIco_Id=OnId;			 
				this.IcoIndex[desktop.pageOn]++;
				$(OnId).style.zIndex=this.IcoIndex[desktop.pageOn];
				C(OnId+"text",'IcoTextOn');
				C(OnId,"IcoOn");
			break;
			}
	},
	//隐藏图标多余文字
	hiddenLongText:function(){
		icoList=deskTopData[desktop.pageOn].icos;
		for(key in icoList){
			C("Ico"+key+"text",'IcoText');
		}
	},
	iconOnAsk:function(){
		Wid=desktop.returnDocId();
		if(Wid=="Win_WinIco" && $(desktop.icon.OnIco_Id)){
			C(desktop.icon.OnIco_Id,"Ico");
			desktop.icon.OnIco_Id=null;
		}
	}
	
 }
/*-------------------------------------分割线-------------------------------------*/
/**
 *窗体
 */
var WINDOW={ 
	windTopBar		:30,	//窗体顶框高度
	windLeftBar		:5,		//窗体左框
 	topIndex		:1,		//窗体的最高Index
	topIndexId		:new Array(),	//置顶窗口的name
 	//c创建窗体
	create:function(Aid,Atitle,Aimg,Aurl,Abut,Aw,Ah,callback){// 注：Abut 0.不可最大化 1，可以最大化，2打开就最大化
 		//页面内框大小
  		Surl="";//用于laodiframe用的
		var Wid="New"+Aid;
		if($(Wid)){//如果窗体已创建
			if(dis(Wid)=="none"){//窗体是隐藏的
				this.dischange(Wid);
			}else{
				this.topOn(Wid);
			}
			return;
		}
 		this.isHaveConfigInWin(Wid);//是否有窗体坐标数据
		config.winStatus[Wid]['Abut']=Abut;
		config.winOpens[Wid]['Aid']=Aid;//{Aid:Aid,Atitle:Atitle,Aimg:Aimg,Aurl:Aurl,Abut:Abut,Aw:Aw,Ah:Ah};
		config.winOpens[Wid]['Atitle']=Atitle;
		config.winOpens[Wid]['Aimg']=Aimg;
		config.winOpens[Wid]['Aurl']=Aurl;
		config.winOpens[Wid]['Abut']=Abut;
		config.winOpens[Wid]['Aw']=Aw;
		config.winOpens[Wid]['Ah']=Ah;
    	var Acon="";
		Acon="<IFRAME style='width:100%;height:100%;display:none;' id=\""+Wid+"iframe\"  name=\""+Wid+"iframe\"  frameBorder=0 ></IFRAME>";
		Acon+="<div class=\"loaddiv\" style='width:100%;height:100%;position:absolute; background:url(desktop/css/loading2.gif) no-repeat; background-position:center;'  id=\""+Wid+"dis\"></div>";//页面加载窗口
 		var oDiv=document.createElement("div");
		oDiv.id=Wid;
		oDiv.className="WinCss";
		oDiv.style.display="none";
		Fw=desktop.frameSize(100,"width");//框架宽
		Fh=desktop.frameSize(100,"height");//框架高
  		oDiv.style.zIndex=this.topIndex;
 		//关闭按钮
		var CloseBut="<div id='"+Wid+"C3' style='width:26px' onmouseover=\"S(this.id,17)\" onmouseout=\"S(this.id,0)\"   ";
			CloseBut+="onclick=\"S(this.id,17);desktop.wind.unload('"+Wid+"')\"><img src='desktop/css/b.gif' style='margin-left:-51px'></div>";
			
		if(Abut=="yes" || Abut=="big" ){//如果有最大化按钮
 			var DblClick="ondblclick=\"desktop.wind.toBig('"+Wid+"')\""
			CloseBut+="<div id='"+Wid+"C2' style='width:26px' onmouseover=\"S(this.id,17)\" onmouseout=\"S(this.id,0)\"  ";
			CloseBut+="onclick=\"S(this.id,17);desktop.wind.toBig('"+Wid+"')\"><img src='desktop/css/b.gif' style='margin-left:-25px'></div>";
		}else{
			DblClick=" ";//没有双击事件
		}
		//最小化按钮
		CloseBut+="<div id='"+Wid+"C1' style='width:25px' onmouseover=\"S(this.id,17)\" onmouseout=\"S(this.id,0)\" ";
		CloseBut+="onclick=\"S(this.id,0);desktop.wind.dischange('"+Wid+"','small')\"><img src='desktop/css/b.gif'></div>";
		dragFunction="desktop.drag.start('"+Wid+"',event,function(json){desktop.wind.dragMove(json);},function(json){desktop.wind.dragOver(json);},true)";//用于拖动的事件
 		var Html="<table class='WinTab' cellpadding='0' cellspacing='0' border='0'>"+
					 "<tr>"+
						"<td class='Win1'></td>"+
						"<td class='Win2'><div class=\"Win2s\" id='"+Wid+"Cs'>"+Atitle+"</div></td>"+
						"<td class='Win3'></td>"+
					"</tr>"+
					 "<tr>"+
						 "<td class='Win4'></td>"+
						 "<td class='Win5'>"+
							 "<div id='"+Wid+"_Con' class='WinCon' style='width:"+Fw+"px;height:"+Fh+"px'>"+Acon+"</div>"+
						 "</td>"+
						 "<td class='Win6'></td>"+
					 "</tr>"+
					 "<tr>"+
						 "<td class='Win7'></td>"+
						 "<td class='Win8'>&nbsp;</td>"+
						 "<td class='Win9'></td>"+
					 "</tr>"+
					 "</table>"+
					 "<div class='WinClose' id='"+Wid+"_Close'>"+CloseBut+"</div>"+//Move(event,'"+Wid+"',0)
					 "<div id='"+Wid+"_Move' class='WinMove' "+DblClick+" onmousedown=\"desktop.wind.topOn('"+Wid+"');"+dragFunction+";\"  \"></div>"+
					 "<div class='WinIframe'><iframe style='width:100%;height:100%' src='about:blank' frameBorder=0 scrolling=no></iframe></div>"+
					 "<div style=\"width:1px;height:1px;position:absolute;z-index:100;left:0px;top:0px\"></div>";
		if(Abut=="yes" || Abut=="big"){//如果允许变化窗体
 			Html+="<div class=\"WinResize\"  onmousedown=\"desktop.drag.start('"+Wid+"',event,function(json){desktop.wind.resizeMove(json);},function(json){desktop.wind.resizeOver(json);},false)\"></div>";
		}
		oDiv.innerHTML=Html;
		$("Win_WinPage").appendChild(oDiv);
		this.topOn(Wid);	
		//任务栏图标
		var oDiv2=document.createElement("div");
		var WidF=Wid+"_Foot";
		oDiv2.id=WidF
		oDiv2.className="WinCss_Foot";
		oDiv2.innerHTML="<div id='"+WidF+"Menu' class='WinCss_Fno'   onclick=\"C('"+WidF+"Menu','WinCss_Fdown'); desktop.wind.dischange('"+Wid+"');desktop.wind.seeFoot('"+Wid+"')\" >"+
						"<img src="+Aimg+" id='"+WidF+"pic' onerror=\"this.src='desktop/css/empty.png'\" /><span class=\" WinCss_Foot_tit\">"+Atitle+"</span><div id='"+WidF+"Bar' class=\"WinCss_Fbg\" ></div></div>"+
						"";
		$("Win_WinList").appendChild(oDiv2);
		desktop.wind.seeFoot(Wid);
		ChangeWList("");
 		this.loading(Wid,Aw,Ah,Aurl,Abut,callback);//加载动画
	},
	//保存图标位置数据
	savePosition:function(Wid,left,atop,width,height){
		this.isHaveConfigInWin(Wid);
 		if(config.winStatus[Wid].resize=="big")return;
 		if(Wid.indexOf("New")!=0)return;
 		if(!left && !atop && !width && !height){
				left	=$(Wid).style.left.replace("px","");
				atop	=$(Wid).style.top.replace("px","");
				width	=$(Wid).style.width.replace("px","");
				height	=$(Wid).style.height.replace("px","");
			}
 		config.winStatus[Wid]['left']  =left;
		config.winStatus[Wid]['top']   =atop;
		config.winStatus[Wid]['width'] =width;
		config.winStatus[Wid]['height']=height;
	},
	isHaveConfigInWin:function(Wid){
		if(!config.winStatus[Wid]){
			config.winStatus[Wid]=new Array();
		}
		if(!config.winOpens[Wid]){
			config.winOpens[Wid]={}	
		}
 	},
	//加载窗口
	loading:function(Wid,w,h,aurl,Abut,callback){
		 	 this.isHaveConfigInWin(Wid);
			 thisWidData=config.winStatus[Wid];
			 var l=(desktop.width-w-10)/2;
			 var t=(desktop.height-h-64)/2+10;
			 if(thisWidData.width && thisWidData.height ){
					w=thisWidData.width;
					h=thisWidData.height;
					l=thisWidData.left;
					t=thisWidData.top;
 			 }
 			//如果窗体是可以最大化的
			this.savePosition(Wid,l,t,w,h);//保存窗口坐标
 			if( thisWidData.resize!="notBig" && (Abut=="big" || thisWidData.resize=="big")){
 				config.winStatus[Wid]['resize']="big";
				w=desktop.width;
				h=(desktop.height-desktop.footBar-desktop.smallTop)*1;
				l=0;
				t=desktop.smallTop;
				$(Wid+"C2").scrollLeft=94;//最大化的情况
				Abut="big";
			}else{
				config.winStatus[Wid]['resize']="notBig";
			}
			this.resize(Wid,{width:w,height:h,left:l,top:t},0,function(){
				jq("#"+Wid).fadeIn(f(200));
				if(Abut!="big")desktop.wind.savePosition(Wid);//如果不是最大化就保存图标位置
					$(Wid+"iframe").src=aurl;
					iframe=document.getElementById(Wid+"iframe");
					if(iframe.attachEvent) { //for IE   
						iframe.attachEvent("onload", function(){jq("#"+Wid+"dis").fadeOut(f(0),function(){jq("#"+Wid+"iframe").fadeIn(f(200));});});  
					} else {  //other brower      
						iframe.onload = function(){jq("#"+Wid+"dis").fadeOut(f(0),function(){jq("#"+Wid+"iframe").fadeIn(f(200));});};   
					}  
			});
			if(callback){callback({Aid:Wid})};//执行窗体加载完的回调函数
			desktop.saveConfig();//保存桌面数据
 	},
	//变化窗体
	resize:function(Wid,_json,time,callBack){
 			Fw=desktop.frameSize(_json.width,"width"); 
			Fh=desktop.frameSize(_json.height,"height");
			jq("#"+Wid+"_Con").stop().animate({height:Fh,width:Fw},f(time));
			jq('#'+Wid).stop().animate(_json,f(time),function(){if(callBack)callBack();});
	},
	//卸载（关闭）窗体
	unload:function(Wid){
			if(!$(Wid))return;
			this.isHaveConfigInWin(Wid);
			atop=config.winStatus[Wid]['top'];
 			if(config.winStatus[Wid]['resize']!="big"){//没有最大化可以让其先网上移动30像素
 				jsons={opacity:0}//top:atop-30,
			}else{
				jsons={opacity:0}
			}			
			$("Win_WinList").removeChild($(Wid+"_Foot"));
			ChangeWList("");
			jq("#"+Wid).stop().animate(jsons,f(200),function(){$("Win_WinPage").removeChild($(Wid));});
 			this.topOn(Wid,'del');
			delete config.winOpens[Wid];//删除数据里面已经打开的窗体
			desktop.saveConfig();//保存桌面数据
 	},
	//最大化
	toBig:function(Wid){
		if(!$(Wid))return;
		place=config.winStatus[Wid];
		resize=keyExists(config.winStatus[Wid],'resize');
		if(resize!="big"){
			$(Wid+"C2").scrollLeft=94;
			config.winStatus[Wid]['resize']="big";
			this.resize(Wid,{width:desktop.width,height:(desktop.height-desktop.smallTop-desktop.footBar),left:0,top:desktop.smallTop,opacity:1},300);
 		}else{
			$(Wid+"C2").scrollLeft=0;
 			config.winStatus[Wid]['resize']="notBig";
			this.resize(Wid,{width:place['width'],height:place['height'],left:place['left'],top:place['top'],opacity:1},300);
		}//end else if	
		desktop.saveConfig();//保存桌面数据
	},
	//最小化与显示
	dischange:function(Wid,lei){
		if(!$(Wid))return;
 		Ftid=Wid+"_Foot";
		Gbme=Wid+"_Close";
		config.winOpens[Wid]['display']=dis(Wid)=="none"?"":"none";
		if(Wid!=this.topOn() && dis(Wid)!="none" && lei!="small"){//如果没有置顶且没有隐藏
 				this.topOn(Wid);//指定
				dis(Wid,"");	//显示
 		 }else if((Wid==this.topOn() && dis(Wid)!="none") || lei=="small"){//如果置顶且没有隐藏
 				 //dis(Wid,"none");	//隐藏
 				 dis(Gbme,'none');
				 ml=$(Ftid).offsetLeft+desktop.ksMenuWidth;
				 mt=desktop.height-39;
				 jq('#'+Wid).animate({opacity:0.5},0)/**/
				 this.resize(Wid,{width:120,height:40,left:ml,top:mt,opacity:0},300,function(){dis(Wid,'none')});
  			  /**/
			   //WinTopOn(Wid,'del');
 			  // jq('#'+Wid).stop().fadeOut(f(200));
 		 }else if(dis(Wid)=="none" ){//如果隐藏	 
 			    this.topOn(Wid);			   
			    dis(Gbme,"block");			    
			    dis(Wid,"block");	//显示
 			    var place=config.winStatus[Wid];
				if(place['resize']=='big'){
					 this.resize(Wid,{width:desktop.width,height:(desktop.height-desktop.smallTop-desktop.footBar),left:0,top:desktop.smallTop,opacity:0.3},300,function(){
 						jq('#'+Wid).animate({opacity:1},0)/**/
					});
				}else{
					this.resize(Wid,{width:place['width'],height:place['height'],left:place['left'],top:place['top'],opacity:0.3},300,function(){
						jq('#'+Wid).animate({opacity:1},300)/**/
					});
				}
 			   //jq('#'+Wid).fadeIn(f(200));
 		}
 		desktop.saveConfig();//保存桌面数据
 	},
	isBigToUnload:null,//用于当窗口最大直接拖动关闭状态记录
  	//移动窗口
	dragMove:function(json){
			canBig=config.winStatus[json.obj].Abut;
			resize=config.winStatus[json.obj].resize;
 			if(json.bX>desktop.width-30  ){//窗体拖动到桌面右侧，提示关闭窗口
				mouseTis("关闭窗口");
 			}else  if(json.bY<desktop.smallTop  && (canBig=="yes" || canBig=="big") ){//窗体拖动到桌面顶部，如果允许变化大小，则提示最大化
				 mouseTis("最大化窗口" );
			}else if(json.bX<30   ){//窗体拖动到桌面左侧，提示最小化
				mouseTis("最小化窗口");
			}else{
				mouseTis("none");	
			} 
			if(resize=="big"){//如果窗体是最大化的，则拖动时，还原原来窗体的位置
 				W=parseInt(config.winStatus[json.obj].width);
				H=parseInt(config.winStatus[json.obj].height);
 				half=(desktop.drag.startX-W/2)*1;
				ralf=half+W;
				if(half>0 && ralf<desktop.width){//
					desktop.drag.origX  =half;//拖动开始，元素的左距
					desktop.drag.deltaX =(desktop.drag.startX-half)*1
					origX=half;
				}else if(half>0 && ralf >desktop.width){
					half=desktop.width-W;
					desktop.drag.origX  =half;//拖动开始，元素的左距
					desktop.drag.deltaX =(desktop.drag.startX-half)*1
					origX=half;
				}else{
					origX=json.origX;	
				}
				config.winStatus[json.obj].resize="notBig";
  				desktop.wind.resize(json.obj,{width:W,height:H,left:json.origX,top:json.origY},0);
				this.isBigToUnload=true;
			}
 	},
	//窗口拖动结束
	dragOver:function(json){ 
		canBig=config.winStatus[json.obj].Abut;
		resize=config.winStatus[json.obj].resize;
 		if(json.bX>desktop.width-20){//窗体拖动到桌面右侧，关闭窗口
 			desktop.wind.unload(json.obj);
			if(this.isBigToUnload==true){//如果该窗口是从最大拖动到关闭的，则还原之前的最大化状态
				config.winStatus[json.obj].resize="big";
			}
 		}else if(json.bY<desktop.smallTop  && (canBig=="yes" || canBig=="big") ){//窗体拖动到桌面顶部，如果允许变化大小，则最大化
 			desktop.wind.toBig(json.obj);
		}else if(json.bX<20){
 			desktop.wind.dischange(json.obj,"small");//窗体拖动到桌面左侧，最小化
 		}else{
			desktop.wind.savePosition(json.obj);//保存位置	
		} 
		this.isBigToUnload=null;
		//objWidth=$(json.obj).style.width.replace("px","")*1;
 
	},
	//改变窗体大小开始
	resizeMove:function(json){
			canBig=config.winStatus[json.obj].Abut;
			resize=config.winStatus[json.obj].resize;
 		if(resize!="big" && (canBig=="yes"  || canBig=="big") ){//窗口没有在最大化且可以改变大小
   			W=bX-parseInt(json.origX);
			H=bY-parseInt(json.origY);
			if(W>desktop.width)W=desktop.width;//不能超过浏览器宽度
			if(H>desktop.height-desktop.smallFoot)H=desktop.height-desktop.smallFoot;//不能超过浏览器高度
			if(W<200)W=200;//不能太窄
			if(H<100)H=100;//不能太短
 			desktop.wind.resize(json.obj,{width:W,height:H,left:json.origX,top:json.origY},0);
		}
	},
	//改变窗体大小结束
	resizeOver:function(json){
			desktop.wind.savePosition(json.obj);//保存位置	
	},
	//底部任务栏
	seeFoot:function(Wid){
		if(!$(Wid))return;
		for(Fid in config.winStatus){  
			Fid=Fid+"_FootMenu";
			C(Fid,'WinCss_Fno');
		}
		C(Wid+"_FootMenu",'WinCss_Fdown');
	},
	//所有最小化
	smallAll:function(){
		for(Wid in config.winOpens){
			//jq("#"+Wid).stop().fadeOut(258);
			 this.dischange(Wid,"small");
		}
	},
	//关闭所有
	unloadAll:function(){
		for(Wid in config.winOpens){
			this.unload(Wid);
		}
	},
	//置顶
	topOn:function(Wid,del){
		this.topIndex++;
		if(Wid && desktop.loadStartus==true){//如果页面加载完毕
			config.winOpens[Wid]['zIndex']=this.topIndex;	
		}
   		if(!Wid && !del && del!='del'){//如果什么都没有输入，返回当前置顶的窗体
 			  alen=this.topIndexId.length;
			  if(alen){
 					return this.topIndexId[alen-1];
				}
		}else if(Wid && !del){
			 if(keyExists(this.topIndexId,Wid)){
				   this.topIndexId.pop(Wid);//删除
			 }
			 $(Wid).style.zIndex=this.topIndex;
			 this.topIndexId.push(Wid); //添加
		}else if(Wid && del=='del'){
			 this.topIndexId.pop(Wid);//删除
		} 
		
 	}
}
/*-------------------------------------分割线-------------------------------------*/
//顶部导航条
var TOPBAR={
	//桌面数组
	deskTopBar:deskTopData,
	topBarlength:1,
	//创建导航栏
	create:function(pageOn){
		var spanInner="";
		this.topBarlength=1;
		for(k in this.deskTopBar){
 			classname=this.topBarlength==pageOn?"headon":"headno";
			spanInner+='<span onclick="desktop.topbar.on('+k+')" id="toolbar'+k+'"  class="'+classname+'">'+deskTopData[k].deskName+'</span>';
			this.topBarlength++;
		}
		$('Win_TopBar').innerHTML=' <div id="Win_TopBarLogo"></div>'+spanInner;
 	},
	/**
	 *导航栏按下事件
	 *deskId 桌面编号
	 */
	on:function(deskId){
  		stayHere('toolbar',this.topBarlength-1,'headon','headno',deskId);
		desktop.icon.create(deskId);
		desktop.pageOn=deskId;
		config.pageOn=deskId;//保存当前位于哪个桌面
		desktop.saveConfig();//保存桌面数据
		desktop.wind.smallAll();
 	 } 
	
}
/*-------------------------------------分割线-------------------------------------*/
/**
 *桌面相关
 */
var desktop={
		width		:0,//浏览器宽度
		height		:0,//浏览器高度
		smallTop	:35,//最小拖动顶部
		smallFoot	:80,//最大拖动底部
		footBar		:40,//任物栏高度
		ksMenuWidth	:60,//开始按钮宽度
		frameWidth	:5+5,//窗体边框宽
		frameHeight	:5+30,//窗体边框高
 		pageOn		:null,//当前桌面id
 		topbar		:TOPBAR,//导航条
		icon		:ICON,//图标
 		wind		:WINDOW,//窗体
		drag		:DRAG,//拖动
 		timeSaveConf:null,
		lockStarus	:false,//锁屏状态
		loadStartus :false,//fasle加载中，true加载完毕
		password	:win_ini.lockPassword,//锁屏密码
		lockOutTime	:win_ini.lockOutTime,//超时锁屏时间，单位:秒   
		lockTime	:0,//超时记录数据			 
 		start		:function(callBack){//系统开启
  			desktop.resize_();//保存窗口大小数据
			desktop.footMenuWidth();   
			 desktop.loadConfigSon();	
			callBack();//加载后执行的回调函数
			desktop.locking();
  		},
		//变化窗体大小
		resize_:function(){
			desktop.width=document.documentElement.clientWidth;
			desktop.height=document.documentElement.clientHeight;
		},
		//刷新
		refresh_:function(){
			desktop.resize_();
			desktop.icon.create(desktop.pageOn,"ref");
		},
		saveConfig:function(){//保存桌面参数
			return;
			if(desktop.loadStartus==false)return;//没有加载完毕，则不保存数据
  			configData=unicode(json_encode(config));//转换为unicode编码，避免出现汉字时出错
			if(win_ini.saveType=="auto"){//如果为当改动的时候改动
				ajks({url:win_ini.saveUrl,ready:win_ini.saveCall,value:'configData='+configData});	
			}else if(typeof(win_ini.saveType)=="number"){//如果为定时保存
				if(this.timeSaveConf){clearInterval(this.timeSaveConf);}//清除
				this.timeSaveConf=setInterval(function(){
					ajks({url:win_ini.saveUrl,ready:win_ini.saveCall,value:'configData='+configData});	
				},win_ini.saveType*1000);
			} 
		},
		//系统加载完毕
		loading:function(){
			setTimeout(function(){
				jq("#loadingGif").stop().fadeOut(300);
				jq("#Win_Loading").stop().fadeOut(300);
 			},500);
		},
		background:function(img,lei){
				if(lei=="拉伸"){
					$('Win_WinBgls').src=img;
					$('Win_WinBgls').style.display='';
				}
				if(lei=="平铺"){
					$('Win_WinBg').style.backgroundImage="url("+img+")";
 					$('Win_WinBgls').style.display='none';
				}
				config.background.image=img;
				config.background.type=lei;
				desktop.saveConfig();//保存桌面数据
		},
		//鼠标右键
		rightKey:function(e,json,menuJson){
 			if(desktop.lockStarus==true || dis("Win_Msg")!='none' || win_ini.rightKey==false)return false;//锁屏，屏蔽右键
			if(json){
				Wid="";
				WinId=json.Wid; 
				if(config.winStatus[WinId].resize=="big"){
					LL=0;TT=desktop.smallTop;
				}else{
					LL=config.winStatus[WinId].left;
					TT=config.winStatus[WinId].top;
				}
				XX=LL*1+json.XX*1+desktop.wind.windLeftBar;
				YY=TT*1+json.YY*1+desktop.wind.windTopBar;
			}else{
				var event=e||window.event;
				Wid=this.returnDocId(e);
				if(IsIE()){
						var YY=event.clientY;
						var XX=event.clientX;
					}else{
						var YY=e.clientY;
						var XX=e.clientX;
				}
			}
			if(YY<this.smallTop)return false;
			//jq("#Win_Rmenu").fadeIn(200);
			dis('Win_Rmenu','block');
			var RHtml="";
			if(Wid.indexOf("_FootBar")!="-1"|| Wid.indexOf("_Move")!="-1"){//如果鼠标位于窗体上，或者任务栏
				Wid=Wid.split("_")[0];
				if(dis(Wid)=="none"){
						RHtml+="<li onclick=\"desktop.wind.dischange('"+Wid+"');\"><b></b><a>还原</a></li>";
					}else{
						RHtml+="<li onclick=\"desktop.wind.dischange('"+Wid+"');\"><b></b><a>最小化</a></li>";
 					}
						RHtml+="<li onclick=\"desktop.wind.unload('"+Wid+"');\"><b></b><a>关闭窗口</a></li>";
					    $("Win_Rmenu").innerHTML=RHtml;
			}else{//自定义右键
					rightMenuData=menuJson?menuJson:rightMenu.desk;
					for(key in rightMenuData){
						if(rightMenuData[key].use && typeof(rightMenuData[key].use)=="function" && rightMenuData[key].use()==true){
							RHtml+="<li id=\"rightMenu"+key+"\" ><b>o</b><a>"+rightMenuData[key].name+"</a></li>";
						}else{
							RHtml+="<li id=\"rightMenu"+key+"\" ><b></b><a>"+rightMenuData[key].name+"</a></li>";
						}
 					}
					$("Win_Rmenu").innerHTML=RHtml;
					for(key in rightMenuData){
						if(rightMenuData[key].call && typeof(rightMenuData[key].call)=="function" ){ 
							$("rightMenu"+key).onclick=rightMenuData[key].call;
						}
 					}
			}
 			var H=this.width-150;
			var H2=this.height-$("Win_Rmenu").scrollHeight-2;
			if(XX>H)XX=H;
			if(YY>H2)YY=H2;
			$("Win_Rmenu").style.top=YY+"px";
			$("Win_Rmenu").style.left=XX+"px";
			return;
		},
 		//鼠标弹起
		mouseup:function(){
			dis('Win_Rmenu',"none");//隐藏鼠标右键
			dis('Move_bg',"none");//隐藏遮罩
 			dis('Win_tis','none');//动作提示隐藏
			dis('Win_WinIcoTis',"none");//图标拖动位置
			this.lockTime=0;//有鼠标弹起，则自动延长锁屏时间
			desktop.startMenu();
  		},
		startStatus:false,
		//开始菜单
		startList:function(dis){
				if($("Win_KsMenu").style.display=="none" && dis!="dis_none"){
					$("Win_KsMenu").style.display="";
					jq("#Win_KsMenu").stop().animate({height:330,width:330,opacity:1},f(100));
					jq("#Win_KsMenu").animate({height:300,width:300,opacity:1},f(200));
				}else{
					jq("#Win_KsMenu").stop().animate({height:330,width:330,opacity:0.7},f(200));
					jq("#Win_KsMenu").animate({height:5,width:30,opacity:0.3},f(100),"",function(){$("Win_KsMenu").style.display="none";});
				}
		},
		//开始事件
		startMenu:function(){
			Wid=this.returnDocId();
 			if(Wid=="KsMenu"){
				desktop.startList();
			}else{
				desktop.startList('dis_none');
			}
		},
		//窗口页面计算配置
		frameSize:function(input,lei){
				if(lei=="width")
					return (input-this.frameWidth)*1;//宽
				if(lei=="height")
					return (input-this.frameHeight)*1;//高
		},
		mousePlace:function(){
			var YY=event.clientY;
			var XX=event.clientX;
			return {x:XX,y:YY};
		},
		footMenuWidth:function(){
			W=this.width-this.ksMenuWidth-100;
			$("Win_WinFinfo").style.width=W+"px";
			ChangeWList("");	
		},
 		//加载桌面数据
		loadConfigSon:function(){
				//config=data?eval("("+reconvert(data)+")"):config;//转换为json对象
 				desktop.topbar.create(config.pageOn);//创建顶部导航栏
				desktop.icon.create(config.pageOn);//创建桌面图标
 				//desktop.wind.unloadAll();//关闭所有窗口
  				desktop.background(config.background.image,config.background.type);//更新背景
				if(config.AbnormalWind==true){//如果设置开启上次自动关闭窗口
					for(akey in config.winOpens){//恢复没有关闭的窗口
						opens=config.winOpens[akey];
						desktop.wind.create(opens.Aid,opens.Atitle,opens.Aimg,opens.Aurl,opens.Abut,opens.Aw,opens.Ah,function(json){
							 if(config.winOpens[json.Aid].display=="none"){
								 desktop.wind.dischange(json.Aid,"small");
							}
							thisIndex=config.winOpens[json.Aid]['zIndex'];
							$(json.Aid).style.zIndex=thisIndex;
							if(desktop.wind.topIndex<thisIndex){
								desktop.wind.topIndex=thisIndex;
							}
							 //alert(json_encode(desktop.oldWinOpens[json.Aid])+json_encode(config.winOpens[json.Aid]));
						});
					}
				}else{//否则将开启的置空，不保存
					config.winOpens={};	
				}
  				desktop.loadStartus=true;//页面加载完成
    		},
		//锁屏
		locked:function(){
			$('lockInputLi1').innerHTML='<img src="desktop/img/head.png" style="width:60px;height:60px;" />';
 			$('passwordInput').onkeydown=function(){
 				if (event.keyCode == 13){$('enterMenu').click();}
			}
			jq("#Win_lock").animate({top:(0-desktop.height)},0,function(){
				jq("#Win_lock").css({display:'block'});
				jq("#Win_lock").animate({top:0},300);
 				desktop.lockStarus=true;
			});
		},
		//解锁
		openLock:function(password,yesCallback){
 			if(password==this.password){
				jq("#Win_lock").animate({top:(0-desktop.height)},500);
				desktop.lockStarus=false;
				yesCallback();
				this.lockTime=0;//初始化开始时间
				this.locking();
			}else{
				createNotice("密码错误",2);
			}
		},
		//自动锁屏
		locking:function(){
			if(!win_ini.lockOutTime)return;//如果没有设置自动保存时间，则返回
			if(this.lockTime<this.lockOutTime){//如果达到超时时间，则锁屏
				setTimeout(function(){desktop.locking()},1000);
			}else{
				this.locked();
			}
			this.lockTime++;
		},
		//创建对话窗口
		/*
		 Emsg.消息内容
		 width：消息框宽
		 height:消息框高
		 type：gou|cha|tan|wen|iframe的时Emsg为url路径
		 yesCallback:回调函数
		 lei:true显示取消按钮|false不显示取消按钮
		*/
		msgBox:function(Emsg,width,height,type,yesCallBack,lei){//要取消
 			aleft=(desktop.width-width)/2;  
			atop =(desktop.height-height)/2;
			var Ehtml="";
			height=height<130?130:height;
			jq('#Win_MsgDiv').stop().animate({width:width,height:height,left:aleft,top:atop},0);
			if(type!="gou" && type!="wen" && type!="tan"  && type!="cha" && type!="iframe" )type="tan";
 			Ehtml+="<div id=\"Win_MsgTit\"   ><a id=\"WinMsgCloseMenu\" style=\"float:right;margin-right:8px;font-size:20px\">×</a></div>";
			if(type=="iframe"){//如果类型是iframe
				Ehtml+="<iframe id=\"Win_MsgTab\"  style=\"border:0px;width:"+(width-10)+"px;height:"+(height-35)+"px;\" frameBorder=0 src=\""+Emsg+"\"  ></iframe>";
				$("Win_MsgDiv").innerHTML=Ehtml;
			}else{//否则为消息提示类型
				var Menu="<input class=\"Win_MsgDivBut\" type=\"button\" value=\"确定\"  id=\"yesButton\" />";
				if( lei!=false){
					 Menu+="&nbsp;&nbsp;&nbsp;<input  class=\"Win_MsgDivBut\" type=\"button\" value=\"取消\"   id=\"noButton\"  />"; 				
				}
				Ehtml+="<table id=\"Win_MsgTab\" cellspacing=\"0\" border=0 style=\"width:"+(width-10)+"px;height:"+(height-35)+"px;\"   >"+
 					"<tr  >"+
						"<td width=\"80\" height=\"60\" align=\"center\" valign=\"middle\" >"+
						"<img src=\"desktop/css/"+type+".png\" width=\"40\" height=\"40\" />"+
						"</td>"+
						"<td id=\"Win_MsgText\">"+Emsg+"</td>"+
					"</tr>"+
					"<tr>"+
						"<td id=\"Win_MsgBut\" colspan=\"2\"  >"+Menu+"</td>"+
					"</tr>"+
					"</table>";
				$("Win_MsgDiv").innerHTML=Ehtml;
				if(yesCallBack && typeof(yesCallBack)=="function" ){//如果有确定的回调函数
						$('yesButton').onclick=function(){yesCallBack();jq("#Win_Msg").stop().fadeOut(158)}
				}else{
						$('yesButton').onclick=function(){jq("#Win_Msg").stop().fadeOut(158)}
				}
				if( lei!=false && $('noButton')){//不显示取消按钮
					$('noButton').onclick=function(){jq("#Win_Msg").stop().fadeOut(158)}
				}
			}
			$('WinMsgCloseMenu').onclick=function(){jq("#Win_Msg").stop().fadeOut(158)}
  			jq("#Win_Msg").fadeIn(158);
 		},
 		returnDocId:function(e){
			try{
				var event=e||window.event;
				var ele=e?event.target:event.srcElement;
				return Wid=ele.id;	
			}catch(err){
			}
		}
	
}
var rightMenu={//右键信息
		desk:{//桌面右键
			M1:{name:"自动排列",call:"desktop.icon.typeChange();desktop.icon.create(desktop.pageOn);",use:function(){return desktop.icon.returnAutoIco()}}, //是否选择数据源自config数据
			M2:{name:"刷新",call:"desktop.refresh_();"},			  
			M3:{name:"关闭所有窗口",call:"desktop.msgBox('关闭后不可恢复，确定要关闭所有吗?',350,120,function(){desktop.wind.unloadAll()});",use:false},			 
			M4:{name:"显示桌面",call:"desktop.wind.smallAll();desktop.refresh_();",use:false},	
			M5:{name:"加载未关闭窗口",call:"config.AbnormalWind=!config.AbnormalWind;desktop.saveConfig();",use:function(){return config.AbnormalWind;}},	
			M6:{name:"清除桌面数据",call:"desktop.msgBox('确定重置桌面吗?',250,80,function(){desktop.wind.unloadAll();config=configOld;desktop.refresh_();});",use:false},		
 			M7:{name:"锁屏",call:"desktop.locked();",use:false}
  		},
		wind:{//暂无
 		}
	}