<template>
    <div>
        <h1>注册界面</h1>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm squall_panel">
            <el-form-item label="部门" prop="departmentid">
                <el-col :span="20">
                  <el-select class="squall_width_full" v-model="form.departmentid" placeholder="请选择部门" @change="squall_departmentselect">
                      <el-option v-for="Item in DepartmentList" :key="Item.departmentid" :label="Item.部门" :value="Item.departmentid"></el-option>
                  </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="姓名" prop="序号">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="form.序号" placeholder="请选择姓名">
                      <el-option v-for="Item in NumberList" :key="Item.序号" :label="Item.姓名" :value="Item.序号"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-button v-if="bind" class="squall_width_full squall_top_gap" type="primary" @click="submitForm('form')">保存绑定</el-button>
                </el-col>
                <el-col :span="20" :offset="2">
                    <el-button v-if="unbind" class="squall_width_full squall_top_gap" type="danger" @click="squall_unbind">解除绑定</el-button>
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
        DepartmentList:[],
        NumberList:[],
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
      this.form.序号 = this.basic.squall_user_info.序号;
      this.form.departmentid = this.basic.squall_user_info.部门;

      //生成列表
      this.basic.squall_basic_http.GetDepartmentList(this);
      //生成列表
      this.basic.squall_basic_http.GetPersonList(this.basic.squall_user_info.departmentid,this);

      //如果已存在在用户,让保存绑定消失
      this.basic.squall_basic_http.ExistUser(this.basic.squall_user_info.序号,this);
  },
  methods:{
        submitForm:function(data){

            var squall_data = JSON.stringify(this[data]);
            var squall_data_json = JSON.parse(squall_data);
            squall_data_json.openid = this.basic.squall_user_info.openid;
            squall_data_json.guid = undefined;

            var that = this;
            this.$refs[data].validate(function(squall_bool,squall_res){
                if(squall_bool)
                {
                    that.basic.squall_basic_http.PostForm(JSON.stringify(squall_data_json),"person",that);
                }
                else
                { 
                    console.log(squall_res);
                }
            })
        },
        squall_unbind(){
            this.form.序号 = "";
            this.form.departmentid = "";
            var squall_data_json_str = JSON.stringify(this.form);
            var squall_data_json = JSON.parse(squall_data_json_str);
            squall_data_json.openid = this.basic.squall_user_info.openid;

            this.basic.squall_basic_http.Unbind(JSON.stringify(squall_data_json),this);
        },
        squall_departmentselect(Item){
            //生成列表
            this.basic.squall_basic_http.GetPersonList(Item,this);
        },

    }
}

</script>