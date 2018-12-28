<template>
    <div>
        <h1>听说这是个人主页？</h1>
        <foot-nav :page="page"></foot-nav>
    </div>
</template>
<script>

export default {
  name: 'Personal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'personal'
    }
  },
  components: {
    //'SideNav':SideNav,
  },
}
</script>