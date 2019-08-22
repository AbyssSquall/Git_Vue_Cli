<template>
    <div>
        <el-row :style="TopLabel">
            <el-col :span="24">
              <h1>违法建筑基本信息</h1>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { setTimeout } from 'timers';

export default {
  name: 'Car',
  data () {
    return {
      PictureList:[],
      zhaopian_czq:"",
      TopLabel: '',
      SearchBar:"",
      ResultsList:'',
      MidForm: '',
      ButtomMap: '',
      DialogMap: '',
      MidList:"",
      PicUploadStyle:"",
      ProjectList:[],
      SearchText:"",
      InfoFlag:"",
      SelectID:"",
      uploadComplete: true, // 图片上传完成状态
      MainPageFlag:true,
      SubPageFlag:false,
      DialogVisible:false,
      AlterVisile:false,
      Map:{},
      _left: 0,
      _top: 0,
      currentX: 0,
      currentY: 0,
      flag: false
    }
  },
  components: {
  },
  mounted:function(){
  },
  methods:{
    HandleCell:function (Index,Datalist) {
      var that = this;
      this.SelectID = Index.id;

      //修改数据添加类型
      this.InfoFlag = "update";

      //显示子页面
      this.SubPageFlag = true;

      //隐藏父页面
      this.MainPageFlag = false;

      //初始化基本信息
      this.basic.squall_basic_http.GetBasicInfo(this,{"id":this.SelectID});
      //获取处置信息
      //this.basic.squall_basic_http.GetDealInfo(this,{"id":Datalist[Index].id});
    },
    HandleRemove(file, fileList) {
    },
    HandleClick(file) {
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
          that.InfoForm.LatLng = "经度:" + that.basic.BasicTool.PointAdjust(event.latlng.lng,6)  + ",纬度:" + that.basic.BasicTool.PointAdjust(event.latlng.lat,6);
        })

        //this.Map.resize();
      },1000)
    },
    SubmitReport(){
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

      //处理坐标
      if(squall_Option.data.LatLng==undefined)
      {
        this.$message.error('请先选择地理坐标！');
        return;
      }  
      var squall_LngLatlist =  squall_Option.data.LatLng.split(',');
      squall_Option.data["coord_x"] = squall_LngLatlist[0].split(":")[1];
      squall_Option.data["coord_y"] = squall_LngLatlist[1].split(":")[1];
      squall_Option.data.LatLng = undefined;

      //添加图片
      //alert(JSON.stringify(this.PictureList));
      squall_Option.data.zhaopian_czq = '';
      for(var PicIndex in this.PictureList)
        squall_Option.data.zhaopian_czq += this.PictureList[PicIndex].name + ",";
      squall_Option.data.zhaopian_czq = squall_Option.data.zhaopian_czq.substring(0,squall_Option.data.zhaopian_czq.length-1);

      squall_Option.data.xzxxshzt = "待审核";
        
      if(this.InfoFlag=="add")
      {
        this.basic.squall_basic_http.AddBasicInfo(this,squall_Option);
      }  
      else
        this.basic.squall_basic_http.UpdateBasicInfo(this,squall_Option,{Col:"id",Val:this.SelectID});
      
      //对数据库进行检索
      setTimeout(function(){
        this.basic.squall_basic_http.GetIllegalconstructionList(this,{"all":true});
      },2000);
      
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
      this.PictureList = [];
      //初始化日期
      this.InfoForm.bssj = this.basic.BasicTool.DateString();

      //初始化基本信息
      this.InfoForm.bsdw = this.global.sbdw;
      this.InfoForm.bsr = this.global.lxr;
      this.InfoForm.lxdh = this.global.lxfs;
      this.InfoForm.xzjd = this.global.xzjd;

      this.SubPageFlag = true;
      this.MainPageFlag = false;
    },
    squall_Upload(Res,File,Filelist){
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
    },
    ListExceed(Files, Filelist){
      //var squall_PicPath = Filelist[Filelist.length-1].response.split('\\')
      //Filelist[0].url = "http://122.227.234.10:2368/hswj/data/download?name=" + squall_PicPath[squall_PicPath.length-1];
      //this.zhaopian_czq = Filelist.slice(-1);
    },
    useCameraPlugin: function (type) {
      var that = this;

      function onSuccess(imageData) {
        that.zhaopian_czq = "data:image/jpeg;base64," + imageData;

        //上传照片
        that.basic.squall_basic_http.UploadPicture(that,that.zhaopian_czq);
      }

      function onFail(message) {
        //alert('Failed because: ' + message);
      }

      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        //sourceType: this.sourceType[type], // 设置从图片库获取
        destinationType: Camera.DestinationType.DATA_URL
      })
    },
    squall_AutoSearch(Value){
      console.log(Value);
      this.basic.squall_basic_http.GetIllegalconstructionList(this,{keywords:this.SearchText,"all":true});
    }
  }
}
</script>