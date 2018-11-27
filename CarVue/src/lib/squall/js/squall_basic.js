import Vue from 'vue'

console.log("Squal基础js库已被加载！");

var squall_start =function(){
    console.log("Squall基础库已经可以正常使用！");
    return "一个正常的函数返回！";
}

var squall_data_server = "http://oa.nbgis.com/";

//GUID生成
function squall_guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

var squall_basic_http = new Vue({
    data:{
        "test":11111
    },
    methods:{
        GetInfo:function(guid){
            // this.$http.get(squall_data_server+'/login/info?guid=' + guid,{}).then(function(res){
            //     console.log(res);
            //     console.log(res.data);
            // },function(res){
            //     alert(res.status)
            // });
            this.$http.jsonp(squall_data_server+'/login/info',{params:{"guid":guid}}).then(function(data){
                console.log(data.body);
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
}