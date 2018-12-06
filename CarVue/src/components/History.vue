<template>
    <div>
        <h1>历史记录</h1>
        <el-row class="squall_panel">
            <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <el-card>
                    <el-row>
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="1">
                            <a style="line-height:40px">时间</a>
                        </el-col>
                        <el-col :xs="19" :sm="19" :md="19" :lg="19" :xl="19"><el-date-picker
                            v-model="outputInfo.time"
                            type="month"
                            placeholder="选择月">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="squall_panel">
                        <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
                            <el-button type="success" class="squall_width_full">查询</el-button>
                        </el-col>
                        <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
                            <el-button type="success" class="squall_width_full">导出</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        
        <el-row class="squall_panel" v-for="History in HistoryList" :key="History.guid">
            <el-col  :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <el-card class="box-card">
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">申请人：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">{{History.姓名}}</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">目的地：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">{{History.aim}}</div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">用车类型：</span></div>
                    <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">{{History.table_alias}}</div>
                </div>
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-button type="primary" class="squall_width_full" @click="squall_element_dialog(History)">查看详情</el-button>
                    </el-col>
                </el-row>
                </el-card>
            </el-col>
        </el-row>

        <!--
        -->
        <el-dialog :visible.sync="dialogVisible" width="80%">
            <div v-html="show_html"></div>
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

export default {
  name: 'Car',
  data () {
    return {
        show_msg: '',
        page: 'car',
        dialogVisible: false,
        show_html:'',
        squall_cencel:"关闭",
        guid:"1",
        selectedInfo:{},
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        outputInfo:{},
        HistoryList:[],
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
    //console.log(this.Global.guid);
    this.basic.squall_basic_http.GetInfo(this.Global.guid);

    //查询全部历史记录
    this.basic.squall_basic_http.GetHistory(this);
    
  },
  methods:{
        squall_element_dialog:function(Info){
            //根据guid检索用车信息
            console.log(Info);

            var that = this;
            this.basic.squall_basic_http.GetHistoryItem(this,Info);
      }
  },
}
</script>