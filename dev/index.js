//
require(["js/config"], function(m){
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","headNav","textModel","common","fixedValue","animate"], function($,headnav){
		$(function(){
			$("#headNav").load("html/head.html",function(){			//load的回调函数，因为使用load会使先加载js代码，然后加载页面，所以在这里使用回调函数保证先加载页面再加载js代码，回调函数里是暴露的借口（使用define）
				headnav.headAndNav();
			});
			$("#keyDiv").load("html/key.html",function(){
			//fixed没有用 js 代码
			});
/*-----------------获取json文件中的资源------------------*/
			var ban2_1="";
			var xhr = new XMLHttpRequest();			
			xhr.open("get","/api/DaPu/DaPubanner.json",true)	//url中的部分相当于 http://localhost:8080/DaPu/DaPubanner.json     api相当于代替gulpfile.js中输入的域名
			xhr.send();
			xhr.onload = function(){
	/*---------------------使用延时加载，确保获得资源后再对资源进行操作------------------------------*/			
				var img = JSON.parse(xhr.response);
				
	/*-------------------------banner-----------------------------------------------*/
				ban2_1 = img.img.ban;			//获取ban这个数组
				var t1 = template("mode",ban2_1);
				$(".banner").html(t1);
				
				var bannerIndex = 0;				
				var ulLength = $(".imglist li").length;
				$(".dotUl li").eq(0).addClass("active");
				var bannerInter = setInterval(banMove,5000);
				function banMove(){
					var next = bannerIndex+1 >= ulLength ? 0:bannerIndex+1;
					$(".dotUl li").eq(next).siblings().removeClass("active");
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
				
	/*------------------------parts部分引用模板--------------------------------*/			
				//var parts = [{img:"src='img/parts/parts1.png'",word:"Roome智能光瓶",rmb:"RMB：199"},{img:"src='img/parts/parts2.png'",word:"星球杯",rmb:"RMB：99"},{img:"src='img/parts/parts3.png'",word:"琢磨壶",rmb:"RMB：458"},{img:"src='img/parts/parts4.png'",word:"Oclean智能声波牙刷",rmb:"RMB：399"},{img:"src='img/parts/parts5.png'",word:"大朴亲子灯",rmb:"RMB：99"},{img:"src='img/parts/parts6.png'",word:"埃及长绒棉加厚款毛方浴套装",rmb:"RMB：119"},{img:"src='img/parts/parts7.png'",word:"斯里兰卡乳胶枕（面包款）",rmb:"RMB：399"},{img:"src='img/parts/parts8.png'",word:"斯里兰卡乳胶枕（波浪款）",rmb:"RMB：399"},{img:"src='img/parts/parts9.png'",word:"花鸟纯棉印花靠枕",rmb:"RMB：99"},{img:"src='img/parts/parts10.png'",word:"麻棉绣花外缝鞋",rmb:"RMB：79"}];
				var parts = img.img.parts;
				//console.log(parts);
				var text = template("partsModel",parts);
				$(".parts").html(text);
				//console.log(text);
					
	/*---------------------------显示与隐藏商品价格-----------------------------------*/
				$(".moveModel").hover(function(){
					$this = $(this);
					$this.find("div").stop().animate({bottom:"0",opacity:1},300);
				},
				function(){
					$this.find("div").stop().animate({bottom:"-55px",opacity:0},300);
				})

				
			}
			
		
			
			
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
			
			
			

			

			
			
			
		});
	});
});





