<template>
    <div>
        <el-row>
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#000000"
                text-color="#fff"
                active-text-color="#6040FF">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
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
            "personal1":false
        }
    },
    props:['page'],
    mounted:function(){
        this.home1=false;
        this.car1=false;
        this.map1=false;
        this.personal1=false;

        if(this.page=='home')
            this.home1=true;
        else if(this.page=='car')
            this.car1=true;
        else if(this.page=='map')
            this.map1=true;
        else if(this.page=='personal')
            this.personal1=true;
        console.log(this.page);
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
