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
        PostForm:function(data,table,that){
            //console.log(data,table);
            var squall_data = JSON.parse(data);
            squall_data.guid = squall_guid();
            this.$http.post(squall_Database_Host_IP+"/api/" + table,squall_data).then(function(data){
                console.log(data.data.affectedRows);
                if(data.data.affectedRows>0)
                {
                    that.$router.push({name:"Home",params:{type:table,success:true}});
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        GetApplicationList:function(table,that){
            //需要连表查询，需要申请人名
            //squall_Database_Host_IP+"/api/xjoin?_join=a.personlist,_j,b.person_role,_j,c.role,_j,d.role_right,_j,e.right&_on1=(a.序号,eq,b.序号)&_on2=(b.roleid,eq,c.roleid)&_on3=(c.roleid,eq,d.roleid)&_on4=(d.rightid,eq,e.rightid)&_fields=e.right&_where=(a.序号,eq," + xuhao + ")"

            this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a." + table + ",_j,b.personlist&_on1=(a.序号,eq,b.序号)&_fields=a.序号,a.aim,a.task,a.starttime,a.endtime,a.region,a.guid,b.部门,b.姓名,b.departmentid",{}).then(function(data){
                console.log(data.data);
                that.ApplicationList = data.data;
            }).catch(function(err){
                console.log(err);
            })
        },
        PostOfficialInfo:function(data,that,id){
            var squall_data = JSON.parse(data);
            squall_data.charger序号 = id;
            console.log(squall_data);
            this.$http.patch(squall_Database_Host_IP+"/api/official_application/" + squall_data.guid,squall_data).then(function(data){
                console.log(data.data);
                that.Driver_dialogVisible = false;
                if(data.data.affectedRows>0)
                {
                    that.$router.push({name:"Home",params:{type:"official_application",success:true}});
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        GetHistory:function(that,option){
            if(option)
            {
                //根据option来筛选历史记录
            }
            else
            {
                var squall_history_list = []
                var this_that = this;
                //获取全部的历史记录
                this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.official_application,_j,c.personlist&_on1=(a.序号,eq,c.序号)&_fields=a.guid,a.aim,c.姓名&_where=(a.charger序号,ne,null)",{}).then(function(data){
                    console.log(data.data);
                    //分配一下
                    var squall_temp_official = [];
                    var squall_temp_official_aim = [];
                    var squall_temp_official_姓名 = [];
                    for(var i=0;i<data.data.length;i++)
                    {
                        if(squall_temp_official.indexOf(data.data[i].a_guid)==-1)
                        {
                            squall_temp_official.push(data.data[i].a_guid);
                            squall_temp_official_aim.push(data.data[i].a_aim);
                            squall_temp_official_姓名.push(data.data[i].c_姓名);
                        }     
                    }
                    for(var i=0;i<squall_temp_official.length;i++)
                    {
                        squall_history_list.push({table:"official_application",table_alias:"公务用车",guid:squall_temp_official[i],aim:squall_temp_official_aim[i],"姓名":squall_temp_official_姓名[i]});
                    }


                    this_that.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.product_application,_j,c.personlist&_on1=(a.序号,eq,c.序号)&_fields=a.guid,a.aim,c.姓名",{}).then(function(data){
                        console.log(data.data);
                        var squall_temp_product = [];
                        var squall_temp_product_aim = [];
                        var squall_temp_product_姓名 = [];
                        for(var i=0;i<data.data.length;i++)
                        {
                            if(squall_temp_product.indexOf(data.data[i].a_guid)==-1)
                            {
                                squall_temp_product.push(data.data[i].a_guid);
                                squall_temp_product_aim.push(data.data[i].a_aim);
                                squall_temp_product_姓名.push(data.data[i].c_姓名);
                            }   
                        }
                        for(var i=0;i<squall_temp_product.length;i++)
                        {
                            squall_history_list.push({table:"product_application",table_alias:"生产用车",guid:squall_temp_product[i],aim:squall_temp_product_aim[i],"姓名":squall_temp_product_姓名[i]});
                        }

                        console.log(squall_history_list);
                        that.HistoryList = squall_history_list;

                    }).catch(function(err){
                        console.log(err);
                    })



                }).catch(function(err){
                    console.log(err);
                })
            }
        },
        GetHistoryItem:function(that,info){
            //console.log(info);
            //squall_Database_Host_IP+"/api/xjoin
            if(info.table=="official_application")
                var squall_option = {
                    "_join":"a." + info.table + ",_j,b.personlist,_j,c.personlist,_j,d.car",
                    "_on1":"(a.序号,eq,b.序号)",
                    "_on2":"(a.charger序号,eq,c.序号)",
                    "_on3":"(a.carid,eq,d.carid)",
                    "_fields":"a.driver,a.aim,a.task,a.starttime,a.endtime,a.waitpoint,a.region,b.姓名,c.姓名,d.车牌号,d.部门",
                    "_where":"(a.guid,eq," + info.guid + ")"
                };
            else
                var squall_option = {
                    "_join":"a." + info.table + ",_j,b.personlist,_j,d.car",
                    "_on1":"(a.序号,eq,b.序号)",
                    "_on2":"(a.carid,eq,d.carid)",
                    "_fields":"a.driver,a.aim,a.task,a.starttime,a.endtime,a.region,b.姓名,d.车牌号,d.部门",
                    "_where":"(a.guid,eq," + info.guid + ")"
                };
                
//squall_Database_Host_IP+"/api/" + info.table,{params:{"_where":"(guid,eq," + info.guid + ")"}}
            this.$http.get(squall_Database_Host_IP+"/api/xjoin",{params:squall_option}).then(function(data){
                console.log(data.data);

                //渲染详情
                var squall_temp_data={
                    "车牌号":data.data[0].d_车牌号,
                    "部门":data.data[0].d_部门,
                    "姓名":data.data[0].b_姓名,//info.姓名
                    "驾驶员":data.data[0].a_driver,
                    "目的地":data.data[0].a_aim,
                    "事由":data.data[0].a_task,
                    "开始时间":data.data[0].a_starttime,
                    "结束时间":data.data[0].a_endtime,
                    "等候地点":data.data[0].a_waitpoint,
                    "审核人":data.data[0].c_姓名,
                    "使用范围":data.data[0].a_region,
                    };

                var squall_test_json = JSON.parse(JSON.stringify(squall_temp_data));
                //console.log(squall_test_json);

                that.selectedInfo = squall_test_json;
                var squall_html = "";
                for(var index in squall_test_json)
                {
                    squall_html += "<div class='layui-row squall_item'>";
                    squall_html += '<div class="layui-col-xs4 layui-col-sm4 layui-col-md4"><span class=" squall_label">' + index + '：</span></div>';
                    squall_html += '<div class="layui-col-xs8 layui-col-sm8 layui-col-md8">' + squall_temp_data[index] + '</div>';
                    squall_html += "</div>";
                }
                that.show_html = squall_html;
                that.dialogVisible = true;

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