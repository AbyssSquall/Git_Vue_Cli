var request = require('request');
var http = require('http');
var iconv=require('iconv-lite');
var cheerio = require('cheerio');
var fs = require('fs');
var createReport = require('docx-templates');

//全局变量
var i=0;

//发送post请求，获得responseid

//发送请求
//初始url 
var squall_URL = {
    hostname: 'bbs.nga.cn',
    path: '/read.php?tid=16140203',
    headers: {
        "Referer": "https://bbs.nga.cn/misc/adpage_insert_2.html?https://bbs.nga.cn/thread.php?fid=489",
        'Content-Type': 'text/html',
        //没有这个字段的话访问不了
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',  
    }
};

//封装一个5秒访问一次的函数
function fetchPage(x) { 
    setTimeout(function(){  
      startRequest(x); 
    },5000)
}

//请求函数
function startRequest(Url){
    //采用http模块向服务器发起一次get请求      
    http.get(Url, function (res) {     
        var html = '';        //用来存储请求网页的整个html内容
        res.setEncoding('binary');
        var titles = [];        
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {   
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {
            var buf=new Buffer(html,'binary');
            var str=iconv.decode(buf,'GBK');

            console.log(str);

            var $ = cheerio.load(str); //采用cheerio模块解析html
            var news_item = {
                //获取文章的标题
                img: $('a'),
                //i是用来判断获取了多少篇文章
                i: i++,     
            };
            console.log(news_item);     //打印信息
            var news_title = $('img').text().trim();

            //savedContent($,news_title);  //存储每篇文章的内容及文章标题

            //savedImg($,news_title);    //存储每篇文章的图片及图片标题

            //如果没访问完继续访问
            // if (urlList.length!=0 ) {
            //     fetchPage(urlList.shift());
            // }
        });
        res.on('error',function(Event){
            console.log("Squall:Error!!!");
            console.log(Event);
        })
    })
}

//利用模板生成word文档
function WordTemplate(){
    createReport({
        template: 'D:/Mike/work/Git_vue_cli/Spider/Data/modal.docx',
        output: 'D:/Mike/work/Git_vue_cli/Spider/Data/结果.docx',
        data: {
          num: '',
          company: '',
          ID: '',
          name: '',
          type: ''
        }
    })
}

//excute
//fetchPage(squall_URL);
WordTemplate()