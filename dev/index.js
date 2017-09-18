//
require(["js/config"], function(m){
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","textModel","common","fixedValue","animate"], function($){
		$(function(){
/*-----------------------搜索框-----------------------*/			
			//添加热搜，当鼠标点击，但是不输入内容时，显示热搜内容，当开始输入时，热搜内容消失。当不输入内容超过5秒后，热搜消失，输入框失去焦点
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
/*---------------------------登录与注册--------------------------------------*/			
/*---------------------------nav：hover状态下显示list-------------------------*/			
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
/*-------------------------banner-----------------------------------------------*/
			var bannerIndex = 0;
			var ulLength = $(".imglist li").length;
			$(".dotUl li").eq(0).addClass("active");
			var bannerInter = setInterval(banMove,5000);
			function banMove(){
				var next = bannerIndex+1 >= ulLength ? 0:bannerIndex+1;
				$(".dotUl li").eq(bannerIndex).removeClass("active");
				$(".dotUl li").eq(next).addClass("active");
				$(".imglist li").eq(bannerIndex).fadeOut(500).end().eq(next).fadeIn(500);
				bannerIndex = bannerIndex+1 >= ulLength ? 0:++bannerIndex;
			}
			
			$(".banner").hover(function(){
				clearInterval(bannerInter);
			},
			function(){
				bannerInter = setInterval(banMove,5000);
			})
			
			var liWidth =  $(".imglist li").width()+10;				
			$(".imglist").css({width:liWidth*ulLength})			
			$(".dotUl li").mouseenter(function(){					
				var $this = $(this);
				$this.addClass("active").siblings().removeClass("active");	
				var mouseIndex = $this.index();						
				$(".imglist li").eq(mouseIndex).fadeIn(300).siblings().fadeOut(300);
			})
			
/*//大轮播图
var banner_index=0;
var banner_length=$(".banner .ul_img li").length;
$(".banner .ul_img li").eq(banner_index).siblings().css("display","none");		?
var banner_timer=setInterval(banner_move,3000);
function banner_move(){
    var next=(banner_index+1>banner_length-1)?0:banner_index+1;
    $(".banner .ul_img li").eq(banner_index).fadeOut(300).end().eq(next).fadeIn(300);
    $(".ul_dot li").eq(next).addClass("active").siblings().removeClass("active");
    banner_index=(banner_index+1>banner_length-1)?0:++banner_index;
}
//鼠标悬停停止轮播
$(".banner .ul_img li,.ul_dot li").hover(function(){
    clearInterval(banner_timer);
},function(){
    banner_timer=setInterval(banner_move,3000);
})
//轮播图下方长方形导航
$(".ul_dot").width($(".ul_dot li").length*45);
$(".ul_dot li").on("click",function(){
    var li_index=$(".ul_dot li[class='active']").index();
    $(".banner .ul_img li").eq(li_index).fadeOut(300).end().eq($(this).index()).fadeIn(300);
    $(this).addClass("active").siblings().removeClass("active");
    banner_index=$(this).index()
})*/
			
			
			
/*------------------------parts部分引用模板--------------------------------*/			
			var parts = [{img:"src='img/parts/parts1.png'",word:"Roome智能光瓶",rmb:"RMB：199"},{img:"src='img/parts/parts2.png'",word:"星球杯",rmb:"RMB：99"},{img:"src='img/parts/parts3.png'",word:"琢磨壶",rmb:"RMB：458"},{img:"src='img/parts/parts4.png'",word:"Oclean智能声波牙刷",rmb:"RMB：399"},{img:"src='img/parts/parts5.png'",word:"大朴亲子灯",rmb:"RMB：99"},{img:"src='img/parts/parts6.png'",word:"埃及长绒棉加厚款毛方浴套装",rmb:"RMB：119"},{img:"src='img/parts/parts7.png'",word:"斯里兰卡乳胶枕（面包款）",rmb:"RMB：399"},{img:"src='img/parts/parts8.png'",word:"斯里兰卡乳胶枕（波浪款）",rmb:"RMB：399"},{img:"src='img/parts/parts9.png'",word:"花鸟纯棉印花靠枕",rmb:"RMB：99"},{img:"src='img/parts/parts10.png'",word:"麻棉绣花外缝鞋",rmb:"RMB：79"}];
			var text = template("partsModel",parts);
			$(".parts").html(text);
			
/*---------------------------显示与隐藏商品价格-----------------------------------*/
			$(".moveModel").hover(function(){
				$this = $(this);
				$this.find("div").stop().animate({bottom:"0",opacity:1},300);
			},
			function(){
				$this.find("div").stop().animate({bottom:"-55px",opacity:0},300);
			})
			
/*-----------------------------鼠标滚动，头部和导航固定到顶部------------------------------*/			
			$(window).scroll(function(){
				//console.log($(".head").scrollTop());
				if($(document.body).scrollTop() > 0){
					$(".head").addClass("headforfixed");
					$(".nav").addClass("headforfixed navforfixed");
				}else{
					$(".head").removeClass("headforfixed");
					$(".nav").removeClass("headforfixed navforfixed");
				}
			})
			
			
			
			
		});
	});
});





