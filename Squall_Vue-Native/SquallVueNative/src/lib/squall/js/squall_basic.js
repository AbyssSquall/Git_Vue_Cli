import Vue from 'vue';

console.log("Squall基础js库已被加载！");

var NormalDatabaseInterface = "http://122.227.234.10:2368/hswj/data";
var SpecialDatabaseInterface = "http://122.227.234.10:8515/base";// http://127.0.0.1:8405/base http://192.168.10.144:8405/base

var BasicTool ={
    PointAdjust:function(Number,PointPosition){
        var Result = 0;
        var squall_count = 1;
        for(var i=0;i<PointPosition;i++)
            squall_count *= 10;
        Result = parseInt(Number*squall_count)/squall_count;

        return Result;
    },
    DateString:function(){
        var squall_DateData = new Date();
        var squall_Month = (squall_DateData.getMonth()+1).toString();
        var squall_Date = squall_DateData.getDate().toString();

        for(var i=0;i<2-(squall_DateData.getMonth()+1).toString().length;i++)
        {
            squall_Month = "0" + squall_Month;
        }

        for(var i=0;i<2-squall_DateData.getDate().toString().length;i++)
        {
            squall_Date = "0" + squall_Date;
        }
        
        return squall_DateData.getFullYear() + "-" + squall_Month + "-" + squall_Date;
    },
    ReMakeDateString:function(DateString){
        var squall_DateData = DateString.split('-');
        var squall_Month = squall_DateData[1];
        var squall_Date = squall_DateData[2];

        for(var i=0;i<2-squall_DateData[1].length;i++)
        {
            squall_Month = "0" + squall_Month;
        }

        for(var i=0;i<2-squall_DateData[2].length;i++)
        {
            squall_Date = "0" + squall_Date;
        }
        
        return squall_DateData[0] + "-" + squall_Month + "-" + squall_Date;
    },
    CreateGuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    },
    EnThinPicture(File){
        var initSize = File.src.length;
        var width = File.width;
        var height = File.height;

        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        var ratio;
        if ((ratio = width * height / 4000000)>1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        }else {
            ratio = 1;
        }

        canvas.width = width;
        canvas.height = height;

//        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //如果图片像素大于100万则使用瓦片绘制
        var count;
        if ((count = width * height / 1000000) > 1) {
            count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片

//            计算每块瓦片的宽和高
            var nw = ~~(width / count);
            var nh = ~~(height / count);

            tCanvas.width = nw;
            tCanvas.height = nh;

            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    tctx.drawImage(File, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            ctx.drawImage(File, 0, 0, width, height);
        }

        //进行最小压缩
        var ndata = canvas.toDataURL('image/jpeg', 0.1);

        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

        return ndata;
    }
}

