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



//导入网格人口画像数据

//创建网格统计表
//语句 
//create table if not exists WG_Info (WG_ID varchar(255),Age_0-18 varchar(255),Age_19-24,Age_25-34,Age_35-60,Age_61,)

//统计网格人口信息，并插入
//select count(*) from WG where Age<18;select count(*) from WG where Age<18;select count(*) from WG where Age<18;select count(*) from WG where Age<18;
//insert into WG (WG_ID,XXX,XXX) values (XXX,XXX,XXX) 


module.exports = router;