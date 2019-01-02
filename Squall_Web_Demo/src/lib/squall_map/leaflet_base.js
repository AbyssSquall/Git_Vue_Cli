import "proj4leaflet"
import leaflet_config from "@/lib/squall_map/map_config"
import { OptionGroup } from "element-ui";

console.log("Squal基础地图库已被加载！");

class Map{
    constructor(Option){
        this.ID = Option.id;
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

        if(Option.Layer)
            tilelayer = L.layerGroup(Option.Layer);

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

        //map的全局寄存变量
        this.map = map;
        this.global = {};
        this.global.layers = {};

        //map的基础点图标
        this.MarkerIconList={};
        var LeafIconPrimary = L.Icon.extend({
            options: {
                iconSize:[20, 25],
                iconAnchor:[10,23],
            }
        })
        var squall_IconPrimary = new LeafIconPrimary({iconUrl:'/static/asset/marker_primary.png'});
        this.MarkerIconList['primary'] = squall_IconPrimary;
        
        map.invalidateSize();

        //判断并加入插件
        if(Option.Pub_Plugin)
        {
            for(var item in Option.Pub_Plugin)
            {
                //console.log(Option.Pub_Plugin[item]);
                //import("./" + Option.Pub_Plugin[item] + ".js");
                import(`./${Option.Pub_Plugin[item]}.js`)//)
                  .then(module => {
                    //module.loadPageInto(main);
                    console.log("加载" + Option.Pub_Plugin[item] + "成功");
                    for(var func in module.default)
                    {
                        //console.log(func);
                        module.default[func]({"map":this.map})
                        this[func] = module.default[func];
                    }    
                    //console.log(module.default.Squall());
                  })
                  .catch(err => {
                    alert(err.message);
                });
            }
        }


    }

    //公有方法
    AddGraph(Option,OnclickReturnFunction){
        //为map定义函数
        if(Option.Type=='polygon')
        {
                //polygon属性
                var squall_border_Option = Option.PolygonStyle;
                var squall_rings = Option.PointArray;//注意是[[[[]]]]的形式，因为支持挖空的
                
                //Polygon列表
                var squall_PolygonList = [];

                for(var item in squall_rings)
                {
                    //console.log(item);
                    squall_PolygonList.push(L.polygon(squall_rings[item],squall_border_Option));
                }
                

                var squall_PolygonLayer = L.layerGroup(squall_PolygonList);
        
                this.map.addLayer(squall_PolygonLayer);

                this.global.layers[Option.LayerID] = squall_PolygonLayer;
            }
            else if(Option.Type=='line')
            {
                //polygon属性
                var squall_line_style = Option.LineStyle;
                var squall_rings = Option.PointArray;//注意是[[[[]]]]的形式，因为支持挖空的
                
                //Line列表
                var squall_LineList = [];

                for(var item in squall_rings)
                {
                    //console.log(item);
                    squall_LineList.push(L.polyline(squall_rings[item],squall_line_style));
                }

                var squall_LineLayer = L.layerGroup(squall_LineList);
        
                this.map.addLayer(squall_LineLayer);

                this.global.layers[Option.LayerID] = squall_LineLayer;
            }
            else if(Option.Type=="point")
            {
                //polygon属性
                var squall_border_Option = Option.PointStyle;
                var squall_rings = Option.PointArray;//注意是[[[[]]]]的形式，因为支持挖空的
                
                //Polygon列表
                var squall_PointList = [];

                //检测点列有几层
                var squall_PointArray = [];
                if(squall_rings[0]&&!squall_rings[0][0])
                {   
                    squall_PointArray.push(squall_rings);
                }
                else if(squall_rings[0][0]&&!squall_rings[0][0][0])
                {
                    for(var index in squall_rings)
                        squall_PointArray.push(squall_rings[index]);
                }
                else if(squall_rings[0][0][0]&&!squall_rings[0][0][0][0])
                {
                    for(var index1 in squall_rings)
                        for(var index2 in squall_rings[index1])
                            squall_PointArray.push(squall_rings[index1][index2]);
                }
                else if(squall_rings[0][0][0][0]&&!squall_rings[0][0][0][0][0])
                {
                    for(var index1 in squall_rings)
                        for(var index2 in squall_rings[index1])
                            for(var index3 in squall_rings[index1][index2])
                                squall_PointArray.push(squall_rings[index1][index2][index3]);
                }


                for(var item in squall_PointArray)
                {
                    //console.log(item);
                    squall_PointList.push(L.marker(squall_PointArray[item],squall_border_Option));
                }
                

                var squall_PointLayer = L.layerGroup(squall_PointList);
        
                this.map.addLayer(squall_PointLayer);

                this.global.layers[Option.LayerID] = squall_PointLayer;
            }
            else
            {
                console.log("Wrong Type!");
            }
    }

    GetID(){
        console.log(this.ID)
    }

    static AddFunction(FunID,func){
        this[FunID] = func;
    }
}

export {
    Map
}