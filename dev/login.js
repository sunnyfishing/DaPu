require(["js/config"], function(m){
	require(["jquery","headNav","common"], function($,headnav){
		$(function(){
			//调用封装好的头部和右侧栏的HTML，并使用回调函数加载js
			$("#headNav").load("html/head.html",function(){	
				headnav.headAndNav();
			});
			
			
/*-----------------输入用户名，并发送到服务器上------------------*/			
			$(".userName input").click(function(){
				if($(".userName input").val() == ""){
					$(".userName span").css({display:"inline"});
				}
				$(".userName input").css({border:"1px solid blue"});
				$(".userName input").keyup(function(){
					//判断输入框是否为空
					if($(".userName input").val() == ""){
						$(".userName span").css({display:"inline"});
					}else{
						$(".userName span").css({display:"none"});
						$(".userName input").css({border:"1px solid #bdbdbe"});
					}
				})
			})
/*------------------获取输入的密码---------------------*/			
			$(".password input").click(function(){
				if($(".password input").val() == ""){
					$(".password span").css({display:"inline"});
				}
				$(".password input").css({border:"1px solid blue"});
				$(".password input").keyup(function(){
					//判断输入框是否为空
					if($(".password input").val() == ""){
						$(".password span").css({display:"inline"});
					}else{
						$(".password span").css({display:"none"});
						$(".password input").css({border:"1px solid #bdbdbe"});
					}
				})
			})
/*---------------将用户名和密码一起发送到服务器上，进行判断-----*/		
			$(".logBtn .logA").click(function(){
				/*
				 将得到的用户名和密码发送到服务器，进行校验
				 * 
				 * */
			})
		});
	});
})	;