//这里是根据坐标筛选画像数据的测试用例

//外部变量
var Config = require("./Config/Config");
var SquallNetWork = require("./SquallAPI/SquallNetwork");
var XmlTools = require("fast-xml-parser");

//全局变量
var MS_Global = {
    Path:"/GetDrawByXY",
    FormData : {
        XY:"[121.28079531779309,29.681143114311432,121.27923678688953,29.68159315931593,122.28079531779309,30.681143114311432]",//
        Date:"20191013"
    }
}

//发送请求
var MS_ResXML = SquallNetWork.FormDataPost(Config.HostIP + MS_Global.Path,MS_Global.FormData);
//var MS_ResJSON = SquallNetWork.ParamsPost(Config.HostIP,MS_Global.FormData);
//var MS_ResJSON = SquallNetWork.SimplePost(Config.HostIP + MS_Global.Path,MS_Global.FormData);

//条件
var MS_ResJSON = JSON.parse(XmlTools.parse(MS_ResXML).string);

//正确实例

var MS_TempJSON = {
    layer_name: "SelectedArea"
}

for(var PorepertyIndex in MS_ResJSON[0]){
    if(PorepertyIndex!="qx_name"&&PorepertyIndex!="datas"){
        MS_TempJSON[PorepertyIndex] = 0;
    }
}

for(var QXIndex in MS_ResJSON){    
    for(var PorepertyIndex in MS_TempJSON){
        if(PorepertyIndex!="qx_name"&&PorepertyIndex!="datas"&&PorepertyIndex!="layer_name")
            MS_TempJSON[PorepertyIndex] += MS_ResJSON[QXIndex][PorepertyIndex];
    }
}
MS_TempJSON.datas = MS_ResJSON;

console.log(MS_ResJSON);

//console.log(MS_ResJSON[0]);

//console.log(MS_ResJSON[0].datas[0]);

//console.log(MS_TempJSON);

console.log("用例测试结束");