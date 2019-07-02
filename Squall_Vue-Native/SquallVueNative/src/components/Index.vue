<template>
    <div>
      <el-row>
        <transition name="el-zoom-in-left">
          <el-col  v-show="SideBarShow" :span="10" class="squall_nav" :class="SmallSider" :style="NavStyle">
            <div class="squall_shadow" @click="CollapseControl()">
            </div>
              <side-nav v-on:pagechange="PageChange"></side-nav>
          </el-col>
        </transition>
        <el-col :span="MainPageWidth" :offset="SideBarWidth">
          <Main v-if="PageControler.Main"></Main>
          <Deal-search v-if="PageControler.DealSearch"></Deal-search>
          <Submit v-if="PageControler.Submit"></Submit>
          <custom v-if="PageControler.Custom"></custom>
          <Reuse v-if="PageControler.Reuse"></Reuse>
        </el-col>
      </el-row>
      <el-button type="primary" class="CollapseClass" @click="CollapseControl" :circle="true" v-if="SmallMode">
        <i :class="CollapseControlClass"></i>
      </el-button>
    </div>
</template>
<script>
import Vue from "vue-native-core";
import { StackNavigator } from "vue-native-router";
import ElementUI from 'element-ui';
import VueResource from 'vue-resource'
import { window } from 'react-native'

Vue.use(VueResource)
Vue.use(ElementUI);

//import HeaderNav from"@/components/Header"
import SideNav from"./Sider.vue"
//import FootNav from"@/components/Footer"

import Main from"./Main.vue"
import Submit from"./Submit.vue"
import DealSearch from"./DealSearch.vue"
import Custom from"./Custom.vue"
import Reuse from"./Reuse.vue"

import LeafletBase from "../lib/squall_map/leaflet_base.js"

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      SideBarShow: true,
      PageControler:{
        Main:true,
        Submit:false,
        DealSearch:false,
        Custom:false,
        Reuse:false,
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
    'Main':Main,
    'Submit':Submit,
    'DealSearch':DealSearch,
    'Custom':Custom,
    'Reuse':Reuse,
  },
  mounted:function(){
    //Check Login At Start
    //console.log(this.$route.query.Login);
    if(this.$route.query.Login&&this.global.username&&this.global.password)
    {
      //console.log(this.global);
      //console.log(this.$route.query);
    }  
    else
    {
      this.basic.squall_basic_http.CheckLogin({},this);
    }

    //screen adjust
    if(window.innerHeight/window.innerWidth>1)
    {
        //this.CollapseClass = "el-icon-arrow-right";
        //this.squall_Sider = "squall_Sider";
        //this.isCollapse =!this.isCollapse;
        this.SideBarWidth = 0;
        this.SideBarWidth_Temp = 0;
        this.MainPageWidth = 24;
        this.SmallMode = true;
        //console.log(window.innerWidth);
        this.NavStyle = "height:" + window.innerHeight + "px";
        this.SideBarShow = !this.SideBarShow;
    }

    //router
    if(this.global.router)
    {
      //this.PageChange({"key":this.global.router});
      //document.getElementById("Main").style.color = "#FFF";
      //document.getElementById(this.global.router).style.color = "#409EFF";
      //console.log(this.global.router);
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
      this.SideBarShow = false;
    },
    CollapseControl(Command){
      if(this.CollapseControlClass == "el-icon-arrow-right")
      {
        //this.SideBarWidth_Temp = 10;
        this.SmallSider = "squall_small_sider";
        this.CollapseControlClass = "el-icon-arrow-left";
      }
      else
      {
        //this.SideBarWidth_Temp = 0;
        this.CollapseControlClass = "el-icon-arrow-right";
      }
      if(Command=="close"){
        this.SideBarWidth = 0;
        this.MainPageWidth = 24;
        this.CollapseControlClass = "el-icon-arrow-right";
      }
      this.SideBarShow = !this.SideBarShow;
    }
  }
}
</script>

