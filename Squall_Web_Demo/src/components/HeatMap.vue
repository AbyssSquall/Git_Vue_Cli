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
      "Plugin":["leaflet_heat"],
    });
    
    var squall_PointArray = [];
    for(var i=0;i<1000;i++)
    {
        var center = {"lat":29.836499890612962,"lng":121.41754593432614};
        center.lat += Math.random()*0.1;
        center.lat += Math.random()*0.001;
        center.lng += Math.random()*0.1;
        center.lng += Math.random()*0.001;
        squall_PointArray.push([center.lat,center.lng]);
    }

    //console.log(test.Plugin);
    var test_layer = test.Plugin.Heatlayer({
      PointArray:squall_PointArray,
      alpha:5,
    });

    test.AddLayer({
      ID:"HeatTest",
      Layer:test_layer
    });
    //console.log(test.global.layers);
    // setTimeout(function(){
    //   var test_layer = test.Plugin.AddHeatlayer({'map':test.map});
    // },3000)
  },
}
</script>