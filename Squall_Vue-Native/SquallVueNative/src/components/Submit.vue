<template>
    <view>
      <div v-if="MainPageFlag">
        <el-row :style="TopLabel">
            <el-col :span="24">
              <h1>搜索违建项目</h1>
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
        <el-button type="primary" class="squall_RightBottom" @click="AddBasicInfo()" :circle="true">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
      <transition name="el-fade-in">
      <div v-if="SubPageFlag">
        <el-row :style="TopLabel">
            <el-col :span="24">
              <h1>违法建筑基本信息</h1>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" :offset="0" style="position:fixed">
              <el-form
                ref="form"
                :model="InfoForm"
                label-width="90px"
                class="squall_fix_form"
                :style="MidForm"
              >
              <el-row>
                <el-col :span="24">
                  <el-form-item label="乡镇街道">
                    <el-select v-model="InfoForm.xzjd">
                      <el-option
                        v-for="Item in xzjd"
                        :key = "Item.value"
                        :label = "Item.label"
                        :value = "Item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="村社区">
                    <el-input v-model="InfoForm.csq"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item label="违建类型">
                  <el-select v-model="InfoForm.wjlx">
                    <el-option
                      v-for="Item in wjlx"
                      :key = "Item.value"
                      :label = "Item.label"
                      :value = "Item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="24">
                <el-form-item label="违建分类">
                  <el-select v-model="InfoForm.wjfl">
                    <el-option
                      v-for="Item in wjfl"
                      :key = "Item.value"
                      :label = "Item.label"
                      :value = "Item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item label="建筑结构">
                  <el-select v-model="InfoForm.jiegou">
                    <el-option
                      v-for="Item in jiegou"
                      :key = "Item.value"
                      :label = "Item.label"
                      :value = "Item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="24">
                <el-form-item label="房屋层数">
                  <el-input v-model="InfoForm.fwcs">
                    <template slot="append">
                      层
                    </template>
                  </el-input>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item label="违建地点">
                  <el-input v-model="InfoForm.wjdd"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="24">
                <el-form-item label="违建所有人">
                  <el-input v-model="InfoForm.wjsyr">
                  </el-input>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item label="占地面积">
                  <el-input v-model="InfoForm.zdmj">
                    <template slot="append">
                      ㎡
                    </template>
                  </el-input>
                </el-form-item>
                </el-col>
                <el-col :span="24">
                <el-form-item label="建筑面积">
                  <el-input v-model="InfoForm.jzmj">
                    <template slot="append">
                      ㎡
                    </template>
                  </el-input>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item label="建造日期">
                  <el-date-picker
                    v-model="InfoForm.jzrq"
                    type="date"
                  >
                  </el-date-picker>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item label="案件来源">
                  <el-select v-model="InfoForm.ajly">
                    <el-option
                      v-for="Item in ajly"
                      :key = "Item.value"
                      :label = "Item.label"
                      :value = "Item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="24">
                <el-form-item label="规划等级">
                  <el-select v-model="InfoForm.ghdj">
                    <el-option
                      v-for="Item in ghdj"
                      :key = "Item.value"
                      :label = "Item.label"
                      :value = "Item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item label="是否建成区">
                  <el-select v-model="InfoForm.sfcsjcq">
                    <el-option
                      v-for="Item in sfcsjcq"
                      :key = "Item.value"
                      :label = "Item.label"
                      :value = "Item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="24">
                <el-form-item label="拟处置面积">
                  <el-input v-model="InfoForm.nczmj">
                    <template slot="append">
                      ㎡
                    </template>
                  </el-input>
                </el-form-item>
                </el-col>
                <el-col :span="24">
                <el-form-item label="拟处置方式">
                  <el-input v-model="InfoForm.nczfs"></el-input>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item class="PicUpload" label="照片信息">
                  <el-upload 
                    ref="PicUpload"
                    action="http://122.227.234.10:2368/hswj/data/upload"
                    :on-preview="HandleClick"
                    :on-remove="HandleRemove"
                    :on-success="squall_Upload"
                    :on-error="squall_EnThinPicture"
                    :on-change="ListExceed"
                    :file-list="zhaopian_czq"
                    :auto-upload="false"
                    list-type="picture"
                  >
                  <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="违建用途">
                    <el-select v-model="InfoForm.wjyt">
                      <el-option
                        v-for="Item in wjyt"
                        :key = "Item.value"
                        :label = "Item.label"
                        :value = "Item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="位置信息">
                    <el-input v-model="InfoForm.LatLng" disabled>
                      <el-button class="squall_Location" type="primary" slot="append" icon="el-icon-map-location" @click="OpenDialog()"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item label="报送人">
                  <el-input v-model="InfoForm.bsr"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="24">
                <el-form-item label="联系电话">
                  <el-input v-model="InfoForm.lxdh"></el-input>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item label="报送单位">
                  <el-input v-model="InfoForm.bsdw"></el-input>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="报送时间">
                    <el-date-picker
                      v-model="InfoForm.bssj"
                      type="date"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-form-item label="备注">
                  <el-input v-model="InfoForm.beizhu"></el-input>
                </el-form-item>
                </el-col>
              </el-row>
              </el-form>
            </el-col>
        </el-row>
        <el-row>
          <div class="squall_buttom_Map" :style="ButtomMap">
            <!--<div id="map" style="height:100%"></div>-->
            <el-row style="margin-bottom:10px;margin-top:10px;height:50px">
              <el-col :span="8" :offset="2">
                <el-button type="primary" style="width:100%" @click="SubmitReport()">上报</el-button>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-button type="primary" style="width:100%" @click="Reload()">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </div>
      </transition>
      <el-dialog
        title="地图选点"
        :visible.sync="DialogVisible"
        width="90%"
        :fullscreen="true"
      >
        <el-row>
          <div id="map" :style="DialogMap"></div>
        </el-row>
        <el-row>
          <el-button type="primary" style="width:50%;margin-top:10px" @click="DialogVisible = false">确定</el-button>
        </el-row>
      </el-dialog>
    </view>
