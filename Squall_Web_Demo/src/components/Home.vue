<template>
    <div>
      <el-row>
        <el-col :span="5" class="squall_nav" >
          <side-nav></side-nav>
        </el-col>
        <el-col :span="19" :offset="5">
          <h1>任务列表</h1>
          <ul>
            <li>每个页面需要添加cookies验证或者sesions</li>
            <li>测试微信接口</li>
            <li>制作借车页面</li>
            <li>获取定位信息</li>
            <li>建立个人数据库</li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </el-col>
      </el-row>
    </div>
</template>
<script>
//import HeaderNav from"@/components/Header"
import SideNav from"@/components/Sider"
//import FootNav from"@/components/Footer"

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'home'
    }
  },
  components: {
    'SideNav':SideNav,
  },
  mounted:function(){
    // var obj = new WxLogin({
    //     self_redirect:true,
    //     id:"wechat", 
    //     appid: "", 
    //     scope: "", 
    //     redirect_uri: "",
    //     state: "",
    //     style: "",
    //     href: ""
    //   });
  },
}
</script>

