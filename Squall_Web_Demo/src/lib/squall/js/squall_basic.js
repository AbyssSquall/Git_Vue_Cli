import Vue from 'vue';

console.log("Squal基础js库已被加载！");

var squall_start =function(){
    console.log("Squall基础库已经可以正常使用！");
    return "一个正常的函数返回！";
}

//网络交互
var squall_basic_http = new Vue({
    data:{
        "test":11111
    },
    methods:{
        TestUpdate:function(that){
            this.$http.patch("http://192.168.10.144:8417/api/car/111111",{params:{"部门":"111"}}).then(function(data){
                console.log(data);
            }).catch(function(err){
                console.log(err);
            })
        },
        TestSelect:function(that){
            this.$http.get("http://192.168.10.144:8417/api/car",{}).then(function(data){
                console.log(data);
            },function(err){
                alert(JSON.stringify(err));
            })
        },
        Unbind:function(data,that){
            this.$http.get(squall_data_server+"/table/delete?table=person&updateparams=" + encodeURIComponent(data) + "&index=openid",{}).then(function(data){
                if(data.data=="true")
                {
                    that.bind = true;
                    that.unbind = false;
                    that.basic.squall_user_info.序号 = undefined;
                    that.basic.squall_user_info.姓名 = undefined;
                }
            },function(err){
                alert(err);
            })
        },
        disagree:function(guid,that){
            var squall_temp_json = {'guid':guid};
            this.$http.get(squall_data_server+"/table/delete?table=official_application&updateparams=" + encodeURIComponent(JSON.stringify(squall_temp_json),{})).then(function(data){
                if(data.data=="true")
                {
                    that.dialogVisible = false;
                    that.basic.squall_basic_http.GetApplicationList("official_application",that);
                }
            },function(err){
                alert(JSON.stringify(err));
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
                this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.official_application,_j,c.personlist&_on1=(a.序号,eq,c.序号)&_fields=a.guid,a.aim,a.starttime,c.姓名&_where=(a.charger序号,ne,null)",{}).then(function(data){
                    console.log(data.data);
                    //分配一下
                    var squall_temp_official = [];
                    var squall_temp_official_aim = [];
                    var squall_temp_official_姓名 = [];
                    var squall_temp_official_starttime = [];
                    for(var i=0;i<data.data.length;i++)
                    {
                        if(squall_temp_official.indexOf(data.data[i].a_guid)==-1)
                        {
                            squall_temp_official.push(data.data[i].a_guid);
                            squall_temp_official_aim.push(data.data[i].a_aim);
                            squall_temp_official_starttime.push(data.data[i].a_starttime);
                            squall_temp_official_姓名.push(data.data[i].c_姓名);
                        }     
                    }
                    for(var i=0;i<squall_temp_official.length;i++)
                    {
                        squall_history_list.push({table:"official_application",table_alias:"公务用车",guid:squall_temp_official[i],aim:squall_temp_official_aim[i],"姓名":squall_temp_official_姓名[i],"开始时间":squall_temp_official_starttime[i]});
                    }


                    this_that.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.product_application,_j,c.personlist&_on1=(a.序号,eq,c.序号)&_fields=a.guid,a.aim,a.starttime,c.姓名",{}).then(function(data){
                        console.log(data.data);
                        var squall_temp_product = [];
                        var squall_temp_product_aim = [];
                        var squall_temp_product_姓名 = [];
                        var squall_temp_official_starttime = [];
                        for(var i=0;i<data.data.length;i++)
                        {
                            if(squall_temp_product.indexOf(data.data[i].a_guid)==-1)
                            {
                                squall_temp_product.push(data.data[i].a_guid);
                                squall_temp_product_aim.push(data.data[i].a_aim);
                                squall_temp_official_starttime.push(data.data[i].a_starttime);
                                squall_temp_product_姓名.push(data.data[i].c_姓名);
                            }   
                        }
                        for(var i=0;i<squall_temp_product.length;i++)
                        {
                            squall_history_list.push({table:"product_application",table_alias:"生产用车",guid:squall_temp_product[i],aim:squall_temp_product_aim[i],"姓名":squall_temp_product_姓名[i],"开始时间":squall_temp_official_starttime[i]});
                        }

                        that.HistoryList = squall_history_list;
                        that.TotalHistoryList = squall_history_list;

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
        },
        GetOnUseList:function(id,that){
            //当前时间
            var squall_now_value = new Date().valueOf();

            var squall_on_use_list = []
            var squall_on_application_list = []
            var this_that = this;
            //获取全部的历史记录
            this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.official_application,_j,b.car,_j,c.personlist&_on1=(a.carid,eq,b.carid)&_on2=(a.序号,eq,c.序号)&_fields=a.guid,a.carid,b.车牌号,a.endtime&_where=(a.序号,eq," + id + ")",{}).then(function(data){
                
                //分配一下
                var squall_temp_official = [];
                var squall_temp_车牌号 = [];
                var squall_temp_carid = [];
                for(var i=0;i<data.data.length;i++)
                {
                    var squall_endtime_value = new Date(data.data[i].a_endtime).valueOf();
                    if(squall_now_value<squall_endtime_value)
                    {
                        squall_temp_official.push(data.data[i].a_guid);
                        squall_temp_车牌号.push(data.data[i].b_车牌号);
                        squall_temp_carid.push(data.data[i].a_carid);
                    }     
                    else
                    {
                    }
                }
                for(var i=0;i<squall_temp_official.length;i++)
                {
                    squall_on_use_list.push({table:"official_application",table_alias:"公务用车",guid:squall_temp_official[i],"车牌号":squall_temp_车牌号[i],"carid":squall_temp_carid[i]});
                }
                
                // if(squall_temp_official.length>0)
                //     that.OfficialCar = false;
                if(squall_temp_official.length>0)
                    alert("您已借用" + squall_temp_official.length + "辆公务用车");

                //获取全部的正在申请的记录
                this.$http.get(squall_Database_Host_IP+"/api/official_application?_where=(passtime,eq,null)",{}).then(function(data){
                    for(var i=0;i<data.data.length;i++)
                    {
                        squall_on_application_list.push(data.data[i]);
                    }
                },function(err){
                    console.log(JSON.stringify(err));
                })
                if(squall_temp_official.length>0)
                    alert("您有" + squall_temp_official.length + "条公务用车申请还未审核");

                this_that.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.product_application,_j,b.car,_j,c.personlist&_on1=(a.carid,eq,b.carid)&_on2=(a.序号,eq,c.序号)&_fields=a.guid,a.carid,a.endtime,b.车牌号,c.姓名&_where=(a.序号,eq," + id + ")",{}).then(function(data){
                    //console.log(data.data);
                    var squall_temp_product = [];
                    var squall_temp_车牌号 = [];
                    var squall_temp_carid = [];
                    for(var i=0;i<data.data.length;i++)
                    {
                        var squall_endtime_value = new Date(data.data[i].a_endtime).valueOf();
                        if(squall_now_value<squall_endtime_value)
                        {
                            squall_temp_product.push(data.data[i].a_guid);
                            squall_temp_车牌号.push(data.data[i].b_车牌号);
                            squall_temp_carid.push(data.data[i].a_carid);
                        }   
                    }
                    for(var i=0;i<squall_temp_product.length;i++)
                    {
                        squall_on_use_list.push({table:"product_application",table_alias:"生产用车",guid:squall_temp_product[i],"车牌号":squall_temp_车牌号[i],"carid":squall_temp_carid[i]});
                    }

                    if(squall_temp_product.length>0)
                    {
                        that.ProductCar = false;
                        if(that.basic.squall_user_info.UseCarID)
                            that.$router.push({name:"Return",params:{data:JSON.parse(data.bodyText),success:true}});
                    }
                    else if(that.basic.squall_user_info.UseCarID)
                        that.$router.push({name:"ProductCar",params:{UseCarID:that.basic.squall_user_info.UseCarID,success:true}});

                    that.OnUseList = squall_on_use_list;

                    if(that.form)
                    {
                        that.form.carid=squall_on_use_list[0].车牌号;
                        that.form.type=squall_on_use_list[0].table_alias;
                        that.SelectedInfo = squall_on_use_list[0];
                    }
                    if(that.ProductCar&&that.OfficialCar)
                        that.Return = false;

                }).catch(function(err){
                    console.log(err);
                })



            }).catch(function(err){
                console.log(err);
            })
        },
        GetDepartmentCarList:function(departmentid,that){
            //当前时间
            var squall_now_value = new Date().valueOf();

            var squall_on_use_list = []
            var this_that = this;
            //获取全部的历史记录
            this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.department,_j,b.car&_on1=(a.部门,eq,b.部门)&_fields=b.车牌号,b.carid&_where=(a.departmentid,eq," + departmentid + ")",{}).then(function(data){
                
                //分配一下
                var squall_car_list = [];

                for(var i=0;i<data.data.length;i++)
                {
                    var squall_temp_car = {};
                    squall_temp_car.车牌号 = data.data[i].b_车牌号;
                    squall_temp_car.carid = data.data[i].b_carid;

                    squall_car_list.push(squall_temp_car);
                }
                
                that.CarList = squall_car_list;
                
                that.basic.squall_basic_http.GetSingleOnUseList(that,"product_application");

            }).catch(function(err){
                console.log(err);
            })
        },
        GetDepartmentList:function(that){
            var squall_department_list_temp = []
            //获取全部的历史记录
            this.$http.get(squall_Database_Host_IP+"/api/department",{}).then(function(data){
                
                for(var i=0;i<data.data.length;i++)
                {
                    squall_department_list_temp.push(data.data[i]);
                }
                
                if(squall_department_list_temp.length>0)
                    that.DepartmentList = squall_department_list_temp;

            }).catch(function(err){
                console.log(err);
            })
        },
        GetPersonList:function(departmentid,that){
            
            var squall_number_list_temp = [];
            //获取已注册记录
            this.$http.get(squall_Database_Host_IP+"/api/person?_size=500",{}).then(function(data){

                var squall_url = squall_Database_Host_IP+"/api/personlist?_where=";
                for(var i=0;i<data.data.length;i++)
                {
                    if(data.data[i].序号!=that.basic.squall_user_info.序号)
                        squall_url += "(序号,ne," + data.data[i].序号 + ")~and";
                }
                squall_url += "(departmentid,eq," + departmentid + ")";
                //squall_url = squall_url.substr(0,squall_url.length-4);
                squall_url += "&_size=100";
                
                //alert(squall_url);
                //获取全部的历史记录
                this.$http.get(squall_url,{}).then(function(data){
                    
                    for(var i=0;i<data.data.length;i++)
                    {
                        squall_number_list_temp.push(data.data[i]);
                    }
                    
                    if(squall_number_list_temp.length>0)
                        that.NumberList = squall_number_list_temp;

                }).catch(function(err){
                    console.log(err);
                })

            }).catch(function(err){
                console.log(err);
            })
        }
    }

})

export default{
    "test_string":"一个正常的变量测试",
    "test_function":squall_start.basic,
    "squall_basic_http":squall_basic_http
}