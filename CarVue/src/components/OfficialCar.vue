<template>
    <div>
        <h1>公务用车</h1>
        <img class="squall_wrapblank" src="static/blank.png">
        <el-form :model="squall_form" :rules="rules" ref="squall_form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="使用范围" prop="region">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="squall_form.region" placeholder="请选择范围">
                    <el-option label="市区内" value="市区内"></el-option>
                    <el-option label="大市区内" value="大市区内"></el-option>
                    <el-option label="大市区外" value="大市区外"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="目的地" prop="aim">
                <el-col :span="20">
                <el-input v-model="squall_form.aim"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="开始日期" required>
                <el-col :span="20">
                <el-form-item prop="startdate">
                    <el-date-picker id="startdate" type="date" placeholder="选择日期" v-model="squall_form.startdate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="开始时间" required>
                <el-col :span="20">
                <el-form-item prop="starttime">
                    <el-time-select :picker-options="{start: '00:00',step: '01:00',end: '23:00'}" id="starttime" placeholder="选择时间" v-model="squall_form.starttime" style="width: 100%;"></el-time-select>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="结束日期" required>
                <el-col :span="20">
                    <el-form-item prop="enddate">
                        <el-date-picker id="enddate" type="date" placeholder="选择日期" v-model="squall_form.enddate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="结束时间" required>
                <el-col :span="20">
                    <el-form-item prop="endtime">
                        <el-time-select :picker-options="{start: '00:00',step: '01:0',end: '23:00'}" id="endtime" placeholder="选择时间" v-model="squall_form.endtime" style="width: 100%;"></el-time-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="事由" prop="task">
                <el-col :span="20">
                <el-input style="resize:none;" type="textarea" v-model="squall_form.task"></el-input>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-button class="squall_width_full" type="primary" @click="squall_show_onuse()">查看在用车辆</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-button class="squall_width_full squall_top_gap" type="primary" @click="submitForm('squall_form')">提交</el-button>
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
        squall_form:{
            region:"",
            driver:"",
            startdate:"",
            starttime:"",
            enddate:"",
            endtime:"",
        },
        rules: {
            aim: [
                { required: true, message: '请输入目的地', trigger: 'blur' }
            ],
            region: [
                { required: true, message: '请选择范围', trigger: 'change' }
            ],
            date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            task: [
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

        console.log(this.basic.squall_user_info);

        
        var Now = new Date();
        this.squall_form.startdate = Now.getFullYear() +"-" + (Now.getMonth()+1) + "-" + Now.getDate(); 
        this.squall_form.starttime = Now.getHours() +":" + Now.getMinutes() + ":" + Now.getSeconds();
        this.squall_form.enddate = Now.getFullYear() +"-" + (Now.getMonth()+1) + "-" + Now.getDate();
        this.squall_form.endtime = Now.getHours() +":" + Now.getMinutes() + ":" + Now.getSeconds(); 
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
            var squall_data = JSON.stringify(this[data]);
            var squall_data_json = JSON.parse(squall_data);
            squall_data_json.starttime = squall_data_json.startdate + " " + squall_data_json.starttime;
            squall_data_json.endtime = squall_data_json.enddate + " " + squall_data_json.endtime;
            squall_data_json.startdate = undefined;
            squall_data_json.enddate = undefined;
            squall_data_json.序号 = 178;
            
            var that = this;
            this.$refs[data].validate(function(squall_bool,squall_res){
                if(squall_bool)
                {
                    that.basic.squall_basic_http.PostForm(JSON.stringify(squall_data_json),"official_application");
                }
                else
                { 
                    console.log(squall_res);
                }
            })
        }
  }
}
</script>