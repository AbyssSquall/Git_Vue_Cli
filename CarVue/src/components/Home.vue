<template>
    <div>
      <el-row>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" :offset="2">
          <img class="squall_width_full" src="static/logo.png">  
        </el-col>
      </el-row>
      <el-row :gutter="10" class="squall_panel">
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" :offset="2">
          <el-card class="box-card">
            <router-link :to="{ path: '/ProductCar' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/chuzuche.png">  
              <a class="squall_width_full">生产用车</a>
            </router-link>
          </el-card>
        </el-col>
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
          <el-card class="box-card">
            <router-link :to="{ path: '/OfficialCar' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/qichezhan.png">  
              <a class="squall_width_full">公务用车</a>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="squall_panel">
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" :offset="2">
          <el-card class="box-card">
            <router-link :to="{ path: '/HandleApplication' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/duigou.png">  
              <a class="squall_width_full">申请审核</a>
            </router-link>
          </el-card>
        </el-col>
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
          <el-card class="box-card">
            <router-link :to="{ path: '/History' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/qingdan.png">  
              <a class="squall_width_full">历史记录</a>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="squall_panel">
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" :offset="2">
          <el-card class="box-card">
            <router-link :to="{ path: '/Return' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/shuaxin.png">  
              <a class="squall_width_full">借车归还</a>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>
<script>

export default {
  name: 'Car',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'car'
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
    //console.log(this.Global.guid);
    //this.basic.squall_basic_http.GetInfo(this.Global.guid);
  }
}
</script>

