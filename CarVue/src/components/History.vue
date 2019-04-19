<template>
    <div>
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
                            <el-button type="success" class="squall_width_full" @click="squall_search">查询</el-button>
                        </el-col>
                        <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" :offset="2">
                            <el-button type="success" class="squall_width_full" @click="squall_output">导出</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>

        <el-row class="squall_panel">
            <el-col  :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <el-card class="box-card">
                    <el-table
                        :data="HistoryList"
                        height="500"
                        border
                        style="width:100%">
                        <el-table-column
                            prop="姓名"
                            label="姓名"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="driver"
                            label="驾驶员"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="region"
                            label="用车范围"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="aim"
                            label="目的地"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="table_alias"
                            label="用车类型"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="task"
                            label="工作内容">
                        </el-table-column>
                        <el-table-column
                            prop="starttime"
                            label="开始时间"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="endtime"
                            label="结束时间"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="110">
                            <template slot-scope="scope">
                                <el-button
                                    @click.native.prevent="TableOption(scope.$index, HistoryList)"
                                    plain>
                                审批单
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

        <!--
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
        TotalHistoryList:[],
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
    this.basic.squall_basic_http.GetInfo(this.basic.squall_user_info.guid);

    //查询全部历史记录
    this.basic.squall_basic_http.GetHistory(this);
    
  },
  methods:{
        squall_element_dialog:function(Info){
            //根据guid检索用车信息
            var that = this;
            this.basic.squall_basic_http.GetHistoryItem(this,Info);
        },
        squall_search:function(){
            //console.log(this.TotalHistoryList);
            if(this.outputInfo.time)
            {
                var squall_liter_time = new Date(this.outputInfo.time);
                this.HistoryList = [];

                var squall_liter_start = squall_liter_time.valueOf();
                var squall_liter_end = squall_liter_start + 31*24*60*60*1000;

                for(var i=0;i<this.TotalHistoryList.length;i++)
                {
                    if(new Date(this.TotalHistoryList[i].starttime).valueOf()>squall_liter_start&&new Date(this.TotalHistoryList[i].starttime).valueOf()<squall_liter_end)
                        this.HistoryList.push(this.TotalHistoryList[i]);
                }

                console.log("search!!!");
            }
            else
            {
                alert("请选择日期！");
            }
        },
        squall_output:function(){
            console.log("output!!!");
        },
        TableOption:function(Index,DataList){
            console.log(Index,DataList);
            let NewPage = this.$router.resolve({
                name:"Form",
                query:{
                    name:DataList[Index].姓名,
                    aim:DataList[Index].aim,
                    starttime:DataList[Index].starttime,
                    endtime:DataList[Index].endtime,
                    car:DataList[Index].car,
                    driver:DataList[Index].driver,
                }
            });
            window.open(NewPage.href,"_blank");
        }
  },
}
</script>