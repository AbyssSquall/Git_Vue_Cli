var Config = require("../config/config");
var query = require("../SquallAPI/MSSyncPool");
var MSSQLMaker = require("../SquallAPI/MSSQLMaker");
var MSBasicTools = require("../SquallAPI/MSBasicTools");

//Black Table
var MSBlackTableList = [
    "user",
]

//任何请求都会执行的中间件
router.use(function MSMidModule(req, res, next){
   next();
})

//指向特定请求的中间件，只有在接收到特定请求的时候才会执行
router.use('/',function(req, res, next){
    //console.log(req.url);
    next();
})

//Get Require
router.get('/getuserlist',async function(req,res){
    var SQLStr = MSSQLMaker.DisSelectStr("user","fullname",{
        ne:"fullname,系统管理员"
    });
    query("select distinct fullname from `user` where fullname<>'系统管理员'",{},function(err,results,fields){
        var MSResultStr = JSON.stringify(results);
        res.end(MSResultStr);
    })
})