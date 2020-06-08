(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"9azr":function(t,i,e){"use strict";var a=e("s2dO"),s=e.n(a),n={props:{canvasId:{type:String,default:"",required:!0},options:{type:Object,required:!0}},mounted(){this.renderChart()},methods:{renderChart(){if(!this.checkOptions())return;const t={...this.options};new s.a(this.canvasId,t)},checkOptions(){const t=this.options;return!(!t.datasets||!t.datasets.length)&&!(!t.labels||!t.labels.length)}},watch:{options:{handler(t,i){this.renderChart()},deep:!0}}},o=e("KHd+"),l=Object(o.a)(n,(function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("canvas",{attrs:{id:this.canvasId}})])}),[],!1,null,null,null);i.a=l.exports},Am6i:function(t,i,e){"use strict";e.r(i);var a={name:"basecharts",components:{Schart:e("9azr").a},data:function(){return{data1:[{name:"2012",value:1141},{name:"2013",value:1499},{name:"2014",value:2260},{name:"2015",value:1170},{name:"2016",value:970},{name:"2017",value:1450}],data2:[{name:"短袖",value:1200},{name:"休闲裤",value:1222},{name:"连衣裙",value:1283},{name:"外套",value:1314},{name:"羽绒服",value:2314}],options1:{title:"某商店近年营业总额",autoWidth:!0,showValue:!1,bgColor:"#F9EFCC",fillColor:"#00887C",contentColor:"rgba(46,199,201,0.3)",yEqual:7},options2:{title:"某商店近年营业总额",bgColor:"#D5E4EB",titleColor:"#00887C",fillColor:"red",contentColor:"rgba(46,199,201,0.3)"},options3:{title:"某商店各商品年度销量",bgColor:"#829dca",titleColor:"#ffffff",legendColor:"#ffffff",radius:120},options4:{title:"某商店各商品年度销量",bgColor:"#829daa",titleColor:"#ffffff",legendColor:"#ffffff",radius:120,innerRadius:80}}}},s=(e("W+O2"),e("KHd+")),n=Object(s.a)(a,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"crumbs"},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[e("i",{staticClass:"el-icon-lx-favor"}),t._v(" schart图表")])],1)],1),t._v(" "),e("div",{staticClass:"container"},[t._m(0),t._v(" "),e("div",{staticClass:"schart-box"},[e("div",{staticClass:"content-title"},[t._v("柱状图")]),t._v(" "),e("schart",{staticClass:"schart",attrs:{canvasId:"bar",data:t.data1,type:"bar",options:t.options1}})],1),t._v(" "),e("div",{staticClass:"schart-box"},[e("div",{staticClass:"content-title"},[t._v("折线图")]),t._v(" "),e("schart",{staticClass:"schart",attrs:{canvasId:"line",data:t.data1,type:"line",options:t.options2}})],1),t._v(" "),e("div",{staticClass:"schart-box"},[e("div",{staticClass:"content-title"},[t._v("饼状图")]),t._v(" "),e("schart",{staticClass:"schart",attrs:{canvasId:"pie",data:t.data2,type:"pie",options:t.options3}})],1),t._v(" "),e("div",{staticClass:"schart-box"},[e("div",{staticClass:"content-title"},[t._v("环形图")]),t._v(" "),e("schart",{staticClass:"schart",attrs:{canvasId:"ring",data:t.data2,type:"ring",options:t.options4}})],1)])])}),[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"plugins-tips"},[this._v("\n            vue-schart：vue.js封装sChart.js的图表组件。\n            访问地址："),i("a",{attrs:{href:"https://github.com/lin-xin/vue-schart",target:"_blank"}},[this._v("vue-schart")])])}],!1,null,"5260aba8",null);i.default=n.exports},"W+O2":function(t,i,e){"use strict";var a=e("tPl1");e.n(a).a},s2dO:function(t,i,e){t.exports=function(){"use strict";function t(t,i){for(var e=0;e<i.length;e++){var a=i[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}var i=window.devicePixelRatio||1,e=10*i,a=e/2;return function(){function s(t,n){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,s),this.canvas=function(t){var e=document.getElementById(t),a=e.parentNode.clientWidth,s=e.parentNode.clientHeight;return e.style.width=a+"px",e.style.height=s+"px",e.width=a*i,e.height=s*i,e}(t),this.ctx=this.canvas.getContext("2d"),this.type="bar",this.showValue=!0,this.showGrid=!0,this.topPadding=60*i,this.leftPadding=50*i,this.rightPadding=10*i,this.bottomPadding=50*i,this.yEqual=5,this.yLength=0,this.xLength=0,this.ySpace=0,this.xRorate=0,this.yRorate=0,this.bgColor="#fff",this.axisColor="#666",this.gridColor="#eee",this.title={text:"",color:"#666",position:"top",font:"bold "+18*i+"px Arial",top:e,bottom:a},this.legend={display:!0,position:"top",color:"#666",font:14*i+"px Arial",top:45*i,bottom:15*i,textWidth:0},this.radius=100*i,this.innerRadius=60*i,this.colorList=["#4A90E2","#F5A623","#ff5858","#5e64ff","#2AC766","#743ee2","#b554ff","#199475"],this.init(n)}return function(i,e,a){e&&t(i.prototype,e)}(s,[{key:"init",value:function(t){if(t.title=Object.assign({},this.title,t.title),t.legend=Object.assign({},this.legend,t.legend),Object.assign(this,t),!t.labels||!t.labels.length)throw new Error("缺少主要参数labels");if(!t.datasets||!t.datasets.length)throw new Error("缺少主要参数datasets");this.drawBackground(),"bar"===this.type||"line"===this.type?this.renderBarChart():this.renderPieChart(),this.drawLegend()}},{key:"renderBarChart",value:function(){this.yLength=Math.floor((this.canvas.height-this.topPadding-this.bottomPadding-e)/this.yEqual),this.xLength=Math.floor((this.canvas.width-this.leftPadding-this.rightPadding-e)/this.labels.length),this.ySpace=function(t,i){var e=t.map((function(t){return t.data.reduce((function(t,i){return i<t?t:i}))})),a=Math.ceil(Math.max.apply(Math,function(t){return function(t){if(Array.isArray(t)){for(var i=0,e=new Array(t.length);i<t.length;i++)e[i]=t[i];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(e))/i),s=a.toString().length-1;return s=2<s?2:s,Math.ceil(a/Math.pow(10,s))*Math.pow(10,s)}(this.datasets,this.yEqual),this.drawXAxis(),this.drawYAxis(),this.drawBarContent()}},{key:"drawBarContent",value:function(){var t=this.ctx,s=this.datasets.length;t.beginPath();for(var n=0;n<s;n++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.datasets[n].label).width),t.fillStyle=t.strokeStyle=this.datasets[n].fillColor||this.colorList[n];for(var o=this.datasets[n].data,l=0;l<o.length;l++)if(!(l>this.labels.length-1)){var h=this.xLength/(s+1),r=this.yLength/this.ySpace,d=this.leftPadding+this.xLength*l+h*(n+.5),c=d+h,f=this.canvas.height-this.bottomPadding,v=f-o[l]*r;if("bar"===this.type)t.fillRect(d,v,c-d,f-v),this.drawValue(o[l],d+h/2,v-a);else if("line"===this.type){var g=this.leftPadding+this.xLength*(l+.5);t.beginPath(),t.arc(g,v,3*i,0,2*Math.PI,!0),t.fill(),0!==l&&(t.beginPath(),t.strokeStyle=this.datasets[n].fillColor||this.colorList[n],t.lineWidth=2*i,t.moveTo(g-this.xLength,f-o[l-1]*r),t.lineTo(g,v),t.stroke(),t.lineWidth=1*i),this.drawValue(o[l],g,v-e)}}}t.stroke()}},{key:"renderPieChart",value:function(){for(var t=this.ctx,i=this.labels.length,e=this.datasets[0],a=e.data,s=a.reduce((function(t,i){return t+i})),n=-Math.PI/2,o=this.canvas.width/2,l=this.canvas.height/2,h=0;h<i;h++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.labels[h]).width),t.beginPath(),t.strokeStyle=t.fillStyle=e.colorList&&e.colorList[h]||this.colorList[h],t.moveTo(o,l);var r=n,d=n+=a[h]/s*2*Math.PI;t.arc(o,l,this.radius,r,d),t.closePath(),t.fill();var c=(r+d)/2;this.drawPieValue(a[h],c)}"ring"===this.type&&(t.beginPath(),t.fillStyle=this.bgColor,t.arc(o,l,this.innerRadius,0,2*Math.PI),t.closePath(),t.fill())}},{key:"drawValue",value:function(t,e,a){var s=this.ctx;this.showValue&&(s.textBaseline="middle",s.font=12*i+"px Arial",s.textAlign="center",s.fillText(t,e,a))}},{key:"drawPieValue",value:function(t,i){var a=this.ctx;if(this.showValue){var s=this.canvas.width/2,n=this.canvas.height/2,o=Math.ceil(Math.abs(this.radius*Math.cos(i))),l=Math.floor(Math.abs(this.radius*Math.sin(i)));a.textBaseline="middle",this.showValue&&(i<=0?(a.textAlign="left",a.moveTo(s+o,n-l),a.lineTo(s+o+e,n-l-e),a.moveTo(s+o+e,n-l-e),a.lineTo(s+o+3*e,n-l-e),a.stroke(),a.fillText(t,s+o+3.5*e,n-l-e)):0<i&&i<=Math.PI/2?(a.textAlign="left",a.moveTo(s+o,n+l),a.lineTo(s+o+e,n+l+e),a.moveTo(s+o+e,n+l+e),a.lineTo(s+o+3*e,n+l+e),a.stroke(),a.fillText(t,s+o+3.5*e,n+l+e)):i>Math.PI/2&&i<Math.PI?(a.textAlign="right",a.moveTo(s-o,n+l),a.lineTo(s-o-e,n+l+e),a.moveTo(s-o-e,n+l+e),a.lineTo(s-o-3*e,n+l+e),a.stroke(),a.fillText(t,s-o-3.5*e,n+l+e)):(a.textAlign="right",a.moveTo(s-o,n-l),a.lineTo(s-o-e,n-l-e),a.moveTo(s-o-e,n-l-e),a.lineTo(s-o-3*e,n-l-e),a.stroke(),a.fillText(t,s-o-3.5*e,n-l-e)))}}},{key:"drawBackground",value:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.drawTitle()}},{key:"drawTitle",value:function(){var t=this.title;if(t.text){var i=this.ctx;i.beginPath(),i.font=t.font,i.textAlign="center",i.fillStyle=t.color,"top"===t.position?(i.textBaseline="top",i.fillText(t.text,this.canvas.width/2,t.top)):(i.textBaseline="bottom",i.fillText(t.text,this.canvas.width/2,this.canvas.height-t.bottom))}}},{key:"drawXAxis",value:function(){var t=this.ctx,i=this.canvas.height-this.bottomPadding+.5;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding,i),t.lineTo(this.canvas.width-this.rightPadding,i),t.stroke(),this.drawXPoint()}},{key:"drawXPoint",value:function(){var t=this.ctx;t.beginPath(),t.font=12*i+"px Microsoft YaHei",t.textAlign=this.xRorate?"right":"center",t.textBaseline="top",t.fillStyle=this.axisColor;for(var s=0;s<this.labels.length;s++){var n=this.labels[s],o=this.leftPadding+this.xLength*(s+1)+.5,l=this.canvas.height-this.bottomPadding;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(o,l),t.lineTo(o,this.topPadding+e)):(t.moveTo(o,l),t.lineTo(o,l-a)),t.stroke(),t.save(),t.translate(o-this.xLength/2,l+a),t.rotate(-this.xRorate*Math.PI/180),t.fillText(n,0,0),t.restore()}}},{key:"drawYAxis",value:function(){var t=this.ctx;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding-.5,this.canvas.height-this.bottomPadding+.5),t.lineTo(this.leftPadding-.5,this.topPadding+.5),t.stroke(),this.drawYPoint()}},{key:"drawYPoint",value:function(){var t=this.ctx;t.font=12*i+"px Microsoft YaHei",t.textAlign="right",t.textBaseline="middle",t.beginPath();for(var s=0;s<this.yEqual;s++){var n=this.leftPadding,o=this.canvas.height-this.bottomPadding-this.yLength*(s+1)+.5;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(n,o),t.lineTo(this.canvas.width-this.rightPadding-e,o)):(t.strokeStyle=this.axisColor,t.moveTo(n-a,o),t.lineTo(n,o)),t.stroke(),t.save(),t.fillStyle=this.axisColor,t.translate(n-e,o),t.rotate(-this.yRorate*Math.PI/180),t.fillText(this.ySpace*(s+1),0,0),t.restore()}}},{key:"drawLegend",value:function(){var t=this.legend;if(t.display){var i=this.ctx,s="pie"===this.type||"ring"===this.type;i.beginPath(),i.font=t.font,i.textAlign="left",i.textBaseline="middle";for(var n=s?this.labels.length:this.datasets.length,o=(this.canvas.width-(this.legend.textWidth+(5*n-2)*e))/2,l=0,h=0;h<n;h++){var r=s?this.datasets[0]:this.datasets[h],d=(s?this.labels[h]:r.label)||"";i.fillStyle=r.colorList&&r.colorList[h]||r.fillColor||this.colorList[h],"top"===t.position?(this.drawLegendIcon(o+5*e*h+l,t.top-a,2*e,e),i.fillStyle=t.color,i.fillText(d,o+(5*h+3)*e+l,t.top)):"bottom"===t.position?(this.drawLegendIcon(o+5*e*h+l,this.canvas.height-t.bottom-a,2*e,e),i.fillStyle=t.color,i.fillText(d,o+(5*h+3)*e+l,this.canvas.height-t.bottom)):(i.fillRect(e,t.top+2*e*h,2*e,e),i.fillStyle=t.color,i.fillText(d,4*e,t.top+2*e*h+.5*e)),l+=Math.ceil(i.measureText(d).width)}}}},{key:"drawLegendIcon",value:function(t,s,n,o){var l=this.ctx;"line"===this.type?(l.beginPath(),l.strokeStyle=l.fillStyle,l.lineWidth=2*i,l.moveTo(t,s+a),l.lineTo(t+2*e,s+a),l.stroke(),l.lineWidth=1*i,l.arc(t+e,s+a,3*i,0,2*Math.PI,!0),l.fill()):l.fillRect(t,s,n,o)}}]),s}()}()},tPl1:function(t,i,e){}}]);