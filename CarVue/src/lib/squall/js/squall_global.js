const Host_IP = "127.0.0.1";
const Host_Port = "8046";
const Map_IP = "122.227.234.10";
const Map_Port = "8515";

function getRandColor () {
    var tem = Math.round(Math.random() * colorListLength)
    return colorList[tem]
}

const guid = squall_guid();

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
    Host_IP,
    getRandColor,
    Host_Port,
}