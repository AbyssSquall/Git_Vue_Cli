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
  mounted:function(){
    var squall_map = new Map({
      "ID":"map"
    });


    var squall_graph_option_polygon = {
      LayerID:"PolygonExample_polygon",
      Type:"polygon",
      PointArray:[[[[29.836183856215246,121.40231098683739],[29.836419890612962,121.41754593432614],[29.823116133650935,121.41615118561236],[29.82382423684408,121.40005793122283]]]],
      PolygonStyle:{color: '#1e50a2',fillColor:'#00ccff',weight:2.0,fillOpacity:0.5}
    };
    
    var squall_graph_option_line = {
      LayerID:"PolygonExample_line",
      Type:"line",
      PointArray:[[[[29.836983856215246,121.40231098683739],[29.836919890612962,121.41799593432614],[29.822016133650935,121.41615118561236],[29.82309423684408,121.4000793122283]]]],
      LineStyle:{color: '#1e50a2',weight:2.0,fillOpacity:0.5}
    };
    
    var squall_graph_option_point = {
      LayerID:"PolygonExample_point",
      Type:"point",
      PointArray:[[[[29.836193856215246,121.40231098683739],[29.836499890612962,121.41754593432614],[29.823196133650935,121.41615118561236],[29.82382429684408,121.40005793122283]]]],
      PointStyle:{icon:squall_map.MarkerIconList["primary"]}
    };
    
    //squall_map.GetID();
    squall_map.AddGraph(squall_graph_option_polygon);
    squall_map.AddGraph(squall_graph_option_line);
    squall_map.AddGraph(squall_graph_option_point);

    console.log(squall_map);

    squall_map.on('click',function(e1){
      console.log(e1);
    })
  },
}
</script>

