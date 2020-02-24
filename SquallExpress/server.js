var express = require('express');
var app = express();
var Config = require('./config/config');
var http = require('http');
var fs = require('fs');

var squall_HttpGet = {
	hostname: '127.0.0.1', 
    port: 10086, 
    path: '/pay/pay_callback?parem=1', 
    method: 'GET' 
}

//虚拟路径
app.use(express.static('E:\\地图模板\\WebApp'));


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


//加载路由
var msdb = require('./router/msdbapi');
app.use('/msdbapi',msdb);

//路由转发,目的是将外部的访问转发到本地
// app.use('/',function(req,res,next){
// })
