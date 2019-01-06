import leaflet_config from "@/lib/squall_map/map_config"

function squall_DrawPoint(Option){
    if(Option.map)
    {
        var squall_Point = Option.AimPoint;
        Option.map.on("click",function(e){
            //console.log(e);
            squall_Point = e.latlng;
            console.log("在地图上画一个点");
        })

    }

    return 0;
}

function squall_EndDraw(Option){
    if(Option.map)
        Option.map.on("click",function(e){
            console.log("绘图已经结束了");
        })

    return 0;
}

function squall_DrawLine(Option,Start,End){
    Start();

    

    End();
    return 0;
}

function squall_DrawPolygon(Option,Start,End){
    Start();

    

    End();
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