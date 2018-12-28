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
    LeafletBase.leaflet_base.map(map_option);
  },
}
</script>