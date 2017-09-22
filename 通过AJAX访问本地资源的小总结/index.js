

var xhr = new XMLHttpRequest();
xhr.open("get","/api/DaPu/DaPubanner.json",true)	//url中的部分相当于 http://localhost:8080/DaPu/DaPubanner.json     api相当于代替gulpfile.js中输入的域名
xhr.send();
xhr.onload = function(){
/*---------------------使用延时加载，确保获得资源后再对资源进行操作------------------------------*/			
	var img = JSON.parse(xhr.response);
	
	/*
	 
	 * DOM节点操作
	 * 
	 * */
	
	/*------------模板-------------*/
	var parts = img.img.parts;
	var text = template("partsModel",parts);
	$(".parts").html(text);
	
}	