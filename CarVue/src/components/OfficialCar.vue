<template>
    <div>
        <h1>公务用车</h1>
        <img class="squall_wrapblank" src="static/blank.png">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="使用范围" prop="range">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="form.range" placeholder="请选择范围">
                    <el-option label="市区内" value="inScity"></el-option>
                    <el-option label="大市区内" value="inBcity"></el-option>
                    <el-option label="大市区外" value="outcity"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="目的地" prop="aim">
                <el-col :span="20">
                <el-input v-model="form.aim"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="开始日期" required>
                <el-col :span="20">
                <el-form-item prop="startdate">
                    <el-date-picker id="startdate" type="date" placeholder="选择日期" v-model="form.startdate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="开始时间" required>
                <el-col :span="20">
                <el-form-item prop="starttime">
                    <el-time-select :picker-options="{start: '00:00',step: '01:00',end: '23:00'}" id="starttime" placeholder="选择时间" v-model="form.starttime" style="width: 100%;"></el-time-select>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="结束日期" required>
                <el-col :span="20">
                    <el-form-item prop="enddate">
                        <el-date-picker id="enddate" type="date" placeholder="选择日期" v-model="form.enddate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="结束时间" required>
                <el-col :span="20">
                    <el-form-item prop="endtime">
                        <el-time-select :picker-options="{start: '00:00',step: '01:0',end: '23:00'}" id="endtime" placeholder="选择时间" v-model="form.endtime" style="width: 100%;"></el-time-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="事由" prop="reason">
                <el-col :span="20">
                <el-input style="resize:none;" type="textarea" v-model="form.reason"></el-input>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-button class="squall_width_full" type="primary" @click="squall_show_onuse()">查看在用车辆</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-button class="squall_width_full squall_top_gap" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-col>
            </el-row>
        </el-form>
        <foot-nav :page="page"></foot-nav>

        
        <!--弹出层-->
            <el-dialog :visible.sync="dialogVisible" width="80%">
                <div class="" v-html="show_html"></div>
                <el-row>
                    <el-col :span="20" :offset='2'>
                        <div class="grid-content bg-purple">
                            <el-button type="primary" class="squall_width_full squall_top_gap" @click="dialogVisible = false">{{squall_cencel}}</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-dialog>
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
        form:{
            range:"请选择范围",
            driver:"",
            startdate:"2018-11-27",
            starttime:"12:01:07",
            enddate:"2018-11-27",
            endtime:"12:01:07",
        },
        rules: {
            name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
                { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            reason: [
                { required: true, message: '请填写事由', trigger: 'blur' }
            ]
        },
        dialogVisible:false,
        squall_ok:"确定",
        squall_cencel:"关闭",
        show_html:"",
    }
  },
  components: {
    'FootNav':FootNav,
    //'SideNav':SideNav,
  },
  mounted:function(){
    //console.log(this.Global.guid);
    this.basic.squall_basic_http.GetInfo(this.Global.guid);
  },
  methods:{
        squall_show_onuse:function(){
            this.dialogVisible = true;
            var squall_html = "";
            //squall_html+="<div class='layui-row'></div>"

            for(var i=0;i<20;i++)
            {
                squall_html += "<div class='layui-row squall_onuse_item'>";
                squall_html += '<div class="layui-col-xs6 layui-col-sm6 layui-col-md6">浙B96C08</div>';
                squall_html += '<div class="layui-col-xs6 layui-col-sm6 layui-col-md6">黄列禹' + i + '</div>';
                squall_html += "</div>";
            }

            this.show_html = "<div class='squall_show_body'>" + squall_html + "</div>";
        },
        submitForm:function(data){
            //console.log(this.form);
            var  squall_html = "http://192.168.10.144:8046/table/submit";
            this.$http.get(squall_html,{"params":this.form}).then(function(res){
                console.log(res);
            },function(res){
                alert(res.status);
            })
        }
  }
}
</script>