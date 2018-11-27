<template>
    <div>
      <div class="layui-row">
          <img class="layui-col-xs10 layui-col-sm10 layui-col-md10 layui-col-xs-offset1 layui-col-sm-offset1 layui-col-md-offset1" src="static/logo.png">  
      </div>
      <div class="layui-row">
        <div class="layui-col-xs10 layui-col-sm10 layui-col-md10 layui-col-xs-offset1 layui-col-sm-offset1 layui-col-md-offset1">
          <img class="blank" src="static/blank.png">
        </div>
      </div>
      <div class="layui-row">
        <div class="layui-col-xs6 layui-col-sm6 layui-col-md6 layui-col-xs-offset3 layui-col-sm-offset3 layui-col-md-offset3">
          <router-link :to="{ path: '/ProductCar' }" class="layui-btn layui-btn-primary layui-col-xs12 layui-col-sm12 layui-col-md12">生产车辆</router-link>
        </div>
      </div>
      <div class="layui-row">
        <div class="layui-col-xs6 layui-col-sm6 layui-col-md6 layui-col-xs-offset3 layui-col-sm-offset3 layui-col-md-offset3">
          <img class="blank" src="static/blank.png">
        </div>
      </div>
      <div class="layui-row">
          <div class="layui-col-xs6 layui-col-sm6 layui-col-md6 layui-col-xs-offset3 layui-col-sm-offset3 layui-col-md-offset3">
            <router-link :to="{ path: '/OfficialCar' }" class="layui-btn layui-btn-primary layui-col-xs12 layui-col-sm12 layui-col-md12">公务用车</router-link>
          </div>
      </div>
      <div class="layui-row">
        <div class="layui-col-xs6 layui-col-sm6 layui-col-md6 layui-col-xs-offset3 layui-col-sm-offset3 layui-col-md-offset3">
          <img class="blank" src="static/blank.png">
        </div>
      </div>
      <div class="layui-row">
          <div class="layui-col-xs6 layui-col-sm6 layui-col-md6 layui-col-xs-offset3 layui-col-sm-offset3 layui-col-md-offset3">
            <router-link :to="{ path: '/HandleApplication' }" class="layui-btn layui-btn-primary layui-col-xs12 layui-col-sm12 layui-col-md12">申请审核</router-link>
          </div>
      </div>
      <foot-nav :page="page"></foot-nav>
    </div>
</template>
<script>
//import HeaderNav from"@/components/Header"
//import SideNav from"@/components/Sider"
import FootNav from"@/components/Footer"

export default {
  name: 'Car',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'car'
    }
  },
  components: {
    'FootNav':FootNav,
    //'SideNav':SideNav,
  },
  mounted:function(){
    //console.log(this.Global.guid);
    this.basic.squall_basic_http.GetInfo(this.Global.guid);
  }
}
</script>

