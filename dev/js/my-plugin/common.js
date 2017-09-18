/*
 	目录：
 		数字
 * 		日期
 * 		对象
 * */

//随机颜色


//控制台输出函数
function log(variable){
	console.log(variable);
	//输出内容
}
//页面输出函数
function print(variable){
	document.write(variable);
	//输出内容
}


var Mathmain={
	randomInt:function (min,max){			//随机生成min和max之间的数字
		return Math.round(Math.random()*(max-min))+min;
	},
	
	creatCode:function(len){				//随机验证码的生成
		var arr = [];
		for(var i=0;i<len;i++){
			do{
				var asc = Math.round(Math.random()*74)+48;
			}while(asc>57&&asc<65||asc>90&&asc<97)
			var str = String .fromCharCode(asc);
			arr.push(str);
		}
		return arr;
	},
}

var Datemain = {
	isLeapYear:function (year){				//验证是否为闰年
		if(year%400 == 0||year%4 == 0&&year%100!=0){
			return true;
		}
		return false;
	},
	dateOfMonth:function (month,year){		//判断某个月的天数
		switch(month){
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:return 31;
			case 4:
			case 6:
			case 9:
			case 11:return 30;
			case 2:if(isLeapYear(year)){
				return 29;
			}
			return 28;
		}
	},
	dateToStr:function (date){				//日期转字符串
		return date.getFullYear+"/"+date.getMonth+"/"+date.getDate;
	},
	strToDate:function (str,fuhao){			//日期字符串转成特定符号的字符串
		str = str.replace(/(\d+)\D/g,function(match,sub){
			return sub+fuhao;
		})
		return str;
	},
	countDays:function(d1,d2){				//判断两个日期相差的天数
		if(typeof d1 == "string"){
			d1 = new Date(d1);
		}
		if(typeof d2 == "string"){
			d2 = new Date(d2);	
		}//只需要转换成Date格式，然后通过getTime获取时间差
		return Math.round(Math.abs(d1.getTime()-d2.getTime())/(1000*3600*24));
	},
	dountN:function (n){					//获得N天以后的日期
		var now = new Date();
		now.setDate(now.getDate()+n);
		return now;
	},
	countDown:function (year){				//倒计时效果
		var goal = new Date(year).getTime();
		var now = new Date().getTime();
		var value = goal-now;
		var days = Math.floor(value/(1000*3600*24));
		var hours = Math.floor((value-days*(1000*3600*24))/(1000*3600));
		var mins = Math.floor((value-days*(1000*3600*24)-hours*(1000*3600))/(1000*60));
		print(year+"距离今日有"+days+"天"+hours+"小时"+mins+"分");
	}
}

//对象的操作
var objectOption = {
	merge :function(obj1, obj2 ){			//对象的合并
		var newobj = {};
		for(var attr in obj1){
			if(attr in obj2){
				newobj[attr] = obj2[attr];
			}else{
				newobj[attr] = obj1[attr];
			}
		}
		for(var attr in obj2){
			if(!(obj2[attr] in obj1)){
				newobj[attr] = obj2[attr];
			}
		}
		return newobj;
	},
	
	clone : function(obj){					//对象的克隆
		if((typeof obj) != "object"){return;}
		var newobj = ( obj instanceof Object) ? {}:[];
		for(var attr in obj){
			if( obj[attr] instanceof Object){
				newobj[attr] = clone(obj[attr]);
			}else{
				newobj[attr] = obj[attr];
			}
		}
		return newobj;
	},
}

//敏感词过滤		根据敏感词的个数，输出*的个数
function wordfilter(str){
	var words = ["qaz","ws","edca"];
	for(var i in words){
	
		var reg = new RegExp(words[i],"gi");
		var star = "";
		
		for(var j=0;j<words[i].length;j++){
			star+="*";
		}
		
		str = str.replace(reg,star);						
	}
	return str;
	//当是第一个单词时，判断有几个*，如果这个单词存在字符串中，就用star替换，不存在就继续遍历下个单词
}



/*兼容性问题*/
//判断是否存在getElementsByClassName方法
if(!document.getElementsByClassName){
	document.getElementsByClassName = function(classname){
		var alldom = document.getElementsByTagName("*");
		var temp = [];
		for(var i=0; i<alldom.length; i++){
			var strlist = alldom[i].className.split(" ");
			var result = false;
			for(var k in strlist){
				if(strlist[k] === classname){
					result = true;
					break;
				}
			}
			if(result) {
				temp.push(alldom[i]);
			}
		}
		return temp;
	}
}

//JS设计样式
function getStyle(ele, attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele)[attr];
	}
}

