require(["js/config"],function(m){
	require(["jquery","headNav"],function($,headnav){
		$(function(){
			$("#headNav").load("html/head.html",function(){
				headnav.headAndNav();
			});
			
			$("#keyDiv").load("html/key.html",function(){
			})
		})
	})
})
