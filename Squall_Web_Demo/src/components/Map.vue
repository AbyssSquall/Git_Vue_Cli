<template>
    <div>
        <div id="myJSMap" class="squall_Map" ></div>
        <foot-nav :page="page"></foot-nav>
    </div>
</template>

<script>
//import HeaderNav from"@/components/Header"
//import SideNav from"@/components/Sider"
import FootNav from"@/components/Footer"
//import "leaflet"
//import "proj4"
import "proj4leaflet"

export default {
  name: 'Map',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'map'
    }
  },
  components: {
    'FootNav':FootNav,
    //'SideNav':SideNav,
  },
  mounted:function(){
    //this.squall={};
    //初始化地图
    squall.MapServer = "http://122.227.234.10:8515";
    //console.log(L);
    var squall_mapbase = L.tileLayer(squall.MapServer+'/map/nametest?level={z}&col={x}&row={y}&path={path}', {
            maxZoom: 6,
            minZoom: 0,
            continuousWorld: true,
            path:"Layers"
    });
    var squall_tilelayer = L.layerGroup([squall_mapbase]);
    var crs =new L.Proj.CRS(
            'EPSG:4490', 
            '+proj=longlat +ellps=GRS80 +no_defs' , 
            {
                origin:  origin, 
                resolutions: resolutions 
            }
    );
    var option={zoom:3,lat:29.8313129,lng:121.408887}
    var map = L.map("myJSMap", {  
        crs:crs,
        center: [option.lat, option.lng],
        zoom: option.zoom,  
        layers: [squall_tilelayer],  
        zoomControl: false  
    });
  },
}
</script>