//网络交互
var squall_basic_http = new Vue({
    data:{
        "DatabaseHostIP":"http://122.227.234.10:2368",
    },
    methods:{
        CheckLogin:function(data,that){
            that.$router.push({path:"/login",params:{data:"",success:true}});
        },
        Login:function(that){
            this.$http.get(this.DatabaseHostIP+"/hswj/data/api/user?_where=(username,eq," + that.LoginData.Username + ")~_and,(password,eq," + that.LoginData.Password + ")",{}).then(function(data){
                if(data)
                {
                    if(data.data.length==1)
                    {
                        console.log("验证通过!");
                        that.$router.push({path:"/",query:{data:"",Login:true}});
                        that.global.username = that.LoginData.Username;
                        that.global.password = that.LoginData.Password;
                        that.global.sbdw = "集士港镇城管局";
                        that.global.lxr = "小李";
                        that.global.lxfs = "13912341234";
                    }
                    else{
                        console.log("未验证通过!");
                    }
                }
            },function(err){
                alert(JSON.stringify(err));
            })
        },
        GetDealList:function(that,Option){
            that.ProjectList = [];
            var squall_url = NormalDatabaseInterface+"/api/xjoin?_join=a.illegalconstruction,_j,b.chuzhi&_on1=(a.id,eq,b.id)&_fields=a.id,a.wjdd,a.wjsyr&_where=(a.id,ne,null)";
            if(Option.keywords)
            {
                squall_url += "~and(a.wjdd,like,~" + Option.keywords + "~)";
            }
            squall_url += "&_size=100000";
            //var this_that = this;
            //获取全部的历史记录
            this.$http.get(squall_url,{}).then(function(data){
                for(var ItemIndex in data.data)
                {
                    var squall_TempItem = {};
                    squall_TempItem.wjdd = data.data[ItemIndex].a_wjdd + data.data[ItemIndex].a_wjsyr;
                    squall_TempItem.id = data.data[ItemIndex].a_id;
                    that.ProjectList.push(squall_TempItem);
                }
                
            }).catch(function(err){
                console.log(err);
            })
        },
        GetIllegalconstructionList:function(that,Option){
            var squall_url = NormalDatabaseInterface+"/api/illegalconstruction?_where=(id,ne,null)";
            if(Option.keywords)
            {
                squall_url += "~and(wjdd,like,~" + Option.keywords + "~)";
            }
            if(Option.all==undefined)
            {
                squall_url += "~and(shenhezt,eq,通过)";
            }
            squall_url += "&_size=100000";
            //console.log(squall_url);
            //获取全部的记录
            this.$http.get(squall_url,{}).then(function(data){
                //console.log(data.data.length);
                that.ProjectList = [];
                for(var ItemIndex in data.data)
                {
                    var squall_TempItem = {};
                    squall_TempItem.wjdd = data.data[ItemIndex].wjdd + data.data[ItemIndex].wjsyr;
                    squall_TempItem.id = data.data[ItemIndex].id;
                    that.ProjectList.push(squall_TempItem);
                }

            }).catch(function(err){
                console.log(err);
            })
        },
        GetDealInfo:function(that,Option){
            that.zhaopian_czq = [];
            that.zhaopian_czh = [];
            this.$http.get(NormalDatabaseInterface+"/api/chuzhi?_where=(id,eq," + Option.id + ")",{}).then(function(data){
                if(data.data.length>0)
                {
                    for(var InfoIndex in that.DealForm)
                    {
                        that.DealForm[InfoIndex] = data.data[0][InfoIndex];
                    }  
                    if(data.data[0].zhaopian_czq) 
                    {
                        var squall_PicNameList = data.data[0].zhaopian_czq.split('-');
                        squall_PicNameList.shift();
                        that.zhaopian_czq = [{
                                name:squall_PicNameList.join('-'),
                                url:NormalDatabaseInterface + "/download?name=" + data.data[0].zhaopian_czq
                        }]
                    }    
                    if(data.data[0].zhaopian_czh)
                    {
                        var squall_PicNameList = data.data[0].zhaopian_czh.split('-');
                        squall_PicNameList.shift();
                        that.zhaopian_czh = [{
                                name:squall_PicNameList.join('-'),
                                url:NormalDatabaseInterface + "/download?name=" + data.data[0].zhaopian_czh
                        }]
                    }
                }
                else{
                    for(var InfoIndex in that.DealForm)
                    {
                        that.DealForm[InfoIndex] = "";
                    }
                    that.DealForm.czrq = BasicTool.DateString();
                    that.DealForm.bsdw_czxx = that.global.sbdw;
                    that.DealForm.bsr_czxx = that.global.lxr;
                    that.DealForm.lxfs = that.global.lxfs;
                }

            }).catch(function(err){
                console.log(err);
            })
        },
        GetReuseInfo:function(that,Option){
            //获取全部的历史记录
            this.$http.get(NormalDatabaseInterface+"/api/lylist?_where=(id,eq," + Option.id + ")&_size=1000000000",{}).then(function(data){
                that.ReuseList = [];
                if(data.data.length>0)
                {
                    var squall_InfoList = data.data;
                    that.SelectInfo = squall_InfoList;

                    for(var InfoIndex in squall_InfoList)
                    {
                        //console.log(squall_InfoList[InfoIndex]);
                        that.ReuseList.push({
                            "Time":squall_InfoList[InfoIndex].lysj,
                            "UseStyle":squall_InfoList[InfoIndex].lylx,
                            "UseSize":squall_InfoList[InfoIndex].bylymj,
                        });
                    }
                }
                else{
                    that.SelectInfo = [];
                }

            }).catch(function(err){
                console.log(err);
            })
        },
        GetBasicInfo:function(that,Option){
            //获取已注册记录
            this.$http.get(NormalDatabaseInterface+"/api/illegalconstruction?_where=(id,eq," + Option.id + ")",{}).then(function(data){
                if(data.data.length>0)
                {
                    for(var InfoIndex in that.InfoForm)
                    {
                        that.InfoForm[InfoIndex] = data.data[0][InfoIndex];
                    }
                    if(data.data[0].coord_x&&data.data[0].coord_y)
                        that.InfoForm.LatLng = "经度:" + data.data[0].coord_x + ",纬度:" + data.data[0].coord_y;
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        AddBasicInfo:function(that,Option){
            this.$http.post(NormalDatabaseInterface + "/api/illegalconstruction",Option.data).then(function(data){
                if(data.data.affectedRows>0)
                {
                    that.MainPageFlag = true;
                    that.SubPageFlag = false;
                    alert("上报成功！");
                }
                else
                {
                    alert('上报失败！');
                }
                console.log(data);
            }).catch(function(err){
                console.log(err);
                alert('上报失败！');
            })
        },
        AddDealInfo:function(that,Option,Key){
            var this_that = this;
            this.$http.post(NormalDatabaseInterface + "/api/chuzhi",Option.data).then(function(data){
                if(data.data.affectedRows>0)
                {
                    alert("上报成功！");
                    that.SubPageFlag = false;
                }
            }).catch(function(err){
                //console.log(err);
                //更新
                var squall_url = SpecialDatabaseInterface+"/update?table=chuzhi&";
                for(var InfoIndex in Option.data)
                {
                    if(InfoIndex.indexOf("lysj")!=-1)
                    {
                        var squall_TempDate = new Date(Option.data[InfoIndex]);
                        Option.data[InfoIndex] = BasicTool.ReMakeDateString(squall_TempDate.getFullYear() + "-" + (squall_TempDate.getMonth()+1) + "-" + squall_TempDate.getDate());
                        console.log(BasicTool.ReMakeDateString(squall_TempDate.getFullYear() + "-" + (squall_TempDate.getMonth()+1) + "-" + squall_TempDate.getDate()))
                    } 
                }
                squall_url += "option=" + encodeURIComponent(JSON.stringify(Option.data)) + "&";
                squall_url += "key=" + encodeURIComponent(JSON.stringify(Key));
                this_that.$http.get(squall_url,{}).then(function(data){
                    var squall_Result = JSON.parse(decodeURIComponent(data.data));
                    if(squall_Result.affectedRows)
                    {
                        that.SubPageFlag = false;
                        alert("上报成功！");
                    }
                }).catch(function(err){
                    console.log(err);
                })
            })
        },
        AddReuseInfo:function(that,Option){
            var this_that = this;
            console.log();

            this.$http.post(NormalDatabaseInterface + "/api/lylist",Option.data).then(function(data){
                //console.log(data.data);
                if(data.data.affectedRows>0)
                {
                    alert("上报成功！");
                    that.SubSubPageFlag = false;
                    this_that.GetReuseInfo(that,{"id":that.SelectID});
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        UpdateBasicInfo(that,Option,Key){
            //更新
            var squall_url = SpecialDatabaseInterface+"/update?table=illegalconstruction&";
            for(var InfoIndex in Option.data)
            {
                if(InfoIndex.indexOf("lysj")!=-1)
                {
                    var squall_TempDate = new Date(Option.data[InfoIndex]);
                    Option.data[InfoIndex] = BasicTool.ReMakeDateString(squall_TempDate.getFullYear() + "-" + (squall_TempDate.getMonth()+1) + "-" + squall_TempDate.getDate());
                    console.log(BasicTool.ReMakeDateString(squall_TempDate.getFullYear() + "-" + (squall_TempDate.getMonth()+1) + "-" + squall_TempDate.getDate()))
                } 
            }
            squall_url += "option=" + encodeURIComponent(JSON.stringify(Option.data)) + "&";
            squall_url += "key=" + encodeURIComponent(JSON.stringify(Key));
            console.log(squall_url);
            this.$http.get(squall_url,{}).then(function(data){
                var squall_Result = JSON.parse(decodeURIComponent(data.data));
                if(squall_Result.affectedRows)
                {
                    that.MainPageFlag = true;
                    that.SubPageFlag = false;
                    alert("上报成功！");
                }
            }).catch(function(err){
                    console.log(err);
            })
        },
        UploadPicture(that,FormData){
            console.log(FormData);
            this.$http.post(NormalDatabaseInterface + "/upload",FormData).then(function(data){
                console.log(data);
            }).catch(function(err){
                console.log(err);
            })
        }
    }

})

export default{
    "test_string":"一个正常的变量测试",
    "BasicTool":BasicTool,
    "squall_basic_http":squall_basic_http
}