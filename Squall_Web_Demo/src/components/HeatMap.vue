<template>
    <div>
      <el-row style="height:100px">
          <el-col :span="24">
            <h1>热力图</h1>
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
import {Squall} from "@/lib/squall_map/leaflet_heat"// 
//import "heatmap.js"

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
    var squall_map = new LeafletBase.leaflet_base.map(map_option);

    var test = new Squall("test");
    test.print();
    // var squall_heatlayer = LeafletHeat.layer({
    //   map:squall_map,
    //   alpha:10000,
    //   PointArray:[[29.836193856215246,121.40231098683739,1],[29.836499890612962,121.41754593432614,1],[29.823196133650935,121.41615118561236,1],[29.82382429684408,121.40005793122283,1]],
    // });
  },
}
</script>