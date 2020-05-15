import Vue from 'vue'

//基础变量
var squall_Database_Host_IP = "http://122.227.234.10:8515/bcr/msdbapi";//  http://127.0.0.1:3003 http://192.168.10.144:8515/hsgtch 
var squall_data_server = "http://122.227.234.10:8515/bcr";// http://192.168.10.144:8400/page 

//动态变量
var squall_user_info = {};
var squall_right_info = {};


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

//日期格式化函数
function DateRemaker(DateStrWrong){
    var TempDate = new Date(DateStrWrong);
    var TempYear = TempDate.getFullYear();
    var TempMonth = (TempDate.getMonth()+1).toString();
    for(var i=0;i<2-TempMonth.length;i++)
        TempMonth = "0"+TempMonth;
    var TempDateDay = (TempDate.getDate()).toString();
    for(var i=0;i<2-TempDateDay.length;i++)
        TempDateDay = "0"+TempDateDay;
    var TempHour = (TempDate.getHours()).toString();
    for(var i=0;i<2-TempHour.length;i++)
        TempHour = "0"+TempHour;
    var TempMin = (TempDate.getMinutes()).toString();
    for(var i=0;i<2-TempMin.length;i++)
        TempMin = "0"+TempMin;
    var DateStrRight = TempYear + "-" + TempMonth + "-" + TempDateDay + " " + TempHour + ":" + TempMin + ":00";
    //console.log(DateStrRight);
    return DateStrRight;
}

