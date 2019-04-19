<template>
    <div>
      <el-row>
        <h1>这里是自定义页面</h1>
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
  methods:{
    squall_UpdateTest(){
      //console.log("update test!");
      this.basic.squall_basic_http.TestUpdate(this);
    },
    squall_SelectTest(){
      this.basic.squall_basic_http.TestSelect(this);
    },
  },
  mounted:function(){
    var map_option = {
      "ID":"map",
      "Plugin":["leaflet_custom"]
      };
    var squall_map = new Map(map_option);

    squall_map.Plugin.LineSplit(squall_map.getCenter(),[[29.836983856215246,121.40231098683739],[29.836919890612962,121.41799593432614],[29.822016133650935,121.41615118561236],[29.82309423684408,121.4000793122283]]);

    var squall_graph_option_line = {
      LayerID:"line1",
      Type:"line",
      PointArray:[[[[29.836983856215246,121.40231098683739],[29.836919890612962,121.41799593432614],[29.822016133650935,121.41615118561236],[29.82309423684408,121.4000793122283]]]],
      LineStyle:{color: '#1e50a2',weight:2.0,fillOpacity:0.5}
    };
    squall_map.AddGraph(squall_graph_option_line,function(e){
        console.log(e);
      });

    squall_graph_option_line = {
      LayerID:"line2",
      Type:"line",
      PointArray:[[[[29.936983856215246,121.50231098683739],[29.936919890612962,121.51799593432614],[29.922016133650935,121.51615118561236],[29.92309423684408,121.5000793122283]]]],
      LineStyle:{color: '#ff50a2',weight:2.0,fillOpacity:0.5}
    };
    squall_map.AddGraph(squall_graph_option_line,function(e){
        console.log(e);
    });


    //console.log(squall_map);
  }
}
</script>

