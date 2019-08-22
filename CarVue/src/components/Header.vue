<template>
    <div>
        <el-row>
            <div style="background-color:#90080ff">我来组成头部！！</div>
        </el-row>
    </div>
</template>
<script>
export default {
    data:function(){
        return{
            "WindowsHeight":false,
            "WindoesWidth":false,
            "map1":false,
            "personal1":false,
            "background-color":"#000000",
            "isCollapse": false,
            "CollapseClass":"el-icon-arrow-left",
            "squall_Sider":"squall_Sider_on",
            "ActiveIndex":"2",
            ExitStyle:"bottom:10px;"
        }
    },
    props:['page'],
    mounted:function(){
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      ItemRouter(key){
            this.Global.router = key;
            this.CollapseClass = "el-icon-arrow-right";
            this.$emit("pagechange",{"key":key});
      },
      CollapseControl(){
          if(this.CollapseClass=="el-icon-arrow-left")
          {
              this.CollapseClass = "el-icon-arrow-right";
              this.squall_Sider = "squall_Sider";
          }
          else if(this.CollapseClass == "el-icon-arrow-right")
          {
              this.CollapseClass="el-icon-arrow-left";
              this.squall_Sider = "squall_Sider_on";
          }
          this.isCollapse =!this.isCollapse;
      },
      squall_Exit(){
          //console.log(this);
          this.$router.go(-1);
      }
    }
}
</script>
