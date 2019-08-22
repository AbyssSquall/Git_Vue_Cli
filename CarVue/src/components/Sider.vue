<template>
    <div :class="squall_Sider">
        <el-row>
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#466F99"
                text-color="#fff"
                active-text-color="#5CADFF"
            >
                <!-- <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-picture"></i>
                        <span>地图</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">地图加载</template>
                        <el-menu-item index="1-1" @click="ItemRouter('Home')">基础地图</el-menu-item>
                        <el-menu-item index="1-2" @click="ItemRouter('BaseGraph')">点线面</el-menu-item>
                        <el-menu-item index="1-3" @click="ItemRouter('HeatMap')">热力图</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="特殊地图">
                    <el-menu-item index="1-4" @click="ItemRouter('ClusterMap')">聚合图</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu> -->
                <el-menu-item id="SearchPage" index="2" @click="ItemRouter('SearchPage')">
                    <i class="el-icon-search"></i>
                    <span slot="title">查找车辆</span>
                </el-menu-item>
                <!-- <el-menu-item index="3" @click="ItemRouter('Submit')" >
                    <i class="el-icon-house"></i>
                    <span slot="title">基本信息</span>
                </el-menu-item>
                <el-menu-item id="DealSearch" index="4" @click="ItemRouter('DealSearch')" >
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title">处置</span>
                </el-menu-item>
                <el-menu-item index="5" @click="ItemRouter('Reuse')" >
                    <i class="el-icon-refresh-right"></i>
                    <span slot="title">利用</span>
                </el-menu-item>
                <el-menu-item index="6" @click="ItemRouter('Document')">
                    <i class="el-icon-document"></i>
                    <span slot="title">开发文档</span>
                </el-menu-item>
                <el-menu-item index="7" @click="ItemRouter('Custom')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">自定义页面</span>
                </el-menu-item> -->
                </el-menu>
        </el-row>
        <div class="squall_center_container squall_relative_buttom" :style="ExitStyle">
            <img class="squall_small" @click="squall_Exit" src="static/asset/exit_white.png">  
        </div>
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
        this.WindowsHeight = document.body.clientHeight;
        this.WindoesWidth = document.body.clientWidth;
        
        if(document.body.clientWidth/document.body.clientHeight<4)
        {
            this.CollapseClass = "el-icon-arrow-right";
            this.squall_Sider = "squall_Sider";
            this.isCollapse =!this.isCollapse;
        }
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
