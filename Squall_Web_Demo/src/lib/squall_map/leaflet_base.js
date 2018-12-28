import "proj4leaflet"
import leaflet_config from "@/lib/squall_map/map_config"

console.log("Squal基础地图库已被加载！");

var squall_map_base = {
    map(Option){
        //参数
        Option.zoom = 16;
        Option.lat = 29.8313129;
        Option.lng = 121.408887;
        
        //基础天地图
        var squall_mapbase_ZT = L.tileLayer('http://t0.tianditu.com/vec_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tileMatrixSet=c&TILEMATRIXSET=c&format=tiles&height=256&width=256&tilematrix={z}&tilerow={y}&tilecol={x}&tk=61c92330f01717a610da4477f129724f', {
            //http://t0.tianditu.com/vec_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tileMatrixSet=c&TILEMATRIXSET=c&format=tiles&height=256&width=256&tilematrix={z}&tilerow={y}&tilecol={x}&tk=61c92330f01717a610da4477f129724f
            maxZoom: 18,
            minZoom: 0,
            continuousWorld: true,
            //path:"MapSrc//Layers//DZ_Basic//Layers"
        });
        var squall_mapbase_BZ = L.tileLayer('http://t0.tianditu.com/cva_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=cva&style=default&tileMatrixSet=c&TILEMATRIXSET=c&format=tiles&height=256&width=256&tilematrix={z}&tilerow={y}&tilecol={x}&tk=61c92330f01717a610da4477f129724f', {
            //http://t0.tianditu.com/cva_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=cva&style=default&tileMatrixSet=c&TILEMATRIXSET=c&format=tiles&height=256&width=256&tilematrix={z}&tilerow={y}&tilecol={x}&tk=61c92330f01717a610da4477f129724f
            maxZoom: 18,
            minZoom: 0,
            continuousWorld: true,
            //path:"MapSrc//Layers//DZ_Basic//Layers"
        });
        var tilelayer = L.layerGroup([squall_mapbase_ZT,squall_mapbase_BZ]);

        //初始化地图参数
        var crs =new L.Proj.CRS(
                'EPSG:4490', 
                '+proj=longlat +ellps=GRS80 +no_defs' , 
                {
                    origin:  leaflet_config.origin, 
                    resolutions: leaflet_config.resolutions 
                }
        );
    
        var map = L.map(Option.id, {  
            crs:crs,
            center: [Option.lat, Option.lng],
            zoom: Option.zoom,  
            layers: [tilelayer],  
            zoomControl: false  
        });  
    
        map.invalidateSize();

        return map;
    }
}

export default{
    "test_string":"一个变量测试",
    "leaflet_base":squall_map_base,
}