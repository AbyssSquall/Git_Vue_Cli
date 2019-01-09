<template>
    <div>
      <el-row class="squall_panel">
          <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
              <el-card>
                    <h1>历史记录</h1>
                    <el-tabs class="squall_panel" v-model="TabActive" type="card" @tab-click="handleClick">
                        <el-tab-pane label="生产用车（大市区内）" name="ProductInBigCity">
                            <el-row>
                                <!--这里是tab页内容-->
                                <el-row class="squall_card_head">
                                    <el-row class="squall_card_head_contain">
                                        <el-row>
                                            <el-col :span="20" :offset="2">
                                                <el-form ref="form" :v-model="FormValue" label-width="80px">
                                                    <el-form-item label="部门选择">
                                                        <el-checkbox-group v-model="FormValue.SelectedDepartmentList">
                                                            <el-checkbox v-for="Department in DepartmentList" :key="Department.departmentid" v-bind:label="Department.部门" v-bind:value="Department.departmentid" name="type"></el-checkbox>
                                                        </el-checkbox-group>
                                                    </el-form-item>
                                                </el-form>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="2">
                                                <a style="line-height:40px">时间</a>
                                            </el-col>
                                            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"><el-date-picker
                                                v-model="outputInfo.time"
                                                type="month"
                                                placeholder="选择月">
                                                </el-date-picker>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="0">
                                                <el-button type="success" class="squall_width_full" @click="squall_allpick">全选</el-button>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                                                <el-button type="success" class="squall_width_full" @click="squall_search">查询</el-button>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                                                <el-button type="success" class="squall_width_full" @click="squall_output">导出</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-row>
                                </el-row>
                                <el-row class="squall_panel">
                                    <el-table
                                        :data="HistoryList"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                            prop="车牌号"
                                            label="车牌号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="starttime"
                                            label="开始时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="endtime"
                                            label="结束时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="aim"
                                            label="目的地">
                                        </el-table-column>
                                        <el-table-column
                                            prop="task"
                                            label="事由">
                                        </el-table-column>
                                        <el-table-column
                                            prop="driver"
                                            label="驾驶人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="姓名"
                                            label="申请人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="charger"
                                            label="审批人">
                                        </el-table-column>
                                    </el-table>
                                </el-row>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="生产用车（大市区外）" name="ProductOutBigCity">
                             <el-row>
                                <!--这里是tab页内容-->
                                <el-row class="squall_card_head">
                                    <el-row class="squall_card_head_contain">
                                        <el-row>
                                            <el-col :span="20" :offset="2">
                                                <el-form ref="form" :v-model="FormValue" label-width="80px">
                                                    <el-form-item label="部门选择">
                                                        <el-checkbox-group v-model="FormValue.SelectedDepartmentList">
                                                            <el-checkbox v-for="Department in DepartmentList" :key="Department.departmentid" v-bind:label="Department.部门" v-bind:value="Department.departmentid" name="type"></el-checkbox>
                                                        </el-checkbox-group>
                                                    </el-form-item>
                                                </el-form>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="2">
                                                <a style="line-height:40px">时间</a>
                                            </el-col>
                                            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"><el-date-picker
                                                v-model="outputInfo.time"
                                                type="month"
                                                placeholder="选择月">
                                                </el-date-picker>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="0">
                                                <el-button type="success" class="squall_width_full" @click="squall_allpick">全选</el-button>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                                                <el-button type="success" class="squall_width_full" @click="squall_search">查询</el-button>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                                                <el-button type="success" class="squall_width_full" @click="squall_output">导出</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-row>
                                </el-row>
                                <el-row class="squall_panel">
                                    <el-table
                                        :data="HistoryList"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                            prop="车牌号"
                                            label="车牌号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="starttime"
                                            label="开始时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="endtime"
                                            label="结束时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="aim"
                                            label="目的地">
                                        </el-table-column>
                                        <el-table-column
                                            prop="task"
                                            label="事由">
                                        </el-table-column>
                                        <el-table-column
                                            prop="driver"
                                            label="驾驶人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="姓名"
                                            label="申请人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="charger"
                                            label="审核人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="boss"
                                            label="审批人">
                                        </el-table-column>
                                    </el-table>
                                </el-row>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="经营用车（市区内）" name="OfficialInCity"><el-row>
                                <!--这里是tab页内容-->
                                <el-row class="squall_card_head">
                                    <el-row class="squall_card_head_contain">
                                        <el-row>
                                            <el-col :span="20" :offset="2">
                                                <el-form ref="form" :v-model="FormValue" label-width="80px">
                                                    <el-form-item label="部门选择">
                                                        <el-checkbox-group v-model="FormValue.SelectedDepartmentList">
                                                            <el-checkbox v-for="Department in DepartmentList" :key="Department.departmentid" v-bind:label="Department.部门" v-bind:value="Department.departmentid" name="type"></el-checkbox>
                                                        </el-checkbox-group>
                                                    </el-form-item>
                                                </el-form>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="2">
                                                <a style="line-height:40px">时间</a>
                                            </el-col>
                                            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"><el-date-picker
                                                v-model="outputInfo.time"
                                                type="month"
                                                placeholder="选择月">
                                                </el-date-picker>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="0">
                                                <el-button type="success" class="squall_width_full" @click="squall_allpick">全选</el-button>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                                                <el-button type="success" class="squall_width_full" @click="squall_search">查询</el-button>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                                                <el-button type="success" class="squall_width_full" @click="squall_output">导出</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-row>
                                </el-row>
                                <el-row class="squall_panel">
                                    <el-table
                                        :data="HistoryList"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                            prop="车牌号"
                                            label="车牌号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="starttime"
                                            label="开始时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="endtime"
                                            label="结束时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="waitpoint"
                                            label="等候地点">
                                        </el-table-column>
                                        <el-table-column
                                            prop="aim"
                                            label="目的地">
                                        </el-table-column>
                                        <el-table-column
                                            prop="task"
                                            label="事由">
                                        </el-table-column>
                                        <el-table-column
                                            prop="driver"
                                            label="驾驶人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="姓名"
                                            label="申请人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="dealer"
                                            label="调度人">
                                        </el-table-column>
                                    </el-table>
                                </el-row>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="经营用车（大市区内）" name="OfficialInBigCity"><el-row>
                                <!--这里是tab页内容-->
                                <el-row class="squall_card_head">
                                    <el-row class="squall_card_head_contain">
                                        <el-row>
                                            <el-col :span="20" :offset="2">
                                                <el-form ref="form" :v-model="FormValue" label-width="80px">
                                                    <el-form-item label="部门选择">
                                                        <el-checkbox-group v-model="FormValue.SelectedDepartmentList">
                                                            <el-checkbox v-for="Department in DepartmentList" :key="Department.departmentid" v-bind:label="Department.部门" v-bind:value="Department.departmentid" name="type"></el-checkbox>
                                                        </el-checkbox-group>
                                                    </el-form-item>
                                                </el-form>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="2">
                                                <a style="line-height:40px">时间</a>
                                            </el-col>
                                            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"><el-date-picker
                                                v-model="outputInfo.time"
                                                type="month"
                                                placeholder="选择月">
                                                </el-date-picker>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="0">
                                                <el-button type="success" class="squall_width_full" @click="squall_allpick">全选</el-button>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                                                <el-button type="success" class="squall_width_full" @click="squall_search">查询</el-button>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                                                <el-button type="success" class="squall_width_full" @click="squall_output">导出</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-row>
                                </el-row>
                                <el-row class="squall_panel">
                                    <el-table
                                        :data="HistoryList"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                            prop="车牌号"
                                            label="车牌号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="starttime"
                                            label="开始时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="endtime"
                                            label="结束时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="waitpoint"
                                            label="等候地点">
                                        </el-table-column>
                                        <el-table-column
                                            prop="aim"
                                            label="目的地">
                                        </el-table-column>
                                        <el-table-column
                                            prop="task"
                                            label="事由">
                                        </el-table-column>
                                        <el-table-column
                                            prop="driver"
                                            label="驾驶人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="姓名"
                                            label="申请人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="boss"
                                            label="审批人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="dealer"
                                            label="调度人">
                                        </el-table-column>
                                    </el-table>
                                </el-row>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="经营用车（大市区外）" name="OfficialOutBigCity"><el-row>
                                <!--这里是tab页内容-->
                                <el-row class="squall_card_head">
                                    <el-row class="squall_card_head_contain">
                                        <el-row>
                                            <el-col :span="20" :offset="2">
                                                <el-form ref="form" :v-model="FormValue" label-width="80px">
                                                    <el-form-item label="部门选择">
                                                        <el-checkbox-group v-model="FormValue.SelectedDepartmentList">
                                                            <el-checkbox v-for="Department in DepartmentList" :key="Department.departmentid" v-bind:label="Department.部门" v-bind:value="Department.departmentid" name="type"></el-checkbox>
                                                        </el-checkbox-group>
                                                    </el-form-item>
                                                </el-form>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="2">
                                                <a style="line-height:40px">时间</a>
                                            </el-col>
                                            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"><el-date-picker
                                                v-model="outputInfo.time"
                                                type="month"
                                                placeholder="选择月">
                                                </el-date-picker>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="0">
                                                <el-button type="success" class="squall_width_full" @click="squall_allpick">全选</el-button>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                                                <el-button type="success" class="squall_width_full" @click="squall_search">查询</el-button>
                                            </el-col>
                                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                                                <el-button type="success" class="squall_width_full" @click="squall_output">导出</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-row>
                                </el-row>
                                <el-row class="squall_panel">
                                    <el-table
                                        :data="HistoryList"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                            prop="车牌号"
                                            label="车牌号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="starttime"
                                            label="开始时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="endtime"
                                            label="结束时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="waitpoint"
                                            label="等候地点">
                                        </el-table-column>
                                        <el-table-column
                                            prop="aim"
                                            label="目的地">
                                        </el-table-column>
                                        <el-table-column
                                            prop="task"
                                            label="事由">
                                        </el-table-column>
                                        <el-table-column
                                            prop="driver"
                                            label="驾驶人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="姓名"
                                            label="申请人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="charger"
                                            label="审核人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="boss"
                                            label="审批人">
                                        </el-table-column>
                                        <el-table-column
                                            prop="dealer"
                                            label="调度人">
                                        </el-table-column>
                                    </el-table>
                                </el-row>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
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
import Squall from "@/lib/squall/js/squall_excle.js"

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
        FormValue: {
          region: '',
          SelectedDepartmentList: [],
        },
        outputInfo:{},
        HistoryList:[],
        DepartmentList:[],
        TabActive:"ProductInBigCity",
    }
  },
  components: {
    //'SideNav':SideNav,
  },
  mounted:function(){
    //生成列表
    this.basic.squall_basic_http.GetDepartmentList(this)

    //查询全部历史记录
    //this.basic.squall_basic_http.GetHistory(this);
    
  },
  methods:{
        squall_element_dialog:function(Info){
            //根据guid检索用车信息
            //console.log(Info);

            var that = this;
            //his.basic.squall_basic_http.GetHistoryItem(this,Info);
        },
        squall_search:function(){
            console.log(this.TabActive);
            if(this.outputInfo.time)
            {
                var squall_get_departmentid_list = [];
                for(var i in this.FormValue.SelectedDepartmentList)
                    for(var index in this.DepartmentList)
                        if(this.DepartmentList[index].部门==this.FormValue.SelectedDepartmentList[i])
                            squall_get_departmentid_list.push(this.DepartmentList[index].departmentid);
                var squall_Option = {
                    "DepartmentList":squall_get_departmentid_list,
                    "Time":this.outputInfo.time,
                }

                //console.log(this.TabActive);
                if(this.TabActive=="ProductInBigCity")
                {
                    squall_Option.table = "product_application";
                    squall_Option.region = "大市区内";
                }
                else if(this.TabActive=="ProductOutBigCity")
                {
                    squall_Option.table = "product_application";
                    squall_Option.region = "大市区外";
                }
                else if(this.TabActive=="OfficialInCity")
                {
                    squall_Option.table = "official_application";
                    squall_Option.region = "市区内";
                }
                else if(this.TabActive=="OfficialInBigCity")
                {
                    squall_Option.table = "official_application";
                    squall_Option.region = "大市区内";
                }
                else if(this.TabActive=="OfficialOutBigCity")
                {
                    squall_Option.table = "official_application";
                    squall_Option.region = "大市区外";
                }

                this.basic.squall_basic_http.GetHistory(this,squall_Option);
            }
            else
            {
                alert("请选择日期！");
            }
        },
        squall_output:function(){
            Squall.OutputExcle({
                data:this.HistoryList
            });
            console.log("output!!!");
        },
        handleClick(tab, event) {
            //console.log(tab, event);
            this.HistoryList = [];
        },
        squall_allpick(){
            this.FormValue.SelectedDepartmentList = [];

            for(var index in this.DepartmentList)
                this.FormValue.SelectedDepartmentList.push(this.DepartmentList[index].部门);
        }
  },
}
</script>