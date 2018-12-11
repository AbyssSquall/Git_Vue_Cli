<template>
    <div>
        <h1>借车归还</h1>
        <img class="squall_wrapblank" src="static/blank.png">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="借车类型" prop="type">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="form.type" placeholder="请选择类型" :disabled=true>
                    <el-option label="生产用车" value="product"></el-option>
                    <el-option label="公务用车" value="official"></el-option>
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
    //this.basic.squall_basic_http.GetInfo(this.Global.guid);

    //从数据中读取数据，主要是绑定guid
    this.basic.squall_basic_http.GetOnUseList(parseInt(this.basic.squall_user_info.id),this);


    var Now = new Date();
    this.form.enddate = Now.getFullYear() +"-" + (Now.getMonth()+1) + "-" + Now.getDate();
    this.form.endtime = Now.getHours() +":" + Now.getMinutes(); 
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
                    console.log(squall_res);
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

