<template>
    <div>
      <el-row style="height:100px">
          <el-col :span="24">
            <h1>矢量图形绘制</h1>
          </el-col>
      </el-row>
      <el-row>
        <el-tabs v-model="TabActive" type="card" @tab-click="handleClick">
          <el-tab-pane label="绘制点" name="DrawPoint">
            <el-row>
              <div class="squall_Map_tab">
                <div id="map1" style="height:100%"></div>
              </div>
              <ul class="squall_ToolBar">
                <el-button  @click="squall_DrawPoint(this)">{{DrawPointLabel}}</el-button>
                <el-button @click="squall_clear">清除</el-button>
              </ul>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="绘制线" name="DrawLine">
            <el-row>
              <div class="squall_Map_tab">
                <div id="map2" style="height:100%"></div>
              </div>
              <ul class="squall_ToolBar">
                <el-button @click="squall_DrawLine(this)">{{DrawLineLabel}}</el-button>
                <el-button @click="squall_clear">清除</el-button>
              </ul>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="绘制面" name="DrawPolygon">
            <el-row>
              <div class="squall_Map_tab">
                <div id="map3" style="height:100%"></div>
              </div>
              <ul class="squall_ToolBar">
                <el-button @click="squall_DrawPolygon(this)">{{DrawPolygonLabel}}</el-button>
                <el-button @click="squall_clear">清除</el-button>
              </ul>
            </el-row>
          </el-tab-pane>
        </el-tabs>
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
      page: 'personal',
      TabActive:"DrawPoint",
      ActiveMap:{},
      DrawPointLabel:"画点",
      DrawLineLabel:"画线",
      DrawPolygonLabel:"画面",
      AimPoint:{},
      AimPointArray:{}
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
    var map_option1 = {
      "ID":"map1",
      "Plugin":["leaflet_draw"]
      };
    var squall_map1 = new Map(map_option1);
    this.ActiveMap.DrawPoint = squall_map1;

    var map_option2 = {
      "ID":"map2",
      "Plugin":["leaflet_draw"]
      };
    var squall_map2 = new Map(map_option2);
    this.ActiveMap.DrawLine = squall_map2;

    var map_option3 = {
      "ID":"map3",
      "Plugin":["leaflet_draw"]
      };
    var squall_map3 = new Map(map_option3);
    this.ActiveMap.DrawPolygon = squall_map3;

    //绘图的参数

  },
  methods:{
    handleClick(tab, event) {
      //console.log(tab, event);
      var that = this;
      setTimeout(function(){
        //console.log(tab.name);
        that.ActiveMap[that.TabActive].invalidateSize();
      },100)
    },
    squall_clear(){
        this.ActiveMap[this.TabActive].RemoveAll();
    },
    squall_DrawPoint(e){
      var squall_Option = {
        "map":this.ActiveMap[this.TabActive]
      }

      if(this.DrawPointLabel=="画点")
      {
        this.ActiveMap[this.TabActive].Plugin.DrawPoint(squall_Option);
        this.DrawPointLabel="结束画点";
      }  
      else if(this.DrawPointLabel=="结束画点")
      {
        this.ActiveMap[this.TabActive].Plugin.EndDraw(squall_Option);
        this.DrawPointLabel="画点";
      }
    },
    squall_DrawLine(e){
      var squall_Option = {
        "map":this.ActiveMap[this.TabActive]
      }

      if(this.DrawLineLabel=="画线")
      {
        this.ActiveMap[this.TabActive].Plugin.DrawLine(squall_Option);
        this.DrawLineLabel="结束画线";
      }  
      else if(this.DrawLineLabel=="结束画线")
      {
        this.ActiveMap[this.TabActive].Plugin.EndDraw(squall_Option);
        this.DrawLineLabel="画线";
      }
    },
    squall_DrawPolygon(e){
      //console.log(e);
      var squall_Option = {
        "map":this.ActiveMap[this.TabActive]
      }

      if(this.DrawPolygonLabel=="画面")
      {
        this.ActiveMap[this.TabActive].Plugin.DrawPolygon(squall_Option);
        this.DrawPolygonLabel="结束画面";
      }  
      else if(this.DrawPolygonLabel=="结束画面")
      {
        this.ActiveMap[this.TabActive].Plugin.EndDraw(squall_Option);
        this.DrawPolygonLabel="画面";
      }
    },
    squall_show(){
      if(this.ActiveMap[this.TabActive].global.Point)
        console.log(this.ActiveMap[this.TabActive].global.Point);
      if(this.ActiveMap[this.TabActive].global.Line)
        console.log(this.ActiveMap[this.TabActive].global.Line);
      if(this.ActiveMap[this.TabActive].global.Polygon)
        console.log(this.ActiveMap[this.TabActive].global.Polygon);
    }
  }
}
</script>