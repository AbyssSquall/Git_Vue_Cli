<template>
    <div>
        <h1>借车归还</h1>
        <img class="squall_wrapblank" src="static/blank.png">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="借车类型" prop="range">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="form.range" placeholder="请选择类型">
                    <el-option label="生产用车" value="product"></el-option>
                    <el-option label="公务用车" value="official"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="车牌号" prop="carid">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="form.carid" placeholder="请选择车辆">
                    <el-option label="浙B96C08" value="100400"></el-option>
                    <el-option label="浙BH2B07" value="100427"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="归还日期" required>
                <el-col :span="20">
                    <el-form-item prop="enddate">
                        <el-date-picker id="enddate" type="date" placeholder="选择日期" v-model="form.enddate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="归还时间" required>
                <el-col :span="20">
                    <el-form-item prop="endtime">
                        <el-time-select :picker-options="{start: '00:00',step: '01:00',end: '23:00'}" id="endtime" placeholder="选择时间" v-model="form.endtime" style="width: 100%;"></el-time-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-button class="squall_width_full squall_top_gap" type="primary" @click="submitForm('form')">提交</el-button>
                </el-col>
            </el-row>
        </el-form>

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

export default {
  name: 'Car',
  data () {
    return {
        msg: 'Welcome to Your Vue.js App',
        page: 'car',
        form:{
            range:"请选择范围",
            driver:"",
            carid:"",
            aim:"",
            startdate:"2018-11-27",
            starttime:"12:01:07",
            enddate:"2018-11-27",
            endtime:"12:01:07",
            reason:'',
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
    //'SideNav':SideNav,
  },
  mounted:function(){
    //console.log(this.Global.guid);
    this.basic.squall_basic_http.GetInfo(this.Global.guid);
    var Now = new Date();

    this.form.startdate = Now.getFullYear() +"-" + (Now.getMonth()+1) + "-" + Now.getDate(); 
    this.form.starttime;
    this.form.enddate = Now.getFullYear() +"-" + (Now.getMonth()+1) + "-" + Now.getDate();
    this.form.endtime; 
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
            console.log(this.form);
        }
  }
}
</script>

