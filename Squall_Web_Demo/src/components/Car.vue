<template>
    <div>
        <h1>听说你想借车？</h1>
        <foot-nav :page="page"></foot-nav>
    </div>
</template>
<script>
//import HeaderNav from"@/components/Header"
//import SideNav from"@/components/Sider"
import FootNav from"@/components/Footer"

export default {
  name: 'Car',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'car'
    }
  },
  components: {
    'FootNav':FootNav,
    //'SideNav':SideNav,
  },
}
</script>

