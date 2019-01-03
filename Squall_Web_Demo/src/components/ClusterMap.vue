<template>
    <div>
      <h1>聚合图</h1>
        <div id="map" class="squall_Map" ></div>
    </div>
</template>

<script>
import {Map} from "@/lib/squall_map/leaflet_base"

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
    var test = new Map({
      "ID":"map",
      "Pub_Plugin":["leaflet_heat"],
      "Pri_Plugin":[],
    });
  },
}
</script>