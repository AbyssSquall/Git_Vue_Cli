console.log("Squal基础配置库已被加载！");

var squall_map_config = {
    origin:[-180,90],
    resolutions:[
        0.0027465820824835565*2*2*2*2*2*2*2*2*2
        ,0.0027465820824835565*2*2*2*2*2*2*2*2
        ,0.0027465820824835565*2*2*2*2*2*2*2
        ,0.0027465820824835565*2*2*2*2*2*2
        ,0.0027465820824835565*2*2*2*2*2
        ,0.0027465820824835565*2*2*2*2
        ,0.0027465820824835565*2*2*2
        ,0.0027465820824835565*2*2
        ,0.0027465820824835565*2
        ,0.0027465820824835565
        ,0.0013732910412417782
        ,0.0006866455206208891
        ,0.00034332276031044456
        ,0.00017166138015522228
        ,0.00008583069007761114
        ,0.00004291534503880557
        ,0.000021457672519402785
        ,0.000010728836259701392
        ,0.000005364418129850696
        ,0.000002682209064925348
        ,0.000001341104532462674]
}

export default{
    "DataURL":"http://127.0.0.1:3000",
    "MapDataURL":"一个变量测试",
    "origin":squall_map_config.origin,
    "resolutions":squall_map_config.resolutions,
    Classical:{
        "origin":squall_map_config.origin,
        "resolutions":squall_map_config.resolutions,
    },
    Ningbo2000:{
        "origin":[180000.190000],
        "resolutions":squall_map_config.resolutions,
    },
    NingboIndependent:{

    },
    CreateGUID:function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }
}