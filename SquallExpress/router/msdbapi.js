var express = require('express');
var router = express.Router();
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
        ne:["fullname,系统管理员"]
    });

    var MSResults = await query(SQLStr,{});
    res.end(encodeURIComponent(JSON.stringify(MSResults)));
})

router.get('/search',async function(req,res){
    if(req.query.table&&req.query.optionstr&&(MSBlackTableList.indexOf(req.query.table)==-1)){
        var SQLStr = MSSQLMaker.SelectStr(req.query.table,JSON.parse(decodeURIComponent(req.query.optionstr)));

        if(SQLStr){
            try{
                var MSResults = await query(SQLStr,{});
                res.end(encodeURIComponent(JSON.stringify(MSResults)));
            }
            catch(Error){
                res.end(JSON.stringify(Error));
                return;
            }
        }
        else{
            res.end("Wrong Params!");
        }
    }
    else{
        res.end("Wrong Query!");
    }
})

router.get('/insert',async function(req,res){
    if(req.query.table&&req.query.optionstr&&(MSBlackTableList.indexOf(req.query.table)==-1)){
        var SQLStr = MSSQLMaker.InsertStr(req.query.table,JSON.parse(decodeURIComponent(req.query.optionstr)));

        if(SQLStr){
            try{
                var MSResults = await query(SQLStr,{});
                res.end(encodeURIComponent(JSON.stringify(MSResults)));
            }
            catch(Error){
                res.end(JSON.stringify(Error));
                return;
            }
        }
        else{
            res.end("Wrong Params!");
        }
    }
    else{
        res.end("Wrong Query!");
    }
})

router.get('/update',async function(req,res){
    if(req.query.table&&req.query.key&&req.query.keyvalue&&req.query.optionstr){ //后期需要添加权限判断
        var SQLStr = MSSQLMaker.UpdateStr(req.query.table,req.query.key,req.query.keyvalue,JSON.parse(decodeURIComponent(req.query.optionstr)));

        if(SQLStr){
            try{
                var MSResults = await query(SQLStr,{});
                res.end(encodeURIComponent(JSON.stringify(MSResults)));
            }
            catch(Error){
                res.end(JSON.stringify(Error));
                return;
            }
        }
        else{
            res.end("Wrong Params!");
        }
    }
    else{
        res.end("Wrong Query!");
    }
})

router.get('/delete',async function(req,res){
    if(req.query.table&&req.query.key&&req.query.keyvalue&&(MSBlackTableList.indexOf(req.query.table)==-1)){
        var SQLStr = MSSQLMaker.DeleteStr(req.query.table,req.query.key,req.query.keyvalue);

        if(SQLStr){
            try{
                var MSResults = await query(SQLStr,{});
                res.end(encodeURIComponent(JSON.stringify(MSResults)));
            }
            catch(Error){
                res.end(JSON.stringify(Error));
                return;
            }
        }
        else{
            res.end("Wrong Params!");
        }
    }
    else{
        res.end("Wrong Query!");
    }
})

router.get('/mulsearch',async function(req,res){
    if(req.query.table&&req.query.optionstr&&(MSBlackTableList.indexOf(req.query.table)==-1)){
        var SQLStr = MSSQLMaker.MultiSelectStr(req.query.table,JSON.parse(decodeURIComponent(req.query.optionstr)));

        if(SQLStr){
            try{
                var MSResults = await query(SQLStr,{});
                res.end(encodeURIComponent(JSON.stringify(MSResults)));
            }
            catch(Error){
                res.end(JSON.stringify(Error));
                return;
            }
        }
        else{
            res.end("Wrong Params!");
        }
    }
    else{
        res.end("Wrong Query!");
    }
})

router.get('/queryexcute',async function(req,res){
    if(req.query.sql){
        try{
            var MSResults = await query(req.query.sql,{});
            res.end(encodeURIComponent(JSON.stringify(MSResults)));
        }
        catch(Error){
            res.end(JSON.stringify(Error));
            return;
        }
    }
    else{
        res.end("Wrong Query!");
    }
})
module.exports = router;