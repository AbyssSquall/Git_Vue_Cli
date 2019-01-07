import "leaflet.locatecontrol"

function squall_GPS(Option){
    if(Option.map)
    {
        //console.log(Option.map);
        L.control.locate({
            icon:"el-icon-location",
            iconLoading:"el-icon-loading",
            strings: {
                title: "Show me where I am, Squall!"
            }
        }).addTo(Option.map);
    }

    //console.log("GPS 功能");
}

export default{
    "GPS":squall_GPS,
}