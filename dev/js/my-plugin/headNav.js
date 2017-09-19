define(["jquery","common"],function($){
	return{
		headAndNav:(function(){
			$("#search").click(function(){
				var searchVal = $("#search").val();
				if(searchVal == ""){
					$("#hotSearch ul").css({display :"block"});
					setTimeout(function(){
						$("#search").blur();
						$("#hotSearch ul").css({display :"none"});
					},5000)	
				}else{
					$("#hotSearch ul").css({display :"none"});
				}
			})
			$("#search").blur(function(){
				$("#hotSearch ul").css({display :"none"});
			})
			
			//点击输入框，输入内容，完成自动填充功能
			$("#search").keyup(function(e){
				var searchVal = $("#search").val();
				jsonp("http://suggestion.baidu.com/su?wd="+searchVal+"&cb=test");
				//点击自动完成的列表，列表消失，输入框变成点击的内容
				$("#searchUl").click(
					function(e){
						if(e.target.nodeName == "A"){
							var clickVal = e.target.innerHTML;	
							$("#search").val(clickVal);
							$("#searchUl ul").css({display:"none"});
						}
					}
				)					
				if(searchVal == ""){			//判断搜索框是否为空，当为空时显示热搜框
					$("#hotSearch ul").css({display :"block"});
				}else{
					$("#hotSearch ul").css({display :"none"});
				}
				setTimeout(function(){			//5秒内用户没有点击列表框，列表消失
					$("#searchUl ul").css({display:"none"});
				},5000)
				
			})
			
			
			window.test=function(urlData){			//在该函数中清除之前产生的script，因为到这里数据已经通过urlData获取到了；
				var oul = document.getElementById("searchUl");
				oul.innerHTML=template("mode",urlData.s);
				oul.children[0].style.display = "block";
				var _s = document.getElementById("_sicipt_self_use");
				_s.remove();	
			}
			
			function jsonp(url){
				var _script = document.createElement("script");
				_script.src = url;
				_script.id = "_sicipt_self_use";
				document.body.appendChild(_script);
			}
			
			
			
			
	/*---------------------搜索按钮-------bug--------------*/			
			$("#searchBtn").click(function(){
				var xhr = new XMLHttpRequest();
				xhr.open("GET","http://localhost:8080/dev/index.html",true);
				xhr.send();
			})
	/*-------------------------购物车----------------------------------*/			
			$("#shopCar,.goodsNum").hover(
				function(){
					var goodsNum = $(".goodsNum").text();
					if(goodsNum == 0){								//当购物车为空时
						$(".carList").css({display:"block"});
						setTimeout(function(){
							$(".carList").html("购物车里面暂时没有商品");
						},300)						
					}else{											//当购物车不为空
						
						
					}
				},
				function(){
					$(".carList").css({display:"none"});
					
				}
			)
			$(".nav ul li:not(.specialPage)").hover(function(){
				$(".navList").css({display:"block"});
				$(this).find(".Lichild").css({display:"block"});
			},
			function(){
				$this = $(this);
				if($(".navList").is(":hover")){
					$(".navList").css({display:"block"});
					$(this).find(".Lichild").css({display:"block"});
					$(".navList").mouseout(function(){
						$(".navList").css({display:"none"});
						$this.find(".Lichild").css({display:"none"});
					})
				}else{
					$(".navList").css({display:"none"});
					$(this).find(".Lichild").css({display:"none"});
					
				}
				
			})
			$(window).scroll(function(){
				//console.log($(".head").scrollTop());
				if($(document.body).scrollTop() > 60){
					$(".head").addClass("headforfixed");
					$(".nav").addClass("headforfixed navforfixed");
				}else{
					$(".head").removeClass("headforfixed");
					$(".nav").removeClass("headforfixed navforfixed");
				}
			})
		}),
		fixed:(function(){
			
		})
	}
})
//作为接口
/*define(["jquery",""]，function($){
	return{							//返回一个对象
		fun1:(function(){}),							//一个属性
		fun2:(function(){})
	}
})*/
//然后放在config.js 配置文件中配置
//然后再调用文件中先引入，然后产生对象，然后对象调用函数
