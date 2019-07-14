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
      "ID":"map",
      MapType:"Ningbo2000"
    });

    squall_map.AddJSONLayer({
      ID:"NetDataLayer"
    });
    //console.log(squall_map);

    squall_map.on('click',function(e1){
      console.log(e1);
    })
  },
}
</script>

