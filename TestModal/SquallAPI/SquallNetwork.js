var Config = require("../Config/Config");
var request = require("sync-request");
var qs = require("qs");


function getFormInfo(formName, formRec){
    var formInfo = "<FormInfo name=\""+formName+"\">";
    for (var ColIndex in formRec) {

        var xmlKey = ColIndex.toUpperCase();
        var xmlVal = formRec[ColIndex];
        formInfo += "<Item name=\""+xmlKey+"\">"+xmlVal+"</Item>";
    }
    formInfo += "</FormInfo>";
    return formInfo;
}

function BaseInfoXML(caller,calloperate,map){
    var timestrap = new Date().valueOf();
    var baseInfoXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
            + "<RECORD><CALLINFO><CALLER>"+caller+"</CALLER><CALLOPERATE>"+calloperate.toUpperCase()+"</CALLOPERATE><CALLTIME>"+timestrap+"</CALLTIME>"
            + "</CALLINFO>";

    for (var PropertyIndex in map) {
        var xmlKey = PropertyIndex.toUpperCase();
        var xmlVal = map[PropertyIndex];
        baseInfoXml += "<"+xmlKey+">"+xmlVal+"</"+xmlKey+">";
    }
    baseInfoXml += "</RECORD>";
    return baseInfoXml;
}
function AcceptInfoXml(map){
    var baseInfoXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><RECORDS>";
    for (var PropertyIndex in map) {
        var TableRec = map[PropertyIndex];
        var TableName = PropertyIndex;
        baseInfoXml += getFormInfo(TableName, TableRec);
    }
    baseInfoXml += "</RECORDS>";
    return baseInfoXml;
}

//同步Get请求
function squall_http_get(_Url,_Data){
    var Res = request("GET",_Url,_Data);
    var _Temp = {};
    _Temp = JSON.parse(Res.getBody())
    return _Temp;
}

//同步Post请求
function squall_http_post(_Url,_Data){
    var squall_AimURL = _Url + "?";

    for(var PropertyIndex in _Data){
        squall_AimURL += PropertyIndex + "=" + encodeURIComponent(_Data[PropertyIndex]) + "&"
    }

    squall_AimURL = squall_AimURL.substr(0,squall_AimURL.length-1);

    var Res = request("POST",squall_AimURL,{
        json:_Data
    });

    var _Temp = {};
    _Temp = JSON.parse(Res.getBody())
    return _Temp;
}

function SimplePost(_Url,_Data){
    var squall_AimURL = _Url;

    var Res = request("POST",squall_AimURL,{
        json:_Data
    });

    var _Temp = {};
    try{
        _Temp = JSON.parse(Res.getBody())
        return _Temp;
    }
    catch(_Err){
        return Res.getBody().toString();
    }
}

function FormDataPost(_Url,_Data){
    var squall_AimURL = _Url;

    var Res = request("POST",squall_AimURL,{
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            //"Content-Type": "multipart/form-data",
            //'Content-Length': qs.stringify(_Data).length
        },
        body:qs.stringify(_Data),
        //json:qs.stringify(_Data),
        //body:_Data,
        //json:_Data,
    });

    var _Temp = {};
    try{
        _Temp = JSON.parse(Res.getBody())
        return _Temp;
    }
    catch(_Err){
        return Res.getBody().toString();
    }
}

function JsmapPatch(_Url,_Data){
    var squall_AimURL = _Url;

    var Res = request("PATCH",squall_AimURL,{
        json:_Data
    });

    var _Temp = {};
    _Temp = JSON.parse(Res.getBody())
    return _Temp;
}

//简便插入一条JSON到指定table
function CreateInsertJSON(_JSON,_Table,_ColNeeded){
    var squall_InsertCols = "";
    var squall_InserValues = "";
    var squall_BaseInfoSQL = "";
    var squall_DistinctArray = [];

    for(var ColIndex in _ColNeeded){
        if(squall_DistinctArray.indexOf(_ColNeeded[ColIndex].COLUMN_NAME)==-1)
            squall_DistinctArray.push(_ColNeeded[ColIndex].COLUMN_NAME);
        else
            continue;
        if(_JSON[_ColNeeded[ColIndex].COLUMN_NAME]){
            squall_InsertCols += _ColNeeded[ColIndex].COLUMN_NAME + ",";
            squall_InserValues += "'" + _JSON[_ColNeeded[ColIndex].COLUMN_NAME] + "',";
        }
    }
    squall_InsertCols = squall_InsertCols.substr(0,squall_InsertCols.length-1);
    squall_InserValues = squall_InserValues.substr(0,squall_InserValues.length-1);
    squall_BaseInfoSQL = "insert into `" + _Table + "` (" + squall_InsertCols + ") values " + "(" + squall_InserValues + ")";
    return squall_BaseInfoSQL;
}

