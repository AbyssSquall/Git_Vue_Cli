<template>
    <div>
        <h1>生产用车</h1>
        <img class="squall_wrapblank" src="static/blank.png">
        <el-form :model="squall_form" :rules="rules" ref="squall_form" label-width="100px">
            <el-form-item label="使用范围" prop="region">
                <el-col :span="20">
                    <el-select class="squall_width_full" v-model="squall_form.region" placeholder="请选择范围">
                        <el-option label="大市区内" value="大市区内"></el-option>
                        <el-option label="大市区外" value="大市区外"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="驾驶员" prop="driver">
                <el-col :span="20">
                <el-input v-model="squall_form.driver"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="车牌号" prop="carid">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="squall_form.carid" placeholder="请选择车辆">
                      <el-option v-for="Item in CarList" :key="Item.carid" :label="Item.车牌号" :value="Item.carid"></el-option>
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
                    <el-date-picker
                    id="startdate"
                    type="date"
                    :editable="false"
                    placeholder="选择日期"
                    v-model="squall_form.startdate"
                    style="width: 100%;"></el-date-picker>
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
            <el-form-item label="结束日期" required style="display:none;">
                <el-col :span="20">
                    <el-form-item prop="enddate">
                        <el-date-picker id="enddate" type="date" placeholder="选择日期" v-model="squall_form.enddate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="结束时间" required style="display:none;">
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
            <div v-html="show_html"></div>
            <!-- <el-row class="squall_panel" v-for="Item in OnUseList" :key="Item.guid">
                <el-col  :xs="11" :sm="11" :md="11" :lg="11" :xl="11" :offset="1">
                    {{Item.车牌号}}
                </el-col>
                <el-col  :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                    {{Item.姓名}}
                </el-col>
            </el-row> -->
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
  data() {
    return {
        msg: 'Welcome to Your Vue.js App',
        RefreshPage:false,
        page: 'ProductCar',
        squall_form:{
            region:'',
            driver:"",
            carid:"",
            aim:"",
            startdate:"2018-01-30",
            starttime:"",
            enddate:"",
            endtime:"",
            task:'',
        },
        rules: {
            region: [
                { required: true, message: '请选择使用范围', trigger: 'change'}// 
            ],
            driver: [
                { required: true, message: '请输入驾驶员', trigger: 'blur' }
            ],
            carid: [
                { required: true, message: '请选择使用车辆', trigger: 'change' }
            ],
            aim: [
                { required: true, message: '请输入目的地', trigger: 'blur' }
            ],
            task: [
                { required: true, message: '请填写事由', trigger: 'blur' }
            ]
        },
        dialogVisible:false,
        squall_ok:"确定",
        squall_cencel:"关闭",
        show_html:"",
        OnUseList:[],
        CarList:[],
    }
  },
  mounted:function(){
        //console.log(JSON.stringify(this.basic.squall_user_info));
        this.basic.squall_basic_http.GetInfo(this.basic.squall_user_info.guid,this);
        this.basic.squall_basic_http.GetDepartmentCarList(this.basic.squall_user_info.departmentid,this);

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

        this.squall_form.startdate = Now.getFullYear().toString() +"-" + squall_month + "-" + squall_date; 
        this.squall_form.starttime = squall_hours +":" + squall_minutes + ":" + squall_Seconds;
        this.squall_form.enddate = "9999-12-1";
        this.squall_form.endtime = squall_hours +":" + squall_minutes + ":" + squall_Seconds; 

        if(this.$route.params.UseCarID)
        {
            this.squall_form.carid = this.$route.params.UseCarID;
        }

  },
    methods:{
        squall_show_onuse:function(){
            this.dialogVisible = true;

        },
        submitForm:function(data){
            var squall_data = JSON.stringify(this[data]);
            var squall_data_json = JSON.parse(squall_data);
            var squall_temp_start = new Date(squall_data_json.startdate);
            var squall_temp_end = new Date(squall_data_json.enddate);
            var squall_temp_pass;

            squall_data_json.starttime = squall_temp_start.getFullYear() + '-' + (squall_temp_start.getMonth()+1) + '-' + squall_temp_start.getDate() + " " + squall_data_json.starttime;
            squall_data_json.endtime = '9999-12-1 ' + squall_data_json.endtime;
            squall_data_json.startdate = undefined;
            squall_data_json.enddate = undefined;
            squall_data_json.序号 = this.basic.squall_user_info.序号;
            squall_temp_pass = new Date(squall_temp_start.valueOf()+Math.floor(Math.random()*10)*Math.floor(Math.random()*10)*Math.floor(Math.random()*10)*1239*79);
            squall_data_json.passtime = squall_temp_pass.getFullYear() + '-' + (squall_temp_pass.getMonth()+1) + '-' + squall_temp_pass.getDate() + " " + (squall_temp_pass.getHours()+3) + ":" + squall_temp_pass.getMinutes() + ":" + squall_temp_pass.getSeconds();
            
            //如果是
            //if(this.squall_form.region=="大市区外")
            //    squall_data_json.dealer = "张荣华";
            //alert(squall_data_json.passtime);

            var that = this;
            this.$refs[data].validate(function(squall_bool,squall_res){
                if(squall_bool)
                {
                    //console.log(that);
                    that.basic.squall_basic_http.PostForm(JSON.stringify(squall_data_json),"product_application",that);
                    //console.log(squall_data);
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

