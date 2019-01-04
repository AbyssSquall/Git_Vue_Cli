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
              <div class="squall_width_full">生产用车</div>
            </router-link>
          </el-card>
        </el-col>
        <el-col v-if="OfficialCar" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/OfficialCar' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/qichezhan.png">  
              <div class="squall_width_full">经营用车</div>
            </router-link>
          </el-card>
        </el-col>
        <el-col v-if="HandleApplication" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/HandleApplication' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/duigou.png">  
              <div class="squall_width_full">申请审核</div>
            </router-link>
          </el-card>
        </el-col>
        <el-col v-if="History" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/History' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/qingdan.png">  
              <div class="squall_width_full">历史记录</div>
            </router-link>
          </el-card>
        </el-col>
        <el-col v-if="Return" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/Return' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/shuaxin.png">  
              <div class="squall_width_full">借车归还</div>
            </router-link>
          </el-card>
        </el-col>
        <el-col v-if="Regist" :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2" >
          <el-card class="box-card squall_panel">
            <router-link :to="{ path: '/Regist' }" class="squall_width_full">
              <img class="squall_width_full" src="static/asset/yonghu.png">  
              <div class="squall_width_full">注册绑定</div>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
        <el-dialog :visible.sync="Success_visible" width="80%">
            <el-row>
                <el-col :span="16" :offset='4'>
                  <img class="squall_width_full" src="static/asset/zan_green.png">
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset='2'>
                  <div class="squall_width_full">提交成功！！！</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset='2' class=" squall_top_gap">
                    <div class="grid-content bg-purple squall_top_gap">
                        <el-button type="primary" class="squall_width_full squall_top_gap" @click="Success_visible = false">确定</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
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
      OfficialCar:false,
      HandleApplication:false,
      History:false,
      Return:true,
      Regist:true,
      Success_visible:false,
      OnUseList:[],
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  create:function(){
  },
  mounted:function(){
    //判断是否注册
    if(!this.basic.squall_user_info.openid)
    {
      this.basic.squall_basic_http.LoginTest(this);
    }  
    else
    {
      this.basic.squall_basic_http.GetInfo(this.basic.squall_user_info.guid,this);
      if(this.basic.squall_user_info.UseCarID)
      {
        that.basic.squall_basic_http.GetOnUseList(this.basic.squall_user_info.序号,this);
      }  
    }
      
    //else
    //{
      //获取用户信息和权限
      //this.basic.squall_basic_http.GetGrant(this.basic.squall_user_info.序号,this);
      //是否有已经在借的生产车辆
      //this.basic.squall_basic_http.GetOnUseList(this.basic.squall_user_info.序号,this);
    //}

    if(this.$route.params.success)
    {
      if(this.basic.squall_user_info.UseCarID)
        this.$router.push({name:"ProductCar",params:{UseCarID:this.basic.squall_user_info.UseCarID,success:true}});
      this.Success_visible = this.$route.params.success;
    }

  }
}
</script>

