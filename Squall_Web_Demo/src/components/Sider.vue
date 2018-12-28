<template>
    <div>
        <el-row>
            <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#466F99"
                
                text-color="#fff"
                active-text-color="#5CADFF">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
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
                    <!-- <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu> -->
                </el-submenu>
                <el-menu-item index="2" @click="ItemRouter('MapDraw')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">地图绘制</span>
                </el-menu-item>
                <el-menu-item index="3" @click="ItemRouter('GPS')" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">GPS相关</span>
                </el-menu-item>
                <el-menu-item index="4" @click="ItemRouter('Document')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">开发文档</span>
                </el-menu-item>
                <el-menu-item index="5" @click="ItemRouter('Custom')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">自定义页面</span>
                </el-menu-item>
                </el-menu>
        </el-row>
    </div>
</template>
<script>
export default {
    data:function(){
        return{
            "home1":false,
            "car1":false,
            "map1":false,
            "personal1":false,
            "background-color":"#000000",
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
          //console.log(key);
          //this.$router.push({name:key,params:{success:true}});
          this.$emit("pagechange",{"key":key});
      }
    }
}
</script>
