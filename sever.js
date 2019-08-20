var http=require('http')
var path=require('path')
var fs=require('fs')
var url=require('url')
var server=http.createServer(function (req,res) {
	pathRoute(req,res)
	})

	var routes={
	 
		'/a':function (req,res) {
			res.end(JSON.stringify(req.query))
			},
			'/search':function (req,res) { 
       res.end(req.body.username)
			 },
			 '/a/b':function (req,res) {
				  res.end("math/a/b")
			   }
	}

	function  pathRoute(req,res) {
		 
		 var pathObj=url.parse(req.url,true)
		 var callbak=routes[pathObj.pathname]
		 
		  if(callbak){
				req.query=pathObj.query
					var body=''
					req.on('data',function (param) { 
						body+=param
					 }).on('end',function () {
						req.body=parseBody(body)
						callbak(req,res)
					  })
			}else{
				pathStatic(path.join(__dirname,'static'),req,res)
				
			}


	  }
function parseBody(body) {

	var obj={}
	body.split('&').forEach(item=> {
		obj[item.split('=')[0]]=item.split('=')[1]
	});

	return obj

	}
	

function  pathStatic(pathStatic,req,res) {
 
 var pathObj=url.parse(req.url,true)
 if(pathObj.pathname==='/'){
	pathObj.pathname+='index.html'
 }
// 拼接文件地址
 var pathFile=path.join(pathStatic,pathObj.pathname)
// 读取文件
 fs.readFile(pathFile,'binary',function (err,data) {
 
	 if(err){
		 res.writeHead(404,'not find')
		 res.end("<h1>404 not find</h1>")
	 }else{
		
		res.writeHead(200,'ok')
		res.write(data,'binary')
		res.end()

	 }

   })


	}


server.listen(8080)