import Vue from 'vue'

//基础变量
var squall_Server_Host_IP = "http://192.168.10.144";
var squall_Database_Host_IP = "http://127.0.0.1:3000";//192.168.10.144:8047
var squall_Host_IP = "192.168.10.144";
var squall_data_server = "http://oa.nbgis.com/";

//动态变量
var squall_user_info = {};



var squall_start =function(){
    console.log("Squall基础库已经可以正常使用！");
    return "一个正常的函数返回！";
}


//GUID生成
function squall_guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

//用户权限相关的请求函数
var squall_basic_http = new Vue({
    data:{
        "test":11111
    },
    methods:{
        GetInfo:function(guid){
            this.$http.jsonp(squall_data_server+'/login/info',{params:{"guid":guid}}).then(function(data){
                console.log(data.body);
                squall_user_info = data.body;
            }).catch(function(err){
                console.log(err);
            })
        },
        GetGrant:function(xuhao,that){
            this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.personlist,_j,b.person_role,_j,c.role,_j,d.role_right,_j,e.right&_on1=(a.序号,eq,b.序号)&_on2=(b.roleid,eq,c.roleid)&_on3=(c.roleid,eq,d.roleid)&_on4=(d.rightid,eq,e.rightid)&_fields=e.right&_where=(a.序号,eq," + xuhao + ")").then(function(data){
                //console.log(data.data);
                for(var i=0;i<data.data.length;i++)
                {
                    //console.log(data.data[i].e_right);
                    if(data.data[i].e_right=="公务用车")
                    {
                        that.ProductCar = true;
                    }
                    if(data.data[i].e_right=="生产用车")
                    {
                        that.OfficialCar = true;
                    }
                    if(data.data[i].e_right=="申请审核")
                    {
                        that.HandleApplication = true;
                    }
                    if(data.data[i].e_right=="历史记录")
                    {
                        that.History = true;
                    }
                }
                //console.log(xuhao);
            }).catch(function(err){
                console.log(err);
            })
        },
        PostForm:function(data,table){
            //console.log(data,table);
            var squall_data = JSON.parse(data);
            this.$http.post(squall_Database_Host_IP+"/api/" + table,squall_data).then(function(data){
                console.log(data.data);
            }).catch(function(err){
                console.log(err);
            })
        }
    }

})

export default{
    "test_string":"一个正常的变量测试",
    "test_function":squall_start,
    "squall_guid":squall_guid,
    "squall_basic_http":squall_basic_http,
    "squall_user_info":squall_user_info,
    "squall_Host":squall_Server_Host_IP
}

//xmysql -h localhost -u root -p 123456 -d carrent