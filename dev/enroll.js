require(["js/config"], function(m){
	require(["jquery","headNav","common"], function($,headnav){
		$(function(){
			//调用封装好的头部和右侧栏的HTML，并使用回调函数加载js
			$("#headNav").load("html/head.html",function(){	
				headnav.headAndNav();
			});
		});
	});
});


