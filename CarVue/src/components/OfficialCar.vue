<template>
    <div>
        <h1>经营用车</h1>
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
            <el-form-item label="使用人" prop="user">
                <el-col :span="20">
                    <el-input v-model="squall_form.user"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="目的地" prop="aim">
                <el-col :span="20">
                    <el-input v-model="squall_form.aim"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="申请车型">
                <el-col :span="20">
                    <el-select class="squall_width_full" v-model="squall_form.cartype" placeholder="请选择车辆类型">
                        <el-option
                        v-for="item in CarTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="等候地点" prop="waitpoint">
                <el-col :span="20">
                    <el-input v-model="squall_form.waitpoint"></el-input>
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
                    <el-time-select :picker-options="{start: '08:00',step: '00:30',end: '23:00'}" id="starttime" placeholder="选择时间" v-model="squall_form.starttime" style="width: 100%;"></el-time-select>
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
                        <el-time-select :picker-options="{start: '08:00',step: '00:30',end: '23:00'}" id="endtime" placeholder="选择时间" v-model="squall_form.endtime" style="width: 100%;"></el-time-select>
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
                    <el-button class="squall_width_full squall_top_gap" type="primary" @click="submitForm('squall_form')">提交</el-button>
                </el-col>
            </el-row>
        </el-form>

        
        <!--弹出层-->
            <el-dialog :visible.sync="dialogVisible" width="80%">
                <div v-html="show_html"></div>
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
            user:"",
            driver:"",
            startdate:"",
            starttime:"",
            enddate:"",
            endtime:"",
            cartype:"",
            waitpoint:""
        },
        rules: {
            user: [
                { required: true, message: '请输入使用人', trigger: 'blur' }
            ],
            aim: [
                { required: true, message: '请输入目的地', trigger: 'blur' }
            ],
            region: [
                { required: true, message: '请选择范围', trigger: 'change' }
            ],
            enddate: [
                { required: true, message: '请选择日期', trigger: 'change' }
            ],
            endtime: [
                { required: true, message: '请选择时间', trigger: 'change' }
            ],
            task: [
                { required: true, message: '请填写事由', trigger: 'blur' }
            ]
        },
        dialogVisible:false,
        squall_ok:"确定",
        squall_cencel:"关闭",
        CarTypeList:[
                {value:"轿车",label:"轿车"},
                {value:"商务车",label:"商务车"},
                {value:"中型客车",label:"中型客车"},
                {value:"特种车",label:"特种车"},
            ],
        show_html:"",
        OnUseList:[],
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
        this.basic.squall_basic_http.GetInfo(this.basic.squall_user_info.guid);
        
        var Now = new Date();
        var squall_month = (Now.getMonth()+1).toString();
        var squall_date = Now.getDate().toString();
        var squall_hours = Now.getHours().toString();
        var squall_minutes = Now.getMinutes().toString();
        var squall_Seconds = Now.getSeconds().toString();

        for(var i=0;i<2-(Now.getMonth()+1).toString().length;i++)
            squall_month = "0" + squall_month;
            
        for(var i=0;i<2-Now.getDate().toString().length;i++)
            squall_date = "0" + squall_date;
            
        for(var i=0;i<2-Now.getHours().toString().length;i++)
            squall_hours = "0" + squall_hours;
            
        for(var i=0;i<2-Now.getMinutes().toString().length;i++)
            squall_minutes = "0" + squall_minutes;
            
        for(var i=0;i<2-Now.getSeconds().toString().length;i++)
            squall_Seconds = "0" + squall_Seconds;

        this.squall_form.startdate = Now.getFullYear() +"-" + squall_month + "-" + squall_date; 
        this.squall_form.starttime = squall_hours +":" + squall_minutes;
        this.squall_form.enddate = Now.getFullYear() +"-" + squall_month + "-" + squall_date;
        this.squall_form.endtime = "08:30"; 
  },
  methods:{
        submitForm:function(data){
            var squall_data = JSON.stringify(this[data]);
            var squall_data_json = JSON.parse(squall_data);
            var squall_temp_start = new Date(squall_data_json.startdate);
            var squall_temp_end = new Date(squall_data_json.enddate);

            squall_data_json.starttime = squall_temp_start.getFullYear() + '-' + (squall_temp_start.getMonth()+1) + '-' + squall_temp_start.getDate() + " " + squall_data_json.starttime;
            squall_data_json.endtime = squall_temp_end.getFullYear() + '-' + (squall_temp_end.getMonth()+1) + '-' + squall_temp_end.getDate() + " " + squall_data_json.endtime;
            squall_data_json.startdate = undefined;
            squall_data_json.enddate = undefined;
            squall_data_json.序号 = this.basic.squall_user_info.序号;
            //alert(JSON.stringify(squall_data_json));
            
            var that = this;
            this.$refs[data].validate(function(squall_bool,squall_res){
                if(squall_bool)
                {
                    that.basic.squall_basic_http.PostForm(JSON.stringify(squall_data_json),"official_application",that);
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