layui.use(['form'], function(){
    var form = layui.form;
  })

  layui.use('laydate', function(){
    var laydate = layui.laydate;
    var Now = new Date();

    //执行一个laydate实例
    laydate.render({
      elem: '#checktime', //指定元素
      value:Now.toLocaleDateString(),
      format:"yyyy/MM/dd"
    });
  });

  layui.use('element', function(){
    var element = layui.element;
  });