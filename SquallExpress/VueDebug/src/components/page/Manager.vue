<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-date-picker
                v-model="MS_FormatDate"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                @change="getData">
                </el-date-picker>
                <el-input v-model="RangeXStart" placeholder="开始经度" class="handle-input mr2" style="width:100px;"></el-input>
                <el-input v-model="RangeYStart" placeholder="开始纬度" class="handle-input mr2" style="width:100px;"></el-input>
                <el-input v-model="RangeXEnd" placeholder="结束经度" class="handle-input mr2" style="width:100px;"></el-input>
                <el-input v-model="RangeYEnd" placeholder="结束纬度" class="handle-input mr2" style="width:100px;"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>-->
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="PL_GUID" label="编号" sortable width="150">
                </el-table-column>
                <el-table-column prop="PL_NAME" label="名称">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="TotalPageCount" :page-size=12>
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './static/vuetable.json',
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                RangeXStart: '',
                RangeYStart: '',
                RangeXEnd: '',
                RangeYEnd: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                loading: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,

                //Squall
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        }
                    }]
                },
                MS_FormatDate:"",
                MS_Date:"20191013",
                cur_page: 1,
                tableData: [],
                TotalTableData: [],
                loading: false,
                QXList:[],
                TotalPageCount:100
            }
        },
        mounted() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;

                var MS_TempTotal = JSON.stringify(this.TotalTableData);

                this.tableData = this.TotalTableData.splice((this.cur_page-1)*12,12);

                this.TotalTableData = JSON.parse(MS_TempTotal);
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                //全局用的vue变量
                var that = this;

                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };
                // this.$axios.post(this.url, {
                //     page: this.cur_page
                // }).then((res) => {
                //     this.tableData = res.data.list;
                // })

                //大数据测试接口
                // this.$axios.post("http://192.168.10.235:8081/GeoHeyService/Service.asmx/GetRealByName",this.$qs.stringify({
                //     Type:"1",
                //     Date:"20191013"
                // }), {headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((_Res)=>{
                //     console.log(_Res)
                // })

                //区分开发环境
                if(process.env.NODE_ENV === 'development'){
                    //字符串与处理
                    var MS_XYStr = "";
                    if(that.RangeXStart!=""&&that.RangeYStart!=""&&that.RangeXEnd!=""&&that.RangeYEnd!="")
                        MS_XYStr = JSON.stringify([parseFloat(that.RangeXStart),parseFloat(that.RangeYStart),parseFloat(that.RangeXEnd),parseFloat(that.RangeYEnd)]);
                    console.log("字符串预处理完成");
                    console.log(MS_XYStr);

                    this.$axios({
                        method: 'get',
                        url: that.msdburl + '/search?&table=player&optionstr={}',
                        headers:{
                        //"Access-Control-Allow-Origin":"*",
                        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                        }
                    }).then((_Res)=>{
                        console.log(_Res);
                        var TempData = JSON.parse(decodeURIComponent(_Res.data));
                        console.log(TempData);
                        that.TotalTableData = [];

                        for(var QXIndex in TempData){
                            //添加全部数据
                            that.TotalTableData.push(TempData[QXIndex]);
                        }
                        console.log("加载总体数据完成");
                        
                        that.TotalPageCount = that.TotalTableData.length;
                        var MS_TempTotal = JSON.stringify(that.TotalTableData);
                        that.tableData = that.TotalTableData.splice((that.cur_page-1)*12,12);
                        that.TotalTableData = JSON.parse(MS_TempTotal);
                        console.log("加载表格信息完成");
                    }).catch((_Err)=>{
                        console.log(_Err)
                    })
                }
                else{
                    console.log("Release Version!")
                    //字符串与处理
                    var MS_XYStr = "";
                    if(that.RangeXStart!=""&&that.RangeYStart!=""&&that.RangeXEnd!=""&&that.RangeYEnd!="")
                        MS_XYStr = JSON.stringify([parseFloat(that.RangeXStart),parseFloat(that.RangeYStart),parseFloat(that.RangeXEnd),parseFloat(that.RangeYEnd)]);
                    console.log("字符串预处理完成");
                    console.log(MS_XYStr);

                    this.$axios({
                        method: 'get',
                        url: that.msdburl + '/search?&table=player&optionstr={}',
                        headers:{
                        //"Access-Control-Allow-Origin":"*",
                        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                        }
                    }).then((_Res)=>{
                        console.log(_Res);
                        var TempData = JSON.parse(decodeURIComponent(_Res.data));
                        console.log(TempData);
                        that.TotalTableData = [];

                        for(var QXIndex in TempData){
                            //添加全部数据
                            that.TotalTableData.push(TempData[QXIndex]);
                        }
                        console.log("加载总体数据完成");
                        
                        that.TotalPageCount = that.TotalTableData.length;
                        var MS_TempTotal = JSON.stringify(that.TotalTableData);
                        that.tableData = that.TotalTableData.splice((that.cur_page-1)*12,12);
                        that.TotalTableData = JSON.parse(MS_TempTotal);
                        console.log("加载表格信息完成");
                    }).catch((_Err)=>{
                        console.log(_Err)
                    })
                }
            },
            search() {
                //this.is_search = true;
                console.log("开始检索");
                this.getData();
            },
            formatter(row, column) {
                return row.xy;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>
