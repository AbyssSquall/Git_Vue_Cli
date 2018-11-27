<template>
    <div>
        <h1>注册界面</h1>
        <foot-nav :page="page"></foot-nav>
    </div>
</template>
<script>
//import HeaderNav from"@/components/Header"
//import SideNav from"@/components/Sider"
import FootNav from"@/components/Footer"

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'home'
    }
  },
  components: {
    'FootNav':FootNav,
    //'SideNav':SideNav,
  },
  mounted:function(){
  },
}

</script>