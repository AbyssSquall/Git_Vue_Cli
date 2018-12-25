<template>
    <div class="squall_body" id="squall_ups">
        <!-- 表格 -->
        <div class="squall-content" >
            <div class="layui-card">
                <div class="layui-card-body">
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <label class="layui-form-label">类型</label>
                            <div class="layui-input-inline">
                                <select ref="searchtype" lay-verify="">
                                    <option value="ups">UPS历史记录</option>
                                    <option value="io">出入历史记录</option>
                                    <option value="checkaround">巡检历史记录</option>
                                    <option value="air">空调检修记录</option>
                                </select>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">时间</label>
                            <div class="layui-input-inline">
                                <input id="checktimeStart" ref="checktimeStart" class="layui-input" type="text"/>
                            </div>
                            <div class="layui-form-mid">-</div>
                            <div class="layui-input-inline">
                                <input id="checktimeEnd" ref="checktimeEnd" class="layui-input" type="text"/>
                            </div>
                        </div> 
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <a class="layui-btn" @click="squall_searchsubmit">立即提交</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="layui-card">
                <div class="layui-card-body">
                    <table id="squall_table" class="layui-table">
                    </table>
                </div>
            </div>
        </div>
        <HeaderNav></HeaderNav>
        <SideNav :type="squall_type"></SideNav>
    </div>
</template>
<script>
import HeaderNav from"../components/HeaderNav"
import SideNav from"../components/SideNav"
import Footer from"../components/Footer"

var squall_Hour = [];
var squall_Minite = [];
for(var i=0;i<24;i++)
    squall_Hour.push({"name":i});
for(var i=0;i<60;i++)
    squall_Minite.push({"name":i});


export default {
    data(){
        return {
            url : "",
            squall_Hour : squall_Hour,
            squall_Minite : squall_Minite,
            squall_nowHour : squall_nowHour,
            squall_nowMinutes : squall_nowMinutes,
            squall_type:"search"
        };
    },
    components: {
        'HeaderNav':HeaderNav,
        'SideNav':SideNav,
        'Footer':Footer
    },
    beforeMount:function(){
    },
    mounted:function(){
        var vm=this;
        vm.$nextTick(function(){
            layui.use(['form','laydate','element'], function(){
                var form = layui.form;

                var laydate = layui.laydate;
                var Now = new Date();
                //执行一个laydate实例
                laydate.render({
                elem: '#checktimeStart', //指定元素
                value:Now.toLocaleDateString(),
                format:"yyyy/MM/dd"
                });

                laydate.render({
                elem: '#checktimeEnd', //指定元素
                value:Now.toLocaleDateString(),
                format:"yyyy/MM/dd"
                });

                var element = layui.element;
                form.render();  
            })
        })


        //this.$refs.Minute.value = squall_nowHour;
        //console.log(squall_nowHour);
        //this.$refs.Hour.value = squall_nowHour;

        //window.location.reload();
        //alert(squall_nowHour);
        //alert(squall_nowMinutes);
    },
    created:function(){
    },
    methods:{
        squall_searchsubmit(){
            console.log(squall_all_url);
            //var squall_url = "http://" + this.url;
            var squall_url = squall_all_url;
            squall_url += "/search?";
            squall_url += "starttime=";
            squall_url += this.$refs.checktimeStart.value;
            squall_url += "&";
            squall_url += "endtime=";
            squall_url += this.$refs.checktimeEnd.value;
            squall_url += "&";
            squall_url += "type=";
            squall_url += this.$refs.searchtype.value;
            console.log(squall_url);

            //console.log('search!');
            this.$http.get(squall_url,{}).then(function(res){
                //console.log("!!!!!!!!!!!");
                //console.log(res.data);
                //console.log(this.$refs.workstatuation.value);
                var PolygonReturnJson;
                if(res.data!="fail!")
                    PolygonReturnJson = "登记成功！";
                
                var squall_tempstore = res.data.split('|');
                var squall_head = squall_tempstore[squall_tempstore.length-1].split('`');
                var squall_tbody = [];

                console.log(squall_tempstore);
                for(var i=0;i<squall_tempstore.length-1;i++)
                {
                    squall_tbody.push(JSON.parse(squall_tempstore[i]));
                    var squall_tempdate = new Date(squall_tbody[i].CheckTime);
                    squall_tbody[i].CheckTime = squall_tempdate.toLocaleString();
                }

                
                var squall_ColList = [];
                var squall_tempColList = [];
                for(var i=0;i<squall_head.length;i++)
                {
                    var squall_ColStr = '{"field":"' + squall_head[i] + '","title":"' + squall_head[i] + '"}' ;
                    var squall_ColJson = JSON.parse(squall_ColStr);
                    squall_tempColList.push(squall_ColJson);
                }
                squall_ColList.push(squall_tempColList);


                //渲染表格
                layui.use('table', function(){
                    var table = layui.table;
                    
                    //第一个实例
                    table.render({
                        elem: '#squall_table'
                        ,height: 600
                        ,page: false //开启分页
                        ,cols: squall_ColList
                        ,data: squall_tbody
                    });
                    
                });
            },function(res){
                alert(res.status)
            })
        }
    }
}

// layui.use(['form'], function(){
//     var form = layui.form;
// })
</script>