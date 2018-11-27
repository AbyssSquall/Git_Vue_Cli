<template>
    <div>
      <div class="squall_personal_info">
          <img class="squall_head" src="static/head.png" alt="">  
          <div class="squall_username">スコール</div>
      </div>
      <!--<div class="layui-row squall_info_line" v-on:click="squall_show_application()">
        <div class="layui-col-xs11 layui-col-sm11 layui-col-md11">
          <a>我的申请</a>
        </div>
        <div class="layui-col-xs1 layui-col-sm1 layui-col-md1">
          <span class="layui-icon">&#xe602;</span>
        </div>
      </div>-->
      <div class="layui-row squall_info_line" v-on:click="squall_show_history()">
        <div class="layui-col-xs11 layui-col-sm11 layui-col-md11">
          <a>历史记录</a>
        </div>
        <div class="layui-col-xs1 layui-col-sm1 layui-col-md1">
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>
      <!--
      <div class="layui-row squall_btn_submit">
        <button class="layui-btn layui-btn-danger layui-col-xs10 layui-col-sm10 layui-col-md10 layui-col-xs-offset1 layui-col-sm-offset1 layui-col-md-offset1">退出登录</button>
      </div>
      -->
      <foot-nav :page="page"></foot-nav>

        <!--弹出层-->
        <el-dialog :visible.sync="dialogVisible" width="80%">
            <div class="" v-html="show_html"></div>
            <el-row>
                <el-col :span="20" :offset='2'>
                    <div class="grid-content bg-purple">
                        <el-button type="primary" class="squall_width_full squall_top_gap" @click="dialogVisible = false">{{squall_cencel}}</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
import FootNav from"@/components/Footer"

export default {
  name: 'Personal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'personal',
      show_html:"",
      squall_cencel:"关闭",
      dialogVisible:false,
    }
  },
  components: {
    'FootNav':FootNav,
    //'SideNav':SideNav,
  },
  methods:{
    squall_show_history:function(){
      this.dialogVisible = true;
            var squall_html = "";
            //squall_html+="<div class='layui-row'></div>"

            for(var i=0;i<20;i++)
            {
                squall_html += "<div class='layui-row squall_onuse_item'>";
                squall_html += '<div class="layui-col-xs6 layui-col-sm6 layui-col-md6">浙B96C08</div>';
                squall_html += '<div class="layui-col-xs6 layui-col-sm6 layui-col-md6">黄列禹' + i + '</div>';
                squall_html += "</div>";
            }

            this.show_html = "<div class='squall_show_body'>" + squall_html + "</div>";
    },
    squall_show_application:function(){
      //console.log(this.Global.guid);
      alert(this.Global.guid);
    }
  }
}
</script>