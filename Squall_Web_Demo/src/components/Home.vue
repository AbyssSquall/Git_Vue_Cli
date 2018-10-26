<template>
    <div>
        <h1>僕はキミのこどが好きでした‼</h1>
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
}
</script>

