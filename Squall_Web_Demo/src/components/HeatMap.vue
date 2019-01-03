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
import {Map} from "@/lib/squall_map/leaflet_base"
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

    var test = new Map({
      "ID":"map",
      "Pub_Plugin":["leaflet_heat"],
      "Pri_Plugin":[],
    });

    //console.log(test.Plugin);
    var test_layer = test.Plugin.Heatlayer({});
    test.AddLayer({
      ID:"HeatTest",
      Layer:test_layer
    });
    console.log(test.global.layers);
    // setTimeout(function(){
    //   var test_layer = test.Plugin.AddHeatlayer({'map':test.map});
    // },3000)
  },
}
</script>