<template>
    <div>
      <el-row style="height:100px">
          <el-col :span="24">
            <h1>GPS导航</h1>
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
    var map_option = {
      "ID":"map",
      "Plugin":["leaflet_gps"],
      //"Center":[30.609604204504606,114.41873443959946],//武汉站
      "Center":[30.492080532115835,114.30322778842749],//武昌首义学院
      //"Center":[30.530961834720998,114.31166065372764],//武昌火车站
    };

    var squall_map = new Map(map_option);

    squall_map.Plugin.GPS({
      "map":squall_map
    });

    //为地图绑定点击事件
    squall_map.on("click",function(e){
        console.log(e);
    })
  },
}
</script>

