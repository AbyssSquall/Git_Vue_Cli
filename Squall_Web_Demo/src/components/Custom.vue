<template>
    <div>
      <el-row>
        <h1>这里是自定义页面</h1>
      </el-row>
      <el-row>
        <div class="squall_Map">
          <div id="map" style="height:100%"></div>
          <span class="squall_CenterCross el-icon-plus"></span>
        </div>
        <el-button class="squall_ToolBar" style="margin-top:50px" @click="squall_Warnning()">Warnning!</el-button>
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
      page: 'car',
      Map:{},
      Sytle:"top:434px",
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
    squall_Warnning(){
      var squall_ResultPoint = this.Map.Plugin.LineSplit(this.Map.getCenter(),[[[29.836983856215246,121.40231098683739],[29.836919890612962,121.41799593432614]],[[29.822016133650935,121.41615118561236],[29.82309423684408,121.4000793122283]]]);

      var squall_graph_option_point = {
        LayerID:"PolygonExample_point",
        Type:"point",
        PointArray:[[[squall_ResultPoint]]],
        PointStyle:{icon:this.Map.MarkerIconList["primary"]}
      };

      this.Map.AddGraph(squall_graph_option_point);
      
      console.log(squall_ResultPoint);
    }
  },
  mounted:function(){
    var map_option = {
      "ID":"map",
      "Plugin":["leaflet_custom"]
      };
    this.Map = new Map(map_option);

    
    var squall_graph_option_line = {
      LayerID:"line1",
      Type:"line",
      PointArray:[[[[29.822016133650935,121.41615118561236],[29.82309423684408,121.4000793122283]],[[29.836983856215246,121.40231098683739],[29.836919890612962,121.41799593432614]]]],
      LineStyle:{color: '#1e50a2',weight:2.0,fillOpacity:0.5}
    };
    this.Map.AddGraph(squall_graph_option_line,function(e){
        console.log(e);
    });

    // squall_graph_option_line = {
    //   LayerID:"line2",
    //   Type:"line",
    //   PointArray:[[[[29.836983856215246,121.40231098683739],[29.836919890612962,121.41799593432614]]]],
    //   LineStyle:{color: '#ff50a2',weight:2.0,fillOpacity:0.5}
    // };
    // squall_map.AddGraph(squall_graph_option_line,function(e){
    //     console.log(e);
    // });


    //console.log(squall_map);
  }
}
</script>

