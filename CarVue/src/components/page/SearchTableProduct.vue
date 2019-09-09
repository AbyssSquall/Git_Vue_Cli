<template>
    <div>
        <div>
            <el-card>
                <el-form
                ref="form"
                label-width="90px">
                    <el-row>
                        <el-col :span="10" :offset="0">
                            <el-form-item label="部门">
                                <el-select v-model="Department" @change="OnChange">
                                    <el-option
                                    v-for="item in DepartmentList"
                                    :key="item.departmentid"
                                    :label="item.部门"
                                    :value="item.departmentid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="车辆">
                                <el-select v-model="CarID" @change="CarSelected">
                                    <el-option
                                    v-for="item in CarList"
                                    :key="item.carid"
                                    :label="item.车牌号"
                                    :value="item.carid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-card style="margin-top:10px">
                <el-row>
                    <el-table
                    :data="HistoryList"
                    border
                    style="width: 100%">
                        <el-table-column
                        prop="车牌号"
                        label="车牌号"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="starttime"
                        label="开始时间"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="endtime"
                        label="结束时间"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="aim"
                        label="目的地"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="task"
                        label="事由">
                        </el-table-column>
                        <el-table-column
                        prop="driver"
                        label="驾驶员"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="姓名"
                        label="申请人"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="charger"
                        label="部门负责人"
                        width="100">
                        </el-table-column>
                    </el-table>
                    <div class="block" style="text-align: center;">
                        <el-pagination
                            layout="prev, pager, next"
                            :total="TotalPageCount"
                            :page-size=12
                            @current-change="PageChange">
                        </el-pagination>
                    </div>
                </el-row>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                keyword: '',
                DepartmentList:[],
                CarList:[],
                HistoryTotalList:[],
                HistoryList:[],
                Department:"",
                CarID:"",
                Type:"",
                TotalPageCount:10,
            }
        },
        computed: {
        },
        mounted:function(){
            this.basic.squall_basic_http.GetDepartmentList(this,{});
            if(window.location.href.indexOf("official")!=-1)
                this.Type = "official_application";
            else
                this.Type = "product_application";

            //console.log(window.location.href);
            this.basic.squall_basic_http.GetHistory(this,{
                table:this.Type,
            });
        },
        methods:{
            OnChange(DepartmentID){
                this.basic.squall_basic_http.GetDepartmentCarList(DepartmentID,this,{});

                this.basic.squall_basic_http.GetHistory(this,{
                    table:this.Type,
                    DepartmentID:DepartmentID
                });
            },
            CarSelected(CarID){
                this.basic.squall_basic_http.GetHistory(this,{
                    table:this.Type,
                    CarID:CarID
                });
            },
            PageChange(Events){
                this.HistoryList = this.HistoryTotalList.slice((Events-1)*12,Events*12);
            }
        }
    }
</script>

<style scoped>
.example-p{
    height: 45px;
    display: flex;
    align-items: center;
}
.search-box{
    text-align: center;
    margin-top: 10px;
}
.search{
    width: 300px;
}
ul,li{
    list-style: none;
}
.icon-li{
    display: inline-block;
    padding: 10px;
    width: 120px;
    height: 120px;
}
.icon-li-content{
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon-li-content i{
    font-size: 36px;
    color: #606266;
}
.icon-li-content span{
    margin-top: 10px;
    color: #787878;
}
</style>