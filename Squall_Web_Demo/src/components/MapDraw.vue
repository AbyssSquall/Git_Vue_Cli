<template>
    <div>
      <el-row style="height:100px">
          <el-col :span="24">
            <h1>矢量图形绘制</h1>
          </el-col>
      </el-row>
      <el-row>
        <div class="squall_Map">
          <div id="map" style="height:100%"></div>
        </div>
        <ul class="squall_ToolBar">
          <el-button>画点</el-button>
          <el-button>画线</el-button>
          <el-button>画面</el-button>
          <el-button>清除</el-button>
        </ul>
      </el-row>
    </div>
</template>
<script>
import {Map} from "@/lib/squall_map/leaflet_base"

export default {
  name: 'Personal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'personal'
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
    var map_option = {
      "ID":"map",
      "Plugin":["leaflet_draw"]
      };
    var squall_map = new Map(map_option);

    //绘制开始时触发的函数
    function squall_start(){

    }

    //绘制结束时触发的函数
    function squall_end(){
      
    }

    //绘图的参数

  },
}
</script>