<template>
    <div>
      <el-row>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" :offset="2">
          <img class="squall_width_full" src="static/logo.png">  
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="ProductCar" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/ProductCar' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/chuzuche.png">  
              <a class="squall_width_full">生产用车</a>
            </router-link>
          </el-card>
        </el-col>
        <el-col v-if="OfficialCar" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/OfficialCar' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/qichezhan.png">  
              <a class="squall_width_full">公务用车</a>
            </router-link>
          </el-card>
        </el-col>
        <el-col v-if="HandleApplication" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/HandleApplication' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/duigou.png">  
              <a class="squall_width_full">申请审核</a>
            </router-link>
          </el-card>
        </el-col>
        <el-col v-if="History" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/History' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/qingdan.png">  
              <a class="squall_width_full">历史记录</a>
            </router-link>
          </el-card>
        </el-col>
        <el-col v-if="Return" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/Return' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/shuaxin.png">  
              <a class="squall_width_full">借车归还</a>
            </router-link>
          </el-card>
        </el-col>
        <el-col v-if="Regist" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2" >
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/Regist' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/yonghu.png">  
              <a class="squall_width_full">注册绑定</a>
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
      page: 'car',
      ProductCar:true,
      OfficialCar:true,
      HandleApplication:false,
      History:false,
      Return:true,
      Regist:true,
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  create:function(){
  },
  mounted:function(){
    //获取权限
    this.basic.squall_basic_http.GetGrant(178,this);

    //
    this.basic.squall_user_info.name = "黄列禹";

    //this.History=true;
    //this.HandleApplication = true;
    
    //console.log(this.Global.guid);
    //this.basic.squall_basic_http.GetInfo(this.Global.guid);
  }
}
</script>

