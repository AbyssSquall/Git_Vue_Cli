<template>
    <div>
      <h1>聚合图</h1>
        <div id="map" class="squall_Map" ></div>
    </div>
</template>

<script>
import {Map} from "@/lib/squall_map/leaflet_base"
import "@/lib/leaflet/markercluster/dist/MarkerCluster.css"
import "@/lib/leaflet/markercluster/dist/MarkerCluster.Default.css"

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
      "Plugin":["leaflet_heat"],
      "Zoom":15,
      "Center":[29.8813129,121.458887],
    });

    var PointStyle = {
      icon:test.MarkerIconList["primary"]
    }

    test.Plugin.ClusterHeatlayer({
      "map":test.map,
      "PointStyle":PointStyle
    });
    //console.log(test.MarkerIconList);
  },
}
</script>