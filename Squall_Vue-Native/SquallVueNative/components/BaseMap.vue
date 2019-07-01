<template>
    <div>
      <el-row style="height:100px">
          <el-col :span="24">
            <h1>基础地图页</h1>
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
    var map_option = {"ID":"map"};
    var squall_map = new Map(map_option);

    //squall_map.GetID_P();
  },
}
</script>