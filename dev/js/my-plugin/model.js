
	function template(id, data) {
		var str = document.getElementById(id).innerText;
		str = "log(`"+str+"`)";
		str = str.replace(/<%=(.+)%>/g, "`); log($1); log(`");
		str = str.replace(/<%(.+)%>/g, "`); $1 log(`");
		var funcstr = `
			(function(data){
				var htmlstr = "";
				function log(str) {
					htmlstr += str;
				}
				${str};
				return htmlstr;
			})
		`;
		
		var realfunc = eval(funcstr);
		
		return realfunc(data);			//返回的是一个字符串，如果想添加到HTML页面上，把返回值赋给父级的innerHTML
	}
