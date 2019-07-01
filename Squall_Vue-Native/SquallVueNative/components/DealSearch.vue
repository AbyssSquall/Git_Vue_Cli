<template>
    <div>
      <div v-if="MainPageVisible">
        <el-row :style="TopLabel">
            <el-col :span="24">
              <h2>搜索处置项目</h2>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="1">
            <el-input v-model="SearchText">
              <el-button slot="append" icon="el-icon-search" @click="SearchKeywords()"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="1">
            <el-card style="margin-top:20px;" :style="MidList">
              <el-table
                :data="ProjectList"
                style="width:100%"
                class="squall_ProjectList"
                :show-header="false"
              >
              <el-table-column
                prop="wjdd"
                label="项目名称"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                width="60"
              >
              <template slot-scope="scope">
                <i @click="HandleCell(scope.$index,ProjectList)" class="el-icon-arrow-right" style="padding:10px;"></i>
              </template>
              </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row> 
      </div>
      <transition name="el-fade-in">
        <div class="squall_sub_page" v-if="SubPageFlag">
          <!--这里是点击之后的结果，全屏显示出来-->
          <el-row :style="TopLabel">
              <el-col :span="22" :offset="1">
                <h2>{{Weijiandidian}}</h2>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form
              ref="form"
              :model="DealForm"
              label-width="90px"
              class="squall_fix_form"
              :style="MidForm"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="拆除面积">
                      <el-input v-model="DealForm.ccmj">
                        <template slot="append">
                          ㎡
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="补办面积">
                      <el-input v-model="DealForm.bbmj">
                        <template slot="append">
                          ㎡
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="没收面积">
                      <el-input v-model="DealForm.msmj">
                        <template slot="append">
                          ㎡
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="处置日期">
                      <el-date-picker
                        v-model="DealForm.czrq"
                        type="date"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                  <el-form-item label="报送人">
                    <el-input v-model="DealForm.bsr_czxx"></el-input>
                  </el-form-item>
                  </el-col>
                  <el-col :span="24">
                  <el-form-item label="联系电话">
                    <el-input v-model="DealForm.lxfs"></el-input>
                  </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                  <el-form-item label="报送单位">
                    <el-input v-model="DealForm.bsdw_czxx"></el-input>
                  </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                  <el-form-item class="PicUpload" label="处置后照片">
                    <el-upload 
                      action="http://122.227.234.10:2368/hswj/data/upload"
                      :on-preview="HandleClick"
                      :on-remove="HandleRemove"
                      :on-success="squall_Upload"
                      :file-list="zhaopian_czh"
                      list-type="picture"
                    >
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="情况说明">
                      <el-input v-model="DealForm.qksm"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>    
            </el-col>
          </el-row>
          <el-row>
            <div class="squall_buttom_Map" :style="ButtomMap">      
              <el-row style="margin-bottom:10px;margin-top:10px;height:50px">
                  <!--<el-col :span="6" :offset="2">
                    <el-button type="primary" style="width:100%" @click="InfoDialogVisible=true">基本信息</el-button>
                  </el-col>-->
                  <el-col :span="8" :offset="3">
                    <el-button type="primary" style="width:100%" @click="SubmitDealForm()">上报</el-button>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <el-button type="primary" style="width:100%" @click="SubPageBack()">取消</el-button>
                  </el-col>
              </el-row>
            </div>
          </el-row>
          <el-dialog
            title="地图选点"
            :visible.sync="DialogVisible"
            width="90%"
            :fullscreen="true"
            :modal="false"
          >
            <el-row>
              <div id="map" :style="DialogMap"></div>
            </el-row>
            <el-row>
              <el-button type="primary" style="width:50%;margin-top:10px" @click="DialogVisible = false">确定</el-button>
            </el-row>
          </el-dialog>
        </div>
      </transition>
      <el-dialog
        title="违法建筑基本信息"
        :visible.sync="InfoDialogVisible"
        width="90%"
        :fullscreen="true"
      >
          <!--这里是点击之后的结果，全屏显示出来-->
          <el-row>
            <el-col :span="24">
              <el-form
                ref="form"
                :model="InfoForm"
                label-width="90px"
                class="squall_fix_form"
                :style="MidForm"
              >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="乡镇街道">
                    <div>
                      {{InfoForm.xzjd}}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="村社区">
                    <div>
                      {{InfoForm.csq}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="违建类型">
                    <div>
                      {{InfoForm.wjlx}}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="违建分类">
                    <div>
                      {{InfoForm.wjfl}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="建筑结构">
                    <div>
                      {{InfoForm.jiegou}}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="房屋层数">
                    <div>
                      {{InfoForm.fwcs}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="违建地点">
                    <div>
                      {{InfoForm.wjdd}}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="违建所有人">
                    <div>
                      {{InfoForm.wjsyr}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="占地面积">
                    <div>
                      {{InfoForm.zdmj}}㎡
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="建筑面积">
                    <div>
                      {{InfoForm.jzmj}}㎡
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="建造日期">
                    <div>
                      {{InfoForm.jzrq}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="案件来源">
                    <div>
                      {{InfoForm.ajly}}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="规划等级">
                    <div>
                      {{InfoForm.ghdj}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="是否建成区">
                    <div>
                      {{InfoForm.sfcsjcq}}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="拟处置面积">
                    <div>
                      {{InfoForm.nczmj}}㎡
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="拟处置方式">
                    <div>
                      {{InfoForm.nczfs}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                <el-form-item label="照片信息">
                    <div>
                      照片信息
                    </div>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="违建用途">
                    <div>
                      {{InfoForm.wjyt}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="位置信息">
                    <div>
                      {{InfoForm.LatLng}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="报送人">
                    <div>
                      {{InfoForm.bsr}}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话">
                    <div>
                      {{InfoForm.lxdh}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="报送单位">
                    <div>
                      {{InfoForm.bsdw}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="报送时间">
                    <div>
                      {{InfoForm.bssj}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注">
                    <div>
                      {{InfoForm.beizhu}}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              </el-form> 
            </el-col>
          </el-row>
      </el-dialog>
    </div>
</template>
<script>
import {Map} from "@/lib/squall_map/leaflet_base"
import { setTimeout } from 'timers';

export default {
  name: 'Car',
  data () {
    return {
      TopLabel: 'Welcome to Your Vue.js App',
      MidList: 'car',
      MidForm:"",
      ButtomMap:"",
      DialogMap: '',
      ProjectList:[],
      Weijiandidian:"",
      PageWidth:100,
      SearchText:"",
      SelectID:"",
      SubPageFlag:false,
      DealForm:{
        "ccmj":"1234",
        "bbmj":"1234",
        "msmj":"",
        "czrq":"",
        "bsr_czxx":"上报人测试",
        "lxfs":"联系电话测试",
        "bsdw_czxx":"上报单位测试",
        "LatLng":"",
        "qksm":"备注测试"
      },
      InfoForm:{
        "xzjd":"乡镇街道测试",
        "csq":"社区测试",
        "wjlx":"",
        "wjfl":"",
        "jiegou":"结构测试",
        "fwcs":"11",
        "wjdd":"地点测试",
        "wjsyr":"拥有人测试",
        "zdmj":"1234",
        "jzmj":"1234",
        "jzrq":"",
        "wjyt":"",
        "ajly":"",
        "ghdj":"",
        "nczfs":"处理方式测试",
        "nczmj":"1234",
        "sfcsjcq":"",
        "bsr":"上报人测试",
        "bsdw":"上报单位测试",
        "bssj":"上报时间测试",
        "lxdh":"联系电话测试",
        "beizhu":"备注测试",
        "LatLng":""
      },
      ChuzhiqianPicList: [],
      zhaopian_czh: [],
      DialogVisible:false,
      InfoDialogVisible:false,
      MainPageVisible:true,
      Map:{},
    }
  },
  components: {
  },
  mounted:function(){
    //style
    var squall_top = 80;
    var squall_buttom = 400;
    this.TopLabel = "height:" + squall_top + "px";
    this.MidList  = "height:" + (window.innerHeight-squall_top-80) + "px";
    this.MidForm  = "height:" + (window.innerHeight-squall_top-2) + "px";
    this.ButtomMap  = "top:" + (window.innerHeight-squall_top)  + "px;height:" + (60) + "px;";
    this.DialogMap = "height:" + (window.innerHeight-120) + "px";

    //对数据库进行检索
    this.basic.squall_basic_http.GetIllegalconstructionList(this,{});
  },
  methods:{
    HandleCell:function (Index,Datalist) {
      var that = this;
      this.SelectID = Datalist[Index].id;
      this.Weijiandidian = Datalist[Index].wjdd;
      //console.log(Index);
      //console.log(Datalist);

      //对数据库进行检索
      this.basic.squall_basic_http.GetDealInfo(this,{"id":Datalist[Index].id});

      //显示子页面
      this.SubPageFlag = true;

      //隐藏父页面
      this.MainPageVisible = false;

      //初始化基本信息
      this.basic.squall_basic_http.GetBasicInfo(this,{"id":Datalist[Index].id});
    },
    SubPageBack(){
      this.SubPageFlag = false;
      this.MainPageVisible = true;
    },
    HandleRemove(file, fileList) {
        console.log(file, fileList);
    },
    HandleClick(file) {
        console.log(file);
    },
    OpenDialog(){
      var that = this;

      this.DialogVisible = true

      setTimeout(function(){
        //初始化地图
        var map_option = {
          "ID":"map",
          "Plugin":["leaflet_gps","leaflet_draw"],
        };

        this.Map = new Map(map_option);

        this.Map.Plugin.GPS({
          "map":this.Map
        });

        this.Map.Plugin.DrawPoint({
          "map":this.Map
        });

        this.Map.on("click",function(event){
          //console.log(that.basic.BasicTool.PointAdjust(event.latlng.lat,6));
          that.DealForm.LatLng = "经度:" + that.basic.BasicTool.PointAdjust(event.latlng.lng,6)  + ",纬度:" + that.basic.BasicTool.PointAdjust(event.latlng.lat,6);
        })

        //this.Map.resize();
      },1000)
    },
    SearchKeywords(){
      this.basic.squall_basic_http.GetIllegalconstructionList(this,{keywords:this.SearchText});
    },
    SubmitDealForm(){
      var squall_TempDealForm = this.DealForm

      squall_TempDealForm.id = this.SelectID;

      squall_TempDealForm.czmj = 0;

      var squall_PicPath = this.zhaopian_czh[0].response.split('\\');
      squall_TempDealForm.zhaopian_czh = squall_PicPath[squall_PicPath.length-1];

      this.MainPageVisible = true;
      this.basic.squall_basic_http.AddDealInfo(this,{data:squall_TempDealForm},{Col:"id",Val:this.SelectID});
    },
    squall_Upload(Res,File,Filelist){
      //console.log(Filelist);
      var squall_PicPath = Filelist[Filelist.length-1].response.split('\\')
      Filelist[0].url = "http://122.227.234.10:2368/hswj/data/download?name=" + squall_PicPath[squall_PicPath.length-1];
      this.zhaopian_czh = Filelist.slice(-1);
      // console.log(Res);
      // console.log(File);
      // console.log(this.zhaopian_czq);
    }
  }
}
</script>

