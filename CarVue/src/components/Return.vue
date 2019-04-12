<template>
    <div>
        <h1>借车归还</h1>
        <img class="squall_wrapblank" src="static/blank.png">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="借车类型" prop="type">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="form.type" placeholder="请选择类型" :disabled=true>
                    <el-option label="生产用车" value="product"></el-option>
                    <el-option label="经营用车" value="official"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="车牌号" prop="carid">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="form.carid" placeholder="请选择车辆" @change="squall_select">
                    <el-option v-for="Item in OnUseList" :key="Item.guid" :label="Item.车牌号" :value="Item.carid"></el-option>
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
                type:"",
                carid:"",
                enddate:"",
                endtime:"",
            },
            rules: {
                carid: [
                    { required: true, message: '请选择归还车辆', trigger: 'change' }
                ]
            },
            dialogVisible:false,
            squall_ok:"确定",
            squall_cencel:"关闭",
            show_html:"",
            OnUseList:[],
            SelectedInfo:{},
        }
    },
    components: {
        //'SideNav':SideNav,
    },
    mounted:function(){
        //从数据中读取数据，主要是绑定guid
        //this.basic.squall_basic_http.GetOnUseList(parseInt(this.basic.squall_user_info.序号),this);
        this.basic.squall_basic_http.GetOnUseListForReturn(parseInt(this.basic.squall_user_info.序号),this.basic.squall_user_info.姓名,this);
        //console.log(this.basic.squall_user_info);

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

        this.form.enddate = Now.getFullYear() +"-" + squall_month + "-" + squall_date;
        this.form.endtime = Now.getHours() +":" + squall_minutes;
    },
    methods:{
        submitForm:function(data){
            var that = this;
            var table = this.SelectedInfo.table;

            var squall_post_json_str = JSON.stringify(this.form);
            var squall_post_json = JSON.parse(squall_post_json_str);
            squall_post_json.guid = this.SelectedInfo.guid;
            squall_post_json.carid = undefined;
            squall_post_json.type = undefined;
            squall_post_json.enddate = undefined;

            this.$refs[data].validate(function(squall_bool,squall_res){
                if(squall_bool)
                {
                    that.basic.squall_basic_http.PostReturn(JSON.stringify(squall_post_json),that,table);
                }
                else
                {
                    alert(squall_res);
                }
            })
        },
        squall_select:function(Item){
            for(var item in this.OnUseList)
            {
                if(this.OnUseList[item].carid==Item)
                {
                    this.SelectedInfo = this.OnUseList[item];
                    this.form.type = this.OnUseList[item].table_alias;
                }
            }
        }
    }
}
</script>