//创建用于向oa提交的JSON
function CreateOAJSON(_JSON,_ColNeeded){
    var squall_ReturnJSON = {};
    
    for(var ColIndex in _ColNeeded){
        squall_ReturnJSON[_ColNeeded[ColIndex].COLUMN_NAME] = _JSON[_ColNeeded[ColIndex].COLUMN_NAME];
    }

    return squall_ReturnJSON;
}

function CreateFormJSON(_JSON,_ServiceCode,_ColNeeded){
    var squall_ReturnJSON = {};
    var squall_ColArray = [];

    for(var ColIndex in _ColNeeded){
        squall_ColArray.push(_ColNeeded[ColIndex].COLUMN_NAME);
    }
    
    for(var ColIndex in _JSON){
        if(Config.TableAlias[_ServiceCode].ColModal[ColIndex]&&squall_ColArray.indexOf(Config.TableAlias[_ServiceCode].ColModal[ColIndex])!=-1)
            squall_ReturnJSON[Config.TableAlias[_ServiceCode].ColModal[ColIndex]] = _JSON[ColIndex];
    }

    return squall_ReturnJSON;
}

function CreateOAMainJSON(_JSON,_ServiceCode,_ColNeeded){
    var _BaseInfoJSON = _JSON;
    //调整奉化的行政代码
    if(_BaseInfoJSON.RECORD.AREACODE == "330283")
        _BaseInfoJSON.RECORD.AREACODE = "330213";
    
    //结果领取方式
    _BaseInfoJSON.RECORD["Unknow-3"] = "1";
    _BaseInfoJSON.RECORD["Unknow-24"] = "3";

    //数据状态
    if(_BaseInfoJSON.RECORD.DATASTATE == "1"){
        _BaseInfoJSON.RECORD.DATASTATE = "9"
    }
    else{
        _BaseInfoJSON.RECORD.DATASTATE = "2"
    }

    //事务来源
    if(_BaseInfoJSON.RECORD.APPLYFROM==2)
        _BaseInfoJSON.RECORD.APPLYFROM="一窗平台";
    else
        _BaseInfoJSON.RECORD.APPLYFROM="物理大厅";
    
    //业务办理状态 100=待受理（已提交申请）
    _BaseInfoJSON.RECORD["Unknow-16"] = "100";

    //单位证件类型
    if(Config.APPLY_CARDTYPE[_BaseInfoJSON.RECORD.APPLY_CARDTYPE])
        _BaseInfoJSON.RECORD.APPLY_CARDTYPE = Config.APPLY_CARDTYPE[_BaseInfoJSON.RECORD.APPLY_CARDTYPE];
    else{
        console.log("未知的证件类型——" + _BaseInfoJSON.RECORD.APPLY_CARDTYPE);
    }

    var squall_ReturnJSON = {};
    for(var ColIndex in _ColNeeded){
        squall_ReturnJSON[_ColNeeded[ColIndex].COLUMN_NAME] = _BaseInfoJSON.RECORD[Config.TableAlias[_ServiceCode].column[_ColNeeded[ColIndex].COLUMN_NAME]]
    }
    
    return squall_ReturnJSON;
}

function CreateOASubJSON(_JSON,_ServiceCode,_ColNeeded){
    var squall_ReturnJSON = {};

    //ydmRec默认 9
    if(_ServiceCode.indexOf("确认")!=-1)
        _JSON.DATASTATE = "9";

    for(var ColIndex in _ColNeeded){
        if(_JSON[Config.TableAlias[_ServiceCode].subcolumn[_ColNeeded[ColIndex].COLUMN_NAME]]){
            squall_ReturnJSON[_ColNeeded[ColIndex].COLUMN_NAME] = _JSON[Config.TableAlias[_ServiceCode].subcolumn[_ColNeeded[ColIndex].COLUMN_NAME]];
        }
    }
    
    return squall_ReturnJSON;
}

