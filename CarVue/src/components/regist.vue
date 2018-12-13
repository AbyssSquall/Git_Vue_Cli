<template>
    <div>
        <h1>注册界面</h1>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm squall_panel">
            <el-form-item label="微信号" prop="range">
                <el-col :span="20">
                    <div>XXXXXXXXXXXXX</div>
                </el-col>
            </el-form-item>
            <el-form-item label="部门" prop="departmentid">
                <el-col :span="20">
                  <el-select class="squall_width_full" v-model="form.departmentid" placeholder="请选择部门">
                      <el-option label="地信所" value="1100"></el-option>
                      <el-option label="北仑分院" value="1101"></el-option>
                      <el-option label="遥感所" value="1112"></el-option>
                      <el-option label="基础所" value="1113"></el-option>
                      <el-option label="规划所" value="1116"></el-option>
                      <el-option label="工程所" value="1118"></el-option>
                  </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="姓名" prop="序号">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="form.序号" placeholder="请选择姓名">
                    <el-option label="陈惊涛" value="170"></el-option>
                    <el-option label="黄列禹" value="178"></el-option>
                    <el-option label="黄银友" value="177"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-button v-if="bind" class="squall_width_full squall_top_gap" type="primary" @click="submitForm('form')">保存绑定</el-button>
                </el-col>
                <el-col :span="20" :offset="2">
                    <el-button v-if="unbind" class="squall_width_full squall_top_gap" type="danger" @click="submitForm('form')">解除绑定</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
//import HeaderNav from"@/components/Header"
//import SideNav from"@/components/Sider"

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'home',
        form:{
            "序号":"",
            "departmentid":"",
        },
        rules: {
            "序号": [
                { required: true, message: '请选择姓名', trigger: 'change' }
            ],
            departmentid: [
                { required: true, message: '请选择部门', trigger: 'change' }
            ],
        },
        bind:true,
        unbind:false,
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
      //如果已存在在用户,让保存绑定消失
      this.basic.squall_basic_http.ExistUser(this.basic.squall_user_info.unionid,this);
  },
  methods:{
        submitForm:function(data){
            var squall_data = JSON.stringify(this[data]);
            var squall_data_json = JSON.parse(squall_data);
            squall_data_json.unionid = this.basic.squall_user_info.unionid;

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