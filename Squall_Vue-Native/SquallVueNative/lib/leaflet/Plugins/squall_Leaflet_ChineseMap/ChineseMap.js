//加载xml
var loadXML = function (xmlFile) {
    var xmlDoc;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');//IE浏览器
        xmlDoc.async = false;
        xmlDoc.load(xmlFile);
    }
    else if (isFirefox=navigator.userAgent.indexOf("Firefox")>0) { //火狐浏览器
    //else if (document.implementation && document.implementation.createDocument) {//这里主要是对谷歌浏览器进行处理
        xmlDoc = document.implementation.createDocument('', '', null);
        xmlDoc.load(xmlFile);
    }
    else{ //谷歌浏览器
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET",xmlFile,false);
        xmlhttp.send(null);
        if(xmlhttp.readyState == 4){
        xmlDoc = xmlhttp.responseXML.documentElement;
        } 
    }

    return xmlDoc;
}

// 首先对xml对象进行判断
var  checkXMLDocObj = function (xmlFile) {
    var xmlDoc = loadXML(xmlFile);
    if (xmlDoc == null) {
        alert('您的浏览器不支持xml文件读取,于是本页面禁止您的操作,推荐使用IE5.0以上可以解决此问题!');
        window.location.href = '../err.html';
    }
    return xmlDoc;
}

//读取config文件
var squall_xml = checkXMLDocObj("/Layers/conf.xml");
//squall_xml.getElementsByTagName('LevelID')[i].childNodes[0].data
var squall_LevelScale = squall_xml.getElementsByTagName('Resolution');
var squall_XYScale = squall_xml.getElementsByTagName('XYScale');
//var squall_OriginPointX = squall_xml.getElementsByTagName('XOrigin');
//var squall_OriginPointY = squall_xml.getElementsByTagName('YOrigin');
var squall_OriginPoint = squall_xml.getElementsByTagName('TileOrigin');
var resolutions = new Array;
var origin = new Array;
console.log(squall_OriginPoint);
for(var i=0;i<squall_LevelScale.length;i++)
{
    //console.log(squall_LevelScale[i].childNodes[0].data);
    resolutions[i] = parseFloat(squall_LevelScale[i].childNodes[0].data);//*Math.pow(2,18)
}

//for(var i=0;i<squall_LevelScale.length;i++)

origin[0] = parseFloat(squall_OriginPoint[0].childNodes[1].childNodes[0].data);
origin[1] = parseFloat(squall_OriginPoint[0].childNodes[3].childNodes[0].data);
console.log(resolutions);

L.TileLayer.SquallProvider= L.TileLayer.extend({

    initialize: function(url, options) { // (type, Object)
        var providers = L.TileLayer.ChinaProvider.providers;

        var parts = type.split('.');

        var providerName = parts[0];
        var mapName = parts[1];
        var mapType = parts[2];

        var url = providers[providerName][mapName][mapType];
        options.subdomains = providers[providerName].Subdomains;

        L.TileLayer.prototype.initialize.call(this, url, options);
    }
});