<template>
    <div>
        <el-row>
            <el-col :span="20" :offset="2">
                <img src="static/logo.png">
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2">
                <p style="font-size:100px">欸呦，你走错路了吧？</p>
            </el-col>
        </el-row>
    </div>
</template>
<script>

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'home'
    }
  },
  components: {
  },
  mounted:function(){
      
  },
}
</script>