function CreateOABasicJSON(_JSON){
    var squall_ReturnJSON = {};

    for(var PropertyIndex in _JSON){
        if(Config.FormAlias["t_yc_baseinfo"][PropertyIndex])
            squall_ReturnJSON[Config.FormAlias["t_yc_baseinfo"][PropertyIndex]] = _JSON[PropertyIndex]
    }

    return squall_ReturnJSON;
}

//插入语句
function InsertItem(_JSON,_ServiceCode,_ColNeeded){
    var squall_InsertCols = "";
    var squall_InserValues = "";
    var squall_BaseInfoSQL = "";

    for(var ColIndex in _ColNeeded){
        if(_JSON[Config.TableAlias[_ServiceCode].column[_ColNeeded[ColIndex].COLUMN_NAME]]){
            squall_InsertCols += _ColNeeded[ColIndex].COLUMN_NAME + ",";
            squall_InserValues += "'" + _JSON[Config.TableAlias[_ServiceCode].column[_ColNeeded[ColIndex].COLUMN_NAME]] + "',";
        }
    }

    squall_InsertCols = squall_InsertCols.substr(0,squall_InsertCols.length-1);
    squall_InserValues = squall_InserValues.substr(0,squall_InserValues.length-1);
    squall_BaseInfoSQL = "insert into `" + Config.TableAlias[_ServiceCode].table + "` (" + squall_InsertCols + ") values " + "(" + squall_InserValues + ")";
    return squall_BaseInfoSQL;
}

function InsertSubItem(_JSON,_ServiceCode,_ColNeeded){
    var squall_InsertCols = "";
    var squall_InserValues = "";
    var squall_BaseInfoSQL = "";
    
    //ydmRec默认 9
    if(_ServiceCode.indexOf("确认")!=-1)
        _JSON.DATASTATE = "9";

    for(var ColIndex in _ColNeeded){
        if(_JSON[Config.TableAlias[_ServiceCode].subcolumn[_ColNeeded[ColIndex].COLUMN_NAME]]){
            squall_InsertCols += _ColNeeded[ColIndex].COLUMN_NAME + ",";
            squall_InserValues += "'" + _JSON[Config.TableAlias[_ServiceCode].subcolumn[_ColNeeded[ColIndex].COLUMN_NAME]] + "',";
        }
    }

    squall_InsertCols = squall_InsertCols.substr(0,squall_InsertCols.length-1);
    squall_InserValues = squall_InserValues.substr(0,squall_InserValues.length-1);
    squall_BaseInfoSQL = "insert into `" + Config.TableAlias[_ServiceCode].subtable + "` (" + squall_InsertCols + ") values " + "(" + squall_InserValues + ")";
    return squall_BaseInfoSQL;
}

//公共服务插入语句
function UpdateItem(_JSON,_ServiceCode,_ColNeeded,_Key){
    //数据的预处理
    if(Config.APPLY_CARDTYPE[_JSON.APPLY_CARDTYPE])
            _JSON.APPLY_CARDTYPE = Config.APPLY_CARDTYPE[_JSON.APPLY_CARDTYPE];
    else{
        console.log("未知的证件类型——" + _JSON.APPLY_CARDTYPE);
    }

    var squall_BaseInfoSQL = "update `" + Config.TableAlias[_ServiceCode].table + "` set ";

    for(var ColIndex in _ColNeeded){
        if(_JSON[Config.TableAlias[_ServiceCode].column[_ColNeeded[ColIndex].COLUMN_NAME]]){
            squall_BaseInfoSQL += _ColNeeded[ColIndex].COLUMN_NAME + "=" + "'" + _JSON[Config.TableAlias[_ServiceCode].column[_ColNeeded[ColIndex].COLUMN_NAME]] + "',";
        }
    }
    
    squall_BaseInfoSQL += Config.TableAlias[_ServiceCode].key + "='" + _Key + "' where " + Config.TableAlias[_ServiceCode].key + "='" + _Key + "'";
    return squall_BaseInfoSQL;
}

