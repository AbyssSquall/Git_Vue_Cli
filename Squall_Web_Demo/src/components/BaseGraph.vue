<template>
    <div>
      <el-row style="height:100px">
          <el-col :span="24">
            <h1>基本矢量图形的加载</h1>
          </el-col>
      </el-row>
      <el-row>
        <div class="squall_Map">
          <div id="map" style="height:100%"></div>
        </div>
      </el-row>
    </div>
</template>
<script>
import LeafletBase from "@/lib/squall_map/leaflet_base"

export default {
  name: 'Car',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'car'
    }
  },
  components: {
  },
  mounted:function(){
    var map_option = {"id":"map"};
    var squall_map = LeafletBase.leaflet_base.map(map_option);

    var latlngs = [[29.836183856215246,121.40231098683739],[29.836419890612962,121.41754593432614],[29.823116133650935,121.41615118561236],[29.82382423684408,121.40005793122283]];
    var polygon = L.polygon(latlngs, {color: 'red'}).addTo(squall_map);

    squall_map.on('click',function(e1){
      console.log(e1);
    })
  },
}
</script>

