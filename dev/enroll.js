require(["js/config"], function(m){
	require(["jquery","headNav","common"], function($,headnav){
		$(function(){
			//调用封装好的头部和右侧栏的HTML，并使用回调函数加载js
			$("#headNav").load("html/head.html",function(){	
				headnav.headAndNav();
			});
/*------------------------手机号输入框----------------------------*/			
			//输入框获取焦点后，当键盘抬起，判断是否满足正则，如果满足 span消失
			$(".phoneDiv").on("click",function(){
				$(".phoneDiv span").css({display:"block"});
				$(".phoneDiv input").css({border:"2px solid blue"});
				$(".phoneDiv input").keyup(function(){
					if(/^1[3,8,5,6]\d{9}$/.test($(".phoneDiv input").val())){
						$(".phoneDiv span").css({display:"none"});
						$(".codeDiv input").removeProp("disabled");
						$(".surepass input").removeProp("disabled");
						$(".smsDiv input").removeProp("disabled");
						$(".password input").removeProp("disabled");
						$(".bingo input").removeProp("disabled");
						$(".loginBtn input").removeProp("disabled");
						
					}else{
						//其他输入框不能被成为焦点
						$(".codeDiv input").attr({disabled:"disabled"});
						$(".surepass input").attr({disabled:"disabled"});
						$(".smsDiv input").attr({disabled:"disabled"});
						$(".password input").attr({disabled:"disabled"});
						$(".bingo input").attr({disabled:"disabled"});
						$(".loginBtn input").attr({disabled:"disabled"});
					}
				})
			},)
			//当输入框失去焦点时，满足正则，span消失
			$(".phoneDiv input").blur(function(){
				if(/^1[3,8,5,6]\d{9}$/.test($(".phoneDiv input").val())){
					$(".phoneDiv span").css({display:"none"});
				}
				$(".phoneDiv input").css({border:"1px solid #c7c7c7"});
			})
/*------------------------图片码验证----------------------------*/
			//图片是由服务器实时更新，因此获得的数据也应该实时向服务器反馈，并验证结果
			//每次点击code的input，都会从服务器上拿到一张图片并替换
			function codeDisabled(){
				$(".surepass input").attr({disabled:"disabled"});
				$(".smsDiv input").attr({disabled:"disabled"});
				$(".password input").attr({disabled:"disabled"});
				$(".bingo input").attr({disabled:"disabled"});
				$(".loginBtn input").attr({disabled:"disabled"});
			}
			function codeUndisabled(){
				$(".surepass input").removeProp("disabled");
				$(".smsDiv input").removeProp("disabled");
				$(".password input").removeProp("disabled");
				$(".bingo input").removeProp("disabled");
				$(".loginBtn input").removeProp("disabled");
			}
			$(".codeDiv #code").click(function(){
				codeDisabled();
				$(".codeDiv span").css({display:"block"});
				$(".codeDiv #code").css({border:"2px solid blue"});
				$(".codeDiv #code").keyup(function(){
					if(/^\d{2,3}$/.test($(".codeDiv #code").val())){
						$(".codeDiv span").css({display:"none"});
						codeUndisabled();
					}else{
						$(".codeDiv span").css({display:"block"});
						codeDisabled();
					}
				})
			})
			$(".codeDiv #code").blur(function(){
				if(/^\d{2,3}$/.test($(".codeDiv #code").val())){
					$(".codeDiv span").css({display:"none"});
					codeUndisabled();
				}
				$(".codeDiv #code").css({border:"1px solid #c7c7c7"});
			})
			
			
/*------------------------点击获取短信码----------------------------*/
			$("#mesBtn").hover(function(){
				$("#mesBtn").css({cursor:"pointer"});
			})
			$("#mesBtn").click(function(){
				$("#mesBtn").css({border:"2px solid blue"});
			})
			//获得短信码
			$("#mesBtn").blur(function(){
				$("#mesBtn").css({border:"1px solid #c7c7c7"});
			})
/*-----------------------验证短信码----------------------------------*/			
			function smsDisabled(){
				$(".surepass input").attr({disabled:"disabled"});
				$(".password input").attr({disabled:"disabled"});
				$(".bingo input").attr({disabled:"disabled"});
				$(".loginBtn input").attr({disabled:"disabled"});
			}
			function smsUndisabled(){
				$(".surepass input").removeProp("disabled");
				$(".password input").removeProp("disabled");
				$(".bingo input").removeProp("disabled");
				$(".loginBtn input").removeProp("disabled");
			}
			
			$(".smsDiv input").click(function(){
				smsDisabled();
				$(".smsDiv input").css({border:"2px solid blue"});
				$(".smsDiv span").css({display:"block"});
				$(".smsDiv input").keyup(function(){
					if(/^[a-zA-Z0-9]{4}$/.test($(".smsDiv input").val())){
						$(".smsDiv span").css({display:"none"});
						smsUndisabled();
					}else{
						$(".smsDiv span").css({display:"block"});
						smsDisabled();
					}
				})
			})
			$(".smsDiv input").blur(function(){
				if(/^[a-zA-Z0-9]{4}$/.test($(".smsDiv input").val())){
					$(".smsDiv span").css({display:"none"});
					codeUndisabled();
				}
				$(".smsDiv input").css({border:"1px solid #c7c7c7"});
			})
			
/*----------------密码验证----------------------*/			
			function passDisabled(){
				$(".surepass input").attr({disabled:"disabled"});
				$(".bingo input").attr({disabled:"disabled"});
				$(".loginBtn input").attr({disabled:"disabled"});
			}
			function passUndisabled(){
				$(".surepass input").removeProp("disabled");
				$(".bingo input").removeProp("disabled");
				$(".loginBtn input").removeProp("disabled");
			}
			
			$(".password input").click(function(){
				passDisabled();
				$(".password input").css({border:"2px solid blue"});
				$(".password span").css({display:"block"});
				$(".password input").keyup(function(){
					if(/^\w{6,15}$/.test($(".password input").val())){
						$(".password span").css({display:"none"});
						passUndisabled();
					}else{
						$(".password span").css({display:"block"});
						passUndisabled();
					}
				})
			})
			$(".password input").blur(function(){
				if(/^\w{6,15}$/.test($(".password input").val())){
					$(".password span").css({display:"none"});
					passUndisabled();
				}
				$(".password input").css({border:"1px solid #c7c7c7"});
			})
/*--------------------密码确认---------------------------*/			
			function surePassDisabled(){
				$(".bingo input").attr({disabled:"disabled"});
				$(".loginBtn input").attr({disabled:"disabled"});
			}
			function surePassUndisabled(){
				$(".bingo input").removeProp("disabled");
				$(".loginBtn input").removeProp("disabled");
			}
			
			$(".surepass input").click(function(){
				surePassDisabled();
				$(".surepass input").css({border:"2px solid blue"});
				$(".surepass span").css({display:"block"});
				$(".surepass input").keyup(function(){
					if($(".surepass input").val() == $(".password input").val()){
						$(".surepass span").css({display:"none"});
						surePassUndisabled();
					}else{
						$(".surepass span").css({display:"block"});
						surePassDisabled();
					}
				})
			})
			$(".surepass input").blur(function(){
				if($(".surepass input").val() == $(".password input").val()){
					$(".surepass span").css({display:"none"});
					surePassUndisabled();
				}
				$(".surepass input").css({border:"1px solid #c7c7c7"});
			})
/*-------------------勾选协议-----------------------------------*/			
			$(".bingo input").click(function(){
				if($(".bingo input").is("checked")){
					$(".bingo input").removeProp("checked");
				}else{
					$(".bingo input").attr({checked:"checked"});
				}
			})
			$("#login").css({cursor:"pointer"});
			
			
			/*if($(".bingo input").is("checked")){
				$(".loginBtn input").removeProp(disabled);
				$("#login").hover(function(){
					$("#login").css({cursor:"pointer"});
				})
			}else{
				$(".loginBtn input").attr({disabled:"disabled"});
				console.log("ok");
			}*/
			
			
			
		});
	});
});


