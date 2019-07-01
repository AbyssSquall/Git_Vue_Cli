import leaflet_config from "@/lib/squall_map/map_config"

var squall_point_fun = {};

function squall_DrawPoint(Option){
    if(Option.map)
    {
        //var squall_Point = Option.that.AimPoint;
        squall_point_fun = function(e){
            //console.log(e);
            Option.map.global.Point = e.latlng;
            //console.log("在地图上画一个点");

            //删除已经存在的临时图层
            if(Option.map.global.layers["PointDraw"])
                Option.map.removeLayer(Option.map.global.layers["PointDraw"]);

            //加入点
            var squall_PointList = [L.marker(Option.map.global.Point,{icon:Option.map.MarkerIconList["primary"]})];

            var squall_PointLayer = L.layerGroup(squall_PointList);
    
            Option.map.addLayer(squall_PointLayer);

            Option.map.global.layers["PointDraw"] = squall_PointLayer;
        }
        Option.map.on("click",squall_point_fun)

    }

    return 0;
}

function squall_EndDraw(Option){
    if(Option.map)
    {
        Option.map.off("click",squall_point_fun);
    }    

    return 0;
}

function squall_DrawLine(Option,Start,End){
    if(Option.map)
    {
        Option.map.global.PointArray = [];
        //var squall_Point = Option.that.AimPoint;
        squall_point_fun = function(e){
            Option.map.global.PointArray.push(e.latlng);

            //删除已经存在的临时图层
            if(Option.map.global.layers["LineDraw"])
                Option.map.removeLayer(Option.map.global.layers["LineDraw"]);

            var squall_PointList = [];
            squall_PointList.push(L.polyline(Option.map.global.PointArray,{color: '#1e50a2',weight:2.0,fillOpacity:0.5}));
            var squall_PointLayer = L.layerGroup(squall_PointList);
    
            squall_PointLayer.on("click",function(e){
                console.log(e);
            })

            var test = Option.map.addLayer(squall_PointLayer);
            test.on("click",function(e){
                console.log(e);
            })

            Option.map.global.layers["LineDraw"] = squall_PointLayer;
        }
        Option.map.on("click",squall_point_fun)

    }
    return 0;
}

function squall_DrawPolygon(Option){
    if(Option.map)
    {
        Option.map.global.PointArray = [];
        //var squall_Point = Option.that.AimPoint;
        squall_point_fun = function(e){
            Option.map.global.PointArray.push(e.latlng);

            //删除已经存在的临时图层
            if(Option.map.global.layers["PolygonDraw"])
                Option.map.removeLayer(Option.map.global.layers["PolygonDraw"]);

            var squall_PointList = [];
            squall_PointList.push(L.polygon(Option.map.global.PointArray,{color: '#1e50a2',fillColor:'#00ccff',weight:2.0,fillOpacity:0.5}));
            var squall_PointLayer = L.layerGroup(squall_PointList);
    
            Option.map.addLayer(squall_PointLayer);

            Option.map.global.layers["PolygonDraw"] = squall_PointLayer;
        }
        Option.map.on("click",squall_point_fun)

    }
    return 0;
}

function squall_Clear(){
    
}

export default{
    "DrawPoint":squall_DrawPoint,
    "DrawLine":squall_DrawLine,
    "DrawPolygon":squall_DrawPolygon,
    "DrawClear":squall_Clear,
    "EndDraw":squall_EndDraw
}