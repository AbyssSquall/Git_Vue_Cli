import "leaflet.heat"
//import "heatmap.js"
import leaflet_config from "@/lib/squall_map/map_config"

function squall_HeatLayer(Option){
    if(Option.PointArray)
    {
        var TestPoint = Option.PointArray.map(function(P){
            if(Option.alpha)
                return [P[0],P[1],Option.alpha];
            else
                return [P[0],P[1],1];
        })
    }    
    else
        var TestPoint = [[29.836193856215246,121.40231098683739,1],[29.836499890612962,121.41754593432614,1],[29.823196133650935,121.41615118561236,1],[29.82382429684408,121.40005793122283,1]]
      
    //热力图配置
    var squall_config = {
    };

    //数据
    var squall_data = {
        data:TestPoint
    }

    //var squall_heatlayer = new HeatMap.Heatmap(squall_config);
    var squall_heatlayer = L.heatLayer(TestPoint);

    if(Option.map)
        Option.map.addLayer(squall_heatlayer);

    return squall_heatlayer;
}

//自定义类型
class Squall{
    constructor(name){
        this.ID = name;
    }
    print(){
        console.log(this.ID);
    }
}

export {Squall}



// export default{
//     "Squall":squall,
// }