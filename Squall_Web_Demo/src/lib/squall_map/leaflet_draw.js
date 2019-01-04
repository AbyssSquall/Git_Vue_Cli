import leaflet_config from "@/lib/squall_map/map_config"

function squall_DrawPoint(Option,Start,End){
    Start();



    End();
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
}