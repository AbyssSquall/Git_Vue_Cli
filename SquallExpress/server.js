var express = require('express');
var app = express();
var Config = require('./config/config');

//虚拟路径
app.use(express.static('web'));


//地图数据库
//xmysql -h localhost -u root -p squall_19950405 -d jsmap_data

//监控文件夹列表
// var squall_route_list = [];
// fs.watch("/",function(event,filename){
//     console.log(filename);
// })

//跨域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//在端口上建立服务
var server = app.listen(Config.Port,Config.HostIP, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Start listening at http://%s:%s', host, port);
});

//中间件
app.use("*",function(req,res,next){
    try{
		console.log(req.headers['x-wq-realip'] ||req.connection.remoteAddress ||req.socket.remoteAddress ||req.connection.socket.remoteAddress);
	}catch(e){
		logger.info("getClientIp error");
    }
    next();
})

//加载路由
var msdb = require('./router/msdbapi');
app.use('/msdbapi',msdb);

var spider = require('./router/spider');
app.use('/spider',spider);


//主路由
app.get('/',function(req,res){
    res.end("Welcome to Squall's world!")
})

//路由转发,目的是将外部的访问转发到本地
// app.use('/',function(req,res,next){
// })