function UpdateSubItem(_JSON,_ServiceCode,_ColNeeded,_Key){
    var squall_BaseInfoSQL = "update `" + Config.TableAlias[_ServiceCode].subtable + "` set ";
    
    for(var ColIndex in _ColNeeded){
        if(_JSON[Config.TableAlias[_ServiceCode].subcolumn[_ColNeeded[ColIndex].COLUMN_NAME]]){
            squall_BaseInfoSQL += _ColNeeded[ColIndex].COLUMN_NAME + "=" + "'" + _JSON[Config.TableAlias[_ServiceCode].subcolumn[_ColNeeded[ColIndex].COLUMN_NAME]] + "',";
        }
    }

    squall_BaseInfoSQL += Config.TableAlias[_ServiceCode].subkey + "='" + _Key + "' where " + Config.TableAlias[_ServiceCode].subkey + "='" + _Key + "'";
    return squall_BaseInfoSQL;
}

//Add Infomation
function AddTableInfo(_Table,_Key,_KeyValue,_JSON){
    var squall_BaseInfoSQL = "update `" + _Table + "` set ";
    
    for(var ColIndex in _JSON){
        if(Config.FormAlias[_Table][ColIndex]){
            squall_BaseInfoSQL += Config.FormAlias[_Table][ColIndex] + "=" + "'" + _JSON[ColIndex] + "',";
        }
    }

    squall_BaseInfoSQL += _Key + "='" + _KeyValue + "' where " + _Key + "='" + _KeyValue + "'";
    return squall_BaseInfoSQL;
}

//Post Body
function CreatePostFormdata(_Params){
    var MS_CityJson = {};
    var MS_ParamsList = _Params.split("&");

    for(var ParamsIndex in MS_ParamsList){
        var ParamsInfo = MS_ParamsList[ParamsIndex].split("=");
        MS_CityJson[ParamsInfo[0]] = decodeURIComponent(ParamsInfo[1]);
    }

    return MS_CityJson;
}

function InsertFormInfoJSON(_ServerCode,_FormJSON,_FormXML){
    var squall_FormData = _FormJSON.RECORDS.FormInfo.Item;
    var squall_AliasList = _ColList;
    var squall_FormJSON = {}

    for(var Index in squall_FormData){
        squall_FormJSON[squall_AliasList[Index]] = squall_FormData[Index];
    }
}

function GetAlias(_FormXML,_ServiceCode){
    var squall_AliasArray = []
    var squall_TempAlias = _FormXML.split("name=\"");
    for(var i=2;i<squall_TempAlias.length;i++){
        squall_AliasArray.push(Config.TableAlias[_ServiceCode].ColModal[squall_TempAlias[i].split("\">")[0]]);
    }
    return squall_AliasArray;
}

function CreateDMCode(_SerialCount,_AZAA0001,_BMMX0003){
    var BMMX0001 = "";
    if(""!=_AZAA0001 && ""!=_BMMX0003){
        while (_AZAA0001.toString().length<9) {
            _AZAA0001 += "0";
        }
        while (_BMMX0003.toString().length<6) {
            _BMMX0003 += "0";
        }
        var squall_SerialCount = (_SerialCount+1).toString();
        for(var i=0;i<6-(_SerialCount+1).toString().length;i++){
            squall_SerialCount = "0" + squall_SerialCount;
        }

        BMMX0001 = _AZAA0001 + _BMMX0003 + squall_SerialCount;
    }
    return BMMX0001
}

function UpdateFormInfoJSON(_ServerCode,_FormJSON,_Key,_ColList){
    var squall_FormData = _FormJSON;
    //var squall_AliasList = _ColList;


    var squall_ReturnSQL = "update " + Config.TableAlias[_ServerCode].table + " set ";
    for(var PropertyIndex in squall_FormData){
        if(squall_FormData[PropertyIndex]!="undefined"&&Config.TableAlias[_ServerCode].ColModal[PropertyIndex]&&_ColList.indexOf(Config.TableAlias[_ServerCode].ColModal[PropertyIndex])!=-1){
                squall_ReturnSQL += Config.TableAlias[_ServerCode].ColModal[PropertyIndex] + "='" + squall_FormData[PropertyIndex] + "',";
        }
    }
    
    squall_ReturnSQL += Config.TableAlias[_ServerCode].key + "='" + _Key + "' where " + Config.TableAlias[_ServerCode].key + "='" + _Key + "'";
    return squall_ReturnSQL;
}

