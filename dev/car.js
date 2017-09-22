//
require(["js/config"], function(){
	require(["jquery","common","textModel"], function($){
		$(function(){
			
/*------------------加载更多商品的资源文件--------------------------*/
//console.log("no");
			$.ajax({url:"/api/DaPu/DaPubanner.json",success:function(data){
				var more = data.car.goods;
				//console.log(more);
				var text = template("like",more);
				$(".list").html(text);
			}})
/*--------------------获取cookie，判断cookie中是否有内容-------------------*/			
			var cook = JSON.parse(cookie.get("good"));
			if(cook == "" || cook == null){
				//console.log("none");
				$(".cont").css({display:"block"});
				$(".clearAll").css({display:"none"});
			}else{
				$(".cont").css({display:"none"});
				$(".clearAll").css({display:"block"});
			}
			
			
			
			
/*-----------------将cookie内的信息填入表单中---------------*/			
			var cook = JSON.parse(cookie.get("good"));
			var cookieText = template("tab_td",cook);
			$(".goodstable").html(cookieText);
/*---------------------点击+或- 控制购买数量----并将数量添加到cookie中-------------*/
			var tt = parseInt($(".td3").text()); 
			$(".td5").text(tt);
			$(".up").click(function(){
				var c = ($(".count_input").attr("value"));
				c++;
				$(".count_input").attr({value:c});
				
				//改变cookie值
				var cook = JSON.parse(cookie.get("good"));
				cook.forEach(function(obj){
					if(obj.goodsName == $(".td2Name").text() && obj.color == $(".td2Color b").text() && obj.size == $(".td2Size b").text() && obj.price == parseInt($(".td3Price").text())){
						obj.count++;
					}
				})
				cookie.set("good",JSON.stringify(cook),"8","/");
				//改变总价
				tt +=  parseInt($(".td3").text());
				$(".td5").text(tt);
			})
			$(".down").click(function(){
				var c = ($(".count_input").attr("value"));
				if(c == 1){
					
				}else{
					c--;					
				}
				$(".count_input").attr({value:c});
				//改变总价
				tt -=  parseInt($(".td3").text());
				if(tt <= parseInt($(".td3").text())){
					tt = parseInt($(".td3").text());
				}
				$(".td5").text(tt);
				//改变cookie值
				var cook = JSON.parse(cookie.get("good"));
				cook.forEach(function(obj){
					if(obj.goodsName == $(".td2Name").text() && obj.color == $(".td2Color b").text() && obj.size == $(".td2Size b").text() && obj.price == parseInt($(".td3Price").text())){
						obj.count--;
						if(obj.count == 0){
							obj.count = 1;
						}
					}
				})
				cookie.set("good",JSON.stringify(cook),"8","/");
			})
/*---------------------点击删除，删除购物车中的物品---并清除cookie中的值---------------*/			
			$(".td6").click(function(){
				var cook = JSON.parse(cookie.get("good"));
				//取出cook的值，然后遍历每一个对象，清除掉对象名，size color，price都相同的对象
				cook.forEach(function(obj){
					if(obj.goodsName == $(".td2Name").text() && obj.color == $(".td2Color b").text() && obj.size == $(".td2Size b").text() && obj.price == parseInt($(".td3Price").text())){
						var index = cook.indexOf(obj);		//0
						cook.splice(index,1);
					}
				})
				cookie.set("good",JSON.stringify(cook),"8","/");
				
				$(this).parent().remove();
				$(".cont").css({display:"block"});
				$(".clearAll").css({display:"none"});
			})
/*--------------------点击全部清除，清除购物车和cookie值，并显示另一个页面----------*/			
			$(".clearAll").click(function(){
				$(this).parent().next().remove();
				var cook = JSON.parse(cookie.get("good"));
				cook="";
				cookie.set("good",JSON.stringify(cook),"8","/");
				$(".cont").css({display:"block"});
				$(".clearAll").css({display:"none"});
			})
/*------------------点击商品名称跳转到商品页面----------------------*/
			$(".td2Name").click(function(){
				window.location = "./detail.html";
			})
			
		});
	});
});
