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
        <!-- <el-row class="squall_panel">
            <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <el-card>
                    <div class="layui-row">
                        <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">申请人：</span></div>
                        <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">黄列禹</div>
                    </div>
                    <div class="layui-row">
                        <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">目的地：</span></div>
                        <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">北仑</div>
                    </div>
                    <div class="layui-row">
                        <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">用车类型：</span></div>
                        <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">生产用车</div>
                    </div>
                    <el-row>
                        <el-col :span="20" :offset="2">
                            <el-button type="primary" class="squall_width_full" @click="squall_element_dialog('1')">查看详情</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="squall_panel">
            <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <el-card>
                    <div class="layui-row">
                        <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">申请人：</span></div>
                        <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">黄列禹</div>
                    </div>
                    <div class="layui-row">
                        <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">目的地：</span></div>
                        <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">北仑</div>
                    </div>
                    <div class="layui-row">
                        <div class="layui-col-xs3 layui-col-sm3 layui-col-md3"><span class=" squall_label">用车类型：</span></div>
                        <div class="layui-col-xs9 layui-col-sm9 layui-col-md9">公务用车</div>
                    </div>
                    <el-row>
                        <el-col :span="20" :offset="2">
                            <el-button type="primary" class="squall_width_full" @click="squall_element_dialog">查看详情</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row> -->
        
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
        squall_agree:function(guid){
            this.dialogVisible = false;
            if(this.selectedInfo.车牌号)
                return;
            else
                this.Driver_dialogVisible = true;
            //console.log(guid);
            //this.show_html = "<el-button>1111</el-button>";
        },
        squall_element_dialog:function(guid){
            this.dialogVisible = true;
            if(guid=="1")
            {    
                //弹出弹出层
                    var squall_temp_data={
                        "车牌号":"浙B96C08",
                        "部门":"地理信息所",
                        "姓名":"黄列禹",
                        "目的地":"北仑",
                        "事由":"北仑图库",
                        "开始时间":"2018-11-11 9:00:00",
                        "结束时间":"2018-11-11 16:00:00"
                        };

                this.selectedInfo = squall_temp_data;
                var squall_html = "";
                for(var index in squall_temp_data)
                {
                    squall_html += "<div class='layui-row squall_item'>";
                    squall_html += '<div class="layui-col-xs4 layui-col-sm4 layui-col-md4"><span class=" squall_label">' + index + '：</span></div>';
                    squall_html += '<div class="layui-col-xs8 layui-col-sm8 layui-col-md8">' + squall_temp_data[index] + '</div>';
                    squall_html += "</div>";
                }
            }
            else
            {
                
                    var squall_temp_data={
                        "车牌号":"浙B96C08",
                            "部门":"地理信息所",
                            "姓名":"黄列禹",
                            "驾驶员":"陈屹",
                            "目的地":"北仑",
                            "事由":"北仑图库",
                            "开始时间":"2018-11-11 9:00:00",
                            "结束时间":"2018-11-11 16:00:00"
                        };

                this.selectedInfo = squall_temp_data;
                    var squall_html = "";
                    for(var index in squall_temp_data)
                    {
                        squall_html += "<div class='layui-row squall_item'>";
                        squall_html += '<div class="layui-col-xs4 layui-col-sm4 layui-col-md4"><span class=" squall_label">' + index + '：</span></div>';
                        squall_html += '<div class="layui-col-xs8 layui-col-sm8 layui-col-md8">' + squall_temp_data[index] + '</div>';
                        squall_html += "</div>";
                    }
            }
            this.show_html = squall_html;
      }
  },
}
</script>