<template>
    <div>
        <h1>这里是自定义页面</h1>
        <h1>可以在这里进行vue的测试工作</h1>
            <ul>
              <li>每个页面需要添加cookies验证或者sesions</li>
              <li>测试微信接口</li>
              <li>制作借车页面</li>
              <li>获取定位信息</li>
              <li>建立个人数据库</li>
              <li><el-button type="primary" @click="squall_SelectTest">检索测试</el-button></li>
              <li><el-button type="primary" @click="squall_UpdateTest">更新测试</el-button></li>
            </ul>
    </div>
</template>
<script>

export default {
  name: 'Car',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'car'
    }
  },
  components: {
  },
  methods:{
    squall_UpdateTest(){
      //console.log("update test!");
      this.basic.squall_basic_http.TestUpdate(this);
    },
    squall_SelectTest(){
      this.basic.squall_basic_http.TestSelect(this);
    },
  },
  mounted:function(){
    
  }
}
</script>

