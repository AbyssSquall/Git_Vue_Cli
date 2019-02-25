import "leaflet.locatecontrol"

function squall_GPS(Option){
    if(Option.map)
    {
        var squall_Locate = L.control.locate({
            icon:"el-icon-location",
            iconLoading:"el-icon-loading",
            strings: {
                title: "Show me where I am, Squall!"
            }
        }).addTo(Option.map);

        //squall_Locate.start();

        
    }

    //console.log("GPS 功能");
}

function squall_Guide(NowPosition,Route){
    console.log(NowPosition);
    console.log(Route);
}

export default{
    "GPS":squall_GPS,
    "Guide":squall_Guide,
}