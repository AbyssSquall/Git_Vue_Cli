<template>
    <div class="squall_body" id="squall_Air">
        <HeaderNav></HeaderNav>
        <SideNav :type="squall_type"></SideNav>
        <div class="squall-content" >
            <div class="layui-card">
                <div class="layui-card-body">
                    <form class="layui-form" :action="url+'/base/ups'" method="post" ref="squall_form">
                        <div class="layui-form-item">
                            <label class="layui-form-label">时间</label>
                            <div class="layui-input-inline">
                                <input id="checktime" ref="checktime" class="layui-input" type="text"/>
                            </div>
                            <div class="layui-form-mid">-</div>
                            <div class="layui-input-inline">
                                <select ref="Hour" lay-verify="">
                                    <option v-for="item in squall_Hour">
                                        {{item.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="layui-form-mid">时</div>
                            <div class="layui-input-inline">
                                <select ref="Minute" lay-verify="">
                                    <option v-for="item in squall_Minite">
                                        {{item.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="layui-form-mid">分</div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">空调状态</label>
                            <div class="layui-input-block">
                                <input ref="worksatuation" class="layui-input" type="text"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">维护内容</label>
                            <div class="layui-input-block">
                                <input ref="repair" class="layui-input" type="text"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">检查人</label>
                            <div class="layui-input-block">
                                <input ref="worker" class="layui-input" type="text"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">备注</label>
                            <div class="layui-input-block">
                                <textarea ref="ps" class="layui-textarea"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <a class="layui-btn layui-btn-normal" @click="squall_upssubmit">立即提交</a><!-- lay-filter="formDemo"-->
                                <!-- lay-submit -->
                            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                            <!-- <div class="layui-input-block">
                            </div> -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderNav from"../components/HeaderNav"
import SideNav from"../components/SideNav"
import Footer from"../components/Footer"
//import layui from"../plus/squall_layui.js"

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
            squall_type:"air"
        };
    },
    components: {
        'HeaderNav':HeaderNav,
        'SideNav':SideNav,
        'Footer':Footer
    },
    beforeMount:function(){
        this.url = squall_all_url;
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
                elem: '#checktime', //指定元素
                value:Now.toLocaleDateString(),
                format:"yyyy/MM/dd"
                });

                var element = layui.element;
                form.render();  
            })
        })

        this.$refs.Minute.value = squall_nowMinutes;
        this.$refs.Hour.value = squall_nowHour;

        //alert(squall_nowHour);
        //alert(squall_nowMinutes);
    },
    created:function(){
    },
    methods:{
        squall_upssubmit(){
        
        var squall_checktime = encodeURIComponent(this.$refs.checktime.value);
        var squall_hour = encodeURIComponent(this.$refs.Hour.value);
        var squall_min = encodeURIComponent(this.$refs.Minute.value);
        var squall_worksatuation = encodeURIComponent(this.$refs.worksatuation.value);
        var squall_repair = encodeURIComponent(this.$refs.repair.value);
        var squall_worker = encodeURIComponent(this.$refs.worker.value);
        var squall_ps = encodeURIComponent(this.$refs.ps.value);

        var squall_url = squall_all_url + '/base/air?checktime=' + squall_checktime + '&checkhour=' + squall_hour + '&checkmin=' + squall_min + '&worksatuation=' +squall_worksatuation + '&repair=' +squall_repair + '&name=' + squall_worker + '&ps=' + squall_ps;


        this.$http.get(squall_url,{}).then(function(res){
            //console.log("!!!!!!!!!!!");
            //console.log(res.data);
            //console.log(this.$refs.workstatuation.value);
            var PolygonReturnJson;
            if(res.data!="fail!")
                PolygonReturnJson = "登记成功！";
            
            SubmitSuccess(PolygonReturnJson);
		},function(res){
			alert(res.status)
        })
        //alert("!!!!!");
    }
    }
}
</script>