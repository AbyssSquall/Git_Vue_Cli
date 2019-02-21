<template>
    <div>
      <el-row>
        <el-col :span="SideBarWidth_Temp" class="squall_nav" :class="SmallSider" :style="NavStyle">
          <side-nav v-on:pagechange="PageChange"></side-nav>
        </el-col>
        <el-col :span="MainPageWidth" :offset="SideBarWidth">
          <base-map v-if="PageControler.Home"></base-map>
          <base-graph v-if="PageControler.BaseGraph"></base-graph>
          <heat-map v-if="PageControler.HeatMap"></heat-map>
          <cluster-map v-if="PageControler.ClusterMap"></cluster-map>
          <map-draw v-if="PageControler.MapDraw"></map-draw>
          <G-p-s-apply v-if="PageControler.GPSApply"></G-p-s-apply>
          <G-p-s v-if="PageControler.GPS"></G-p-s>
          <document v-if="PageControler.Document"></document>
          <custom v-if="PageControler.Custom"></custom>
          <photo v-if="PageControler.Photo"></photo>
        </el-col>
      </el-row>
      <el-button type="primary" class="CollapseClass" @click="CollapseControl" :circle="true" v-if="SmallMode">
        <i :class="CollapseControlClass"></i>
      </el-button>
    </div>
</template>
<script>
//import HeaderNav from"@/components/Header"
import SideNav from"@/components/Sider"
//import FootNav from"@/components/Footer"

import BaseMap from"@/components/BaseMap"
import BaseGraph from"@/components/BaseGraph"
import HeatMap from"@/components/HeatMap"
import ClusterMap from"@/components/ClusterMap"
import MapDraw from"@/components/MapDraw"
import GPS from"@/components/GPS"
import GPSApply from"@/components/GPSApply"
import _Document from"@/components/Document"
import Custom from"@/components/Custom"
import Photo from"@/components/Photo"

import LeafletBase from "@/lib/squall_map/leaflet_base"

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'home',
      PageControler:{
        Home:true,
        BaseGraph:false,
        HeatMap:false,
        ClusterMap:false,
        MapDraw:false,
        GPS:false,
        Document:false,
        GPSApply:false,
        Custom:false,
        Photo:false,
      },
      SideBarWidth:3,
      MainPageWidth:21,
      SideBarWidth_Temp:3,
      SmallMode:false,
      CollapseControlClass:"el-icon-arrow-right",
      SmallSider:"",
      NavStyle:""
    }
  },
  components: {
    'SideNav':SideNav,
    'BaseMap':BaseMap,
    'BaseGraph':BaseGraph,
    'HeatMap':HeatMap,
    'ClusterMap':ClusterMap,
    'MapDraw':MapDraw,
    'GPS':GPS,
    'GPSApply':GPSApply,
    'Document':_Document,
    'Custom':Custom,
    'Photo':Photo,
  },
  mounted:function(){
    //console.log("test");
    if(window.innerHeight/window.innerWidth>1)
    {
        //this.CollapseClass = "el-icon-arrow-right";
        //this.squall_Sider = "squall_Sider";
        //this.isCollapse =!this.isCollapse;
        this.SideBarWidth = 0;
        this.SideBarWidth_Temp = 0;
        this.MainPageWidth = 24;
        this.SmallMode = true;
        console.log(window.innerWidth);
        this.NavStyle = "height:" + window.innerHeight + "px";
    }
  },
  methods:{
    PageChange(Option){
      //console.log(Option);
      for(var item in this.PageControler)
      {
        if(item==Option.key)
          this.PageControler[item] = true;
        else
          this.PageControler[item] = false;
      }
    },
    CollapseControl(Command){
      if(this.CollapseControlClass == "el-icon-arrow-right")
      {
        this.SideBarWidth_Temp = 10;
        //this.MainPageWidth = 14;
        this.SmallSider = "squall_small_sider";
        this.CollapseControlClass = "el-icon-arrow-left";
      }
      else
      {
        this.SideBarWidth_Temp = 0;
        //this.MainPageWidth = 24;
        this.CollapseControlClass = "el-icon-arrow-right";
      }
      if(Command=="close"){
        this.SideBarWidth = 0;
        this.MainPageWidth = 24;
        this.CollapseControlClass = "el-icon-arrow-right";
      }
    }
  }
}
</script>

