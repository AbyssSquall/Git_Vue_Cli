<template>
    <div class="squall_body" id="squall_IO">
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
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">单位名称</label>
                            <div class="layui-input-block">
                                <input ref="company" class="layui-input" type="text"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">进出事由</label>
                            <div class="layui-input-block">
                                <input ref="reason" class="layui-input" type="text"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">进出人员</label>
                            <div class="layui-input-block">
                                <input ref="name" class="layui-input" type="text"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">起止时间</label>
                            <div class="layui-input-block">
                                <textarea ref="time" class="layui-textarea"/>
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
            squall_type:"io"
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
        this.url = squall_all_url;
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


        //this.$refs.Minute.value = squall_nowMinutes;
        //this.$refs.Hour.value = squall_nowHour;

        //window.location.reload();
        //alert(squall_nowHour);
        //alert(squall_nowMinutes);
    },
    methods:{
        squall_upssubmit(){

            var squall_checktime = encodeURIComponent(this.$refs.checktime.value);
            var squall_company = encodeURIComponent(this.$refs.company.value);
            var squall_reason = encodeURIComponent(this.$refs.reason.value);
            var squall_name = encodeURIComponent(this.$refs.name.value);
            var squall_time = encodeURIComponent(this.$refs.time.value);
            //var squall_pointlight = encodeURIComponent(this.$refs.pointlight.value);
            //var squall_wrong = encodeURIComponent(this.$refs.wrong.value);
            var squall_ps = encodeURIComponent(this.$refs.ps.value);

            var squall_url = squall_all_url + '/base/io?checktime=' + squall_checktime + '&company=' + squall_company + '&reason=' + squall_reason + '&name=' +squall_name + '&time=' +squall_time + '&ps=' + squall_ps;

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

