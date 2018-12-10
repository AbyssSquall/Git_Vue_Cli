<template>
    <div>
        <h1>申请审核</h1>
        <!-- <el-row class="squall_panel">
            <el-col  :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <el-card class="box-card">
                        <div class="layui-row">
                            <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">申请人：</span></div>
                            <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">黄列禹</div>
                        </div>
                        <div class="layui-row">
                            <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">目的地：</span></div>
                            <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">北仑</div>
                        </div>
                        <div class="layui-row">
                            <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">用车类型：</span></div>
                            <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">生产用车</div>
                        </div>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-button type="primary" class="squall_width_full" @click="squall_element_dialog('1')">查看详情</el-button>
                            </el-col>
                        </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="squall_panel">
            <el-col  :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <el-card class="box-card">
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">申请人：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">黄列禹</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">目的地：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">北仑</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">用车类型：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">公务用车</div>
                </div>
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-button type="primary" class="squall_width_full" @click="squall_element_dialog">查看详情</el-button>
                    </el-col>
                </el-row>
                </el-card>
            </el-col>
        </el-row> -->
        <el-row class="squall_panel" v-for="Application in ApplicationList" :key="Application.guid">
            <el-col  :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <el-card class="box-card">
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">申请人：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">{{Application.b_姓名}}</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">目的地：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">{{Application.a_aim}}</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">用车类型：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">公务用车</div>
                </div>
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-button type="primary" class="squall_width_full" @click="squall_element_dialog(Application)">查看详情</el-button>
                    </el-col>
                </el-row>
                </el-card>
            </el-col>
        </el-row>
        <!--
        -->
        <el-dialog :visible.sync="dialogVisible" width="80%">
            <div v-html="show_html"></div>
            <el-row>
                <el-col :span="20" :offset='2'>
                    <div class="grid-content bg-purple">
                        <el-button type="primary" class="squall_width_full" @click="squall_agree(guid)">{{squall_ok}}</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset='2'>
                    <div class="grid-content bg-purple">
                        <el-button type="primary" class="squall_width_full squall_top_gap" @click="dialogVisible = false">{{squall_cencel}}</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>

        <el-dialog :visible.sync="Driver_dialogVisible" width="80%">
            <el-form :model="squall_form" ref="squall_form" :rules="rules" label-width="80px">
                <el-form-item label="驾驶员"  prop="driver">
                <el-input v-model="squall_form.driver" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="车牌号"  prop="carid">
                    <el-select v-model="squall_form.carid" placeholder="请选择">
                        <el-option label="浙B96C08" value="100400"></el-option>
                        <el-option label="浙B96C08" value="100427"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="等候地点" prop="waitpoint" >
                <el-input v-model="squall_form.waitpoint" autocomplete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="活动区域" >
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>-->
            </el-form>
            <el-row>
                <el-col :span="20" :offset='2'>
                    <div class="grid-content bg-purple">
                        <el-button type="primary" class="squall_width_full" @click="submitForm('squall_form')">提交</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset='2'>
                    <div class="grid-content bg-purple">
                        <el-button type="primary" class="squall_width_full squall_top_gap" @click="Driver_dialogVisible = false">取消</el-button>
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
        show_msg: '',
        page: 'car',
        dialogVisible: false,
        Driver_dialogVisible : false,
        show_html:'',
        squall_ok:"通过",
        squall_cencel:"拒绝",
        guid:"1",
        selectedInfo:{},
        squall_form: {
          driver: '',
          carid: '',
          waitpoint: ''
        },
        rules: {
            driver: [
                { required: true, message: '请输入驾驶员姓名', trigger: 'blur' }
            ],
            carid: [
                { required: true, message: '请选择车辆', trigger: 'change' }
            ],
            waitpoint: [
                { required: true, message: '请输入等候地点', trigger: 'blur' }
            ]
        },
        ApplicationList: [],
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
    //console.log(this.Global.guid);
    this.basic.squall_basic_http.GetInfo(this.Global.guid);

    //从服务器读取列表，进行渲染
    this.basic.squall_basic_http.GetApplicationList("official_application",this);

    //console.log(this.basic.Now());

  },
  methods:{
        squall_agree:function(guid){
            this.dialogVisible = false;
            if(this.selectedInfo.车牌号)
                return;
            else
                this.Driver_dialogVisible = true;
            //console.log(guid);
            //this.show_html = "<el-button>1111</el-button>";
        },
        squall_element_dialog:function(guid){
            this.dialogVisible = true;
            if(guid=="1")
            {    
                this.squall_ok = "同意";
                this.squall_cencel = "退回";
                //弹出弹出层
                    var squall_temp_data={
                        "车牌号":"浙B96C08",
                        "部门":"地理信息所",
                        "姓名":"黄列禹",
                        "目的地":"北仑",
                        "事由":"北仑图库",
                        "开始时间":"2018-11-11 9:00:00",
                        "结束时间":"2018-11-11 16:00:00"
                        };

                this.selectedInfo = squall_temp_data;
                var squall_html = "";
                for(var index in squall_temp_data)
                {
                    squall_html += "<div class='layui-row squall_item'>";
                    squall_html += '<div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">' + index + '：</span></div>';
                    squall_html += '<div class="layui-col-xs9 layui-col-sm9 layui-col-md9">' + squall_temp_data[index] + '</div>';
                    squall_html += "</div>";
                }
            }
            else
            {

                var squall_starttime = new Date(guid.a_starttime);
                var squall_endtime = new Date(guid.a_endtime);
                //console.log(guid);
                guid.a_starttime_1 = squall_starttime.getFullYear() + "/" + (squall_starttime.getMonth()+1) + "/" + squall_starttime.getDate() + " " + squall_starttime.getHours() + ":" + squall_starttime.getMinutes();
                guid.a_endtime_1 = squall_endtime.getFullYear() + "/" + (squall_endtime.getMonth()+1) + "/" + squall_endtime.getDate() + " " + squall_endtime.getHours() + ":" + squall_endtime.getMinutes();

                var squall_temp_data={
                            "部门":guid.b_部门,
                            "姓名":guid.b_姓名,
                            "目的地":guid.a_aim,
                            "事由":guid.a_task,
                            "开始时间":guid.a_starttime_1,
                            "结束时间":guid.a_endtime_1
                        };

                this.squall_ok = "指派";
                this.squall_cencel = "退回";

                this.selectedInfo = guid;
                    var squall_html = "";
                    for(var index in squall_temp_data)
                    {
                        squall_html += "<div class='layui-row squall_item'>";
                        squall_html += '<div class="layui-col-xs4 layui-col-sm4 layui-col-md4"><span class=" squall_label">' + index + '：</span></div>';
                        squall_html += '<div class="layui-col-xs8 layui-col-sm8 layui-col-md8">' + squall_temp_data[index] + '</div>';
                        squall_html += "</div>";
                    }
            }
            this.show_html = squall_html;
      },
      submitForm:function(formname){
            var squall_data = JSON.stringify(this[formname]);
            var squall_data_json = JSON.parse(squall_data);
            squall_data_json.guid = this.selectedInfo.a_guid;
            squall_data_json.passtime = this.basic.Now().getFullYear() + '-' + (this.basic.Now().getMonth()+1) + '-' + this.basic.Now().getDate() + ' ' + this.basic.Now().getHours() + ':' + this.basic.Now().getMinutes() + ':' + this.basic.Now().getSeconds();
            
            
            var that = this;
            this.$refs[formname].validate(function(squall_bool,squall_res){
                if(squall_bool)
                {
                    //console.log(squall_data_json);
                    that.basic.squall_basic_http.PostOfficialInfo(JSON.stringify(squall_data_json),that,that.basic.squall_user_info.id);
                }
                else
                { 
                    console.log(squall_res);
                }
            })
      }
  },
}
</script>