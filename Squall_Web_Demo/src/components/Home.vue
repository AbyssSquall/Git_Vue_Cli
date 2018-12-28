<template>
    <div>
      <el-row>
        <el-col :span="3" class="squall_nav" >
          <side-nav v-on:pagechange="PageChange"></side-nav>
        </el-col>
        <el-col :span="21" :offset="3">
          <div v-if="PageControler.Home">
            <h1>任务列表</h1>
            <ul>
              <li>每个页面需要添加cookies验证或者sesions</li>
              <li>测试微信接口</li>
              <li>制作借车页面</li>
              <li>获取定位信息</li>
              <li>建立个人数据库</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li><el-button type="primary" @click="squall_SelectTest">检索测试</el-button></li>
              <li><el-button type="primary" @click="squall_UpdateTest">更新测试</el-button></li>
            </ul>
          </div>
          <base-graph v-if="PageControler.BaseGraph"></base-graph>
          <heat-map v-if="PageControler.HeatMap"></heat-map>
          <cluster-map v-if="PageControler.ClusterMap"></cluster-map>
          <map-draw v-if="PageControler.MapDraw"></map-draw>
          <G-p-s v-if="PageControler.GPS"></G-p-s>
          <document v-if="PageControler.Document"></document>
        </el-col>
      </el-row>
    </div>
</template>
<script>
//import HeaderNav from"@/components/Header"
import SideNav from"@/components/Sider"
//import FootNav from"@/components/Footer"

import BaseGraph from"@/components/BaseGraph"
import HeatMap from"@/components/HeatMap"
import ClusterMap from"@/components/ClusterMap"
import MapDraw from"@/components/MapDraw"
import GPS from"@/components/GPS"
import _Document from"@/components/Document"

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
      },
    }
  },
  components: {
    'SideNav':SideNav,
    'BaseGraph':BaseGraph,
    'HeatMap':HeatMap,
    'ClusterMap':ClusterMap,
    'MapDraw':MapDraw,
    'GPS':GPS,
    'Document':_Document,
  },
  mounted:function(){
    // var obj = new WxLogin({
    //     self_redirect:true,
    //     id:"wechat", 
    //     appid: "", 
    //     scope: "", 
    //     redirect_uri: "",
    //     state: "",
    //     style: "",
    //     href: ""
    //   });
  },
  methods:{
    squall_UpdateTest(){
      //console.log("update test!");
      this.basic.squall_basic_http.TestUpdate(this);
    },
    squall_SelectTest(){
      this.basic.squall_basic_http.TestSelect(this);
    },
    PageChange(Option){
      for(var item in this.PageControler)
      {
        if(item==Option.key)
          this.PageControler[item] = true;
        else
          this.PageControler[item] = false;
      }
    },
  }
}
</script>

