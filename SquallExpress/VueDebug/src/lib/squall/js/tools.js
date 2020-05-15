function getRandColor () {
    var tem = Math.round(Math.random() * colorListLength)
    return colorList[tem]
}

const guid = squall_guid();

var openid = "";

//GUID生成
function squall_guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

//日期字符串，形如 20200402
function GetSimpleDateStr(_Date){
    var MS_Date = new Date();
    if(_Date)
        MS_Date = new Date(_Date);
    
	var squall_Month = MS_Date.getMonth()+1;
    var squall_date = MS_Date.getDate();

	for(var i=0;i<2-MS_Date.getMonth().toString().length;i++)
	{
		squall_Month = "0" + squall_Month.toString()
	}
	
	for(var i=0;i<2-MS_Date.getDate().toString().length;i++)
	{
		squall_date = "0" + squall_date.toString()
    }
    
    return MS_Date.getFullYear().toString() + squall_Month.toString() + squall_date.toString();
}

export default
{
    guid,
    getRandColor,
    openid,
    GetSimpleDateStr
}