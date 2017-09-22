//创建一个任务
gulp.task("webserver", function () {
	console.log('webserver.');
	gulp.src('./dev')
		.pipe(
			webserver({
				host: 'localhost',								//这里给出的是替换后的gulp端口号
				port: 8000,
				livereload: true,
				directoryListing: {
					enable: true,
					path: './dev'								//这里是端口号所指代的路径，相等
				},
				middleware: [									//这个是为了替换8080端口
					proxy("/api", {								//给出的替换文本，/api 只要见到这个就在它前面加上  http://localhost:8080/api  ，在使用该路径时（就是xhr调用URL的时候）以  /api  开头，后面写相对于WebApps下的json文件所在的路径
						target: 'http://localhost:8080', // target host
	        			changeOrigin: true,               // needed for virtual hosted sites
			       		pathRewrite: {
			         		'^/api' : '' 						//因为替换后变成了   http://localhost:8080/api/api......有重复的  /api  所以这里是将原来的/api替换为空 就变成了 http://localhost:8080/api......
		        		}
					})
				]
			}
		)
	)
	
})
														//使用gulp调用webserver任务  "chanLis"  是其他任务
gulp.task('default', ["chanLis","webserver"], function () {
	console.log('done.');
})