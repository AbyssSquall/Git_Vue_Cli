<template>
    <div>      
      <el-row style="height:100px">
          <el-col :span="24">
            <h1>登陆</h1>
          </el-col>
      </el-row>
      <el-row >
          <el-col :span="20" :offset="2">
            <el-row class="squall_doc_item" id="base">
              <el-card style="height:200px">
                <el-form :model="LoginData" label-width="80px">
                  <el-form-item label="用户名">
                    <el-input v-model="LoginData.Username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input type="password" v-model="LoginData.Password"></el-input>
                  </el-form-item>
                  <el-row>
                    <el-button type="primary" @click="Submit('Submit')" width="100px">确定</el-button>
                  </el-row>
                </el-form>
              </el-card>
            </el-row>
          </el-col>
      </el-row>
    </div>
</template>
<script>

export default {
  name: 'Car',
  data () {
    return {
      LoginData: {
        Username:"admin",
        Password:"ba0156d9b34986f4ba2eeea8a24e4162",
      },
      page: 'car',
      catalog:["基础地图","矢量图形","生成热力图","生成热力聚合图","绘制矢量图形","gps导航定位"],
    }
  },
  components: {
  },
  mounted:function(){
    this.catalog = ["基础地图","矢量图形","热力图","热力聚合图","绘制矢量图形","gps"];
  },
  methods:{
    Submit(Option){
      this.basic.squall_basic_http.Login(this);
    }
  }
}
</script>

