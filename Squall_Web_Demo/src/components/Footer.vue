<template>
    <div class="squall_footer">
        <el-row>
            <el-col id="Home" :span='6' v-bind:class="{'squall-this':home1}">
                <el-button class="squall_full_width">
                    <router-link :to="{ path: '/' }" class="squall_foot_item" >home</router-link>
                </el-button>
            </el-col>
            <el-col id="CarCgarge" :span='6' v-bind:class="{'squall-this':car1}">
                <el-button class="squall_full_width">
                <router-link :to="{ path: '/car' }" class="squall_foot_item">car</router-link>
                </el-button>
            </el-col>
            <el-col id="Map" :span='6' v-bind:class="{'squall-this':map1}">
                <el-button class="squall_full_width">
                <router-link :to="{ path: '/map' }" class="squall_foot_item">map</router-link>
                </el-button>
            </el-col>
            <el-col id="Personal" :span='6' v-bind:class="{'squall-this':personal1}">
                <el-button class="squall_full_width">
                    <router-link :to="{ path: '/personal' }" class="squall_foot_item">personal</router-link>
                </el-button>
            </el-col>
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
    }
}
</script>
