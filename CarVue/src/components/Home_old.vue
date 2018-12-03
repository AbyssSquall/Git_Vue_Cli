<template>
    <div>
        <div>
            <h1>我的主页</h1>
        </div>
        <div class="layui-card squall_panel">
            <div class="layui-card-body">
                <div class="layui-row">
                    <div class="layui-col-xs2 layui-col-sm2 layui-col-md2 squall_pass">申请</div>
                    <img src="static/arrow.png" class="layui-col-xs3 layui-col-sm3 layui-col-md3">
                    <div class="layui-col-xs2 layui-col-sm2 layui-col-md2 squall_unpass">审批</div>
                    <img src="static/arrow.png" class="layui-col-xs3 layui-col-sm3 layui-col-md3">
                    <div class="layui-col-xs2 layui-col-sm2 layui-col-md2 squall_unpass">通过</div>
                </div>
            </div>
        </div>
        <div class="layui-card squall_panel">
            <div class="layui-card-body">
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">车牌号：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">浙B96C08</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">部门：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">地信所</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">申请人：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">黄列禹</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">目的地：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">北仑</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">事由：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">北仑图库</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">开始时间：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">2018-11-11 9:00:00</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">结束时间：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">2018-11-11 16:00:00</div>
                </div>
            </div>
        </div>
        <div class="layui-card squall_panel">
            <div class="layui-card-body">
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">待归还：</span></div>
                    <div class="layui-col-xs8 layui-col-sm8 layui-col-md8"><span class=" squall_label">0</span></div>
                    <div class="layui-col-xs1 layui-col-sm1 layui-col-md1">辆</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">待审核：</span></div>
                    <div class="layui-col-xs8 layui-col-sm8 layui-col-md8"><span class=" squall_label">0</span></div>
                    <div class="layui-col-xs1 layui-col-sm1 layui-col-md1">件</div>
                </div>
            </div>
        </div>
      <!--  <h1>任务列表</h1>
        <ul>
          <li>每个页面需要添加cookies验证或者sesions</li>
          <li>测试微信接口</li>
          <li>制作借车页面</li>
          <li>获取定位信息</li>
          <li>建立个人数据库</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div id="wechat"></div>
    -->
        <foot-nav :page="page"></foot-nav>
    </div>
</template>
<script>
import FootNav from"@/components/Footer"

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'home'
    }
  },
  components: {
    'FootNav':FootNav,
    //'SideNav':SideNav,
  },
  mounted:function(){
    console.log(this.Global.guid);
    // var obj = new WxLogin({
    //     self_redirect:true,
    //     id:"wechat", 
    //     appid: "wx4ab995e70e0e1380", 
    //     scope: "snsapi_login", 
    //     redirect_uri: "http%3A%2F%2Foa.nbgis.com%2Flogin%2Fwechat",
    //     state: this.Global.guid,
    //     style: "black",
    //     href: ""
    //   });
  },
}

</script>

