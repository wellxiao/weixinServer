# weixinServer
a server for my weixin Project Demo


本地数据库使用mysql,monogDB(暂时未使用)，mysql 数据库连接账号root,密码114094，端口号3306，以及数据库名称为：wellxiao
nodeJS 数据库框架为Sequelize,需要了解的可以进http://docs.sequelizejs.com/官网去了解，操作方便使用简单，大大节省开发者时间


2018.07.09
新增websocket连接，代码片段具体在websocket文件夹下，websocket需要重新监听一个端口。

前端代码可如下

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>vuedemo</title>
  </head>
  <body>
    <div class="value" id="value1">大名</div>
    <div class="value"> 
      <button id="btn">点击</button>
    </div>
  </body>
  <script>
    var mess =document.getElementById("value1");
    if(window.WebSocket){
      var ws = new WebSocket("ws://10.10.20.244:9091");
      ws.onopen = function(e){
        console.log("连接服务器成功！！")
      }
      ws.onclose = function(e){
        console.log("服务器关闭！！");
      }
      ws.onerror=function(e){
          console.log("连接出错！！！")
      }
      ws.onmessage = function(e){
        console.log("111111");
        mess.innerHTML = e.data;
        console.log(e.data);
      }
      document.getElementById("btn").onclick = function(){
        console.log("000000");
        ws.send("我是你大哥")
      }
    }
  </script>
  <style>
  .value{
    width:200px;
    height: 100px;
  }
  </style>
</html>

