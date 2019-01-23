<template>
    <div>
        <el-row >
          <el-col :span="18" :offset="1">
            <el-row class="squall_doc_item" id="base">
              <el-card style="height:500px">
                <el-row>基础地图的引用格式</el-row>
                <el-row>基础地图的引用格式</el-row>
                
              </el-card>
            </el-row>
            <el-row class="squall_doc_item" id="marker">
              <el-card style="height:500px">对矢量图形进行加载</el-card>
            </el-row>
            <el-row class="squall_doc_item" id="heat">
              <el-card style="height:500px">生成热力图</el-card>
            </el-row>
            <el-row class="squall_doc_item" id="cluster">
              <el-card style="height:500px">生成热力聚合图</el-card>
            </el-row>
            <el-row class="squall_doc_item" id="draw">
              <el-card style="height:500px">绘制矢量图形</el-card>
            </el-row>
            <el-row class="squall_doc_item" id="GPS">
              <el-card style="height:500px">gps导航定位</el-card>
            </el-row>
          </el-col>
        </el-row>
        <el-card class="squall_nav_bar">
          <ul>
            <li><a href="#base">基础地图</a></li>
            <li><a href="#marker">矢量图形</a></li>
            <li><a href="#heat">生成热力图</a></li>
            <li><a href="#cluster">生成聚合图</a></li>
            <li><a href="#draw">绘制图形</a></li>
            <li><a href="#GPS">gps</a></li>
          </ul>
        </el-card>
    </div>
</template>
<script>

export default {
  name: 'Car',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 'car',
      catalog:["基础地图","矢量图形","生成热力图","生成热力聚合图","绘制矢量图形","gps导航定位"],
    }
  },
  components: {
  },
  mounted:function(){
    this.catalog = ["基础地图","矢量图形","热力图","热力聚合图","绘制矢量图形","gps"];
  }
}
</script>

