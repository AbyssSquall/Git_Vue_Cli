var mysql=require("mysql");  


var hoststr = "192.168.10.144";
var userstr = "root";

var pool = mysql.createPool({  
    host : hoststr,
    user : userstr,
    password : "123456",
    database : "linye",
    multipleStatements: true
});  
  
var query=function(sql,options,callback){
    pool.getConnection(function(err,conn){  
        if(err){
            callback(err,null,null);  
        }else{  
            conn.query(sql,options,function(err,results,fields){  
                //事件驱动回调  
                callback(err,results,fields);  
            });  
        }  
        //释放连接  
        console.log("释放链接");
        conn.release();  
    });  
};  
  
module.exports=query;