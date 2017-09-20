require(["js/config"],function(m){
	require(["jquery","headNav"],function($,headnav){
		$(function(){
			$("#headNav").load("html/head.html",function(){
				headnav.headAndNav();
			});
			
			$("#keyDiv").load("html/key.html",function(){
			})
			
			
			var currentIndex = 0;
			var ulLength = $(".listDetail ul:first-child li").length;
			
/*---------------------默认选中第一张图片----------------*/			
			
			$(".listDetail li:first-child").find("span").css({display:"block"});
			var defaultImg = $(".listDetail li:first-child").find("img").attr("src");
			$(".mainPic img").attr({src:defaultImg});
			$(".mainPic img").css({width:"350px",height:"350px"});
																	//放大镜用
			$(".picbig img").attr({src:defaultImg});
			$(".picbig img").css({width:"350px",height:"350px"});
			
/*---------------------鼠标hover 改变图片导航栏样式---------------------------------*/
			//console.log($(".listDetail li").outerWidth(true))		//获取一个li所占的全部的宽度
			$(".listDetail ul").css({width:ulLength*$(".listDetail li").outerWidth(true)+"px"});//如何获取一个li所占的全部的宽度
			$(".listDetail li").hover(function(){
				//var nextIndex = (currentIndex++ >=ulLength) ? 0 : ++currentIndex;
				$this = $(this);
																	//先清除其他li的hover样式
				$(".listDetail li").css({padding:1,border:"1px solid #e9e9e9",margin:"1px 5px"});	
				$(".listDetail li").find("span").css({display:"none"});
																	//hover状态下改变样式
				$this.find("span").css({display:"block"});
				$this.css({padding:2,border:"1px solid #6b6b6b",margin:"0 4px"});
																	//hover状态下将大图投射到div中
				var imgsrc = $this.find("img").attr("src");
				$(".mainPic img").attr({src:imgsrc});
				$(".mainPic img").css({width:"350px",height:"350px"})
																	//放大镜用
				$(".picbig img").attr({src:imgsrc});
				$(".picbig img").css({width:"350px",height:"350px"})
			})

/*-----------------------------设置放大镜----------------------------*/	
/*			$(".curbig").width($(".mainPic img").width()*0.5);
			$(".curbig").height($(".mainPic img").height()*0.5);
			$(".picbig img").width($(".mainPic img").width()*2);
			$(".picbig img").height($(".mainPic img").height()*2);
			$(".cursmall").css({
				width: $(".curbig").width()*$(".mainPic").width()/$(".picbig").width()+"px",
				height:$(".curbig").height()*$(".mainPic").height()/$(".picbig").height()+"px",
			})
			$(".picbig").css({left:($(".mainPic img").width()+50)+"px"});
			$(".picbig").css({top:"-350px"});
			$(".mainPic").hover(function(){
				$(".cursmall").css({display:"block"});
			},function(){
				$(".cursmall").css({display:"none"});
			})*/
			
/*--------------------------点击左右按钮，导航图向左右滑动------------------------------------*/		
			$(".ul1").css({display:"block"});									//将紫色默认为刚打开页面时的颜色
			$(".ul2").css({display:"none"});
			$(".ul3").css({display:"none"});


			$(".picSpan2").click(function(){
				var left = $(".listDetail ul:first-child").position().left;		//ul的left值
				left-=$(".listDetail li").outerWidth(true)*5;		//每次点击，left都会减少 li的全部宽度*5
				var leftMax = (-(ulLength)*$(".listDetail li").outerWidth(true));		//ul可移动的最大left值
				console.log($(".listDetail ul").width());
				if(left < leftMax){		//当点击	超出可视图片的长度时，，强制转换到最后一页
					$(".listDetail ul").animate({left:(-$(".listDetail ul").width()+100)+"px"},500);
				}else{
					$(".listDetail ul").animate({left:left+"px"},500);
				}
			})
			$(".picSpan1").click(function(){
				var left = $(".listDetail ul").position().left;
				left+=$(".listDetail li").outerWidth(true)*5;
				if(left>=0){
					$(".listDetail ul").animate({left:0+"px"},500);
				}else{
					$(".listDetail ul").animate({left:left+"px"},500);
				}
			})
			
/*-------------------选择颜色----------------------------------*/			
								//设置默认选中的区块
			$(".color li:first-child").css({border:"2px solid #b1544f"});		//给第一个颜色初始选中的状态
			$(".color li:first-child").find("i").css({display:"inline-block"});
			$(".color li:first-child").addClass("checked");						//添加标记class
			$(".size li:first-child").css({border:"2px solid #b1544f"});		//给第一个尺寸初始选中的状态
			$(".size li:first-child").find("i").css({display:"inline-block"});
			$(".ul1").css({display:"block"});									//将紫色默认为刚打开页面时的颜色
			$(".ul2").css({display:"none"});
			$(".ul3").css({display:"none"});
			
			
			
									//向服务器发送请求查看各种类型的库存余量 包括颜色和尺寸，备用
			/*
			 
			 * 
			 * 
			 * 
			 * 
			 * */
			
								//点击更换选中区块
			$(".color li").click(function(){
				$this = $(this);
				var rest = 1;			//从服务器获取的库存余量
				if(rest > 0){
																//移除相邻元素被选中的状态，并移除标记class
					$this.siblings().css({border:"1px solid #cccccc"});
					$this.siblings().find("i").css({display:"none"});
					$this.siblings().removeClass("checked");
																//改变点击的元素的样式，使该元素处在被选中样式下
					$this.css({border:"2px solid #b1544f", "margin-right":"4px"});
					$this.find("i").css({display:"inline-block"});			
					$this.addClass("checked");				//当被选中时添加一个class用来在选择尺寸时进行识别
				}
															//对于尺寸区块的操作，先移除被选中的状态
				$(".size li:first-child").siblings().css({border:"1px solid #cccccc"});
				$(".size li:first-child").siblings().find("i").css({display:"none"});
				$(".size li:first-child").css({border:"2px solid #b1544f"});			//给被选中的元素添加选中样式
				$(".size li:first-child").find("i").css({display:"inline-block"});
			})
															//当只更换颜色按钮时，改变物品编号,并按照所选的颜色显示出对应的导航图片
			$(".color li:nth-child(1)").click(function(){
				$(".code i").html("1010201752");
				$(".ul1").css({display:"block"});
				$(".ul2").css({display:"none"});
				$(".ul3").css({display:"none"});
			})
			$(".color li:nth-child(2)").click(function(){
				$(".code i").html("1010201755");
				$(".ul1").css({display:"none"});
				$(".ul2").css({display:"block"});
				$(".ul3").css({display:"none"});
			})
			$(".color li:nth-child(3)").click(function(){
				$(".code i").html("1010201758");
				$(".ul1").css({display:"none"});
				$(".ul2").css({display:"none"});
				$(".ul3").css({display:"block"});
			})
			
								//显示当库存为0时的状态			bug带补充
			$(".color li:nth-child(3)").find("A").css({background:"#ffffff",cursor:"default"});
			
/*---------------------选择尺寸------------------------*/			
			
										//点击更换选中区块
			$(".size li").click(function(){
				$this = $(this);
				var rest = 1;			//从服务器获取的库存余量
				if(rest > 0){
															//移除所有相邻元素的被选中的状态
					$this.siblings().css({border:"1px solid #cccccc"});
					$this.siblings().find("i").css({display:"none"});
					$this.css({border:"2px solid #b1544f", "margin-right":"4px"});//给该元素添加选中状态
					$this.find("i").css({display:"inline-block"});					
				}
			})
								//点击第一个尺寸按钮
			$(".size li:nth-child(1)").click(function(){
				$this = $(this);
				if($(".color li:nth-child(1)").hasClass("checked")){			//	如果颜色选择的是紫色
					$(".code i").html("1010201752");
				}else if($(".color li:nth-child(2)").hasClass("checked")){		//	如果颜色选择的是红色
					$(".code i").html("1010201755");
				}else if($(".color li:nth-child(3)").hasClass("checked")){		//	如果颜色选择的是灰色
					$(".code i").html("1010201758");
				}				
			});
								//点击第二个尺寸按钮
			$(".size li:nth-child(2)").click(function(){
				$this = $(this);
				if($(".color li:nth-child(1)").hasClass("checked")){			//	如果颜色选择的是紫色
					$(".code i").html("1010201753");
				}else if($(".color li:nth-child(2)").hasClass("checked")){		//	如果颜色选择的是红色
					$(".code i").html("1010201756");
				}else if($(".color li:nth-child(3)").hasClass("checked")){		//	如果颜色选择的是灰色
					$(".code i").html("1010201759");
				}				
			});
								//点击第三个尺寸按钮
			$(".size li:nth-child(3)").click(function(){
				$this = $(this);
				if($(".color li:nth-child(1)").hasClass("checked")){			//	如果颜色选择的是紫色
					$(".code i").html("1010201754");
				}else if($(".color li:nth-child(2)").hasClass("checked")){		//	如果颜色选择的是红色
					$(".code i").html("1010201757");
				}else if($(".color li:nth-child(3)").hasClass("checked")){		//	如果颜色选择的是灰色
					$(".code i").html("1010201760");
				}				
			})
			
/*----------------------------对添加或减少购买数量的按钮进行监听--------------------------------*/			
			$(".jia").click(function(){
				var num = $(".n").val();
				if(num == 1){
					$(".n").val(num);					
				}else{
					num--;
					$(".n").val(num);					
				}
			})
			$(".jian").click(function(){
				var num = $(".n").val();
				num++;
				$(".n").val(num);					
			})
/*-------------------------------单击购物车-----------------------------*/			
			$(".car").click(function(){
				//向服务器发送数据或向cookie发送数据
				/*
				 
				 * 
				 * 
				 * */
				
				 //清除原有的选中样式
				 $(".size li:first-child").siblings().css({border:"1px solid #cccccc"});
				 $(".size li:first-child").siblings().find("i").css({display:"none"});
				 $(".color li:first-child").siblings().css({border:"1px solid #cccccc"});
				 $(".color li:first-child").siblings().find("I").css({display:"none"});
				 
				//重置选中的尺寸或颜色
				$(".color li:first-child").css({border:"2px solid #b1544f"});		//给第一个颜色初始选中的状态
				$(".color li:first-child").find("i").css({display:"inline-block"});
				$(".color li:first-child").addClass("checked");						//添加标记class
				$(".size li:first-child").css({border:"2px solid #b1544f"});		//给第一个尺寸初始选中的状态
				$(".size li:first-child").find("i").css({display:"inline-block"});
				
				//重置选中的数量
				$(".n").val("1");
			})
			
/*---------------------------鼠标扫过二维码，显示二维码-----------------------*/		
			$(".erweima").hover(function(){
				$(".erweima2").css({display:"block"});
			},function(){
				$(".erweima2").css({display:"none"});
			})
		
		
		});
	});
});
