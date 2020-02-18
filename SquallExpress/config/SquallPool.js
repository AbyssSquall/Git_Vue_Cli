var mysql=require("mysql");  
var Config = require("./config");

var pool = mysql.createPool({  
    host : Config.MysqlConfig.Host,
    user : Config.MysqlConfig.User,
    password : Config.MysqlConfig.Password,
    database : Config.MysqlConfig.Database,
    multipleStatements: true
});  
  
var query=function(sql,options,callback,params){
    pool.getConnection(function(err,conn){  
        if(err){
            callback(err,null,null);  
        }else{  
            conn.query(sql,options,function(err,results,fields){  
                //事件驱动回调  
                callback(err,results,fields,params);  
            });  
        }  
        //释放连接  
        //console.log("释放链接");
        if(conn)
            conn.release();  
    });  
};  
  
module.exports=query;