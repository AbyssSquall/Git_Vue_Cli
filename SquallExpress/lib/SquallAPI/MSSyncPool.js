//Mysql操作
var mysql=require("mysql");  
var Config=require("../config/config"); 

var pool = mysql.createPool({  
    host : Config.MysqlConfig.Host,
    user : Config.MysqlConfig.User,
    password : Config.MysqlConfig.Password,
    database : Config.MysqlConfig.Database,
    multipleStatements: true
});  
  
var query=function(sql,options){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,conn){  
            if(err){
                reject(err);  
            }else{  
                conn.query(sql,options,function(err,results){ 
                    if(err)  
                    {
                        console.log(sql);
                        reject(err);
                    }    
                    else 
                        resolve(results);
                });  
            }  
            //释放连接  
            if(conn)
                conn.release();  
        });
    })
};  

module.exports = query;