//元素距页面的绝对位置
function offsetPage(obj){
	var _left = obj.offsetLeft;
	var _top = obj.offsetTop;
	while(obj.offsetParent){						//当取到最外层的有定位的父元素后，再外面就是null，条件就会不成立
		_left += obj.offsetParent.offsetLeft;
		_top += obj.offsetParent.offsetTop;
		obj = obj.offsetParent;	
	}
	return {"left":_left,"top":_top};				//返回值为一个对象
}

//toarray 伪数组（对象）转数组		arr = Array.from(likearr);
function toarray(list){
	var temp = [];
	for(var i=0; i<list.length; i++){
		temp.push(list[i]);
	}
	return temp;
}
//ID选择器
function $(str){
	var matcharr = null;
	if(matcharr = str.match(/^[#]([a-zA-Z\_\$][a-zA-Z0-9\_\$]+)$/)){
		return document.getElementById(matcharr[1]);
	}
	if(matcharr = str.match(/^[\.]([a-zA-Z\_\$][a-zA-Z0-9\_\$]+)$/)){
		return Array.from(document.getElementsByClassName(matcharr[1]));
	}
	if(matcharr = str.match(/^[a-zA-Z\_\$][a-zA-Z0-9\_\$]+$/)){
		return Array.from(document.getElementsByTagName(matcharr[0]));
	}
	if(matcharr = str.match( /^([^\.#]+)\[(.+)=(.+)\]/)){
		var matchName = matcharr[1];
		var matchAttr = matcharr[2];
		var matchValue = matcharr[3];
		var list = Array.from(document.getElementsByTagName(matchName));
		var newlist = list.filter(function(item, index){
			return item.getAttribute(matchAttr) == matchValue;
		})
		return newlist;
	}
}

//兼容问题
//根据打开的浏览器(ie/chrome)的不同，选择不同的addEventListener作为响应的事件。
//函数的柯里化
var addEvent = (function() {
	if(window.VBArray) {
		return function(obj, eventname, func) {
			obj.attachEvent("on" + eventname, func);
		}
	} else {
		return function(obj, eventname, func, isCapture) {
			obj.addEventListener(eventname, func, !!isCapture);
		}
	}
})();



//cookie封装
var cookie={			//封装对象
	get:function (name){		//获取cookie
		var str = document.cookie;
		var arr = str.split("; ");//分割 分号+空格
		for(var i=0; i<arr.length; i++){
			var arr2 = arr[i].split("=");
			//var obj = {name:arr2[0],value:arr2[1]]};
			if(arr2[0] == name){
				return arr2[1];
			}
		}
		return null;
	},
	set:function (key,value,expires,path){			//设置cookie
		if((typeof expires == "string")||(typeof expires == "number")){
			expires = Number(expires);
			var d = new Date();
			d.setDate(d.getDate()+expires);
			expires = d;
		}
		document.cookie = key+"="+value+";"+(expires?"expires="+expires+";":"")+(path?"path="+path+";":"");
	}//expires 日期

}

//获取非行内样式的兼容
function getStyle(ele, attr) {
	if(ele.currentStyle) {
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele)[attr];
	}
}

//对象的克隆
function clone(obj){
	if((typeof obj) != "object"){return;}
	var newobj = ( obj instanceof Object) ? {}:[];
	for(var attr in obj){
		if( obj[attr] instanceof Object){
			newobj[attr] = clone(obj[attr]);
		}else{
			newobj[attr] = obj[attr];
		}
	}
	return newobj;
}

//运动
var animate = {
	huanChong: function(ele,target,time){					//缓冲运动
		var _ele = {};
		
		clearInterval(ele.si);
		for(var attr in target){
			if(attr == "opacity"){
				_ele[attr] = parseInt(getStyle(ele,attr))*100;
			}else{
				_ele[attr] = parseInt(getStyle(ele,attr));
			}
		}
		var x=0;
		var si = setInterval(function(){
			for(var attr in target){
				if(attr == "opacity"){
					ele.style[attr] = (_ele[attr] + Math.sin(x*Math.PI/180)*(target[attr] - _ele[attr]))/100;
				}else{
					ele.style[attr] = _ele[attr] + Math.sin(x*Math.PI/180)*(target[attr] - _ele[attr])+"px";
				}
			}
			
			x++;
			if(x>90){
				clearInterval(si);
			}
		},time/90);
		
	}
}
//随机颜色
var randomColor = function(){
	return "rgb("+Mathmain.randomInt(0,255)+","+Mathmain.randomInt(0,255)+","+Mathmain.randomInt(0,255)+")";
}