//用户权限相关的请求函数
var squall_basic_http = new Vue({
    data:{
        "test":11111
    },
    methods:{
        GetInfo:function(guid,that){
            this.$http.jsonp(squall_data_server+'/login/info',{params:{"guid":guid}}).then(function(data){
                var squall_squall_temp_UseCarID;
                if(that.basic.squall_user_info.UseCarID)
                    squall_squall_temp_UseCarID = that.basic.squall_user_info.UseCarID;

                that.basic.squall_user_info = JSON.parse(data.bodyText);
                if(squall_squall_temp_UseCarID)
                    that.basic.squall_user_info.UseCarID = squall_squall_temp_UseCarID;

                if(!JSON.parse(data.bodyText).序号)
                {
                    that.$router.push({name:"Regist",params:{data:JSON.parse(data.bodyText),success:true}});
                }
                else
                {
                    //获取用户信息和权限
                    that.basic.squall_basic_http.GetGrant(that.basic.squall_user_info.序号,that);
                
                    //是否有已经在借的生产车辆
                    that.basic.squall_basic_http.GetOnUseList(that.basic.squall_user_info.序号,that);
                }
                if(that.squall_form)
                {
                    that.squall_form.driver = that.basic.squall_user_info.姓名;
                }
            }).catch(function(err){
                //alert(JSON.stringify(err));
            })
            //alert(JSON.stringify(that.basic.squall_user_info));
        },
        GetGrant:function(xuhao,that){
            this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.personlist,_j,b.person_role,_j,c.role,_j,d.role_right,_j,e.right&_on1=(a.序号,eq,b.序号)&_on2=(b.roleid,eq,c.roleid)&_on3=(c.roleid,eq,d.roleid)&_on4=(d.rightid,eq,e.rightid)&_fields=e.right&_where=(a.序号,eq," + xuhao + ")&_size=100000000000000").then(function(data){
                //that.basic.squall_user_info.姓名 = data.data[0].a_姓名;
                that.basic.squall_user_info.right = {};
                for(var i=0;i<data.data.length;i++)
                {
                    console.log(data.data[i].e_right);
                    if(data.data[i].e_right!="")
                        that.basic.squall_user_info.right[data.data[i].e_right] = data.data[i].e_right;
                    if(data.data[i].e_right=="生产用车")
                    {
                        that.ProductCar = true;
                    }
                    if(data.data[i].e_right=="经营用车")
                    {
                        that.OfficialCar = true;
                    }
                    if(data.data[i].e_right=="用车派遣")
                    {
                        that.HandleApplication = true;
                    }
                    if(data.data[i].e_right=="申请审核")
                    {
                        that.Tips = true;
                    }
                    if(data.data[i].e_right=="历史记录")
                    {
                        that.History = true;
                    }
                }
                //console.log(that.basic.squall_user_info);
                //console.log(xuhao);
            }).catch(function(err){
                alert(err);
            })
        },
        ExistUser:function(openid,that){
            this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.person,_j,b.personlist&_on1=(a.序号,eq,b.序号)&_fields=b.序号,a.openid,a.departmentid,b.部门,b.姓名&_where=(a.序号,eq," + openid + ")&_size=100000000000000",{}).then(function(data){
                if(data.body.length>0)
                {
                    //that.form.序号 = data.body[0].b_序号;
                    //that.form.departmentid = data.body[0].a_departmentid;
                    that.bind = false;
                    that.unbind = true;
                }
                else{
                    that.bind = true;
                    that.unbind = false;
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        PostForm:function(_Type,_Name,_Date){
            this.$http.post("http://192.168.10.235:8081/GeoHeyService/Service.asmx/GetRealByName").then(function(data){
                console.log(data);
            }).catch(function(err){
                alert(JSON.stringify(err));
            })
        },
        GetApplicationList:function(table,that){
            //需要连表查询，需要申请人名
            var squall_Url = squall_Database_Host_IP+"/api/xjoin?_join=a." + table + ",_j,b.personlist&_on1=(a.序号,eq,b.序号)&_fields=a.序号,a.aim,a.task,a.starttime,a.endtime,a.passtime,a.personpasstime1,a.personpasstime2,a.region,a.guid,b.部门,b.姓名,b.departmentid&_where=(a.charger,is,null)&_size=1000000000";
            if(table == "official_application")
                squall_Url = squall_Database_Host_IP+"/api/xjoin?_join=a." + table + ",_j,b.personlist&_on1=(a.序号,eq,b.序号)&_fields=a.序号,a.user,a.aim,a.waitpoint,a.task,a.starttime,a.endtime,a.passtime,a.personpasstime1,a.personpasstime2,a.region,a.guid,a.cartype,b.部门,b.姓名,b.departmentid&_where=(a.charger,is,null)&_size=1000000000";
            this.$http.get(squall_Url,{}).then(function(data){
                var squall_list = [];

                var squall_now_value = new Date().valueOf();

                for(var index in data.data)
                {
                    if(data.data[index].a_passtime==null||data.data[index].a_passtime=="")
                    {
                        var squall_endtime_value = new Date(data.data[index].a_endtime).valueOf();
                        data.data[index].guid = data.data[index].a_guid;
                        //没有审核阻塞的场合
                        // if(squall_now_value<squall_endtime_value)
                        //     squall_list.push(data.data[index]);
                            

                        //需要进行审核阻塞的场合
                        if(data.data[index].a_region=="市区内"&&squall_now_value<squall_endtime_value)
                        {
                            squall_list.push(data.data[index]);
                            //alert(JSON.stringify(data.data[index]));
                        }
                        else if(data.data[index].a_region=="大市区内"&&(data.data[index].a_personpasstime1!=null&&data.data[index].a_personpasstime1!="")&&squall_now_value<squall_endtime_value)
                        {
                            squall_list.push(data.data[index]);
                        }
                        else if(data.data[index].a_region=="大市区外"&&(data.data[index].a_personpasstime1!=null&&data.data[index].a_personpasstime1!="")&&(data.data[index].a_personpasstime2!=null&&data.data[index].a_personpasstime2!="")&&squall_now_value<squall_endtime_value)
                        {
                            squall_list.push(data.data[index]);
                        }

                    }
                }
                
                console.log(squall_list);

                that.ApplicationList = squall_list;
            },function(err){
                alert(JSON.stringify(err));
            })
        },
        GetAppListNeedPass:function(that){
            //console.log(that.basic.squall_user_info);
            var squall_now_value = new Date().valueOf();
            that.ApplicationList = [];
            //部门领导
            if(that.basic.squall_user_info.right["生产大市区外"]&&that.basic.squall_user_info.right["生产大市区内"])
            {
                //需要连表查询，需要申请人名
                this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.product_application,_j,b.personlist,_j,c.car&_on1=(a.序号,eq,b.序号)&_on2=(a.carid,eq,c.carid)&_fields=a.序号,a.aim,a.task,a.starttime,a.endtime,a.region,a.guid,b.部门,b.姓名,b.departmentid&_where=(c.TeamID,eq," + that.basic.squall_user_info.departmentid + ")~and(personpasstime1,is,null)&_size=100000000",{}).then(function(data){
                    var squall_list = [];

                    for(var index in data.data)
                    {
                        data.data[index].type = "生产用车";
                        
                        squall_list.push(data.data[index]);
                    }
                    
                    that.ApplicationList = squall_list;
                },function(err){
                    alert(JSON.stringify(err));
                })
            }
            //院长、书记
            else if(that.basic.squall_user_info.right["生产大市区外"]&&that.basic.squall_user_info.right["经营大市区外"])
            {
                var squall_list = [];
                //需要连表查询，需要申请人名
                this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.product_application,_j,b.personlist,_j,c.car&_on1=(a.序号,eq,b.序号)&_on2=(a.carid,eq,c.carid)&_fields=a.序号,a.aim,a.task,a.starttime,a.endtime,a.region,a.guid,a.personpasstime1,b.部门,b.姓名,b.departmentid&_where=(personpasstime2,is,null)&_size=100000000",{}).then(function(data){  
                    //console.log(data.data);
                    for(var index in data.data)
                    {
                        //阻塞审批
                        if(data.data[index].a_personpasstime1)
                        {
                            data.data[index].type = "生产用车";
                            squall_list.push(data.data[index]);
                        }

                        //非阻塞审批
                        // if(data.data[index].a_region=="大市区外")
                        // {
                        //     data.data[index].type = "生产用车";
                        //     squall_list.push(data.data[index]);
                        // }
                    }
                    
                    this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.official_application,_j,b.personlist&_on1=(a.序号,eq,b.序号)&_fields=a.序号,a.aim,a.task,a.starttime,a.endtime,a.region,a.guid,a.personpasstime1,a.cartype,b.部门,b.姓名,b.departmentid&_where=(personpasstime2,is,null)&_size=100000000000000",{}).then(function(data){
                        for(var index in data.data)
                        {
                            //阻塞审批
                            if(data.data[index].a_personpasstime1)
                            {
                                data.data[index].type = "经营用车";
                                var squall_endtime_value = new Date(data.data[index].a_endtime).valueOf();
                                if(squall_now_value<squall_endtime_value)
                                    squall_list.push(data.data[index]);
                            }

                            //非阻塞审批
                            // if(data.data[index].a_region=="大市区外")
                            // {
                            //     data.data[index].type = "生产用车";
                            //     squall_list.push(data.data[index]);
                            // }
                        }
                        //console.log(squall_list);
                        that.ApplicationList = squall_list;
                    },function(err){
                        alert(JSON.stringify(err));
                    })

                },function(err){
                    alert(JSON.stringify(err));
                })
            }
            //廖佳和宋向军
            else if(that.basic.squall_user_info.right["经营大市区外"]&&that.basic.squall_user_info.right["经营大市区内"])
            {
                //需要连表查询，需要申请人名
                this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.official_application,_j,b.personlist&_on1=(a.序号,eq,b.序号)&_fields=a.序号,a.aim,a.task,a.starttime,a.endtime,a.region,a.guid,a.personpasstime1,a.cartype,b.部门,b.姓名,b.departmentid&_where=(personpasstime1,is,null)&_size=100000000",{}).then(function(data){
                    var squall_list = [];

                    var squall_now_value = new Date().valueOf();

                    console.log(data.data);

                    for(var index in data.data)
                    {
                        data.data[index].type = "经营用车";
                        var squall_endtime_value = new Date(data.data[index].a_endtime).valueOf();
                        if(squall_now_value<squall_endtime_value&&data.data[index].a_region!="市区内")
                            squall_list.push(data.data[index]);
                    }

                    that.ApplicationList = squall_list;
                    
                },function(err){
                    alert(JSON.stringify(err));
                })
                
            }
        },
        GetSingleOnUseList:function(that,table){
            this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a." + table + ",_j,b.car,_j,c.personlist&_on1=(a.carid,eq,b.carid)&_on2=(a.序号,eq,c.序号)&_fields=a.guid,a.carid,a.endtime,b.车牌号,c.姓名&_size=100&_where=(a.endtime,like,9999~)&_size=100000000",{}).then(function(data){
                //当前时间
                var squall_now_value = new Date().valueOf();
                var squall_temp_product = [];
                var squall_temp_车牌号 = [];
                var squall_temp_姓名 = [];
                var squall_temp_carid = [];
                for(var i=0;i<data.data.length;i++)
                {
                    if(squall_now_value<new Date(data.data[i].a_endtime).valueOf())
                    {
                        squall_temp_product.push(data.data[i].a_guid);
                        squall_temp_车牌号.push(data.data[i].b_车牌号);
                        squall_temp_姓名.push(data.data[i].c_姓名);
                        squall_temp_carid.push(data.data[i].a_carid);
                    }    
                }

                for(var i=0;i<squall_temp_product.length;i++)
                {
                    if(that.OnUseList)
                        that.OnUseList.push({table:"product_application",table_alias:"生产用车",guid:squall_temp_product[i],"车牌号":squall_temp_车牌号[i],"姓名":squall_temp_姓名[i]});
                    
                    if(that.$route.params.UseCarID)
                    {
                        if(that.$route.params.UseCarID==squall_temp_carid[i])
                        {
                            alert("车辆正在使用，使用者为：" + squall_temp_姓名[i]);
                            that.$router.push({name:"Home",params:{success:false}});
                        }
                    }
                    
                    that.show_html += "<div class='layui-row squall_panel'>";
                    that.show_html += '<div class="layui-col-xs4 layui-col-sm4 layui-col-md4"><span class=" squall_label">' + squall_temp_姓名[i] + '</span></div>';
                    that.show_html += '<div class="layui-col-xs8 layui-col-sm8 layui-col-md8">' + squall_temp_车牌号[i] + '</div>';
                    that.show_html += "</div>";
                }

                var squall_Carlist = []
                for(var i=0;i<that.CarList.length;i++)
                {
                    var flag = -1;
                    for(var j=0;j<squall_temp_车牌号.length;j++)
                    {
                        if(that.CarList[i].车牌号==squall_temp_车牌号[j])
                            flag=j;
                    }
                    if(flag==-1)
                    {
                        squall_Carlist.push(that.CarList[i]);
                    }
                }
                that.CarList = squall_Carlist;

            },function(err){
                alert(JSON.stringify(err));
            })
        },
        PostOfficialInfo:function(data,that){
            var squall_data = JSON.parse(data);
            //squall_data.charger序号 = id;
            //alert(data);
            this.$http.get(squall_data_server+"/table/update?table=official_application&updateparams=" + encodeURIComponent(JSON.stringify(squall_data)),{}).then(function(data){
                that.Driver_dialogVisible = false;
                //alert(data.data);
                if(data.data=="true")
                {
                    that.$router.push({name:"Home",params:{type:"official_application",success:true}});
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        UpdateByGUID:function(that,table,data){
            var squall_data = JSON.parse(data);
            
            this.$http.get(squall_data_server+"/table/update?table=" + table + "&updateparams=" + encodeURIComponent(JSON.stringify(squall_data)),{}).then(function(data){
                if(data.data=="true")
                {
                    if(that.ApplicationList)
                    {
                        that.ApplicationList = [];
                        that.basic.squall_basic_http.GetAppListNeedPass(that);
                    }   
                    //that.$router.push({name:"Tips",params:{success:true}});
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        PostReturn:function(data,that,table){
            var squall_data = JSON.parse(data);
            var Now = new Date();
            squall_data.endtime = Now.getFullYear() + "-" +(Now.getMonth()+1) + "-" + Now.getDate() + " " + Now.getHours() + ":" + Now.getMinutes() + ":" + Now.getSeconds();
            this.$http.get(squall_data_server+"/table/update?table=" + table + "&updateparams=" + encodeURIComponent(JSON.stringify(squall_data)),{}).then(function(data){
                if(data.data=="true")
                {
                    that.$router.push({name:"Home",params:{type:"official_application",success:true}});
                }
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
            var squall_table = "official_application";
            if(that.selectedInfo.type=="生产用车")
                squall_table = "product_application";
            this.$http.get(squall_data_server+"/table/delete?table=" + squall_table + "&updateparams=" + encodeURIComponent(JSON.stringify(squall_temp_json),{})).then(function(data){
                if(data.data=="true")
                {
                    that.dialogVisible = false;
                    that.basic.squall_basic_http.GetAppListNeedPass(that);
                }
            },function(err){
                alert(JSON.stringify(err));
            })
        },
        GetHistory:function(that,option){
            if(option)
            {
                //根据option来筛选历史记录
                var squall_history_list = []
                var this_that = this;
                //获取生产用车的历史记录
                if(option.table=="product_application")
                {
                    //条件筛选
                    var squall_where = "(guid,ne,null)";
                    if(option.region)
                        squall_where += "~and(region,eq," + option.region + ")"
                    if(option.Time)
                    {
                        var squall_time_range_start = option.Time.getFullYear() + "-" +(option.Time.getMonth()+1) + "-" + option.Time.getDate() + " " + option.Time.getHours() + ":" + option.Time.getMinutes() + ":" + option.Time.getSeconds();
                        
                        if((option.Time.getMonth()+1)==12)
                            var squall_time_range_end = option.Time.getFullYear()+1 + "-1-" + option.Time.getDate() + " " + option.Time.getHours() + ":" + option.Time.getMinutes() + ":" + option.Time.getSeconds();
                        else
                            var squall_time_range_end = option.Time.getFullYear() + "-" +(option.Time.getMonth()+2) + "-" + option.Time.getDate() + " " + option.Time.getHours() + ":" + option.Time.getMinutes() + ":" + option.Time.getSeconds();
                        
                        squall_where += "~and(starttime,bw," + squall_time_range_start + "," + squall_time_range_end + ")"
                    } 
                    if(option.DepartmentList)
                    {
                        squall_where += "~and(";

                        for(var index in option.DepartmentList)
                        {
                            if(index==0)
                                squall_where += "(d.departmentid,eq," + option.DepartmentList[index] + ")"
                            else
                                squall_where += "~or(d.departmentid,eq," + option.DepartmentList[index] + ")"
                        }

                        squall_where += ")";

                    }

                    if(option.DepartmentID)
                    {
                        squall_where += "~and(";

                        squall_where += "(d.departmentid,eq," + option.DepartmentID + ")"

                        squall_where += ")";
                    }

                    if(option.CarID)
                    {
                        squall_where += "~and(";

                        squall_where += "(a.carid,eq," + option.CarID + ")"

                        squall_where += ")";
                    }
                    this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a." + option.table + ",_j,b.personlist,_j,c.car,_j,d.department&_on1=(a.序号,eq,b.序号)&_on2=(a.carid,eq,c.carid)&_on3=(b.departmentid,eq,d.departmentid)&_fields=a.guid,c.车牌号,a.starttime,a.endtime,a.aim,a.task,a.driver,b.姓名,d.charger&_where="+squall_where + "&_size=100000000000000",{}).then(function(data){
                        //分配一下
                        var squall_temp_list = [];
                        for(var i=0;i<data.data.length;i++)
                        {
                            var squall_temp_starttime = new Date(data.data[i].a_starttime);
                            var squall_temp_endtime = new Date(data.data[i].a_endtime);
                            var squall_temp_item = {
                                "guid":data.data[i].a_guid,
                                "车牌号":data.data[i].c_车牌号,
                                "starttime":squall_temp_starttime.getFullYear() + "-" +(squall_temp_starttime.getMonth()+1) + "-" + squall_temp_starttime.getDate() + " " + squall_temp_starttime.getHours() + ":" + squall_temp_starttime.getMinutes(),
                                "endtime":squall_temp_endtime.getFullYear() + "-" +(squall_temp_endtime.getMonth()+1) + "-" + squall_temp_endtime.getDate() + " " + squall_temp_endtime.getHours() + ":" + squall_temp_endtime.getMinutes(),
                                "aim":data.data[i].a_aim,
                                "task":data.data[i].a_task,
                                "driver":data.data[i].a_driver,
                                "姓名":data.data[i].b_姓名,
                                "charger":data.data[i].d_charger,
                            }

                            if(option.region=="大市区外")
                                squall_temp_item.dealer = that.basic.squall_user_info.姓名;
                                //squall_temp_item.boss = that.basic.squall_user_info.姓名;

                            squall_temp_list.push(squall_temp_item);
                        }

                        that.HistoryTotalList = squall_temp_list;
                        that.HistoryList = squall_temp_list.slice(0,12);
                        
                        that.TotalPageCount = squall_temp_list.length;
                        
                    }).catch(function(err){
                        console.log(err);
                    })
                }
                else if(option.table=="official_application")
                {
                    //条件筛选
                    var squall_where = "(guid,ne,null)";
                    if(option.region)
                        squall_where += "~and(region,eq," + option.region + ")"
                    if(option.Time)
                    {
                        var squall_time_range_start = option.Time.getFullYear() + "-" +(option.Time.getMonth()+1) + "-" + option.Time.getDate() + " " + option.Time.getHours() + ":" + option.Time.getMinutes() + ":" + option.Time.getSeconds();
                        
                        if((option.Time.getMonth()+1)==12)
                            var squall_time_range_end = option.Time.getFullYear()+1 + "-1-" + option.Time.getDate() + " " + option.Time.getHours() + ":" + option.Time.getMinutes() + ":" + option.Time.getSeconds();
                        else
                            var squall_time_range_end = option.Time.getFullYear() + "-" +(option.Time.getMonth()+2) + "-" + option.Time.getDate() + " " + option.Time.getHours() + ":" + option.Time.getMinutes() + ":" + option.Time.getSeconds();
                        
                        //console.log(option.Time.getFullYear() + "-" +(option.Time.getMonth()+1) + "-" + option.Time.getDate() + " " + option.Time.getHours() + ":" + option.Time.getMinutes() + ":" + option.Time.getSeconds());
                        squall_where += "~and(starttime,bw," + squall_time_range_start + "," + squall_time_range_end + ")"
                    } 
                    if(option.DepartmentList)
                    {
                        squall_where += "~and(";

                        for(var index in option.DepartmentList)
                        {
                            if(index==0)
                                squall_where += "(d.departmentid,eq," + option.DepartmentList[index] + ")"
                            else
                                squall_where += "~or(d.departmentid,eq," + option.DepartmentList[index] + ")"
                        }

                        squall_where += ")";

                    }
                    if(option.CarID)
                    {
                        squall_where += "~and(";

                        squall_where += "(a.carid,eq," + option.CarID + ")"

                        squall_where += ")";
                    }
                    this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a." + option.table + ",_j,b.personlist,_j,c.car,_j,d.department&_on1=(a.序号,eq,b.序号)&_on2=(a.carid,eq,c.carid)&_on3=(b.departmentid,eq,d.departmentid)&_fields=a.guid,c.车牌号,a.starttime,a.endtime,a.waitpoint,a.aim,a.task,a.driver,b.姓名,d.charger&_where="+squall_where + "&_size=100000000000000",{}).then(function(data){
                        //console.log(data.data);
                        //分配一下
                        var squall_temp_list = [];
                        for(var i=0;i<data.data.length;i++)
                        {
                            // if(squall_temp_official.indexOf(data.data[i].a_guid)==-1)
                            // {
                            var squall_temp_starttime = new Date(data.data[i].a_starttime);
                            var squall_temp_endtime = new Date(data.data[i].a_endtime);
                                var squall_temp_item = {
                                    "guid":data.data[i].a_guid,
                                    "车牌号":data.data[i].c_车牌号,
                                    "starttime":squall_temp_starttime.getFullYear() + "-" +(squall_temp_starttime.getMonth()+1) + "-" + squall_temp_starttime.getDate() + " " + squall_temp_starttime.getHours() + ":" + squall_temp_starttime.getMinutes(),
                                    "endtime":squall_temp_endtime.getFullYear() + "-" +(squall_temp_endtime.getMonth()+1) + "-" + squall_temp_endtime.getDate() + " " + squall_temp_endtime.getHours() + ":" + squall_temp_endtime.getMinutes(),
                                    "waitpoint":data.data[i].a_waitpoint,
                                    "aim":data.data[i].a_aim,
                                    "task":data.data[i].a_task,
                                    "driver":data.data[i].a_driver,
                                    "姓名":data.data[i].b_姓名,
                                    "charger":data.data[i].d_charger,
                                    "dealer":that.basic.squall_user_info.姓名
                                }

                                squall_temp_list.push(squall_temp_item);
                            //}     
                        }

                        that.HistoryTotalList = squall_temp_list;
                        that.HistoryList = squall_temp_list.slice(0,12);
                                
                        that.TotalPageCount = squall_temp_list.length;
                    }).catch(function(err){
                        console.log(err);
                    })
                }
            }
            else
            {
                var squall_history_list = []
                var this_that = this;
                //获取全部的历史记录
                this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.official_application,_j,c.personlist,_j,b.car&_on1=(a.序号,eq,c.序号)&_on2=(b.carid,eq,a.carid)&_fields=b.车牌号,a.guid,a.aim,a.starttime,a.endtime,a.region,a.passtime,a.personpasstime1,a.personpasstime2,a.task,a.driver,c.姓名&_where=(a.charger,ne,null)&_size=100000000000000",{}).then(function(data){
                    //console.log(data.data);
                    //分配一下
                    var squall_temp_official = [];
                    var squall_official_JsonList = [];
                    for(var i=0;i<data.data.length;i++)
                    {
                        var squall_officail_JsonItem = {table:"official_application",table_alias:"经营用车",guid:data.data[i].a_guid};
                        if(squall_temp_official.indexOf(data.data[i].a_guid)==-1)
                        {
                            squall_temp_official.push(data.data[i].a_guid);
                            squall_officail_JsonItem.aim = data.data[i].a_aim;
                            squall_officail_JsonItem.starttime = DateRemaker(data.data[i].a_starttime);
                            squall_officail_JsonItem.姓名 = (data.data[i].c_姓名);
                            squall_officail_JsonItem.region = data.data[i].a_region;
                            squall_officail_JsonItem.endtime = DateRemaker(data.data[i].a_endtime);
                            squall_officail_JsonItem.task = data.data[i].a_task;
                            squall_officail_JsonItem.driver = data.data[i].a_driver;
                            squall_officail_JsonItem.car = data.data[i].b_车牌号;

                            squall_official_JsonList.push(squall_officail_JsonItem);
                        }     
                    }
                    for(var i=0;i<squall_temp_official.length;i++)
                    {
                        squall_history_list.push(squall_official_JsonList[i]);
                    }


                    this_that.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.product_application,_j,c.personlist,_j,b.car&_on1=(a.序号,eq,c.序号)&_on2=(b.carid,eq,a.carid)&_fields=b.车牌号,a.guid,a.aim,a.starttime,a.driver,a.endtime,a.region,a.passtime,a.personpasstime1,a.personpasstime2,a.task,c.姓名&_size=100000000000000",{}).then(function(data){
                        var squall_temp_product = [];
                        var squall_product_JsonList = [];
                        for(var i=0;i<data.data.length;i++)
                        {
                            var squall_product_JsonItem = {table:"product_application",table_alias:"生产用车",guid:data.data[i].a_guid};
                            if(squall_temp_product.indexOf(data.data[i].a_guid)==-1)
                            {
                                squall_temp_product.push(data.data[i].a_guid);
                                squall_product_JsonItem.aim = data.data[i].a_aim;
                                squall_product_JsonItem.starttime = DateRemaker(data.data[i].a_starttime);
                                squall_product_JsonItem.姓名 = (data.data[i].c_姓名);
                                squall_product_JsonItem.region = data.data[i].a_region;
                                squall_product_JsonItem.endtime = DateRemaker(data.data[i].a_endtime);
                                squall_product_JsonItem.task = data.data[i].a_task;
                                squall_product_JsonItem.driver = data.data[i].a_driver;
                                squall_officail_JsonItem.car = data.data[i].b_车牌号;

                                squall_product_JsonList.push(squall_product_JsonItem);
                            }   
                        }
                        for(var i=0;i<squall_temp_product.length;i++)
                        {
                            squall_history_list.push(squall_product_JsonList[i]);
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
            if(info.table=="official_application")
                var squall_option = {
                    "_join":"a." + info.table + ",_j,b.personlist,_j,c.personlist,_j,d.car",
                    "_on1":"(a.序号,eq,b.序号)",
                    "_on2":"(a.charger,eq,c.序号)",
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
            this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.official_application,_j,b.car,_j,c.personlist&_on1=(a.carid,eq,b.carid)&_on2=(a.序号,eq,c.序号)&_fields=a.guid,a.carid,b.车牌号,a.endtime,a.waitpoint,a.driver&_where=(a.序号,eq," + id + ")&_size=100000000000000",{}).then(function(data){
                //分配一下
                var squall_temp_official = [];
                var squall_temp_车牌号 = [];
                var squall_temp_carid = [];
                var squall_temp_waitpoint = [];
                var squall_temp_driver = [];
                for(var i=0;i<data.data.length;i++)
                {
                    var squall_endtime_value = new Date(data.data[i].a_endtime).valueOf();
                    if(squall_now_value<squall_endtime_value)
                    {
                        squall_temp_official.push(data.data[i].a_guid);
                        squall_temp_车牌号.push(data.data[i].b_车牌号);
                        squall_temp_carid.push(data.data[i].a_carid);
                        squall_temp_waitpoint.push(data.data[i].a_waitpoint);
                        squall_temp_driver.push(data.data[i].a_driver);
                    }     
                    else
                    {
                    }
                }
                for(var i=0;i<squall_temp_official.length;i++)
                {
                    squall_on_use_list.push({table:"official_application",table_alias:"经营用车",guid:squall_temp_official[i],"车牌号":squall_temp_车牌号[i],"carid":squall_temp_carid[i]});
                }
                
                if(squall_temp_official.length>0)
                    alert("您已借用经营用车,等候地点为" + squall_temp_waitpoint[0] + ",驾驶员是" + squall_temp_driver[0]);

                //获取全部的正在申请的记录
                this.$http.get(squall_Database_Host_IP+"/api/official_application?_where=(passtime,eq,null)&_size=100000000000000",{}).then(function(data){
                    for(var i=0;i<data.data.length;i++)
                    {
                        squall_on_application_list.push(data.data[i]);
                    }
                },function(err){
                    console.log(JSON.stringify(err));
                })

                this_that.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.product_application,_j,b.car,_j,c.personlist&_on1=(a.carid,eq,b.carid)&_on2=(a.序号,eq,c.序号)&_fields=a.guid,a.carid,a.endtime,b.车牌号,c.姓名&_where=(a.序号,eq," + id + ")&_size=100000000000000",{}).then(function(data){
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
                    else if(that.basic.squall_user_info.UseCarID&&that.$route.params.success!=false)
                        that.$router.push({name:"ProductCar",params:{UseCarID:that.basic.squall_user_info.UseCarID,success:true}});

                    if(that.basic.squall_user_info.UseCarID)
                        that.UseCarID = that.basic.squall_user_info.UseCarID;

                    that.OnUseList = squall_on_use_list;

                    if(that.form)
                    {
                        that.form.carid=squall_on_use_list[0].车牌号;
                        that.form.type=squall_on_use_list[0].table_alias;
                        that.SelectedInfo = squall_on_use_list[0];
                    }
                    // if(that.ProductCar&&that.OfficialCar)
                    //     that.Return = false;

                }).catch(function(err){
                    console.log(err);
                })



            }).catch(function(err){
                console.log(err);
            })
        },
        GetOnUseListForReturn:function(UserID,UserName,that){
            //当前时间
            var squall_now_value = new Date().valueOf();

            var squall_on_use_list = []
            var squall_on_application_list = []
            var this_that = this;
            //获取全部的历史记录
            this.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.official_application,_j,b.car,_j,c.personlist&_on1=(a.carid,eq,b.carid)&_on2=(a.序号,eq,c.序号)&_fields=a.guid,a.carid,b.车牌号,a.endtime,a.waitpoint,a.driver&_where=(a.driver,eq," + UserName + ")&_size=100000000000000",{}).then(function(data){
                //分配一下
                var squall_temp_official = [];
                var squall_temp_车牌号 = [];
                var squall_temp_carid = [];
                var squall_temp_waitpoint = [];
                var squall_temp_driver = [];
                for(var i=0;i<data.data.length;i++)
                {
                    var squall_endtime_value = new Date(data.data[i].a_endtime).valueOf();
                    if(squall_now_value<squall_endtime_value)
                    {
                        squall_temp_official.push(data.data[i].a_guid);
                        squall_temp_车牌号.push(data.data[i].b_车牌号);
                        squall_temp_carid.push(data.data[i].a_carid);
                        squall_temp_waitpoint.push(data.data[i].a_waitpoint);
                        squall_temp_driver.push(data.data[i].a_driver);
                    }     
                    else
                    {
                    }
                }
                for(var i=0;i<squall_temp_official.length;i++)
                {
                    squall_on_use_list.push({table:"official_application",table_alias:"经营用车",guid:squall_temp_official[i],"车牌号":squall_temp_车牌号[i],"carid":squall_temp_carid[i]});
                }
                
                if(squall_temp_official.length>0)
                    alert("您已借用经营用车,等候地点为" + squall_temp_waitpoint[0] + ",驾驶员是" + squall_temp_driver[0]);

                //获取全部的正在申请的记录
                this.$http.get(squall_Database_Host_IP+"/api/official_application?_where=(passtime,eq,null)&_size=100000000000000",{}).then(function(data){
                    for(var i=0;i<data.data.length;i++)
                    {
                        squall_on_application_list.push(data.data[i]);
                    }
                },function(err){
                    console.log(JSON.stringify(err));
                })

                this_that.$http.get(squall_Database_Host_IP+"/api/xjoin?_join=a.product_application,_j,b.car,_j,c.personlist&_on1=(a.carid,eq,b.carid)&_on2=(a.序号,eq,c.序号)&_fields=a.guid,a.carid,a.endtime,b.车牌号,c.姓名&_where=(a.序号,eq," + UserID + ")&_size=100000000000000",{}).then(function(data){
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
                    else if(that.basic.squall_user_info.UseCarID&&that.$route.params.success!=false)
                        that.$router.push({name:"ProductCar",params:{UseCarID:that.basic.squall_user_info.UseCarID,success:true}});

                    if(that.basic.squall_user_info.UseCarID)
                        that.UseCarID = that.basic.squall_user_info.UseCarID;

                    that.OnUseList = squall_on_use_list;

                    if(that.form)
                    {
                        that.form.carid=squall_on_use_list[0].车牌号;
                        that.form.type=squall_on_use_list[0].table_alias;
                        that.SelectedInfo = squall_on_use_list[0];
                    }
                    // if(that.ProductCar&&that.OfficialCar)
                    //     that.Return = false;

                }).catch(function(err){
                    console.log(err);
                })



            }).catch(function(err){
                console.log(err);
            })
        },
        GetDepartmentCarList:function(departmentid,that,options){
            //当前时间
            var squall_now_value = new Date().valueOf();

            var squall_on_use_list = []
            var this_that = this;
            var squall_url = "";
            //获取全部的历史记录
            if(that.$route.params.UseCarID)
                squall_url = squall_Database_Host_IP+"/api/xjoin?_join=a.department,_j,b.car&_on1=(a.部门,eq,b.部门)&_fields=b.车牌号,b.carid&_where=(a.departmentid,eq," + departmentid + ")~or(b.carid,eq," + that.$route.params.UseCarID + ")&_size=100000000000000";
            else
                squall_url = squall_Database_Host_IP+"/api/xjoin?_join=a.department,_j,b.car&_on1=(a.部门,eq,b.部门)&_fields=b.车牌号,b.carid&_where=(a.departmentid,eq," + departmentid + ")&_size=100000000000000";

            this.$http.get(squall_url,{}).then(function(data){
                
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
                
                if(!options)
                    that.basic.squall_basic_http.GetSingleOnUseList(that,"product_application");

            }).catch(function(err){
                console.log(err);
            })
        },
        GetDepartmentList:function(that,Option){
            var squall_department_list_temp = []
            //获取全部的历史记录
            this.$http.get(squall_Database_Host_IP+"/api/department",{}).then(function(data){
                
                for(var i=0;i<data.data.length;i++)
                {
                    var squall_temp_json = {
                        "部门":data.data[i].部门,
                        "departmentid":data.data[i].departmentid,
                    }
                    squall_department_list_temp.push(squall_temp_json);
                }
                
                if(squall_department_list_temp.length>0)
                    that.DepartmentList = squall_department_list_temp;

            }).catch(function(err){
                console.log(err);
            })
        },
        GetPersonList:function(departmentid,that){
            
            var squall_number_list_temp = [];
            var squall_departmentid = departmentid;
            //获取已注册记录
            this.$http.get(squall_Database_Host_IP+"/api/person?_where=(departmentid,eq," + squall_departmentid + ")&_size=10000",{}).then(function(data){

                var squall_url = squall_Database_Host_IP+"/api/personlist?_where=";
                for(var i=0;i<data.data.length;i++)
                {
                    if(data.data[i].序号!=that.basic.squall_user_info.序号)
                        squall_url += "(序号,ne," + data.data[i].序号 + ")~and";
                }
                    //alert(departmentid);
                squall_url += "(departmentid,eq," + squall_departmentid + ")";
                squall_url += "&_size=1000";
                
                //获取全部的历史记录
                this.$http.get(squall_url,{}).then(function(data){
                    
                    for(var i=0;i<data.data.length;i++)
                    {
                        squall_number_list_temp.push(data.data[i]);
                    }
                    
                    //alert(data.data[0]);

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

//时间戳
var squall_now = function(){
    var Now = new Date();
    var squall_month = (Now.getMonth()+1).toString();
    var squall_date = Now.getDate().toString();
    var squall_hours = Now.getHours().toString();
    var squall_minutes = Now.getMinutes().toString();
    var squall_Seconds = Now.getSeconds().toString();

    for(var i=0;i<2-(Now.getMonth()+1).toString().length;i++)
        squall_month = "0" + squall_month;
        
    for(var i=0;i<2-Now.getDate().toString().length;i++)
        squall_date = "0" + squall_date;
        
    for(var i=0;i<2-Now.getHours().toString().length;i++)
        squall_hours = "0" + squall_hours;
        
    for(var i=0;i<2-Now.getMinutes().toString().length;i++)
        squall_minutes = "0" + squall_minutes;
        
    for(var i=0;i<2-Now.getSeconds().toString().length;i++)
        squall_Seconds = "0" + squall_Seconds;

    return Now.getFullYear() + "-" + squall_month + "-" + squall_date + " " + squall_hours + ":" + squall_minutes + ":" + squall_Seconds;
}

export default{
    "ms_DatabaseUrl":squall_Database_Host_IP,
    "test_function":squall_start,
    "squall_guid":squall_guid,
    "squall_basic_http":squall_basic_http,
    "squall_user_info":squall_user_info,
    "squall_right_info":squall_right_info,
    "squall_Host":squall_data_server,
    "Now":squall_now
}

//xmysql -h localhost -u root -p 123456 -d carrent