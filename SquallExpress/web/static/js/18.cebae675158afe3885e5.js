(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{JLX1:function(t,n,i){},"LL+X":function(t,n,i){"use strict";i.r(n);var a=i("MQ60"),s={name:"draglist",data:function(){return{dragOptions:{animation:120,scroll:!0,group:"sortlist",ghostClass:"ghost-style"},todo:[{id:1,content:"开发图表组件"},{id:2,content:"开发拖拽组件"},{id:3,content:"开发权限测试组件"}],doing:[{id:1,content:"开发登录注册页面"},{id:2,content:"开发头部组件"},{id:3,content:"开发表格相关组件"},{id:4,content:"开发表单相关组件"}],done:[{id:1,content:"初始化项目，生成工程目录，完成相关配置"},{id:2,content:"开发项目整体框架"}]}},components:{draggable:i.n(a).a},methods:{removeHandle:function(t){console.log(t),this.$message.success("从 ".concat(t.from.id," 移动到 ").concat(t.to.id," "))}}},e=(i("yZKC"),i("KHd+")),o=Object(e.a)(s,(function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("section",{staticClass:"main"},[i("div",{staticClass:"crumbs"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("i",{staticClass:"el-icon-rank"}),t._v(" 拖拽组件")]),t._v(" "),i("el-breadcrumb-item",[t._v("拖拽排序")])],1)],1),t._v(" "),i("div",{staticClass:"container"},[t._m(0),t._v(" "),i("div",{staticClass:"drag-box"},[i("div",{staticClass:"drag-box-item"},[i("div",{staticClass:"item-title"},[t._v("todo")]),t._v(" "),i("draggable",{attrs:{options:t.dragOptions},on:{remove:t.removeHandle},model:{value:t.todo,callback:function(n){t.todo=n},expression:"todo"}},[i("transition-group",{staticClass:"item-ul",attrs:{tag:"div",id:"todo"}},t._l(t.todo,(function(n){return i("div",{key:n.id,staticClass:"drag-list"},[t._v("\n                            "+t._s(n.content)+"\n                        ")])})),0)],1)],1),t._v(" "),i("div",{staticClass:"drag-box-item"},[i("div",{staticClass:"item-title"},[t._v("doing")]),t._v(" "),i("draggable",{attrs:{options:t.dragOptions},on:{remove:t.removeHandle},model:{value:t.doing,callback:function(n){t.doing=n},expression:"doing"}},[i("transition-group",{staticClass:"item-ul",attrs:{tag:"div",id:"doing"}},t._l(t.doing,(function(n){return i("div",{key:n.id,staticClass:"drag-list"},[t._v("\n                            "+t._s(n.content)+"\n                        ")])})),0)],1)],1),t._v(" "),i("div",{staticClass:"drag-box-item"},[i("div",{staticClass:"item-title"},[t._v("done")]),t._v(" "),i("draggable",{attrs:{options:t.dragOptions},on:{remove:t.removeHandle},model:{value:t.done,callback:function(n){t.done=n},expression:"done"}},[i("transition-group",{staticClass:"item-ul",attrs:{tag:"div",id:"done"}},t._l(t.done,(function(n){return i("div",{key:n.id,staticClass:"drag-list"},[t._v("\n                            "+t._s(n.content)+"\n                        ")])})),0)],1)],1)])])])}),[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"plugins-tips"},[this._v("\n            Vue.Draggable：基于 Sortable.js 的 Vue 拖拽组件。\n            访问地址："),n("a",{attrs:{href:"https://github.com/SortableJS/Vue.Draggable",target:"_blank"}},[this._v("Vue.Draggable")])])}],!1,null,"008819a0",null);n.default=o.exports},yZKC:function(t,n,i){"use strict";var a=i("JLX1");i.n(a).a}}]);