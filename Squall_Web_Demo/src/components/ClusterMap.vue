<template>
    <div>
      <h1>聚合图</h1>
        <div id="myJSMap" class="squall_Map" ></div>
    </div>
</template>

<script>
//import HeaderNav from"@/components/Header"
//import SideNav from"@/components/Sider"
//import FootNav from"@/components/Footer"
//import "leaflet"
//import "proj4"
import "proj4leaflet"

export default {
  name: 'Map',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'map'
    }
  },
  components: {
    //'FootNav':FootNav,
    //'SideNav':SideNav,
  },
  mounted:function(){
    //var squall_tilelayer = squall.TileLayer("电子地图");

    //var __map = squall.Map("myJSMap",squall_tilelayer,squall.origin,squall.resolutions);
  },
}
</script>