function SubUpdateFormInfoJSON(_ServerCode,_FormJSON,_Key,_ColList){
    var squall_FormData = _FormJSON;

    var squall_ReturnSQL = "update " + Config.TableAlias[_ServerCode].subtable + " set "
    for(var PropertyIndex in squall_FormData){
        if(squall_FormData[PropertyIndex]!="undefined"&&Config.TableAlias[_ServerCode].ColModal[PropertyIndex]&&_ColList.indexOf(Config.TableAlias[_ServerCode].ColModal[PropertyIndex])!=-1){
                squall_ReturnSQL += Config.TableAlias[_ServerCode].ColModal[PropertyIndex] + "='" + squall_FormData[PropertyIndex] + "',";
        }
    }
    
    squall_ReturnSQL += Config.TableAlias[_ServerCode].key + "='" + _Key + "' where " + Config.TableAlias[_ServerCode].key + "='" + _Key + "'";
    return squall_ReturnSQL;
}

function FliterProvinceJSON(_ItemJSON,_Column){
    var squall_FliterJSON = {};
    for(var ColIndex in _Column){
        if(_ItemJSON[_Column[ColIndex].COLUMN_NAME])
            squall_FliterJSON[_Column[ColIndex].COLUMN_NAME] = _ItemJSON[_Column[ColIndex].COLUMN_NAME];
        else{
            squall_FliterJSON[_Column[ColIndex].COLUMN_NAME] = "暂无"
        }

    }

    return squall_FliterJSON;
}

//
function CreateMainTableInsert(_BaseInfoJSON,_ServiceCode,_Column){
    //调整奉化的行政代码
    if(_BaseInfoJSON.RECORD.AREACODE == "330283")
        _BaseInfoJSON.RECORD.AREACODE = "330213";
    
    //结果领取方式
    _BaseInfoJSON.RECORD["Unknow-3"] = "1";
    _BaseInfoJSON.RECORD["Unknow-24"] = "3";

    //数据状态
    if(_BaseInfoJSON.RECORD.DATASTATE == "1"){
        _BaseInfoJSON.RECORD.DATASTATE = "9"
    }
    else{
        _BaseInfoJSON.RECORD.DATASTATE = "2"
    }

    //事务来源
    if(_BaseInfoJSON.RECORD.APPLYFROM==2)
        _BaseInfoJSON.RECORD.APPLYFROM="一窗平台";
    else
        _BaseInfoJSON.RECORD.APPLYFROM="物理大厅";
    
    //业务办理状态 100=待受理（已提交申请）
    _BaseInfoJSON.RECORD["Unknow-16"] = "100";

    //单位证件类型
    if(Config.APPLY_CARDTYPE[_BaseInfoJSON.RECORD.APPLY_CARDTYPE])
        _BaseInfoJSON.RECORD.APPLY_CARDTYPE = Config.APPLY_CARDTYPE[_BaseInfoJSON.RECORD.APPLY_CARDTYPE];
    else{
        console.log("未知的证件类型——" + _BaseInfoJSON.RECORD.APPLY_CARDTYPE);
    }

    return InsertItem(_BaseInfoJSON.RECORD,_ServiceCode,_Column);
}

module.exports = {
    //同步型网络请求
    Get:squall_http_get,
    ParansPost:squall_http_post,
    SimplePost:SimplePost,
    FormDataPost:FormDataPost,
    JsmapPatch:JsmapPatch,

    //创建Post Body
    CreatePostFormdata:CreatePostFormdata,

    //创建地名代码
    CreateDMCode:CreateDMCode,

    //解析基础参数
    GetAlias:GetAlias,

    //基础数据库操作语句生成
        //baseinfo
    InsertItem:InsertItem,
    UpdateItem:UpdateItem,
    InsertSubItem:InsertSubItem,
    UpdateSubItem:UpdateSubItem,
        //forminfo
    InsertFormInfoJSON:InsertFormInfoJSON,
    UpdateFormInfoJSON:UpdateFormInfoJSON,
    SubUpdateFormInfoJSON:SubUpdateFormInfoJSON,
        //attrinfo
    CreateInsertJSON:CreateInsertJSON,

    //指定数据库操作语句生成
    CreateMainTableInsert:CreateMainTableInsert,
    //CreateSubTableInsert:CreateSubTableInsert,
    AddTableInfo:AddTableInfo,

    //省地名系统字段筛选
    FliterProvinceJSON:FliterProvinceJSON,

    //oa系统相关
    CreateOAJSON:CreateOAJSON,
    CreateOAMainJSON:CreateOAMainJSON,
    CreateOASubJSON:CreateOASubJSON,
    CreateOABasicJSON:CreateOABasicJSON,
    CreateFormJSON:CreateFormJSON,
};