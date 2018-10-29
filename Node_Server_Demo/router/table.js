var express = require('express');
var fs = require('fs');
var router = express.Router();
var query = require('../config/mysql-pool');

//GUID生成
function squall_guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}


//任何请求都会执行的中间件
router.use(function squall_mid(req, res, next){
    console.log('这是一个中间件');
    next();
})

//指向特定请求的中间件，只有在接收到特定请求的时候才会执行
router.use('/midTest',function(req, res, next){
    console.log(req.url);
    next();
})


router.get('/test',function(req,res){
    var squall_sql="select * from test"
    res.end(squall_sql);
})

module.exports = router;