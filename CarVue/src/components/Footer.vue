<template>
    <div class="squall_footer">
        <ul>
            <li id="Home" class="layui-col-xs3 layui-col-sm3" v-bind:class="{'squall-this':home1}">
                <router-link :to="{ path: '/' }" class="layui-icon" >&#xe68e;</router-link>
            </li>
            <li id="CarCgarge" class="layui-col-xs3 layui-col-sm3" v-bind:class="{'squall-this':car1}">
                <router-link :to="{ path: '/car' }" class="layui-icon">&#xe857;</router-link>
            </li>
            <li id="Map" class="layui-col-xs3 layui-col-sm3" v-bind:class="{'squall-this':map1}">
                <router-link :to="{ path: '/map' }" class="layui-icon">&#xe663;</router-link>
            </li>
            <li id="Personal" class="layui-col-xs3 layui-col-sm3" v-bind:class="{'squall-this':personal1}">
                <router-link :to="{ path: '/personal' }" class="layui-icon">&#xe770;</router-link>
            </li>
        </ul>
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
        //console.log(this.page);
    }
}
</script>
