<template>
    <div>
        <div id="myJSMap" class="squall_Map" ></div>
    </div>
</template>

<script>
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
    //'SideNav':SideNav,
  },
  mounted:function(){
    var squall_tilelayer = squall.TileLayer("电子地图");

    var __map = squall.Map("myJSMap",squall_tilelayer,squall.origin,squall.resolutions);
  },
}
</script>