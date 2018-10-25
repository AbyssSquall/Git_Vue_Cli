<template>
    <div class="squall_body" id="squall_Round">
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
                            <label class="layui-form-label">环境状态</label>
                            <div class="layui-input-block"></div>
                            <div class="layui-input-block">
                                <div class="layui-form-mid">异味</div>
                                <div class="layui-input-inline">
                                    <select ref="smell" lay-verify="">
                                        <option>无</option>
                                        <option>有</option>
                                    </select>
                                </div>
                                <div class="layui-form-mid">异响</div>
                                <div class="layui-input-inline">
                                    <select ref="sound" lay-verify="">
                                        <option>无</option>
                                        <option>有</option>
                                    </select>
                                </div>
                                <div class="layui-form-mid">清洁</div>
                                <div class="layui-input-inline">
                                    <select ref="clean" lay-verify="">
                                        <option>干净</option>
                                        <option>不干净</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label"></label>
                                <div class="layui-form-mid">湿度</div>
                                <div class="layui-input-inline">
                                    <select ref="humidity" lay-verify="">
                                        <option>正常</option>
                                        <option>异常</option>
                                    </select>
                                </div>
                                <div class="layui-form-mid">温度</div>
                                <div class="layui-input-inline">
                                    <select ref="temperature" lay-verify="">
                                        <option>正常</option>
                                        <option>异常</option>
                                    </select>
                                </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">设备状态</label>
                            <div class="layui-input-block"></div>
                                <div class="layui-form-mid">网络设备</div>
                                <div class="layui-input-inline">
                                    <input ref="netE" class="layui-input" type="text"/>
                                </div>
                                <div class="layui-form-mid">存储设备</div>
                                <div class="layui-input-inline">
                                    <input ref="memoryE" class="layui-input" type="text"/>
                                </div>
                            <div class="layui-form-mid">服务器</div>
                            <div class="layui-input-inline">
                                <input ref="serverE" class="layui-input" type="text"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">其他</label>
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
            url : "http://192.168.10.144:405",
            squall_Hour : squall_Hour,
            squall_Minite : squall_Minite,
            squall_nowHour : squall_nowHour,
            squall_nowMinutes : squall_nowMinutes,
            squall_type:"round"
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

        //window.location.reload();
        //alert(squall_nowHour);
        //alert(squall_nowMinutes);
    },
    methods:{
        squall_upssubmit(){

        var squall_checktime = encodeURIComponent(this.$refs.checktime.value);
        var squall_hour = encodeURIComponent(this.$refs.Hour.value);
        var squall_min = encodeURIComponent(this.$refs.Minute.value);
        var squall_smell = encodeURIComponent(this.$refs.smell.value);
        var squall_sound = encodeURIComponent(this.$refs.sound.value);
        var squall_clean = encodeURIComponent(this.$refs.clean.value);
        var squall_temperture = encodeURIComponent(this.$refs.temperature.value);
        var squall_humidity = encodeURIComponent(this.$refs.humidity.value);
        var squall_netequipment = encodeURIComponent(this.$refs.netE.value);
        var squall_memory = encodeURIComponent(this.$refs.memoryE.value);
        var squall_server = encodeURIComponent(this.$refs.serverE.value);
        var squall_ps = encodeURIComponent(this.$refs.ps.value);

        var squall_url = squall_all_url + '/base/round?checktime=' + squall_checktime;
        squall_url += '&checkhour=' + squall_hour ;
        squall_url += '&checkmin=' + squall_min ;
        squall_url += '&smell=' + squall_smell ;
        squall_url += '&sound=' + squall_sound ;
        squall_url += '&clean=' + squall_clean ;
        squall_url += '&temperture=' + squall_temperture;
        squall_url += '&humidity=' + squall_humidity;
        squall_url += '&netequipment=' + squall_netequipment;
        squall_url += '&memory=' + squall_memory;
        squall_url += '&server=' + squall_server;
        squall_url += '&ps=' + squall_ps;
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