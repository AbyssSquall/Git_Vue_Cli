<template>
    <div>
      <el-row>
        <el-col :span="SideBarWidth_Temp" class="squall_nav" :class="SmallSider" :style="NavStyle">
          <side-nav v-on:pagechange="PageChange"></side-nav>
        </el-col>
        <el-col :span="MainPageWidth" :offset="SideBarWidth">
            <history v-if="PageControler.History"></history>
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

import History from "@/components/History"

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'home',
      PageControler:{
        History:true,
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
    'History':History,
  },
  mounted:function(){
    //console.log("test");
    if(window.innerHeight/window.innerWidth>1)
    {
        this.SideBarWidth = 0;
        this.SideBarWidth_Temp = 0;
        this.MainPageWidth = 24;
        this.SmallMode = true;
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

