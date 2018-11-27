var express = require('express');
var app = express();
var squall = require('./config/node_config');

//虚拟路径
app.use(express.static('WebPage'));

//跨域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//在端口上建立服务
var server = app.listen(8046,squall.squall.HostIP, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
});


//加载路由
var base = require('./router/base');
app.use('/base',base);

var table = require('./router/table');
app.use('/table',table);