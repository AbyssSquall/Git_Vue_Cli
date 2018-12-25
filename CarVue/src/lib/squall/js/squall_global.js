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

export default
{
    guid,
    getRandColor,
    openid
}