</template>
<script>
import { Map } from "../lib/squall_map/leaflet_base"
import { setTimeout } from 'timers';

export default {
  name: 'Car',
  data () {
    return {
      TopLabel: '',
      MidForm: '',
      ButtomMap: '',
      DialogMap: '',
      MidList:"",
      zhaopian_czq: [],
      ProjectList:[],
      SearchText:"",
      InfoFlag:"",
      SelectID:"",
      uploadComplete: true, // 图片上传完成状态
      InfoForm:{
        "xzjd":"",
        "csq":"社区测试",
        "wjlx":"",
        "wjfl":"",
        "jiegou":"",
        "fwcs":"11",
        "wjdd":"地点测试",
        "wjsyr":"拥有人测试",
        "zdmj":"2434",
        "jzmj":"2434",
        "jzrq":"",
        "wjyt":"",
        "ajly":"",
        "ghdj":"",
        "nczfs":"处理方式测试",
        "nczmj":"2434",
        "sfcsjcq":"",
        "bsr":"上报人测试",
        "bsdw":"上报单位测试",
        "bssj":"上报时间测试",
        "lxdh":"联系电话测试",
        "beizhu":"备注测试",
        "LatLng":""
      },
      xzjd:[
        {label:"洞桥镇",value:"洞桥镇"},
        {label:"高桥镇",value:"高桥镇"},
        {label:"古林镇",value:"古林镇"},
        {label:"集士港镇",value:"集士港镇"},
        {label:"横街镇",value:"横街镇"},
        {label:"龙观乡",value:"龙观乡"},
        {label:"石碶街道",value:"石碶街道"},
        {label:"鄞江镇",value:"鄞江镇"},
        {label:"章水镇",value:"章水镇"}
      ],
      ghdj:[
        {label:"城镇规划",value:"城镇规划"},
        {label:"乡村规划",value:"乡村规划"},
        {label:"其他",value:"其他"},
      ],
      wjlx:[
        {label:"规划违法",value:"规划违法"},
        {label:"土地违法",value:"土地违法"},
        {label:"其他",value:"其他"},
      ],
      wjyt:[
        {label:"住宅",value:"住宅"},
        {label:"商用",value:"商用"},
        {label:"厂房",value:"厂房"},
        {label:"仓库",value:"仓库"},
        {label:"养殖",value:"养殖"},
        {label:"广告设施",value:"广告设施"},
        {label:"其他",value:"其他"},
      ],
      wjfl:[
        {label:"存量",value:"存量"},
        {label:"新增",value:"新增"},
      ],
      sfcsjcq:[
        {label:"是",value:"是"},
        {label:"否",value:"否"},
      ],
      ajly:[
        {label:"自查",value:"自查"},
        {label:"排查",value:"排查"},
        {label:"领导批示",value:"领导批示"},
        {label:"媒体曝光",value:"媒体曝光"},
        {label:"督办件",value:"督办件"},
        {label:"信访投诉",value:"信访投诉"},
      ],
      jiegou:[
        {label:"简易",value:"简易"},
        {label:"框架",value:"框架"},
        {label:"砖混",value:"砖混"},
        {label:"砖木",value:"砖木"},
        {label:"其他",value:"其他"},
      ],
      MainPageFlag:true,
      SubPageFlag:false,
      DialogVisible:false,
      Map:{},
    }
  },
  components: {
  },
  mounted:function(){
    var that = this;

    //style
    var squall_top = 80;
    var squall_buttom = 200;
    this.TopLabel = "height:" + squall_top + "px";
    this.MidForm  = "height:" + (window.innerHeight-squall_top-62) + "px";
    this.ButtomMap  = "top:" + ((window.innerHeight-squall_top) + squall_top-62)  + "px";
    this.DialogMap = "height:" + (window.innerHeight-240) + "px";
    this.MidList  = "height:" + (window.innerHeight-squall_top-80) + "px";


    //对数据库进行检索
    this.basic.squall_basic_http.GetIllegalconstructionList(this,{"all":true});
  },
  methods:{
    HandleCell:function (Index,Datalist) {
      var that = this;
      this.SelectID = Datalist[Index].id;
      //console.log(Index);
      //console.log(Datalist);

      //修改数据添加类型
      this.InfoFlag = "update";

      //显示子页面
      this.SubPageFlag = true;

      //隐藏父页面
      this.MainPageFlag = false;

      //初始化基本信息
      this.basic.squall_basic_http.GetBasicInfo(this,{"id":Datalist[Index].id});
      //获取处置信息
      this.basic.squall_basic_http.GetDealInfo(this,{"id":Datalist[Index].id});
    },
    HandleRemove(file, fileList) {
        console.log(file);
        console.log(fileList);
    },
    HandleClick(file) {
      console.log(this.zhaopian_czq);
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
          that.InfoForm.LatLng = "经度:" + that.basic.BasicTool.PointAdjust(event.latlng.lng,6)  + ",纬度:" + that.basic.BasicTool.PointAdjust(event.latlng.lat,6);
        })

        //this.Map.resize();
      },1000)
    },
    SubmitReport(){

      //上传照片
      this.$refs.PicUpload.submit();
    },
    Reload(){
      this.SubPageFlag = false;
      this.MainPageFlag = true;
    },
    SearchKeywords(){
      this.basic.squall_basic_http.GetIllegalconstructionList(this,{keywords:this.SearchText,"all":true});
    },
    AddBasicInfo(){
      //修改数据添加类型
      this.InfoFlag = "add";

      for(var InfoIndex in this.InfoForm)
      {
        this.InfoForm[InfoIndex] = "";
      }
      //初始化日期
      this.InfoForm.bssj = this.basic.BasicTool.DateString();

      //初始化基本信息
      this.InfoForm.bsdw = this.global.sbdw;
      this.InfoForm.bsr = this.global.lxr;
      this.InfoForm.lxdh = this.global.lxfs;

      this.SubPageFlag = true;
      this.MainPageFlag = false;
    },
    squall_Upload(Res,File,Filelist){
      console.log(Res);
      console.log(File);
      console.log(this.zhaopian_czq);


      var squall_Option = {};
      squall_Option.data = this.InfoForm;

      //创建GUID
      squall_Option.data.id = this.basic.BasicTool.CreateGuid();

      //处理日期
      var squall_TempDate = new Date(squall_Option.data["jzrq"]);
      squall_Option.data["jzrq"] = this.basic.BasicTool.ReMakeDateString(squall_TempDate.getFullYear() + "-" + (squall_TempDate.getMonth()+1) + "-" + squall_TempDate.getDate());
      var squall_TempDateList = squall_Option.data["jzrq"].split('-');
      squall_Option.data["jzrq"] = squall_TempDateList[0] + "." + squall_TempDateList[1]

      squall_TempDate = new Date(squall_Option.data["bssj"]);
      squall_Option.data["bssj"] = this.basic.BasicTool.ReMakeDateString(squall_TempDate.getFullYear() + "-" + (squall_TempDate.getMonth()+1) + "-" + squall_TempDate.getDate());

      var squall_LngLatlist =  squall_Option.data.LatLng.split(',');
      squall_Option.data["coord_x"] = squall_LngLatlist[0].split(":")[1];
      squall_Option.data["coord_y"] = squall_LngLatlist[1].split(":")[1];
      squall_Option.data.LatLng = undefined;

        
      if(this.InfoFlag=="add")
        this.basic.squall_basic_http.AddBasicInfo(this,squall_Option);
      else
        this.basic.squall_basic_http.UpdateBasicInfo(this,squall_Option,{Col:"id",Val:this.SelectID});


      var squall_DealInfo = {};
      var squall_PicPath = Res.split('\\')
      squall_DealInfo.data = {
        id : this.SelectID,
        zhaopian_czq:squall_PicPath[squall_PicPath.length-1]
      }
      this.basic.squall_basic_http.AddDealInfo(this,squall_DealInfo,{Col:"id",Val:this.SelectID});
    },
    // 上传图片时调用
    uploadProgress(event,file, fileList){
      this.uploadComplete = false;
    },
    squall_EnThinPicture(Err,File,Filelist){
      console.log(Err);
    },
    ListExceed(Files, Filelist){
      //var squall_PicPath = Filelist[Filelist.length-1].response.split('\\')
      //Filelist[0].url = "http://122.227.234.10:2368/hswj/data/download?name=" + squall_PicPath[squall_PicPath.length-1];
      this.zhaopian_czq = Filelist.slice(-1);
      //console.log(Files);
      //console.log(this.zhaopian_czq);
    }
  }
}
</script>