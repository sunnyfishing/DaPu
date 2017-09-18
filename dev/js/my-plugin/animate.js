var animate = {

	//animate.huanChong(ele,{top:100,left:100,height:0,opacity:70},1000)	//ele是目标元素,target是一个对象用来存放目标状态，time一般取1000
							//1.没有单位，2.透明度*100,3.分号隔开
	huanChong: function(ele,target,time){					//缓冲运动
		var _ele = {};
		
		clearInterval(ele.si);
		for(var attr in target){
			if(attr == "opacity"){
				_ele[attr] = getStyle(ele,attr)*100;				//这里不应该有parseInt();
			}else{
				_ele[attr] = parseInt(getStyle(ele,attr));			//当提示getstyle未定义时，就是没有引入common文件或该文件下没加getstyle函数
			}
		}
		var x=0;
		var si = setInterval(function(){
			for(var attr in target){
				if(attr == "opacity"){
					ele.style[attr] = (_ele[attr] + Math.sin(x*Math.PI/180)*(target[attr] - _ele[attr]))/100;
					console.log(ele.style[attr]);
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

function getStyle(ele, attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele)[attr];
	}
}