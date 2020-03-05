function CheckBlackList(_Data,_BlackList){
    if(_BlackList.indexOf(_Data)!=-1)
        return true;
    else
        return false;
}


//GUID生成
function squall_guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

//日期生成
var DateString = function(){
    var squall_DateData = new Date();
    var squall_Month = (squall_DateData.getMonth()+1).toString();
    var squall_Date = squall_DateData.getDate().toString();

    for(var i=0;i<2-(squall_DateData.getMonth()+1).toString().length;i++)
    {
        squall_Month = "0" + squall_Month;
    }

    for(var i=0;i<2-squall_DateData.getDate().toString().length;i++)
    {
        squall_Date = "0" + squall_Date;
    }
    
    return squall_DateData.getFullYear() + "-" + squall_Month + "-" + squall_Date;
}

//时间生成
var TimeString = function(){
    var squall_DateString = DateString();
    var squall_DateData = new Date();
    var squall_Hours = squall_DateData.getHours().toString();
    var squall_Minutes = squall_DateData.getMinutes().toString();
    var squall_Seconds = squall_DateData.getSeconds().toString();

    for(var i=0;i<2-squall_DateData.getHours().toString().length;i++)
    {
        squall_Hours = "0" + squall_Hours;
    }

    for(var i=0;i<2-squall_DateData.getMinutes().toString().length;i++)
    {
        squall_Minutes = "0" + squall_Minutes;
    }

    for(var i=0;i<2-squall_DateData.getSeconds().toString().length;i++)
    {
        squall_Seconds = "0" + squall_Seconds;
    }
    
    return squall_DateString + " " + squall_Hours + ":" + squall_Minutes + ":" + squall_Seconds;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
    CheckBlackList:CheckBlackList,
    GetNewGUID:squall_guid,
    DateStr:DateString,
    TimeStr:TimeString,
    Sleep:sleep
};

