<template>
    <div>
        <h1>公务用车</h1>
        <img class="squall_wrapblank" src="static/blank.png">
        <form class="layui-form" action="">
            <div class="layui-form-item layui-col-xs11 layui-col-sm11 layui-col-md11">
                <label class="layui-form-label">使用范围</label>
                <div class="layui-input-block">
                    <select name="range" lay-verify="">
                        <option value="inScity">市区内</option>
                        <option value="inBcity">大市区内</option>
                        <option value="outcity">大市区外</option>
                    </select> 
                </div>
            </div>
            <div class="layui-form-item layui-col-xs11 layui-col-sm11 layui-col-md11">
                <label class="layui-form-label">地点</label>
                <div class="layui-input-block">
                    <input type="text" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
                </div>
            </div>

            <div class="layui-form-item layui-col-xs11 layui-col-sm11 layui-col-md11">
                <label class="layui-form-label">开始日期</label>
                <div class="layui-input-block">
                    <input type="text" id="startdate" name="renttime" required  lay-verify="required" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item layui-col-xs11 layui-col-sm11 layui-col-md11">
                <label class="layui-form-label">开始时间</label>
                <div style="margin-left: 110px;">
                    <div class="layui-col-xs5 layui-col-sm5 layui-col-md5">
                        <select id="hour" lay-verify="">
                        </select>
                    </div>
                    <div class="layui-col-xs1 layui-col-sm1 layui-col-md1" style="line-height: 38px;">
                        时
                    </div>
                    <div class="layui-col-xs5 layui-col-sm5 layui-col-md5">
                        <select id="minute" lay-verify="">
                        </select>
                    </div>
                    <div class="layui-col-xs1 layui-col-sm1 layui-col-md1" style="line-height: 38px;">
                        分
                    </div>
                </div>
            </div>
            <div class="layui-form-item layui-col-xs11 layui-col-sm11 layui-col-md11">
                <label class="layui-form-label">结束日期</label>
                <div class="layui-input-block">
                    <input type="text" id="enddate" name="renttime" required  lay-verify="required" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item layui-col-xs11 layui-col-sm11 layui-col-md11">
                <label class="layui-form-label">结束时间</label>
                <div style="margin-left: 110px;">
                    <div class="layui-col-xs5 layui-col-sm5 layui-col-md5">
                        <select id="hour2" lay-verify="">
                        </select>
                    </div>
                    <div class="layui-col-xs1 layui-col-sm1 layui-col-md1" style="line-height: 38px;">
                        时
                    </div>
                    <div class="layui-col-xs5 layui-col-sm5 layui-col-md5">
                        <select id="minute2" lay-verify="">
                        </select>
                    </div>
                    <div class="layui-col-xs1 layui-col-sm1 layui-col-md1" style="line-height: 38px;">
                        分
                    </div>
                </div>
            </div>
            <div class="layui-form-item layui-col-xs11 layui-col-sm11 layui-col-md11">
                <label class="layui-form-label">事由</label>
                <div class="layui-input-block">
                    <textarea name="desc" style="resize:none;" class="layui-textarea"></textarea>
                </div>
            </div>
            <div class="layui-row squall_btn_submit_up">
                <a class="layui-btn layui-col-xs10 layui-col-sm10 layui-col-md10 layui-col-xs-offset1 layui-col-sm-offset1 layui-col-md-offset1" v-on:click="squall_show_onuse()">在用车辆</a>
            </div>
            <div class="layui-row squall_btn_submit">
                <button class="layui-btn layui-col-xs10 layui-col-sm10 layui-col-md10 layui-col-xs-offset1 layui-col-sm-offset1 layui-col-md-offset1" lay-submit lay-filter="formDemo">立即提交</button>
            </div>
        </form>
        <foot-nav :page="page"></foot-nav>
    </div>
</template>
<script>
import FootNav from"@/components/Footer"

export default {
  name: 'Car',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'car',
    }
  },
  components: {
    'FootNav':FootNav,
    //'SideNav':SideNav,
  },
  mounted:function(){
    //console.log(this.Global.guid);
    this.basic.squall_basic_http.GetInfo(this.Global.guid);

    //最终执行
    var vm = this;
    vm.$nextTick(function(){
        layui.use(['form','laydate','element'], function(){
            var form = layui.form;
            

            var laydate = layui.laydate;
            var Now = new Date();
            console.log(Now.toLocaleDateString());
            //执行一个laydate实例
            laydate.render({
                elem: '#startdate', //指定元素
                value:Now.toLocaleDateString(),
                //type:"datetime",
                format:"yyyy/MM/dd"
            });
            laydate.render({
                elem: '#enddate', //指定元素
                value:Now.toLocaleDateString(),
                //type:"datetime",
                format:"yyyy/MM/dd"
            });
            
            //分配时分
            var squall_hours = "";
            var squall_minutes = "";

            for(var i=0;i<24;i++)
            {
                if(i!=Now.getHours())
                    squall_hours+="<option value='" + i + "'>" + i + "</option>"
                else
                    squall_hours+="<option value='" + i + "' selected>" + i + "</option>"
            }
            for(var i=0;i<60;i++)
            {
                if(i!=Now.getMinutes())
                    squall_minutes+="<option value='" + i + "'>" + i + "</option>";
                else
                    squall_minutes+="<option value='" + i + "' selected>" + i + "</option>";
            }

            document.getElementById("hour").innerHTML = squall_hours;
            document.getElementById("minute").innerHTML = squall_minutes;
            document.getElementById("hour2").innerHTML = squall_hours;
            document.getElementById("minute2").innerHTML = squall_minutes;

            //监听提交
            form.on('submit(formDemo)', function(data){
                layer.msg(JSON.stringify(data.field));
                return false;
            });

            form.render();  
        });
    });
    
  },
  methods:{
      squall_show_onuse:function(){
            var squall_html = "";
            //squall_html+="<div class='layui-row'></div>"

            for(var i=0;i<20;i++)
            {
                squall_html += "<div class='layui-row squall_onuse_item'>";
                squall_html += '<div class="layui-col-xs6 layui-col-sm6 layui-col-md6">浙B96C08</div>';
                squall_html += '<div class="layui-col-xs6 layui-col-sm6 layui-col-md6">黄列禹' + i + '</div>';
                squall_html += "</div>";
            }

            layer.open({
                type:1,
                title:false,
                content:"<div class='squall_show_body'>" + squall_html + "</div>",
            })
      }
  }
}
</script>