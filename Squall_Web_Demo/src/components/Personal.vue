<template>
    <div>
        <h1>听说这是个人主页？</h1>
        <foot-nav :page="page"></foot-nav>
    </div>
</template>
<script>
//import HeaderNav from"@/components/Header"
//import SideNav from"@/components/Sider"
import FootNav from"@/components/Footer"

export default {
  name: 'Personal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'personal'
    }
  },
  components: {
    'FootNav':FootNav,
    //'SideNav':SideNav,
  },
}
</script>