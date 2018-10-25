<template>
  <div class="" >
    <ul class="squall-side-nav layui-nav layui-nav-tree layui-nav-side" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li class="layui-nav-item layui-nav-itemed">
        <a href="javascript:;">检查登记</a>
        <dl class="layui-nav-child">
          <dd ref="ups" v-bind:class="{'layui-this':ups1}"><router-link :to="{ path: '/' }">UPS登记</router-link></dd>
          <dd ref="io" v-bind:class="{'layui-this':io1}"><router-link :to="{ path: '/io' }">出入登记</router-link></dd>
          <dd ref="round" v-bind:class="{'layui-this':round1}"><router-link :to="{ path: '/round' }">巡检记录</router-link></dd>
          <dd ref="air" v-bind:class="{'layui-this':air1}"><router-link :to="{ path: '/air' }">空调检修</router-link></dd>
        </dl>
      </li>
      <li class="layui-nav-item">
        <a href="javascript:;">设备情况</a>
        <!-- <dl class="layui-nav-child">
          <dd><a href="">移动模块</a></dd>
          <dd><a href="">后台模版</a></dd>
          <dd><a href="">电商平台</a></dd>
        </dl> -->
      </li>
      <li ref="search" v-bind:class="{'layui-this':search1}" class="layui-nav-item"><router-link :to="{ path: '/search' }">查看记录</router-link></li>
    </ul>
  </div>
</template>
<script>
//import layui from"../plus/squall_layui.js"

export default {
  data(){
    return {
      ups1:false,
      io1:false,
      round1:false,
      air1:false,
      search1:false,
    };
  },
  props:['type'],
  mounted:function(){
    //console.log(this.type);
    this.ups1=false;
    this.io1=false;
    this.round1=false;
    this.air1=false;
    this.search1=false;

    if(this.type=='ups')
     this.ups1=true;
    else if(this.type=='io')
     this.io1=true;
    else if(this.type=='round')
     this.round1=true;
    else if(this.type=='air')
     this.air1=true;
    else if(this.type=='search')
     this.search1=true;
    //this.test = "111111";
        var vm=this;
        vm.$nextTick(function(){
            layui.use(['element'], function(){
                // var form = layui.form;

                // var laydate = layui.laydate;
                // var Now = new Date();
                // //执行一个laydate实例
                // laydate.render({
                // elem: '#checktime', //指定元素
                // value:Now.toLocaleDateString(),
                // format:"yyyy/MM/dd"
                // });

                var element = layui.element;
                //form.render();  
                element.render();
            })
        })
  },
}
</script>
