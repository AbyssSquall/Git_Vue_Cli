var express = require('express');
var router = express.Router();

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

//get请求
router.get('/simple',function(req,res){
    console.log('这是一个简单请求');
    console.log(req.query.path);
    console.log(req.query.type);
    res.end('请求错误');
})

router.get('/',function(req,res){
    console.log('这是一个空的基础请求');
    res.end('hello world');
})

//post请求

module.exports = router;