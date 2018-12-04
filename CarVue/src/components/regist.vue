<template>
    <div>
        <h1>注册界面</h1>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm squall_panel">
            <el-form-item label="微信号" prop="range">
                <el-col :span="20">
                    <div>XXXXXXXXXXXXX</div>
                </el-col>
            </el-form-item>
            <el-form-item label="部门" prop="range">
                <el-col :span="20">
                  <el-select class="squall_width_full" v-model="form.range" placeholder="请选择部门">
                      <el-option label="地信所" value="1100"></el-option>
                      <el-option label="北仑分院" value="1101"></el-option>
                      <el-option label="遥感所" value="1112"></el-option>
                      <el-option label="基础所" value="1113"></el-option>
                      <el-option label="规划所" value="1116"></el-option>
                      <el-option label="工程所" value="1118"></el-option>
                  </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="姓名" prop="carid">
                <el-col :span="20">
                <el-select class="squall_width_full" v-model="form.carid" placeholder="请选择姓名">
                    <el-option label="陈惊涛" value="170"></el-option>
                    <el-option label="黄列禹" value="178"></el-option>
                    <el-option label="黄银友" value="177"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-button class="squall_width_full squall_top_gap" type="primary" @click="submitForm('form')">保存绑定</el-button>
                </el-col>
                <el-col :span="20" :offset="2">
                    <el-button class="squall_width_full squall_top_gap" type="danger" @click="submitForm('form')">解除绑定</el-button>
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
            range:"",
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
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
  },
}

</script>