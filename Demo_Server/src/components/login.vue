<template>
    <div class="squall_body" id="squall_login">
        <!-- 表格 -->
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
                            <label class="layui-form-label">工作状态</label>
                            <div class="layui-input-block">
                                <input ref="worksatuation" class="layui-input" type="text"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">外观检查</label>
                            <div class="layui-input-block">
                                <input ref="outsight" class="layui-input" type="text"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">指示灯状态</label>
                            <div class="layui-input-block">
                                <input ref="pointlight" class="layui-input" type="text"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">故障处理</label>
                            <div class="layui-input-block">
                                <input ref="wrong" class="layui-input" type="text"/>
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
            squall_type:"ups"
        };
    },
    components: {
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

        //window.location.reload();
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
        var squall_outsight = encodeURIComponent(this.$refs.outsight.value);
        var squall_pointlight = encodeURIComponent(this.$refs.pointlight.value);
        var squall_wrong = encodeURIComponent(this.$refs.wrong.value);
        var squall_ps = encodeURIComponent(this.$refs.ps.value);

        var squall_url = squall_all_url + '/base/ups?checktime=' + squall_checktime + '&checkhour=' + squall_hour + '&checkmin=' + squall_min + '&worksatuation=' +squall_worksatuation + '&outsight=' +squall_outsight + '&pointlight=' + squall_pointlight + '&wrong=' + squall_wrong + '&ps=' + squall_ps;

        //console.log(squall_url);

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

// layui.use(['form'], function(){
//     var form = layui.form;
// })
</script>