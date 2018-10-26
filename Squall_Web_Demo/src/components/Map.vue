<template>
    <div>
        <div id="myJSMap" class="squall_Map" ></div>
        <foot-nav :page="page"></foot-nav>
    </div>
</template>
<script>
//import HeaderNav from"@/components/Header"
//import SideNav from"@/components/Sider"
import FootNav from"@/components/Footer"
import "leaflet"
import "proj4"

export default {
  name: 'Map',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'map'
    }
  },
  components: {
    'FootNav':FootNav,
    //'SideNav':SideNav,
  },
  mounted:function(){
    //初始化地图
    var squall_tilelayer = squall.TileLayer("电子地图");
    console.log(squall.origin);
    //console.log(L.Proj);

    //var __map = squall.Map("myJSMap",squall_tilelayer,squall.origin,squall.resolutions);
  },
}
</script>